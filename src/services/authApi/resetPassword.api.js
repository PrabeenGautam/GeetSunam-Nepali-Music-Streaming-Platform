import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const resetPasswordApi = async (token = "") => {
  const result = await getApiResponse({
    url: UserAuthConfig.RESET_PASSWORD(token),
    method: "post",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default resetPasswordApi;
