import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLogin, getUserData } from "utils/storage.utils";

const ProtectedRoute = ({ children, setDashBoard }) => {
  const isLoggedIn = isUserLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }

    const authUser = getUserData();
    if (authUser?.role === "artists") {
      setDashBoard(true);
    }
  }, [isLoggedIn, navigate, setDashBoard]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
