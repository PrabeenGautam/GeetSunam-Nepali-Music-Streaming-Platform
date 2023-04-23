import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import EditUserProfile from "@/components/Settings/EditUserProfile";
import useGSSelector from "@/redux/useGSSelector";
import useGSDispatch from "@/redux/useGSDispatch";
import { updateUserPasswordAPI } from "@/services/usersApi/updateUser.api";
import { resetLogin } from "@/redux/slices/userSlice";

function Settings() {
  const [click, setClick] = useState(false);
  const { i18n, t } = useTranslation("translation", {
    keyPrefix: "settingsPage",
  });
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
      <h2 style={{ color: "#f6f6f6", marginBottom: 40 }}>{t("settings")}</h2>
      <div className="settings-section">
        <h3>{t("language")}</h3>
        <div className="grid gap-sm languages languages-grid">
          {t("description")}
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
        <h3>{t("accountOverview")}</h3>
        <table className="table">
          <tbody>
            <tr className="table-row">
              <td>{t("username")}</td>
              <td>{auth.fullname}</td>
            </tr>
            <tr className="table-row">
              <td>{t("email")}</td>
              <td>{auth.email}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn" onClick={() => setClick(true)}>
          {t("editProfile")}
        </button>
      </div>

      <div className="settings-section">
        <h3>{t("changePassword")}</h3>
        <form onSubmit={passwordChangeHandler} className="password-form">
          <div className="form">
            <div>
              <label htmlFor="current-password">{t("currentPassword")}</label>
              <input
                type="text"
                name="currentPassword"
                onChange={handleFormData}
                placeholder={t("currentPasswordDesc")}
              />
            </div>
            <div>
              <label htmlFor="current-password">{t("newPassword")}</label>
              <input
                type="password"
                name="newPassword"
                autoComplete="new-password"
                onChange={handleFormData}
                placeholder={t("newPasswordDesc")}
              />
            </div>
            <div>
              <label htmlFor="current-password">{t("reNewPassword")}</label>
              <input
                type="password"
                name="confirmNewPassword"
                autoComplete="new-password"
                onChange={handleFormData}
                placeholder={t("reNewPasswordDesc")}
              />
            </div>
          </div>
          <button className="btn">{t("setNewPassword")}</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
