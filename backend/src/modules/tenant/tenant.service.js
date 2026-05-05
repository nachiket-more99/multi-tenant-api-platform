import { prisma } from '../../lib/prisma.js';

export const createTenantService = async (data) => {
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
  const user = await prisma.user.update({
    where: { email: String(data.email) },
    data: { tenant_id: Number(data.tenant_id) },
  });

  return user
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