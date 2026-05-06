import { prisma } from '../../lib/prisma.js';
import { generateApiKey, encryptKey, decryptKey } from "../../utils/crypto.js";
import { AppError } from '../../utils/AppError.js';

export const createApiKeyService = async (data) => {
  if (!data.tenant_id) {
    throw new AppError("tenant_id required", 400);
  }

  const tenantId = Number(data.tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);
  }

  // generate raw api key 
  const rawKey = generateApiKey();

  // encrypt the key
  const encryptedKey = encryptKey(rawKey);

  // save it to db with req.body.tenant_id
  const key = await prisma.apiKey.create({
    data: {
      tenant_id: tenantId,
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

export const getApiKeyService = async (api_key_id) => {
  if (!api_key_id) {
    throw new AppError("api_key_id required", 400);
  }

  const apiKeyId = Number(api_key_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  const key = await prisma.apiKey.findUnique({
    where : {
        id : apiKeyId
    }
  });

  return {
    id: key.id,
    key: decryptKey(key.encrypted_key),
    is_active: key.is_active,
    created_at: key.created_at
  };

};

export const getAllApiKeysService = async (tenant_id) => {
  if (!tenant_id) {
    throw new AppError("tenant_id required", 400);
  }

  const tenantId = Number(tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);
  }

  return prisma.apiKey.findMany ({
    where : {
        tenant_id : tenantId
    }
  });
};

export const deleteApiKeyService = async (api_key_id) => {
  if (!api_key_id) {
    throw new AppError("api_key_id required", 400);
  }

  const apiKeyId = Number(api_key_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  await prisma.apiKey.delete ({
    where: { 
      id: apiKeyId
    }
  })
  
  return;
};