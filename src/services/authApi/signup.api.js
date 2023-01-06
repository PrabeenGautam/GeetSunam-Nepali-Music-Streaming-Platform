import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const signUpApi = async ({ email = "", password = "" }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.SIGN_UP(),
    method: "post",
    data: {
      email,
      password,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default signUpApi;
