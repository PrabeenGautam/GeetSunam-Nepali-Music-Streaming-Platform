import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const userLoginApi = async ({ email = "", password = "" }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.LOGIN(),
    method: "post",
    data: {
      email,
      password,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default userLoginApi;
