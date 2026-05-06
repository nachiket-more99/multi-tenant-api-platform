import { prisma } from "../../lib/prisma.js";
import { AppError } from '../../utils/AppError.js';

export const createLogService = async (data) => {
  if (!data.api_key_id || !data.tenant_id) {
    throw new AppError("tenant_id and api_key_id required", 400);
  }

  const tenantId = Number(data.tenant_id);
  const apiKeyId = Number(data.api_key_id);

  if (isNaN(tenantId) || isNaN(apiKeyId)) {
    throw new AppError("Invalid tenant_id or api_key_id", 401);
  }

  await prisma.requestLog.create({
    data: {
      tenant_id: tenantId,
      api_key_id: apiKeyId,
      path: String(data.path || ""),
      method: String(data.method || ""),
      status_code: Number(data.status_code || 200),
      response_time: Number(data.response_time || 0),
    },
  });
};


export const getAllLogsService = async (api_key_id) => {
  if (!api_key_id) {
    throw new AppError("api_key_id required", 400);
  }
  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {
    throw new AppError("Invalid api_key_id", 401);
  }

  return prisma.requestLog.findMany({
    where: { api_key_id: apiKeyId },
    orderBy: { created_at: "desc" }
  });
};