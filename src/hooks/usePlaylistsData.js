import { getPlaylistByID } from "@/services/playlistApi/getPlaylist.api";
import { useQuery, useQueryClient } from "react-query";

export const usePlaylistData = (playlistID) => {
  const queryClient = useQueryClient();
  return useQuery(
    ["playlists", playlistID],
    () => getPlaylistByID(playlistID),
    {
      select: (data) => data.data.playlist,
      refetchOnWindowFocus: false,
      initialData: () => {
        const playlist = queryClient
          .getQueryData("playlists")
          ?.data.playlists.find((data) => data._id === playlistID);

        if (playlist) {
          return {
            data: {
              playlist: playlist,
            },
          };
        } else {
          return undefined;
        }
      },
    }
  );
};
