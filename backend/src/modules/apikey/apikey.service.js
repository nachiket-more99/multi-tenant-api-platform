import { prisma } from '../../lib/prisma.js';
import { generateApiKey, encryptKey, decryptKey } from "../../utils/crypto.js";

export const createApiKeyService = async (data) => {
  // generate raw api key 
  const rawKey = generateApiKey();

  // encrypt the key
  const encryptedKey = encryptKey(rawKey);

  // save it to db with req.body.tenant_id
  const key = await prisma.apiKey.create({
    data: {
      tenant_id: Number(data.tenant_id),
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
  const key = await prisma.apiKey.findUnique({
    where : {
        id : Number(api_key_id)
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
  return prisma.apiKey.findMany ({
    where : {
        tenant_id : Number(tenant_id)
    }
  });
};

export const deleteApiKeyService = async (api_key_id) => {
  return prisma.apiKey.delete ({
    where: { 
      id: Number(api_key_id) 
    }
  });
};