import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const getUsersApi = async () => {
  const result = await getApiResponse({
    url: UserAuthConfig.GET_USERS(),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default getUsersApi;
