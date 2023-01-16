import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const googleLoginApi = async ({ googleAccessToken }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.GOOGLE_LOGIN(),
    method: "post",
    data: {
      googleAccessToken,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default googleLoginApi;
