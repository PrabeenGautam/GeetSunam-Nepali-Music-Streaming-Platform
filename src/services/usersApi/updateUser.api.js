import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const updateUserApi = async ({ fullName, email }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.UPDATE_CURRENT_USER(),
    method: "patch",
    data: {
      fullName,
      email,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default updateUserApi;
