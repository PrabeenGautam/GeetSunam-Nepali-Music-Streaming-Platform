import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";

import { getToken, isUserLogin } from "@/utils/storage.utils";
import { setUserData } from "@/utils/storage.utils";
import VerifyUserToken from "@/services/usersApi/verifyToken.api";
import useGSDispatch from "@/redux/useGSDispatch";
import { resetLogin } from "@/redux/slices/userSlice";
import { updatePlayState } from "./playerState.utils";
import ActionCreators from "@/react-mui-player/redux/actionCreators";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const dispatchGS = useGSDispatch();
  const dispatch = useDispatch();

  const isLoggedIn = isUserLogin();
  const token = getToken();

  function logoutHandler() {
    dispatch(ActionCreators.stop());
    updatePlayState(token);
    queryClient.removeQueries();
    dispatchGS(resetLogin());
    navigate("/login");
  }

  useEffect(() => {
    const verifyToken = async function () {
      if (isLoggedIn) {
        try {
          const response = await VerifyUserToken();

          if (response.status === 200) {
            setUserData(response.user);
          } else {
            throw new Error("Failed verifying user.");
          }
        } catch (error) {
          toast.error("Failed verifying user. Try login again.");
          logoutHandler();
        }
      }
    };

    verifyToken();
  }, [isLoggedIn, pathname]);

  if (isLoggedIn) {
    return children;
  } else {
    logoutHandler();
  }
}

export default ProtectedRoute;
