import {
  getApiUsageService,
  getAllApiUsagesService,
  getUsageSummaryService,
  getUsageChartService,
  getEndpointUsageService,
  getUsageByKeyService,
} from "./api-usage.service.js";

export const getApiUsage = async (req, res) => {
  try {
    const api_usages = await getApiUsageService(req.user, req.params.api_key_id);
    res.status(200).json({ api_usages });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllApiUsages = async (req, res) => {
  try {
    const api_usages = await getAllApiUsagesService(req.user);
    res.status(200).json({ api_usages });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getUsageSummary = async (req, res) => {
  try {
    const summary = await getUsageSummaryService(
      req.user,
      req.params.api_key_id
    );

    res.status(200).json({ summary });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message });
  }
};

export const getUsageChart = async (req, res) => {
  try {
    const chart = await getUsageChartService(
      req.user,
      req.params.api_key_id
    );

    res.status(200).json({ chart });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message });
  }
};

export const getEndpointUsage = async (req, res) => {
  try {
    const endpoints =
      await getEndpointUsageService(
        req.user,
        req.params.api_key_id
      );

    res.status(200).json({ endpoints });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message });
  }
};

export const getUsageByKey = async (req, res) => {
  try {
    const usage =
      await getUsageByKeyService(req.user);

    res.status(200).json({ usage });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message });
  }
};