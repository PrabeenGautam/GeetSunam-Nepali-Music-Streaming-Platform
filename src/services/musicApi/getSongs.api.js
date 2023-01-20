import { SongConfig, FavouriteSongsConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const getAllSongsAPI = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getNewReleaseSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getFavouriteSongs = async () => {
  const result = await getApiResponse({
    url: FavouriteSongsConfig.GET_FAVOURITE_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export { getAllSongsAPI, getNewReleaseSongs, getFavouriteSongs };
