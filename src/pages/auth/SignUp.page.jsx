import { FaMusic } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import userflow from "assets/images/landing/Userflow.gif";
import axios from "axios";

function SignUpPage() {
  const [passwordShown, setPasswordShow] = useState(false);

  const signInDivRef = useRef();
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
    fullname: "",
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
    const { email, password, fullname } = formData;
    const user = { email, password, fullname };
    console.log(user);
    navigate("/home");
  };

  const handleGoogleLogin = useGoogleLogin({
    //Give Access Token
    onSuccess: async (response) => {
      const res = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }
      );

      console.log(res.data);
    },
  });

  return (
    <div className="log-container">
      <div className="land-log">
        <section className="form-section">
          <div className="logo">
            <Link to={"/"} style={{ display: "flex", gap: 10 }}>
              <FaMusic className="logo__music" />
              <div className="logo__text">
                <span className="logo__primary">Geet</span>Sunam
              </div>
            </Link>
          </div>
          <div className="form">
            <div className="title custom-title">Account Signup</div>
            <div className="subtitle">
              Become a member and enjoy exclusive free music
            </div>
            <div className="form-data">
              <form onSubmit={handleSubmit}>
                <div className="input-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    id="full=name"
                    placeholder="John Doe"
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                  />
                </div>

                <div className="input-field password">
                  <label>Password</label>
                  <div className="input-icon-container">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter password"
                      autoComplete="new-password"
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

                <div className="login-btn">
                  <button type="submit" className="login__btn">
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="login-btn">
                <button
                  className="login__google"
                  ref={signInDivRef}
                  onClick={handleGoogleLogin}>
                  <FcGoogle className="icon" /> <span>Sign Up with Google</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="art-section">
          <img src={userflow} />
        </section>
      </div>
    </div>
  );
}

export default SignUpPage;
