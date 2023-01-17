import { GenreConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const getGenresApi = async () => {
  const result = await getApiResponse({
    url: GenreConfig.GET_GENRES(),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

const getGenresByID = async (id) => {
  const result = await getApiResponse({
    url: GenreConfig.GET_GENRES_BY_ID(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export { getGenresApi, getGenresByID };
