import { useQuery, useQueryClient } from "react-query";

import { getGenresByID } from "@/services/musicApi/getGenres.api";

export const useGenreData = (genreId) => {
  const queryClient = useQueryClient();
  return useQuery(["genres", genreId], () => getGenresByID(genreId), {
    select: (data) => data.data.genre,
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
