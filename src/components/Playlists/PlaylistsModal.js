import React from "react";
import EditPlaylistsModel from "./EditPlaylistsModal";

function PlaylistsModal({ isEdit, click, setClick, data, id }) {
  if (click) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {isEdit ? (
        <EditPlaylistsModel setClick={setClick} id={id} />
      ) : (
        <DeleteModel setClick={setDeleteClick} data={data} id={id} />
      )}
    </>
  );
}

export default PlaylistsModal;
