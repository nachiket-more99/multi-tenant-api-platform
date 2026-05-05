import { createTenantService, getTenantService, getAllUsersService, updateTenantService } from "./tenant.service.js";

export const createTenant = async (req, res) => {
  const user = await createTenantService(req.body);
  res.json(user);
};

export const getTenant = async (req, res) => {
  const user = await getTenantService(req.params.tenant_id);
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService(req.params.tenant_id);
  res.json(users);
};

export const updateTenant = async (req, res) => {
  const user = await updateTenantService(req.params.tenant_id, req.body.name);
  res.json(user);
};