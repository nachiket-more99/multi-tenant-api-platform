import { prisma } from '../../lib/prisma.js';
import { generateApiKey, encryptKey, decryptKey } from "../../utils/crypto.js";
import { AppError } from '../../utils/AppError.js';

export const createApiKeyService = async (user) => {
  if (!user.tenantId) {
    throw new AppError("User not assigned to tenant", 400);
  }

  // generate raw api key 
  const rawKey = generateApiKey();

  // encrypt the key
  const encryptedKey = encryptKey(rawKey);

  // save it to db with req.body.tenant_id
  const key = await prisma.apiKey.create({
    data: {
      tenant_id: Number(user.tenantId),
      encrypted_key: String(encryptedKey),
    }
  });

  // return api key
  return {
    id: key.id,
    key: rawKey,
    is_active: key.is_active,
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
    }
  });

  if (!key) {
    throw new AppError("API key not found", 404);
  }

  if (key.tenant_id !== user.tenantId) {
    throw new AppError("Unauthorized", 403);
  }

  return {
    id: key.id,
    key: decryptKey(key.encrypted_key),
    is_active: key.is_active,
    created_at: key.created_at
  };

};

export const getAllApiKeysService = async (user) => {
  return prisma.apiKey.findMany({
    where: {
      tenant_id: Number(user.tenantId)
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