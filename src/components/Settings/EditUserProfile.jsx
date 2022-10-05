import React from "react";
import * as Icons from "react-icons/gi";

function EditUserProfile({ setClick }) {
  return (
    <>
      <div className="model-container">
        <div className="container">
          <div className="header">
            <h2 className="h2">Edit Details</h2>
            <Icons.GiTireIronCross
              style={{ cursor: "pointer" }}
              onClick={() => setClick(false)}
            />
          </div>

          <div className="edit-section">
            <form action="">
              <div className="custom-field " style={{ marginBottom: 20 }}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="" />
              </div>

              <div className="custom-field" style={{ marginBottom: 20 }}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="" />
              </div>

              <button type="submit" className="btn btn-play">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserProfile;
