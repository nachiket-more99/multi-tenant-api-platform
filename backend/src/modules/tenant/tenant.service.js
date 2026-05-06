import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';

export const createTenantService = async (data) => {
  if (!data.name) {
    throw new AppError("name is required", 400);
  }
  
  const tenant = await prisma.tenant.create({
    data: {
      name: String(data.name)
    }
  });
  
  await prisma.user.update({
    where: { id: Number(data.user_id) },
    data: { tenant_id: Number(tenant.id) },
  });

  return tenant
};

export const addUserService = async (data) => {
  if (!data.email || !data.tenant_id) {
    throw new AppError("tenant_id and email required", 400);
  }

  const user = await prisma.user.update({
    where: { email: String(data.email) },
    data: { tenant_id: Number(data.tenant_id) },
  });

  return user
};

export const getTenantService = async (tenant_id) => {
  if (!tenant_id) {
    throw new AppError("tenant_id required", 400);
  }

  const tenantId = Number(tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);
  }

  return prisma.tenant.findUnique({
    where : {
        id : tenantId
    }
  });
};

export const getAllUsersService = async (tenant_id) => {
  if (!tenant_id) {
    throw new AppError("tenant_id required", 400);
  }

  const tenantId = Number(tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);
  }

  return prisma.user.findMany ({
    where : {
        tenant_id : tenantId
    }
  });
};

export const updateTenantService = async (tenant_id, name) => {
  if (!tenant_id || name) {
    throw new AppError("tenant_id and name required", 400);
  }

  const tenantId = Number(data.tenant_id);

  if (isNaN(tenantId)) {
    throw new AppError("Invalid tenant_id", 400);
  }

  return prisma.tenant.update ({
    where: { id: tenantId },
    data: { name: String(name) },
  });
};