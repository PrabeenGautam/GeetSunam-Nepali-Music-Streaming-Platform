import { useState } from "react";
import { Link } from "react-router-dom";

import classes from "@/styles/landing.module.css";
import logo from "@/assets/images/landing/logo.png";

function Header() {
  const [showToggle, setShowToggle] = useState(false);

  return (
    <header className={classes["header"]}>
      <div className={classes["container"]}>
        <Link to={"/"} className={classes["logo"]}>
          <img src={logo} alt="logo" />
        </Link>
        <nav
          className={`${classes["nav_menu"]} ${
            showToggle ? classes["show-menu"] : ""
          }`}>
          <ul className={classes["nav_list"]}>
            <li onClick={() => setShowToggle(false)}>
              <a
                href="#"
                className={`${classes["nav_link"]} ${classes["active"]}`}>
                Home
              </a>
            </li>

            <li onClick={() => setShowToggle(false)}>
              <a href="#artist" className={`${classes["nav_link"]} `}>
                Artists
              </a>
            </li>

            <li onClick={() => setShowToggle(false)}>
              <Link to="/login" className={classes["nav_link"]}>
                Login
              </Link>
            </li>

            <li onClick={() => setShowToggle(false)}>
              <Link to="/signup" className={classes["nav_link"]}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className={`${classes["nav_toggle"]} ${classes["button"]} ${
            showToggle ? classes["active"] : ""
          }`}
          onClick={() => setShowToggle((prev) => !prev)}>
          <span className={classes["bar1"]} style={{ display: "block" }}></span>
          <span className={classes["bar2"]} style={{ display: "block" }}></span>
          <span className={classes["bar3"]} style={{ display: "block" }}></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
