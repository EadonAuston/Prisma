import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  const pg13Movies = prisma.movie.findMany({
    where: {
      parentalRating: "PG-13",
    },
    orderBy: {
      releaseYear: "desc",
    },
    select: {
      parentalRating: true,
      releaseYear: true,
    },
  });
  return pg13Movies;
};
