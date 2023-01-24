import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import EditUserProfile from "@/components/Settings/EditUserProfile";
import { Btn } from "@/components/StyledUI";
import useGSSelector from "@/redux/useGSSelector";
import { useNavigate } from "react-router-dom";
import useGSDispatch from "@/redux/useGSDispatch";
import { updateUserPasswordAPI } from "@/services/usersApi/updateUser.api";
import { resetLogin } from "@/redux/slices/userSlice";

function Settings() {
  const [click, setClick] = useState(false);
  const { i18n } = useTranslation();
  document.documentElement.lang = i18n.language;

  const auth = useGSSelector((state) => state.userState.userData);
  const navigate = useNavigate();
  const dispatch = useGSDispatch();

  const [formData, setFormData] = useState(
    Object.freeze({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    })
  );

  const languageRef = useRef();

  const handleFormData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    const response = await updateUserPasswordAPI(formData);
    if (response) {
      dispatch(resetLogin());
      navigate("/login");
    }
  };

  return (
    <div className="content-container">
      {click && <EditUserProfile setClick={setClick} profile={auth} />}
      <CustomBreadcrumbs link={"/settings"} textName="Settings" />
      <h2 style={{ color: "#f6f6f6", marginBottom: 40 }}>Settings</h2>
      <div className="settings-section">
        <h3>Language</h3>
        <div className="grid gap-sm languages languages-grid">
          Choose language - Changes will be applied after restarting the web
          <select
            onChange={handleLanguage}
            defaultValue={localStorage.getItem("i18nextLng")}
            ref={languageRef}>
            <option value="en">English (English)</option>
            <option value="np">नेपाली (Nepali)</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h3>Account Overview</h3>
        <table className="table">
          <tbody>
            <tr className="table-row">
              <td>Username</td>
              <td>{auth.fullname}</td>
            </tr>
            <tr className="table-row">
              <td>Email</td>
              <td>{auth.email}</td>
            </tr>
          </tbody>
        </table>
        <Btn
          onClick={() => setClick(true)}
          style={{
            backgroundColor: "hsla(0, 0%, 100%, 0.7)",
            width: "150px",
            color: "#333",
          }}>
          Edit Profile
        </Btn>
      </div>

      <div className="settings-section">
        <h3>Change Password</h3>
        <form onSubmit={passwordChangeHandler}>
          <div className="form">
            <div>
              <label htmlFor="current-password">Current Password</label>
              <input
                type="text"
                name="currentPassword"
                onChange={handleFormData}
              />
            </div>
            <div>
              <label htmlFor="current-password">New password</label>
              <input
                type="password"
                name="newPassword"
                autoComplete="new-password"
                onChange={handleFormData}
              />
            </div>
            <div>
              <label htmlFor="current-password">Repeat new password</label>
              <input
                type="password"
                name="confirmNewPassword"
                autoComplete="new-password"
                onChange={handleFormData}
              />
            </div>
          </div>
          <Btn
            style={{
              backgroundColor: "hsla(0, 0%, 100%, 0.7)",
              width: "200px",
              color: "#333",
            }}>
            Set New Password
          </Btn>
        </form>
      </div>
    </div>
  );
}

export default Settings;
