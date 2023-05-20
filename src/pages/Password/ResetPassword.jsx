import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "@/assets/images/logo.png";

import classes from "@/styles/password.module.css";
import resetPasswordApi from "@/services/authApi/resetPassword.api";
import { setUserLogin } from "@/utils/storage.utils";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setformData] = useState(
    Object.freeze({ password: "", confirmPassword: "" })
  );

  useEffect(() => {
    if (!token) {
      return navigate("/forget-password");
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    const { password, confirmPassword } = formData;

    console.log(formData);
    if (!password || !confirmPassword) {
      return toast.error("Password fields are required");
    }

    if (password !== confirmPassword) {
      return toast.error("Both Password should match!");
    }

    const postData = new FormData();
    postData.append("password", password);
    postData.append("confirmPassword", confirmPassword);

    const response = await resetPasswordApi({ token, data: formData });
    if (response) {
      response.isRememberMe = true;

      setUserLogin(response);
      navigate("/login/verify");
    }
  };

  return (
    <React.Fragment>
      <div className={classes["row"]}>
        <div className={classes["horizontal-container"]}>
          <div className={classes["horizontal-info-container"]}>
            <Link to={"/"} className={classes["logo"]}>
              <img src={logo} alt="set-password" />
            </Link>
            <p className={classes["horizontal-heading"]}>Reset Your Password</p>
            <p className={classes["horizontal-subtitle"]}>
              Your password needs to be at least 8 characters.
            </p>
          </div>
          <form className={classes["horizontal-form"]} onSubmit={handleSubmit}>
            <div className={classes["o3-form-group"]}>
              <label htmlFor="new_password">New Password</label>
              <div className={classes["custom_pass"]}>
                <input
                  className={classes["input"]}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={classes["o3-form-group"]}>
              <label htmlFor="new_password">Confirm New Password</label>
              <div className={classes["custom_pass"]}>
                <input
                  className={classes["input"]}
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button className={classes["btn"]}>Set New Password</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ResetPassword;
