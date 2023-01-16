import { UserAuthConfig } from "services/api.routes";
import getApiResponse from "services/axios";

const signUpApi = async ({
  email = "",
  password = "",
  fullname = "",
  confirmPassword = "",
}) => {
  const result = await getApiResponse({
    url: UserAuthConfig.SIGN_UP(),
    method: "post",
    data: {
      email,
      password,
      fullname,
      confirmPassword,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export { signUpApi };
