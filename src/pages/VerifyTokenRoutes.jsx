import { useNavigate } from "react-router-dom";
import { isUserLogin } from "@/utils/storage.utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setUserData } from "@/utils/storage.utils";
import VerifyUserToken from "@/services/usersApi/verifyToken.api";
import { resetLogin } from "@/redux/slices/userSlice";
import useGSDispatch from "@/redux/useGSDispatch";

function VerifyTokenRoutes() {
  const isLoggedIn = isUserLogin();
  const navigate = useNavigate();
  const dispatch = useGSDispatch();

  useEffect(() => {
    const verifyToken = async function () {
      if (isLoggedIn) {
        try {
          const response = await VerifyUserToken();

          if (response.status === 200) {
            setUserData(response.user);

            const timer = setTimeout(() => {
              navigate("/home");
            }, [1000]);

            return timer;
          }
        } catch (error) {
          toast.error("Failed verifying user. Try login again.");

          const timer = setTimeout(() => {
            dispatch(resetLogin());
            navigate("/login");
          }, [1000]);

          return timer;
        }
      } else {
        navigate("/login");
      }
    };

    const timer = verifyToken();

    if (timer) {
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div
      className="flex-center"
      style={{ height: "100vh", flexDirection: "column", gap: 20 }}>
      <div className="lds-dual-ring custom-ring"></div>
      <h3 className="mt-20">Logging user In. Please wait.</h3>
    </div>
  );
}

export default VerifyTokenRoutes;
