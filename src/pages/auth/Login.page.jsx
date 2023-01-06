import { FaMusic } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

import entranceGif from "assets/images/landing/MusicEntrance2.gif";

import useGSDispatch from "redux/useGSDispatch";
import useGSSelector from "redux/useGSSelector";
import { loginUserThunk } from "redux/middlewares/loginUserThunk";

function LoginPage() {
  const gsDispatch = useGSDispatch();
  const loginStatus = useGSSelector((state) => state.userState.loginStatus);

  const [passwordShown, setPasswordShow] = useState(false);
  const { t, i18n } = useTranslation("translation", { keyPrefix: "login" });

  const signInDivRef = useRef();
  const navigate = useNavigate();

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState(initialFormData);

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const decode = jwtDecode(credentialResponse.credential);
      console.log(decode);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    gsDispatch(
      loginUserThunk({
        email,
        password,
      })
    );
  };

  const handleGoogleLogin = useGoogleLogin({
    //Give Access Token
    onSuccess: (tokenResponse) => console.log(tokenResponse),
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
            defaultValue={localStorage.getItem("i18nextLng")}
          >
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
                      }}
                    >
                      {!passwordShown ? <FiEye /> : <FiEyeOff />}
                    </div>
                  </div>
                </div>
                <div className="section">
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
                  onClick={handleGoogleLogin}
                >
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
