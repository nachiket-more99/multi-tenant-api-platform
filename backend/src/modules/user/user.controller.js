import { createUserService, loginUserService, getUserService } from "./user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body)
    res.status(200).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.params.user_id);
    res.status(200).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// export const getAllUsers = async (req, res) => {
//   const users = await getAllUsersService(req.params.tenant_id);
//   res.json(users);
// };