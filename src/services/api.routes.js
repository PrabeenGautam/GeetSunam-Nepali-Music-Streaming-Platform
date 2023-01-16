// This is example just change before using

export const GenreConfig = {
  KEY: "USER",
  GET_GENRES: () => "/api/get-genres",
  ADD_GENRES: () => "/api/add-genres",
  DELETE_GENRE: () => "/api/delete-genre",
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
