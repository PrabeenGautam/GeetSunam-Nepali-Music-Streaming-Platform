import { UserAuthConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

const signUpApi = async ({
  email = "",
  password = "",
  fullname = "",
  confirmPassword = "",
  role = "user",
}) => {
  const result = await getApiResponse({
    url: UserAuthConfig.SIGN_UP(),
    method: "post",
    data: {
      email,
      password,
      fullname,
      confirmPassword,
      role,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

const googleSignUpApi = async ({ googleAccessToken, role }) => {
  const result = await getApiResponse({
    url: UserAuthConfig.GOOGLE_SIGNUP(),
    method: "post",
    data: {
      googleAccessToken,
      role,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export { signUpApi, googleSignUpApi };
