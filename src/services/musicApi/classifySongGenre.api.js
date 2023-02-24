import { SongConfig } from "../api.routes";
import httpML from "../http.ml";

export const classifySongGenreApi = async ({ songId }) => {
  const result = await httpML({
    url: SongConfig.CLASSIFY_SONG_GENRE(songId),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};
