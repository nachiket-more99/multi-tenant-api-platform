import { createUserService, loginUserService, getUserService } from "./user.service.js";

export const createUser = async (req, res) => {
  const user = await createUserService(req.body);
  res.json(user);
};

export const loginUser = async (req, res) => {
  const user = await loginUserService(req.body)
  res.json(user)
}

export const getUser = async (req, res) => {
  const user = await getUserService(req.params.user_id);
  res.json(user);
};

// export const getAllUsers = async (req, res) => {
//   const users = await getAllUsersService(req.params.tenant_id);
//   res.json(users);
// };