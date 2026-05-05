import { prisma } from '../../lib/prisma.js';
import bcrypt from "bcrypt";

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