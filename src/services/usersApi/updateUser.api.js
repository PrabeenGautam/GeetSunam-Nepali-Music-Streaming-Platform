import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const updateUserApi = async (formData) => {
  const result = await getApiResponse({
    url: UserAuthConfig.UPDATE_CURRENT_USER(),
    method: "patch",
    data: formData,
    type: "multipart/form-data",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const updateUserPasswordAPI = async ({
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

export default updateUserApi;
