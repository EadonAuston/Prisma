import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = (userId: number) => {
  return prisma.starRating
    .findMany({
      where: {
        userId: userId,
      },
      select: {
        movie: true,
      },
    })
    .then((rating) => rating.map((ratingItem) => ratingItem.movie));
};
