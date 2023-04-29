import Header from "./header/Header";
import Hero from "./hero/Hero";
import classes from "@/styles/landing.module.css";

function LandingPage() {
  return (
    <>
      <div className={classes["landing"]}>
        <Header />
        <Hero />
      </div>
    </>
  );
}

export default LandingPage;
