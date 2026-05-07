import { prisma } from "../../lib/prisma.js";
import { AppError } from '../../utils/AppError.js';

export const getAllLogsService = async (user) => {
  return prisma.requestLog.findMany({
    where: { tenant: user.tenantId },
    orderBy: { created_at: "desc" },
  });
};

export const getAllApiLogsService = async (user, api_key_id) => {
  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {
    throw new AppError("Invalid api_key_id", 400);
  }
  const key = await prisma.apiKey.findUnique({
    where: { id: apiKeyId }
  });

  if (!key) {
    throw new AppError("API key not found", 404);
  }

  if (key.tenant_id !== user.tenantId) {
    throw new AppError("Unauthorized", 403);
  }

  return prisma.requestLog.findMany({
    where: { api_key_id: apiKeyId },
    orderBy: { created_at: "desc" },
  });
};