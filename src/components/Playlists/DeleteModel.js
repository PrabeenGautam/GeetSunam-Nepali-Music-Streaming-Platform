import { Btn } from "components/StyledUI";
import { GiTireIronCross } from "react-icons/gi";

function DeleteModel({ setClick, data, id, modalMessage = "Delete" }) {
  console.log(id);
  return (
    <>
      <div className="model-container">
        <div
          className="container"
          style={{ minWidth: "24rem", maxWidth: "25rem" }}
        >
          <div className="header">
            <h2 className="h2">{`${modalMessage} ${data} ?`}</h2>
            <GiTireIronCross
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
            }}
          >
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
