import { prisma } from '../../lib/prisma.js';

export const createTenantService = async (data) => {
  return prisma.tenant.create({
    data,
  });
};

export const getTenantService = async (tenant_id) => {
  return prisma.tenant.findUnique({
    where : {
        id : Number(tenant_id)
    }
  });
};

export const getAllUsersService = async (tenant_id) => {
  return prisma.user.findMany ({
    where : {
        id : Number(tenant_id)
    }
  });
};

export const updateTenantService = async (tenant_id, name) => {
  return prisma.tenant.update ({
    where: { id: Number(tenant_id) },
    data: { name: String(name) },
  });
};