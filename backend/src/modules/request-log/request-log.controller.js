import { createLogService, getAllLogsService } from "./request-log.service.js";

export const createLog = async (req, res) => {
  try {
    await createLogService(req.body);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllLogs = async (req, res) => {
  try {
    const logs = await getAllLogsService(req.params.api_key_id);
    res.status(200).json({
        "logs": logs
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};