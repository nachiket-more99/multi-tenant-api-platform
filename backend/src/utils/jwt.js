import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      tenantId: user.tenant_id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};