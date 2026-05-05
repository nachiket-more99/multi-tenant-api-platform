import bcrypt from "bcrypt";
import { prisma } from '../../lib/prisma.js';
import { generateToken } from "../../utils/jwt.js";

export const createUserService = async (data) => {
  if (!data.email || !data.password) {
    throw new Error("email and password required");
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

export const loginUserService = async (data) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.hash_password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      tenant_id: user.tenant_id,
      role: user.role,
    },
  };
};

export const getUserService = async (user_id) => {
  return prisma.user.findUnique({
    where : {
        id : Number(user_id)
    }
  });
};

// export const getAllUsersService = async (tenant_id) => {
//   return prisma.user.findMany ({
//     where : {
//         tenant_id: tenant_id
//     }
//   });
// };