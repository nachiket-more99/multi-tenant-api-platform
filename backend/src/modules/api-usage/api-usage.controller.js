import { getApiUsageService, getAllApiUsagesService } from "./api-usage.service.js";

export const getApiUsage = async (req, res) => {
  try {
    const api_usage = await getApiUsageService(req.params.api_key_id);
    res.status(200).json({ "api_usage": api_usage });  
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllApiUsages = async (req, res) => {
  try {
    const api_usages = await getAllApiUsagesService(req.params.tenant_id);
    res.status(200).json({ "api_usages": api_usages });  
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};