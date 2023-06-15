import Header from "./header/Header";
import Hero from "./hero/Hero";
import classes from "@/styles/landing.module.css";
import Reasons from "./hero/Reasons";
import ChangeTheWay from "./hero/ChangeTheWay";
import ArtistsRegister from "./hero/ArtistsRegister";
import { useEffect } from "react";
import useGSSelector from "@/redux/useGSSelector";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const loginStatus = useGSSelector((state) => state.userState.loginStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus) {
      const timer = setTimeout(() => {
        navigate("/login/verify", { replace: false });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loginStatus, navigate]);
  return (
    <>
      <div className={classes["landing"]}>
        <Header />
        <Hero />
        <Reasons />
        <ArtistsRegister />
        <ChangeTheWay />
      </div>
    </>
  );
}

export default LandingPage;
