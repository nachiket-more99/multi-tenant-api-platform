import { createApiKeyService, getApiKeyService, getAllApiKeysService, deleteApiKeyService } from "./apikey.service.js";

export const createApiKey = async (req, res) => {
  try {
    const api_key = await createApiKeyService(req.body);
    res.status(201).json({ "api_key": api_key });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const api_key = await getApiKeyService(req.params.api_key_id);
    res.status(200).json({ "api_key": api_key });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllApiKeys = async (req, res) => {
  try {
    const api_keys = await getAllApiKeysService(req.params.tenant_id);
    res.status(200).json({ "api_keys": api_keys });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const deleteApiKey = async (req, res) => {
  try {
    await deleteApiKeyService(req.params.api_key_id);
    res.status(200).json("api key deleted");
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};