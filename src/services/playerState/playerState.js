import { PlayerConfig, TrackUserConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";
import axios from "axios";

export const getPlayerState = async () => {
  const result = await getApiResponse({
    url: PlayerConfig.GET_STATE,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const updatePlayerState = async (trackState, token) => {
  // Make call, when user is logged out
  try {
    const result = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_API_BASE_URL}${PlayerConfig.UPDATE_STATE}`,
      data: { trackState },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    return null;
  }
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
