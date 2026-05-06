import { prisma } from "../../lib/prisma.js";
import { AppError } from '../../utils/AppError.js';

export const getAllLogsService = async (api_key_id) => {
  if (!api_key_id) {
    throw new AppError("api_key_id required", 400);
  }
  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {
    throw new AppError("Invalid api_key_id", 400);
  }

  return prisma.requestLog.findMany({
    where: { api_key_id: apiKeyId },
    orderBy: { created_at: "desc" }
  });
};