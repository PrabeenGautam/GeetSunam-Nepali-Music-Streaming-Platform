import { SongConfig } from "../api.routes";
import httpML from "../http.ml";

export const recommendSongBasedOnCurrent = async (songId) => {
  const result = await httpML({
    url: SongConfig.RECOMMEND_SONG_BASED_ON_CURRENT(songId),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};
