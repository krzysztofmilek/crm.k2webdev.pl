import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useState } from "react";



export const  ModalInfo = () =>{
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);   
/* setShow(post.showModale) */


  return (
    <div>
      
   
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Wybierz plik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Wybierz plik
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
           Zamknij
          </Button>
        
        </Modal.Footer>
      </Modal>
    </div>
  );
}


