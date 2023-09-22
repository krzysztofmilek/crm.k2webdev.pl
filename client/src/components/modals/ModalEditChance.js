import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OverlayTrig from "../overLay/OverlayTrig";

function ModalEditUser(props) {
  const [show, setShow] = useState(false);
  const [editChance, setEditChance] = useState(null);
  //console.log(props.act._id)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getChance = (e) =>
    setEditChance((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const saveEditChance = async (use) => {
    //console.log("props", props.use)
    const chance = await axios.put(
      process.env.REACT_APP_LOCALHOST+"temp/edit/" + props.act._id,

      {
        _id: props.act._id,
        A: editChance.A,
        B: editChance.B,
        C: editChance.C,
        D: editChance.D,
      }
    );
    //console.log(chance)
    setEditChance(chance.data);
    setShow(false);
    // props.getUsers();
    setEditChance(null);
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/windows/30/000000/edit-user.png"
        toltip="Edytuj Okazję"
        onClick={(e) => {
          handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja Okazję</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <Form>
            <Form.Label>
              <b>A</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="A"
              id="a"
              defaultValue={props.act.A}
              onChange={getChance}
            />

            <Form.Label>
              <b>B</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="B"
              id="B"
              defaultValue={props.act.B}
              onChange={getChance}
            />

            <Form.Label>
              <b>C</b>
            </Form.Label>
            <Form.Control
              name="C"
              id="C"
              defaultValue={props.act.C}
              onChange={getChance}
            />
            <Form.Label>
              <b>D</b>
            </Form.Label>
            <Form.Control
              name="D"
              id="D"
              defaultValue={props.act.D}
              onChange={getChance}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="outline-secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button
            type="submit"
            variant="outline-success"
            onClick={(e) => {
              saveEditChance(editChance);
            }}
          >
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalEditUser;
