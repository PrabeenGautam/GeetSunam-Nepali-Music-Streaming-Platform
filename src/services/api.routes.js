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
  NEW_RELEASES: "/songs/new-releases",
  UPLOAD_SONG: "/songs/upload",
  RECOMMENDATION: "/users/songs/recommend",
  GET_SONGS_BY_CURRENT_USER: `/songs/current-user`,
  GET_RECENTLY_PLAYED_SONG: "/users/songs/recent-play",
  GET_TRENDING_SONG: "/songs/trending",
  GET_RANDOM_SONG: "/songs/random",

  GET_SONGS_BY_ID: (id) => `/songs/${id}`,
  UPDATE_SONGS: (id) => `/songs/${id}`,
  DELETE_SONGS: (id) => `/songs/${id}`,
  GET_SONG_BY_ARTISTS: (id) => `/songs/artists/${id}`,
  GET_SONG_BY_GENRES: (id) => `/songs/genres/${id}`,
  CLASSIFY_SONG_GENRE: (songId) => `/song/predict-class/${songId}`,
  RECOMMEND_SONG_BASED_ON_CURRENT: (songId) =>
    `/song/recommend-top-n-songs/${songId}`,
  CLASSIFICATION_SSE_STREAM: (songId) =>
    `${
      import.meta.env.VITE_API_BASE_URL
    }/songs/${songId}/shared-genre-classification-stream`,
};

export const PlayerConfig = {
  KEY: "PLAYER",
  GET_STATE: "/player/state/get",
  UPDATE_STATE: "/player/state/save",
};

export const TrackUserConfig = {
  KEY: "PLAYER_HISTORY",
  UPDATE_STATE: "/users/songs/track",
};

export const ArtistsConfig = {
  KEY: "ARTIST",
  GET_ARTISTS: "/artists",
  FEATURED_ARTISTS: "/artists/featured",

  GET_ARTISTS_BY_ID: (id) => `/artists/${id}`,
  MAKE_ARISTS_FEATURED: (id) => `/artists/${id}`,
  MAKE_USER_ARTISTS: (id) => `/artists/create/${id}`,
};

export const SearchConfig = {
  KEY: "SEARCH",
  SEARCH_QUERY: "/search",
  SEARCH_SONG: "/search/songs",
  SEARCH_ARTIST: "/search/artists",
  SEARCH_PLAYLIST: "/search/playlists",
};

export const FavouriteSongsConfig = {
  KEY: "FAVOURITE-SONGS",
  GET_FAVOURITE_SONGS: "/favourite/songs",
  ADD_FAVOURITE_SONGS: "/favourite/songs",
  REMOVE_FAVOURITE_SONGS: "/favourite/songs",
  TOGGLE_FAVOURITE_SONGS: "/favourite/songs/toggle",
};

export const FavouriteArtistsConfig = {
  KEY: "FAVOURITE-ARTISTS",
  GET_FAVOURITE_ARTISTS: "/favourite/artists",
  ADD_FAVOURITE_ARTISTS: "/favourite/artists",
  REMOVE_FAVOURITE_ARTISTS: "/favourite/artists",
  TOGGLE_FAVOURITE_ARTISTS: "/favourite/artists/toggle",
};

export const UserAuthConfig = {
  key: "USER-AUTH",
  SIGN_UP: () => "/users/signup",
  LOGIN: () => "/users/login",
  GOOGLE_LOGIN: () => "/users/google",
  GOOGLE_SIGNUP: () => "/users/google",
  FORGET_PASSWORD: () => "/users/forget-password",
  RESET_PASSWORD: (token) => `/users/reset-password/${token}`,

  GET_USERS: () => "/users",
  GET_A_USER: (id) => `/users/${id}`,
  CHANGE_PASSWORD: () => "/users/change-password",
  UPDATE_CURRENT_USER: () => `/users/update-current-user`,
  DELETE_CURRENT_USER: () => `/users/delete-current-user`,
};
