import { PlayerConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

export const getPlayerState = async () => {
  const result = await getApiResponse({
    url: PlayerConfig.GET_STATE,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};
