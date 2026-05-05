import { prisma } from '../../lib/prisma.js';

export const createUserService = async (data) => {
  return prisma.user.create({
    data: {
      email: String(data.email),
      hash_password: String(data.password)
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