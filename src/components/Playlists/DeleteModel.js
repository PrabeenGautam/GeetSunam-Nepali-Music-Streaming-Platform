import { Btn } from "components/StyledUI";
import { GiTireIronCross } from "react-icons/gi";

function DeleteModel({ setClick, data, id, modalMessage = "Delete" }) {
  console.log(id);
  return (
    <>
      <div className="model">
        <div
          className="model-container"
          onClick={() => {
            setClick(false);
          }}></div>
        <div
          className="container"
          style={{ minWidth: "24rem", maxWidth: "25rem", zIndex: 9999 }}>
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
