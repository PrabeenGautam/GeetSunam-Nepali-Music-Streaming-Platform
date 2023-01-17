import { PlaylistConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const getPlaylistsAPI = async () => {
  const result = await getApiResponse({
    url: PlaylistConfig.GET_PLAYLISTS_CURRENT_USER(),
    method: "get",
    otherParams: { sort: "createdDate" },
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getPlaylistByID = async (id) => {
  const result = await getApiResponse({
    url: PlaylistConfig.GET_PLAYLIST_BY_ID(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const createPlaylistsAPI = async () => {
  const result = await getApiResponse({
    url: PlaylistConfig.CREATE_PLAYLISTS(),
    method: "post",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const deletePlaylistAPI = async (id) => {
  const result = await getApiResponse({
    url: PlaylistConfig.DELETE_PLAYLIST(id),
    method: "delete",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const updatePlaylistAPI = async (formData, id) => {
  const result = await getApiResponse({
    url: PlaylistConfig.UPDATE_PLAYLIST(id),
    method: "patch",
    data: formData,
    type: "multipart/form-data",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export {
  getPlaylistsAPI,
  getPlaylistByID,
  createPlaylistsAPI,
  deletePlaylistAPI,
  updatePlaylistAPI,
};
