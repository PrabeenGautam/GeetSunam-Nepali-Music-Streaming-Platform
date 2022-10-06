import axios from "axios";

import { GenreConfig } from "@services/api.routes";

// example
const getGenreApi = async () => {
  const genreDataResponse = await axios.get(GenreConfig.GET_GENRES()); // !using default axios instance, will be changed to customAxios intance
  return genreDataResponse.data;
};

export default getGenreApi;
