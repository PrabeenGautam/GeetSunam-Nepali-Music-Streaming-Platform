import { SongConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const getNewReleaseSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default getNewReleaseSongs;
