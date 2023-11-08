import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OverlayTrig from "../overLay/OverlayTrig";
import './../view/users/Users.css'
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
      process.env.REACT_APP_LOCALHOST + "user/edit/" + props.use._id,

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
        <Modal.Body>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                type="text"
                className="inputUser"
                name="name"
                placeholder="Imię Nazwisko"
                id="name"
                defaultValue={props.use.name}
                onChange={getUser}
              />
              <label htmlFor="name" className="labelPadding">
                imię nazwisko
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
               className="inputUser"
                type="text"
                placeholder="Stanowisko"
                name="position"
                id="position"
                defaultValue={props.use.position}
                onChange={getUser}
              />
              <label htmlFor="name" className="labelPadding">
                Stanowisko
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
              className="inputUser"
               type="text"
                name="phone"
                placeholder="Telefon"
                id="phone"
                defaultValue={props.use.phone}
                onChange={getUser}
              />
              <label htmlFor="name" className="labelPadding">
                Telefon
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
               className="inputUser"
                 type="text"
                name="email"
                id="email"
                placeholder="Email"
                defaultValue={props.use.email}
                onChange={getUser}
              />
              <label htmlFor="name" className="labelPadding">
                E-mail
              </label>
            </Form.Floating>
          </Form.Group>
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
