import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const OverlayTrig = (props) => {
  return (
    <OverlayTrigger
      key="top"
      placement={props.placement || "top"}
      overlay={
        <Tooltip id="tooltip-top">
          <div
            style={{
              backgroundColor: "#000000",
              padding: "5px 5px",
              color: "white",
              fontSize: "12px",
              borderRadius: 10,
            }}
          >
            {props.toltip}
          </div>
        </Tooltip>
      }
    >
      <img
        style={{ cursor: "pointer", width: "25px !important" }}
        className={props.class}
        src={props.imagePath}
        alt=" "
        onClick={props.onClick}
      />
    </OverlayTrigger>
  );
};

export default OverlayTrig;
