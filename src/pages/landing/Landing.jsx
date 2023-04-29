import Header from "./header/Header";
import Hero from "./hero/Hero";
import classes from "@/styles/landing.module.css";
import Reasons from "./hero/Reasons";
import ChangeTheWay from "./hero/ChangeTheWay";
import ArtistsRegister from "./hero/ArtistsRegister";

function LandingPage() {
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
