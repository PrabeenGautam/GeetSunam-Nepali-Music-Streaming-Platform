import axios from "axios";
import { getToken } from "@/utils/storage.utils";

async function VerifyUserToken() {
  const token = getToken();

  const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}/users/verify-token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}

export default VerifyUserToken;
