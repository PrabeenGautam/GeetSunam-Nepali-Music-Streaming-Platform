import { useQuery, useQueryClient } from "react-query";
import { getGenresApi } from "@/services/musicApi/getGenres.api";

export const useGenreData = (genreId) => {
  const queryClient = useQueryClient();
  return useQuery(["genres", genreId], () => getGenresByID(genreId), {
    select: (data) => data.data.genre,
    refetchOnWindowFocus: false,
    initialData: () => {
      const genre = queryClient
        .getQueryData("genres")
        ?.data.genres.find((genre) => genre._id === genreId);

      if (genre) {
        return {
          data: {
            genre,
          },
        };
      } else {
        return undefined;
      }
    },
  });
};

export const getGenreData = () => {
  const queryClient = useQueryClient();
  return useQuery(["genres"], () => getGenresApi(), {
    select: (data) => data.data.genres,
    refetchOnWindowFocus: false,
    initialData: () => {
      const genres = queryClient.getQueryData("genres");

      if (genres) {
        return {
          data: {
            genres,
          },
        };
      } else {
        return undefined;
      }
    },
  });
};
