import React from "react";
import { createPortal } from "react-dom";

function Loading() {
  return createPortal(
    <div className="spinner-container">
      <div className="spinner">
        <div className="r1"></div>
        <div className="r2"></div>
        <div className="r3"></div>
        <div className="r4"></div>
        <div className="r5"></div>
      </div>
    </div>,
    document.getElementById("loading")
  );
}

export default Loading;
