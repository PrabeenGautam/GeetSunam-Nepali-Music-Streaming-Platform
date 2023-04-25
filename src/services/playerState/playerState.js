import { PlayerConfig, TrackUserConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

export const getPlayerState = async () => {
  const result = await getApiResponse({
    url: PlayerConfig.GET_STATE,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const postUserPlayHistory = async (songID) => {
  const result = await getApiResponse({
    url: TrackUserConfig.UPDATE_STATE,
    method: "patch",
    data: {
      id: songID,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};
