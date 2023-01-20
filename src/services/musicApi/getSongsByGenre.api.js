import { SongConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const getSongsByGenre = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONG_BY_GENRES(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default getSongsByGenre;
