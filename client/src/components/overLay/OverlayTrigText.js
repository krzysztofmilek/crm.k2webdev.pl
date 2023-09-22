import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const OverlayTrigText = (props) => {

  return (
    <OverlayTrigger 
    key="top"
    placement="top"
    style={{
           
       cursor: 'pointer',
  
    }}
    overlay={
      <Tooltip id="tooltip-top" >
      {props.toltip}
      </Tooltip>
    }
  >
    <span>{props.text}</span>
    
  </OverlayTrigger>
  )
}

export default OverlayTrigText