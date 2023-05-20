import React, { useState } from "react";
import { toast } from "react-toastify";

import refImage from "@/assets/images/logo.png";
import classes from "@/styles/password.module.css";
import { Link } from "react-router-dom";
import forgetPasswordApi from "@/services/authApi/forgetPassword.api";

function ForgetPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShow(true);
    if (!email) {
      return toast.error("Email field is required!");
    }

    event.target.reset();

    await forgetPasswordApi({ email });
  };
  return (
    <React.Fragment>
      <div className={classes["row"]}>
        <div className={classes["horizontal-container"]}>
          <div className={classes["horizontal-info-container"]}>
            <Link to={"/"} className={classes["logo"]}>
              <img src={refImage} alt="set-password" />
            </Link>
            <p className={classes["horizontal-heading"]}>
              Forget Your Password?
            </p>
            <p className={classes["horizontal-subtitle"]}>
              Just provide your email and we can do the rest.
            </p>
          </div>
          <form className={classes["horizontal-form"]} onSubmit={handleSubmit}>
            {show && (
              <div className={classes["reset-message"]}>
                If the email provided is correct, you will get reset password
                link soon.
              </div>
            )}
            <div className={classes["o3-form-group"]}>
              <label htmlFor={classes["new_password"]}>Email</label>
              <div className={classes["custom_pass"]}>
                <input
                  className={classes["input"]}
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className={classes["btn"]}>Send Email</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ForgetPassword;
