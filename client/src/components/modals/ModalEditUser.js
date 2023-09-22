import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OverlayTrig from "../overLay/OverlayTrig";

function ModalEditUser(props) {
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = (e) =>
    setEditUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.position]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.login]: e.target.value,
    }));

  const saveEditUser = async (use) => {
    const user = await axios.put(
      process.env.REACT_APP_LOCALHOST+"user/edit/" + props.use._id,

      {
        _id: use._id,
        name: editUser.name,
        phone: editUser.phone,
        position: editUser.position,
        email: editUser.email,
        login: editUser.email,
      }
    );

    setEditUser(user.data);
    setShow(false);
    props.getUsers();
    setEditUser(null);
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/windows/30/000000/edit-user.png"
        toltip="Edytuj Użykownika"
        onClick={(e) => {
          handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <Form>
            <Form.Label>
              <b>Imię nazwisko</b>
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              defaultValue={props.use.name}
              onChange={getUser}
            />

            <Form.Label>
              <b>Stanowisko</b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Stanowisko"
              name="position"
              id="position"
              defaultValue={props.use.position}
              onChange={getUser}
            />

            <Form.Label>
              <b>Telefon</b>
            </Form.Label>
            <Form.Control
              name="phone"
              id="phone"
              defaultValue={props.use.phone}
              onChange={getUser}
            />

            <Form.Label>
              <b>E-mail</b>
            </Form.Label>
            <Form.Control
              name="email"
              id="email"
              defaultValue={props.use.email}
              onChange={getUser}
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
              saveEditUser(editUser);
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
