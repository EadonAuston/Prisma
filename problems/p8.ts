import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const grumpyCriticId = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "asc",
      },
    },
    take: 1,
  });
  return grumpyCriticId[0].userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const nicestCriticId = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
    orderBy: {
      _avg: {
        score: "desc",
      },
    },
    take: 1,
  });
  return nicestCriticId[0].userId;
};
