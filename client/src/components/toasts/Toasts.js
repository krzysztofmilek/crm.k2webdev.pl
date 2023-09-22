import React from 'react';
import { Toast, ToastContainer } from "react-bootstrap";

const Toasts = (props) => {
 
  return ( 
    <ToastContainer className="p-3" position="middle-end" style={{ zIndex: 1 }}>
    <Toast    
      onClose={()=>{props.setShowWindow(false);}}
      show={props.showWindow}
      delay={5000}
      autohide 
      bg={props.bodyBackground}
     >

      <Toast.Header>
        <strong className="me-auto">{props.title}</strong>
      </Toast.Header>
      <Toast.Body className={props.className}>{props.bodyText}</Toast.Body>
    </Toast>
  </ToastContainer>
  )
}

export default Toasts