import { FavouriteSongsConfig, SongConfig } from "../api.routes";
import getApiResponse from "../axios";

export const toggleSongsFavourite = async (id) => {
  const result = await getApiResponse({
    url: FavouriteSongsConfig.TOGGLE_FAVOURITE_SONGS,
    method: "patch",
    data: {
      songs: id,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const uploadSongs = async (formData) => {
  const result = await getApiResponse({
    url: SongConfig.UPLOAD_SONG,
    method: "post",
    data: formData,
    type: "multipart/form-data",
  });

  if (result.APIFailed) return null;
  return result.data;
};
