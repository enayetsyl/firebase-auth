import { PrismaClient } from '@prisma/client';
import { IUser } from './user.interface';

const prisma = new PrismaClient();

const getMyProfile = async (userId: string): Promise<IUser | null> => {
  // In a real app, you might sync Firebase user to Postgres here if not exists
  // For now, we just return what we have or mock it if we haven't synced yet
  // Since we don't have a sync mechanism yet, let's assume we just return the firebase data passed to controller
  // But typically service interacts with DB.

  // Let's try to find in DB, if not, return null (or handle sync)
  // For this boilerplate, we'll just return the DB record
  // const result = await prisma.user.findUnique({
  //   where: {
  //     id: userId
  //   }
  // })
  // return result;

  return null;
};

export const UserService = {
  getMyProfile,
};
