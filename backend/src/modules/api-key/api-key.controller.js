import { createApiKeyService, getApiKeyService, getAllApiKeysService, deleteApiKeyService } from "./api-key.service.js";

export const createApiKey = async (req, res) => {
  try {
    const api_key = await createApiKeyService(req.user);
    res.status(201).json({ api_key });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const api_key = await getApiKeyService(req.user, req.params.api_key_id);
    res.status(200).json({ api_key });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllApiKeys = async (req, res) => {
  try {
    const api_keys = await getAllApiKeysService(req.user);
    res.status(200).json({ api_keys });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const deleteApiKey = async (req, res) => {
  try {
    await deleteApiKeyService(req.user, req.params.api_key_id);
    res.status(200).json({ message: "api key deleted" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};