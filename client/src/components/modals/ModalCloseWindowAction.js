import React from "react";


import OverlayTrig from "../overLay/OverlayTrig";

function ModalCloseWindowAction(props) {
 



  return (
    <span>
      <OverlayTrig
        imagePath="https://img.icons8.com/ultraviolet/40/cancel.png"
        toltip="Zamknij panel"
        onClick={(e) => {
         props.closeAction();
        }}
      />
    </span>
  );
}
export default ModalCloseWindowAction;
