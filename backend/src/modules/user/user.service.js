import { prisma } from '../../lib/prisma.js';

export const createUserService = async (data) => {
  return prisma.user.create({
    data,
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