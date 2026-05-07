import bcrypt from "bcrypt";
import { prisma } from '../../lib/prisma.js';
import { generateToken } from "../../utils/jwt.js";
import { AppError } from '../../utils/AppError.js';

export const registerUserService = async (data) => {
  if (!data.email || !data.password) {
    throw new AppError("email and password required", 400);
  }

  // hash passowrd
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // create user with hased_password
  return prisma.user.create({
    data: {
      email: String(data.email),
      hash_password: String(hashedPassword)
    }
  });
};

export const loginUserService = async (data, res) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError('User not found', 404);        
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.hash_password
  );

  if (!isMatch) {
    throw new AppError('Invalid credentials', 401); 
  }

  const token = generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, 
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      tenant_id: user.tenant_id,
      role: user.role,
    },
  };
};

export const logoutUserService = async (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return { message: "Logged out successfully" };
};