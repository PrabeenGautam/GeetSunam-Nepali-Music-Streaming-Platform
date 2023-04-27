import { toast } from "react-toastify";
import http from "./http";

const getApiResponse = async ({
  url,
  method = "get",
  type = "application/json",
  data = {},
  otherParams = {},
  displaySuccessMessage = true,
}) => {
  try {
    const myHeader = {
      "Content-Type": type,
    };

    const result = await http({
      method,
      url: `${url}`,
      data,
      headers: myHeader,
      params: {
        ...otherParams,
      },
      accept: "*/*",
    });

    if (result.request.responseURL.includes("offline.html")) {
      throw new Error("Server is down");
    }

    if (method !== "get") {
      if (result.data.message && displaySuccessMessage) {
        toast.success("success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    return result;
  } catch (error) {
    const hasTokenMessage = error?.response?.data?.message
      .toLowerCase()
      .includes("token");

    if (!hasTokenMessage) {
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Something went wrong, please try again later."
      );
    }

    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export default getApiResponse;
