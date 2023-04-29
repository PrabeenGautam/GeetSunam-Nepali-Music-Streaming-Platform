import { Link, useNavigate } from "react-router-dom";
import { Btn } from "@/components/StyledUI";
import classes from "@/styles/change.module.css";
import logo from "@/assets/images/landing/logo.png";

function ChangeTheWay() {
  const navigate = useNavigate();

  return (
    <section id={classes["change-way"]}>
      <div className={classes["heading"]}>
        <p>Change The Way You Listen To Music</p>
      </div>
      <Btn className={classes["button"]} onClick={() => navigate("/signup")}>
        Create Account
      </Btn>
      <div className={classes["footer"]}>
        <Link to={"/"} className={classes["logo"]}>
          <img src={logo} alt="logo" />
        </Link>

        <div id={classes["back"]} onClick={() => scrollTo(0, 0)}>
          Back To Top
        </div>
      </div>
    </section>
  );
}

export default ChangeTheWay;
