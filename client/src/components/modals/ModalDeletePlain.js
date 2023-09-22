import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrig from "../overLay/OverlayTrig";

function ModalDeletePlain(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  


  const customerDelete = async () => {
    await axios.delete(process.env.REACT_APP_LOCALHOST+"plain/delete/" + props.post._id);
    setShow(false);
    props.getData();
  };
  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
       <OverlayTrig
        imagePath="https://img.icons8.com/windows/30/null/remove-user-male--v1.png"
        toltip="Usuń Plan"
        onClick={(e) => {
          handleShow(false);
        }}
      />


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie planu użytkownika {props.post.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy napewno chcesz usunąć  plan {props.post.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-danger" onClick={() => customerDelete()}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeletePlain;
