import { Btn } from "components/StyledUI";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

function DeleteModelOverlay({ setClick, data, modalMessage = "Delete" }) {
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
            <MdClose
              style={{ cursor: "pointer", width: 32, height: 32 }}
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

function DeleteModel({ setClick, data, id, modalMessage = "Delete" }) {
  console.log(id);
  return createPortal(
    <DeleteModelOverlay
      setClick={setClick}
      data={data}
      modalMessage={modalMessage}
    />,
    document.getElementById("modal")
  );
}

export default DeleteModel;
