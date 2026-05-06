import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';

export const getApiUsageService = async (api_key_id) => {
  if (!api_key_id) {
    throw new AppError("api_key_id required", 400);
  }

  const apiKeyId = Number(api_key_id);

  if (isNaN(apiKeyId)) {  
    throw new AppError("Invalid api_key_id", 400);  
  }

  const usage = await prisma.apiUsage.findMany({  
    where: { api_key_id: apiKeyId }
  });

  if (!usage) throw new AppError("No usage found", 404);

  return usage;
};

export const getAllApiUsagesService = async (tenant_id) => {
  if (!tenant_id) {
    throw new AppError("tenant_id required", 400);
  }

  const tenantId = Number(tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);  
  }

  return prisma.apiUsage.findMany({  
    where: { tenant_id: tenantId }
  });
};