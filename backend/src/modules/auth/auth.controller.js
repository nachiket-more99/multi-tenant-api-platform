import { registerUserService, loginUserService, logoutUserService } from "./auth.service.js";

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
    const user = await loginUserService(req.body, res)
    res.status(200).json(user);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

export const logoutUser = async (req, res) => {
  try {
    const response = await logoutUserService(res);
    res.json(response);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};