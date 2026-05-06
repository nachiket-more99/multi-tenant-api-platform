import { createTenantService, addUserService, getTenantService, getAllUsersService, updateTenantService } from "./tenant.service.js";

export const createTenant = async (req, res) => {
  try {
    const tenant = await createTenantService(req.user.userId, req.body.name);
    res.status(201).json({ tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const addUser = async (req, res) => {
  try {
    const user = await addUserService(req.user, req.body.email);
    res.status(200).json({ user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getTenant = async (req, res) => {
  try {
    const tenant = await getTenantService(req.user.tenantId);
    res.status(200).json({ tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.user.tenantId);
    res.status(200).json({ users });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const updateTenant = async (req, res) => {
  try {
    const tenant = await updateTenantService(req.user, req.body.name);
    res.status(200).json({ tenant });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};