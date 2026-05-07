import { registerUserService, loginUserService } from "./auth.service.js";

export const registerUser = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({ "user": user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await loginUserService(req.body)
    res.status(200).json(user);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}