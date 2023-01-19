import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const deleteUserApi = async () => {
  const result = await getApiResponse({
    url: UserAuthConfig.DELETE_CURRENT_USER(),
    method: "delete",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default deleteUserApi;
