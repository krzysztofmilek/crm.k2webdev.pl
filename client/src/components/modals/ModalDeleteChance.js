import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrig from "../overLay/OverlayTrig";

function ModalDeleteChance(post) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chanceDelete = async () => {
    await axios.patch(process.env.REACT_APP_LOCALHOST+"temp/delete/" + post._idArkusz, {
      tabId: [post.act],
    });
    setShow(false);
    post.getChance();
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/windows/30/null/remove-user-male--v1.png"
        toltip="Usuń"
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => {
          handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie</Modal.Title>
        </Modal.Header>
        <Modal.Body>Czy napewno chcesz usunąć tęgo Klienta</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-danger" onClick={() => chanceDelete()}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeleteChance;
