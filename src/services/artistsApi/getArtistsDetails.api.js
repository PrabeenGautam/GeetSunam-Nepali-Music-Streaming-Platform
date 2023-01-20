import {
  ArtistsConfig,
  UserAuthConfig,
  SongConfig,
  FavouriteArtistsConfig,
} from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const getFeaturedArtists = async () => {
  const result = await getApiResponse({
    url: ArtistsConfig.FEATURED_ARTISTS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getArtistsAPI = async () => {
  const result = await getApiResponse({
    url: ArtistsConfig.GET_ARTISTS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getArtistsById = async (id) => {
  const result = await getApiResponse({
    url: ArtistsConfig.GET_ARTISTS_BY_ID(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getArtistsSongs = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONG_BY_ARTISTS(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getFavouriteArtists = async () => {
  const result = await getApiResponse({
    url: FavouriteArtistsConfig.GET_FAVOURITE_ARTISTS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export {
  getFeaturedArtists,
  getArtistsById,
  getArtistsSongs,
  getArtistsAPI,
  getFavouriteArtists,
};
