import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  // get authorization header
  const authHeader = req.headers.authorization;

  // if no header then not authenticated
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  // extract token Bearer
  const token = authHeader.split(" ")[1];

  try {
    // verify token and attach data to request
    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    // if token invalid/expired then reject request
    return res.status(401).json({ error: "Invalid token" });
  }
};