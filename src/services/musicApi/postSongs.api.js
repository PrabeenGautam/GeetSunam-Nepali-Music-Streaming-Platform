import { FavouriteSongsConfig } from "../api.routes";
import getApiResponse from "../axios";

export const toggleSongsFavourite = async (id) => {
  const result = await getApiResponse({
    url: FavouriteSongsConfig.TOGGLE_FAVOURITE_SONGS,
    method: "post",
    data: {
      songs: id,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};
