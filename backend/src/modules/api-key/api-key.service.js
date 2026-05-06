import { prisma } from '../../lib/prisma.js';
import { generateApiKey, createHash } from "../../utils/crypto.js";
import { AppError } from '../../utils/AppError.js';

export const createApiKeyService = async (user) => {
  if (!user.tenantId) {
    throw new AppError("User not assigned to tenant", 400);
  }

  // generate raw api key 
  const rawKey = generateApiKey();

  // hash the key 
  const keyHash = createHash(rawKey);

  const keyPrefix = `${rawKey.substring(0, 8)}...${rawKey.slice(-4)}`

  // save it to db with req.body.tenant_id
  const key = await prisma.apiKey.create({
    data: {
      tenant_id: Number(user.tenantId),
      created_by: Number(user.userId),
      hash_key: String(keyHash),
      key_prefix: String(keyPrefix)
    }
  });

  // return api key
  return {
    id: key.id,
    tenant_id: key.tenant_id,
    api_key: rawKey,
    key_prefix: key.key_prefix,
    is_active: key.is_active,
    last_used: key.last_used,
    created_at: key.created_at
  };

};

export const getApiKeyService = async (user, api_key_id) => {
  const apiKeyId = Number(api_key_id);

  if (isNaN(api_key_id)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  const key = await prisma.apiKey.findUnique({
    where : {
        id : apiKeyId
    },
    include: {
      creator: {
        select: {
          email: true
        }
      }
    }
  });

  if (!key) {
    throw new AppError("API key not found", 404);
  }

  if (key.tenant_id !== user.tenantId) {
    throw new AppError("Unauthorized", 403);
  }

  return key;

};

export const getAllApiKeysService = async (user) => {
  return prisma.apiKey.findMany({
    where: {
      tenant_id: Number(user.tenantId)
    },
    include: {
      creator: {
        select: {
          email: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
};

export const deleteApiKeyService = async (user, api_key_id) => {
  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  const key = await prisma.apiKey.findUnique({
    where: { id: apiKeyId }
  });

  if (!key) {
    throw new AppError("API key not found", 404);
  }

  if (key.tenant_id !== user.tenantId) {
    throw new AppError("Unauthorized", 403);
  }

  await prisma.apiKey.delete({
    where: { id: apiKeyId }
  });
};