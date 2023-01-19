import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const changePasswordApi = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}) => {
  const result = await getApiResponse({
    url: UserAuthConfig.CHANGE_PASSWORD(),
    method: "patch",
    data: {
      currentPassword,
      newPassword,
      confirmNewPassword,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export default changePasswordApi;
