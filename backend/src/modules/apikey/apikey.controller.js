import { createApiKeyService, getApiKeyService, getAllApiKeysService, deleteApiKeyService } from "./apikey.service.js";

export const createApiKey = async (req, res) => {
  const api_key = await createApiKeyService(req.body);
  res.json(api_key);
};

export const getApiKey = async (req, res) => {
  const api_key = await getApiKeyService(req.params.api_key_id);
  res.json(api_key);
};

export const getAllApiKeys = async (req, res) => {
  const api_keys = await getAllApiKeysService(req.params.tenant_id);
  res.json(api_keys);
};

export const deleteApiKey = async (req, res) => {
  await deleteApiKeyService(req.params.api_key_id);
  res.json("api key deleted");
};