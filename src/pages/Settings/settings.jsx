import CustomBreadcrumbs from "components/Breadcrumbs";
import { Btn } from "components/StyledUI";
import React from "react";

function Settings() {
  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/settings"} textName="Settings" />
      <h2 style={{ color: "#f6f6f6", marginBottom: 40 }}>Settings</h2>
      <div className="settings-section">
        <h3>Language</h3>
        <div className="grid gap-sm languages">
          Choose language - Changes will be applied after restarting the web
          <select defaultValue="en">
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
              <td>PrabinGautam</td>
            </tr>
            <tr className="table-row">
              <td>Email</td>
              <td>prabeen122@gmail.com</td>
            </tr>
            <tr className="table-row">
              <td>Country or Region</td>
              <td>Nepal</td>
            </tr>
          </tbody>
        </table>
        <Btn
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
        <form>
          <div className="form">
            <div>
              <label htmlFor="current-password">Current Password</label>
              <input type="text" name="current-password" />
            </div>
            <div>
              <label htmlFor="current-password">New password</label>
              <input
                type="password"
                name="new-password"
                autocomplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="current-password">Repeat new password</label>
              <input
                type="password"
                name="repeat-password"
                autocomplete="new-password"
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
