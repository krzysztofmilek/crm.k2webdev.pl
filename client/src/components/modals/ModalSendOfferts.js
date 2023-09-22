import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";



function ModalSendOfferts(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);   
 setShow(props.show)
console.log("PROPS", props)

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
     
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wyślij ofertę e- mailem </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy wysłać ofertę 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
          Nie
          </Button>
          <Button variant="outline-success" >
           TAK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalSendOfferts;
