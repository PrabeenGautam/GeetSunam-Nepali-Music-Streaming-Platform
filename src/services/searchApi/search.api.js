import { SearchConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

export const searchApi = async (searchQuery) => {
  const result = await getApiResponse({
    url: SearchConfig.SEARCH_QUERY,
    method: "get",
    otherParams: {
      query: searchQuery,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const searchSongsApi = async (searchQuery) => {
  const result = await getApiResponse({
    url: SearchConfig.SEARCH_SONG,
    method: "get",
    otherParams: {
      query: searchQuery,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const searchArtistsApi = async (searchQuery) => {
  const result = await getApiResponse({
    url: SearchConfig.SEARCH_ARTIST,
    method: "get",
    otherParams: {
      query: searchQuery,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const searchPlaylistsApi = async (searchQuery) => {
  const result = await getApiResponse({
    url: SearchConfig.SEARCH_PLAYLIST,
    method: "get",
    otherParams: {
      query: searchQuery,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};
