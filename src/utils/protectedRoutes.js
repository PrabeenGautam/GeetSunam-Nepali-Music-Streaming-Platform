import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { isUserLogin } from "@/utils/storage.utils";
import { setUserData } from "@/utils/storage.utils";
import VerifyUserToken from "@/services/usersApi/verifyToken.api";
import useGSDispatch from "@/redux/useGSDispatch";
import { resetLogin } from "@/redux/slices/userSlice";
import { useQueryClient } from "react-query";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const dispatch = useGSDispatch();
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const isLoggedIn = isUserLogin();

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
          dispatch(resetLogin());
          queryClient.removeQueries();
          navigate("/login", { replace: true });
        }
      }
    };

    verifyToken();
  }, [isLoggedIn, pathname]);

  if (isLoggedIn) {
    return children;
  } else {
    navigate("/login", { replace: true });
    queryClient.removeQueries();
  }
}

export default ProtectedRoute;
