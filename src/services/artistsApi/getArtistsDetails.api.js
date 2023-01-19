import {
  ArtistsConfig,
  UserAuthConfig,
  SongConfig,
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

const getArtistsById = async (id) => {
  const result = await getApiResponse({
    url: UserAuthConfig.GET_A_USER(id),
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

export { getFeaturedArtists, getArtistsById, getArtistsSongs };
