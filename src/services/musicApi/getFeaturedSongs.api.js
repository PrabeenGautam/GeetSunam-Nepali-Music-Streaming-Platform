import { SongConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const getFeaturedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.FEATURED_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default getFeaturedSongs;
