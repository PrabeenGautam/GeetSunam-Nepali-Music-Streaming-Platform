import { FavouriteArtistsConfig } from "../api.routes";
import getApiResponse from "../axios";

export const toggleArtistsFavourite = async (id) => {
  const result = await getApiResponse({
    url: FavouriteArtistsConfig.TOGGLE_FAVOURITE_ARTISTS,
    method: "patch",
    data: {
      artists: id,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};
