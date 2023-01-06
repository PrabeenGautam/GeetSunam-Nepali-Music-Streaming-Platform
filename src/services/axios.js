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
        pagination: "false",
        limit: "",
        ...otherParams,
      },
      accept: "*/*",
    });

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
    toast.error(
      error?.response?.data.error ||
        error?.response?.data?.message ||
        "Something went wrong, please try again later.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
    return {
      APIFailed: true,
      error: error.response,
    };
  }
};

export default getApiResponse;
