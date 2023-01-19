import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";

import { Btn } from "@/components/StyledUI";
function DeleteModelOverlay({
  setClick,
  data,
  modalMessage = "Delete",
  deleteHandler,
}) {
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
          style={{
            minWidth: "24rem",
            minHeight: "12rem",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
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
              justifyContent: "flex-end",
            }}>
            <Btn
              style={{ color: "#333", marginRight: 10 }}
              onClick={() => setClick(false)}>
              Cancel
            </Btn>
            <button className="btn btn-play" onClick={deleteHandler}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DeleteModel({
  setClick,
  data,
  modalMessage = "Delete",
  deleteHandler,
}) {
  return createPortal(
    <DeleteModelOverlay
      setClick={setClick}
      data={data}
      modalMessage={modalMessage}
      deleteHandler={deleteHandler}
    />,
    document.getElementById("modal")
  );
}

export default DeleteModel;
