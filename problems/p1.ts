import { prisma } from "./prisma";

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = () => {
  const allUsers = prisma.user
    .findMany({
      orderBy: [
        {
          username: "asc",
        },
      ],
    })
    .then((res) => res);

  return allUsers;
};
