import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  // get token from cookie
  const cookieToken = req.cookies?.token;
 
  // get authorization header
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.split(" ")[1];


  const token = cookieToken || headerToken;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

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