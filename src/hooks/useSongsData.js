import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getSongsByID } from "./../services/musicApi/getSongs.api";

export const useSongsData = (songsId) => {
  const currentSong = useSelector(
    (state) => state.playlist[state.currentTrack]
  );

  return useQuery(["songs", songsId], () => getSongsByID(songsId), {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
    initialData: () => {
      if (currentSong.ID) {
        return {
          data: {
            songs: currentSong,
          },
        };
      } else {
        return undefined;
      }
    },
  });
};
