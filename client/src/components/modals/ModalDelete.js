import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


function ModalDelete(post) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);   
  const handleShow = () => setShow(true);

  const userDelete = async () => {
    await axios.delete(process.env.REACT_APP_LOCALHOST+"user/delete/" + post.post._id);
    setShow(false);
     post.getUsers();
  };
  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrigger
        key="top"
        placement="top"
        overlay={<Tooltip id="tooltip-top">Usuń użytkownika</Tooltip>}
      >
        <img
         
          src="https://img.icons8.com/windows/30/null/remove-user-male--v1.png"
          alt="Usuń"
          onClick={() => {
            handleShow(false);
          }}
        />
      </OverlayTrigger>
   
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie użytkownika {post.post.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy napewno chcesz usunąć tego użytkownika {post.post.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-danger" onClick={() => userDelete()}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDelete;
