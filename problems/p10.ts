import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  const deleteStarRatings = await prisma.starRating.deleteMany({
    where: {
      userId: undefined,
    },
  });
  const deleteUsers = await prisma.user.deleteMany({
    where: {
      age: {
        lt: n,
      },
    },
  });

  return deleteUsers;
};
