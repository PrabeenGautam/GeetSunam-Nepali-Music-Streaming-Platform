import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isUserLogin } from "@/utils/storage.utils";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = isUserLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
      return;
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
