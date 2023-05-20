import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const resetPasswordApi = async ({ token = "", data }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.RESET_PASSWORD(token),
    method: "patch",
    data,
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default resetPasswordApi;
