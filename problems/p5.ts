import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });

  type ObjectString = {
    id: number;
    title: string;
    releaseYear: number;
    parentalRating: string;
    starRatings: {
      id: number;
      score: number;
      userId: number;
      movieId: number;
    }[];
  };

  const omit = (
    obj: ObjectString,
    keys: (keyof ObjectString)[]
  ): Partial<ObjectString> => {
    const result: Partial<ObjectString> = { ...obj };
    keys.forEach((key) => {
      delete result[key];
    });
    return result;
  };

  const acceptedMovies = [];
  for (let i = 0; i < movies.length; i++) {
    let avgRating = 0;
    let ratings = 0;
    for (let k = 0; k < movies[i].starRatings.length; k++) {
      avgRating += movies[i].starRatings[k].score;
      ratings += 1;
    }
    if (avgRating / ratings > n) {
      acceptedMovies.push(movies[i]);
    }
  }

  const answer = acceptedMovies.map((movie) => omit(movie, ["starRatings"]));
  console.log(acceptedMovies);
  return answer;
};
