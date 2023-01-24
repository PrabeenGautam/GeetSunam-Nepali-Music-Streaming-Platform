import { FaMusic } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import entranceGif from "@/assets/images/landing/MusicEntrance2.gif";

import useGSDispatch from "@/redux/useGSDispatch";
import useGSSelector from "@/redux/useGSSelector";
import {
  loginUserThunk,
  googleLoginUserThunk,
} from "@/redux/middlewares/loginUserThunk";

function LoginPage() {
  const gsDispatch = useGSDispatch();
  const loginStatus = useGSSelector((state) => state.userState.loginStatus);

  const [passwordShown, setPasswordShow] = useState(false);

  const { t, i18n } = useTranslation("translation", { keyPrefix: "login" });
  document.documentElement.lang = i18n.language;

  const signInDivRef = useRef();
  const checkboxRef = useRef();

  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Login in. Have a patience");
    const { email, password } = formData;

    gsDispatch(
      loginUserThunk({
        email,
        password,
        isRememberMe: checkboxRef.current.checked,
      })
    ).then(() => {
      toast.dismiss();
    });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (data) => {
      toast.info("Login in. Have a patience");

      gsDispatch(
        googleLoginUserThunk({
          googleAccessToken: data.access_token,
        })
      ).then(() => {
        toast.dismiss();
      });
    },
    onError: (err) => console.log(err),
  });

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    if (loginStatus) {
      navigate("/home", { replace: false });
    }
  }, [loginStatus, navigate]);

  return (
    <div className="log-container">
      <div className="nav-section">
        <div className="logo">
          <Link to={"/"} style={{ display: "flex", gap: 10 }}>
            <FaMusic className="logo__music" />
            <div className="logo__text">
              <span className="logo__primary">Geet</span>Sunam
            </div>
          </Link>
        </div>
        <div className="languages">
          <select
            onChange={handleLanguage}
            defaultValue={localStorage.getItem("i18nextLng")}>
            <option value="en">English (English)</option>
            <option value="np">नेपाली (Nepali)</option>
          </select>
        </div>
      </div>

      <div className="land-log">
        <section className="form-section">
          <div className="form">
            <div className="title">{t("welcome")}</div>
            <div className="subtitle">{t("subtitle")}</div>
            <div className="form-data">
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>{t("email")}</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field password">
                  <label>{t("password")}</label>
                  <div className="input-icon-container">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      onChange={handleChange}
                    />
                    <div
                      className="eye-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setPasswordShow(!passwordShown);
                      }}>
                      {!passwordShown ? <FiEye /> : <FiEyeOff />}
                    </div>
                  </div>
                </div>
                <div className="section custom-section">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      value="lsRememberMe"
                      id="rememberMe"
                      ref={checkboxRef}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                  </div>
                  <Link to="/forgetpassword" className="links">
                    {t("forgetPassword")}
                  </Link>
                </div>
                <div className="login-btn">
                  <button type="submit" className="login__btn">
                    {t("login")}
                  </button>
                </div>
              </form>
              <div className="login-btn">
                <button
                  className="login__google"
                  ref={signInDivRef}
                  onClick={handleGoogleLogin}>
                  <FcGoogle className="icon" /> <span>{t("googleLogin")}</span>
                </button>
              </div>
              <div className="account">
                <span style={{ fontWeight: 400 }}>{t("account")}</span>
                {"  "}
                <Link to="/signup">{t("signUp")}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="art-section">
          <img src={entranceGif} alt="entrancegif" />
        </section>
      </div>
    </div>
  );
}

export default LoginPage;

// const { t } = useTranslation("translation", { keyPrefix: "homePage" });
