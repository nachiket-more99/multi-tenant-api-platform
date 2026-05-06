import { createTenantService, addUserService, getTenantService, getAllUsersService, updateTenantService } from "./tenant.service.js";

export const createTenant = async (req, res) => {
  try {
    const tenant = await createTenantService(req.body);
    res.status(201).json({ "tenant": tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await addUserService(req.body);
    res.status(200).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getTenant = async (req, res) => {
  try {
    const tenant = await getTenantService(req.params.tenant_id);
    res.status(200).json({ "tenant": tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.params.tenant_id);
    res.status(200).json({ "users": users });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateTenant = async (req, res) => {
  try {
    const tenant = await updateTenantService(req.params.tenant_id, req.body.name);
    res.status(200).json({ "tenant": tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};