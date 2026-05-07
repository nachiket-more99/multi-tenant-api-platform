import { getAllLogsService } from "./request-log.service.js";

export const getAllLogs = async (req, res) => {
  try {
    const logs = await getAllLogsService(req.user);
    res.status(200).json({
        "logs": logs
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllApiLogs = async (req, res) => {
  try {
    const logs = await getAllApiLogsService(req.user, req.params.api_key_id);
    res.status(200).json({
        "logs": logs
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};