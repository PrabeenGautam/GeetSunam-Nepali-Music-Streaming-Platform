import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const forgetPasswordApi = async ({ email = "" }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.FORGET_PASSWORD(),
    method: "post",
    data: {
      email,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default forgetPasswordApi;
