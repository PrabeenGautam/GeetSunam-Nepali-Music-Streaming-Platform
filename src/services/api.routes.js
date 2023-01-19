// This is example just change before using

export const GenreConfig = {
  KEY: "USER",
  GET_GENRES: () => "/genre",
  GET_GENRES_BY_ID: (id) => `/genre/${id}`,
  ADD_GENRES: () => "/genre",
  DELETE_GENRE: () => "/genre",
};

export const PlaylistConfig = {
  KEY: "PLAYLIST",
  GET_PLAYLISTS: () => "/playlists",
  GET_PLAYLISTS_CURRENT_USER: () => "/playlists/current-user",
  CREATE_PLAYLISTS: () => "/playlists/create",
  GET_PLAYLIST_BY_ID: (id) => `/playlists/${id}`,
  DELETE_PLAYLIST: (id) => `/playlists/${id}`,
  UPDATE_PLAYLIST: (id) => `/playlists/${id}`,
  ADD_SONGS_TO_PLAYLIST: (id) => `/playlists/add-songs/${id}`,
  REMOVE_SONG_FROM_PLAYLIST: (id) => `/playlists/remove-songs/${id}`,
};

export const SongConfig = {
  KEY: "SONG",
  GET_SONGS: "/songs",
  FEATURED_SONGS: "/songs/featured",
};

export const UserAuthConfig = {
  key: "USER-AUTH",
  SIGN_UP: () => "/users/signup",
  LOGIN: () => "/users/login",
  GOOGLE_LOGIN: () => "/users/google-login",
  GOOGLE_SIGNUP: () => "/users/google-signup",
  FORGET_PASSWORD: () => "/users/forget-password",
  RESET_PASSWORD: (token) => `/users/reset-password/${token}`,

  GET_USERS: () => "/users",
  GET_A_USER: (id) => `/users/${id}`,
  CHANGE_PASSWORD: () => "/change-password",
  UPDATE_CURRENT_USER: () => `/update-current-user`,
  DELETE_CURRENT_USER: () => `/delete-current-user`,
};
