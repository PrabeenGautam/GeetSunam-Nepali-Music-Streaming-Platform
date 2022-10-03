import { Btn } from "components/StyledUI";
import React from "react";
import * as Icons from "react-icons/gi";

function DeleteModel({ setClick, data, id }) {
  console.log(id);
  return (
    <>
      <div className="model-container">
        <div className="container" style={{ width: "24rem" }}>
          <div className="header">
            <h2>{`Delete ${data} ?`}</h2>
            <Icons.GiTireIronCross
              style={{ cursor: "pointer" }}
              onClick={() => setClick(false)}
            />
          </div>

          <div
            className="response"
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "space-evenly",
            }}>
            <Btn style={{ color: "#333" }} onClick={() => setClick(false)}>
              Cancel
            </Btn>
            <button className="btn btn-play">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModel;
