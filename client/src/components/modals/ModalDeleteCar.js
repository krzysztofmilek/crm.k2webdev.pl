import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrig from "../overLay/OverlayTrig";

function ModalDeleteCar(post) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const carDelete = async () => {
    await axios.delete(
      process.env.REACT_APP_LOCALHOST+"car/delete/" + post.post._id
    );
    setShow(false);
    post.getAllCarsArray();
  };
  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/ios/30/delete-trash.png"
        toltip="Usuń produkt z magazynu"
        onClick={(e) => {
          handleShow(false);
        }}
      />


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuwanie Produktu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Czy napewno chcesz usunąć ten produkt 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="outline-danger" onClick={() => carDelete()}>
            Usuń
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeleteCar;
