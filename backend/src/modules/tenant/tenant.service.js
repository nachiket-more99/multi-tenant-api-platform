import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../utils/AppError.js';

export const createTenantService = async (userId, name) => {
  if (!name) {
    throw new AppError("name is required", 400);
  }

  const tenant = await prisma.tenant.create({
    data: { name: String(name) }
  });

  await prisma.user.update({
    where: { id: Number(userId) },
    data: { tenant_id: tenant.id, role: "ADMIN" },
  });

  return tenant;
};

export const addUserService = async (user, email) => {
  if (!email) {
    throw new AppError("email required", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: String(email) }
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  if (existingUser.tenant_id) {
    throw new AppError("User already belongs to a tenant", 409);
  }

  return prisma.user.update({
    where: { email: String(email) },
    data: { tenant_id: Number(user.tenantId) },
  });
};

export const getTenantService = async (tenantId) => {
  if (!tenantId) {
    throw new AppError("tenant not assigned", 400);
  }

  return prisma.tenant.findUnique({
    where: { id: Number(tenantId) }
  });
};

export const getAllUsersService = async (tenantId) => {
  return prisma.user.findMany({
    where: { tenant_id: Number(tenantId) }
  });
};

export const updateTenantService = async (user, name) => {
  if (!name) {
    throw new AppError("name required", 400);
  }

  return prisma.tenant.update({
    where: { id: Number(user.tenantId) },
    data: { name: String(name) },
  });
};