import { FaMusic } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";

import entranceGif from "assets/images/landing/MusicEntrance1.gif";

function LoginPage() {
  const [passwordShown, setPasswordShow] = useState(false);

  const signInDivRef = useRef();
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
    const { email, password } = formData;
    const user = { email, password };
    console.log(user);
    navigate("/home");
  };

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
            <div className="title">Welcome Back</div>
            <div className="subtitle">
              Please enter your contact details to connect.
            </div>
            <div className="form-data">
              <form onSubmit={handleSubmit}>
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
                <div className="section">
                  <Link to="/forgetpassword" className="links">
                    Forget Password?
                  </Link>
                </div>
                <div className="login-btn">
                  <button type="submit" className="login__btn">
                    Log in
                  </button>
                  <button className="login__google" ref={signInDivRef}>
                    <FcGoogle className="icon" />{" "}
                    <span>Log in with Google</span>
                  </button>
                </div>
                <div className="account">
                  <span style={{ fontWeight: 400 }}>
                    Don't have an account?{" "}
                  </span>
                  {"  "}
                  <Link to="/signup">Sign Up Here</Link>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="art-section">
          <img src={entranceGif} />
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
