import { useQuery, useQueryClient } from "react-query";

import { getArtistsById } from "@/services/artistsApi/getArtistsDetails.api";

export const useArtistsData = (artistsId) => {
  const queryClient = useQueryClient();
  return useQuery(["artists", artistsId], () => getArtistsById(artistsId), {
    select: (data) => data.data.artists,
    initialData: () => {
      const artist = queryClient
        .getQueryData("artists")
        ?.data.artists.find((artist) => artist._id === artistsId);

      if (artist) {
        return {
          data: {
            artists: artist,
          },
        };
      } else {
        return undefined;
      }
    },
  });
};
