import { getUserService } from "./user.service.js";

export const getUser = async (req, res) => {
  try {
    const user = await getUserService(req.user.userId);
    res.status(200).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

// export const getAllUsers = async (req, res) => {
//   const users = await getAllUsersService(req.params.tenant_id);
//   res.json(users);
// };