import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const getAUserApi = async () => {
  const result = await getApiResponse({
    url: UserAuthConfig.GET_A_USER(),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default getAUserApi;
