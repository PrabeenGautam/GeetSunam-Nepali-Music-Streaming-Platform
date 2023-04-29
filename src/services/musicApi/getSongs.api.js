import { SongConfig, FavouriteSongsConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

export const getAllSongsAPI = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getPaginatedSongsAPI = async ({ page = 1, limit = 10 }) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
    otherParams: {
      page,
      limit,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getNewReleaseSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
    otherParams: { sort: "-uploadedDate" },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getNewReleaseLimitedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
    otherParams: {
      sort: "-uploadedDate",
      limit: 10,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRecommendedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.RECOMMENDATION,
    method: "get",
    otherParams: {
      limit: 10,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getFavouriteSongs = async () => {
  const result = await getApiResponse({
    url: FavouriteSongsConfig.GET_FAVOURITE_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getSongsByID = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS_BY_ID(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRecentlyPlayedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_RECENTLY_PLAYED_SONG,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getTrendingSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_TRENDING_SONG,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getCurrentUserSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS_BY_CURRENT_USER,
    method: "get",
    otherParams: {
      limit: 50,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRandomSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_RANDOM_SONG,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const deleteCurrentUserSong = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.DELETE_SONGS(id),
    method: "delete",
  });

  if (result.APIFailed) return null;
  return result.data;
};
