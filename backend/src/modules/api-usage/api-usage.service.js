import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';

export const getApiUsageService = async (user, api_key_id) => {
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

  const usage = await prisma.apiUsage.findMany({
    where: { api_key_id: apiKeyId },
    orderBy: { date: "desc" }
  });

  return usage; 
};

export const getAllApiUsagesService = async (user) => {
  if (!user.tenantId) {
    throw new AppError("User not assigned to tenant", 400);
  }

  return prisma.apiUsage.findMany({
    where: {
      tenant_id: Number(user.tenantId)
    },
    orderBy: {
      date: "desc"
    }
  });
};