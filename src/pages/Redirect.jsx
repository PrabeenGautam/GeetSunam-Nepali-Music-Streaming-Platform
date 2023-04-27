import { useNavigate } from "react-router-dom";
import { isUserLogin, resetLoginData } from "@/utils/storage.utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setUserData } from "@/utils/storage.utils";
import VerifyUserToken from "@/services/usersApi/verifyToken.api";

function Redirect() {
  const isLoggedIn = isUserLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async function () {
      if (isLoggedIn) {
        try {
          const response = await VerifyUserToken();

          if (response.status === 200) {
            setUserData(response.user);
            navigate("/home");
          }
        } catch (error) {
          toast.error("Failed verifying user. Try login again.");
          resetLoginData();
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    verifyToken();
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

export default Redirect;
