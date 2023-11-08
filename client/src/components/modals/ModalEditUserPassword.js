import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import OverlayTrig from "../overLay/OverlayTrig";
import Toasts from "../toasts/Toasts";

function ModalEditUserPassowrd(props) {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [userPassword, setUserPassword] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getPassword = (e) =>
    setUserPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.position]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
    }));

  const changeUserPassword = async (use) => {
    const userPass = await axios.put(
      process.env.REACT_APP_LOCALHOST + "user/changePassword/" + props.use._id,

      {
        _id: use._id,
        password: userPassword.password,
      }
    );

    setUserPassword(userPass.data);
    setShow(false);
    setShowToast(true);
    props.getUsers();
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col tw-items-end ">
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Zmiana hasła"
        bodyText="Zaktualizowano hasło"
        showWindow={showToast}
        setShowWindow={setShowToast}
      />
      {props.changePasswordLabel ? (
        <Button
          variant="outline-success "
          onClick={(e) => {
            handleShow(false);
          }}
        >
          {props.changePasswordLabel}
        </Button>
      ) : (
        <OverlayTrig
          imagePath="https://img.icons8.com/ios/30/private2.png"
          toltip="Zmień hasło"
          onClick={(e) => {
            handleShow(false);
          }}
        />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja hasła użytkownika {props.use.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                type="password"
                name="password"
                id="password"
                className="inputAction"
                defaultValue=""
                onChange={getPassword}
                placeholder="Wpisz hasło"
              />
              <label htmlFor="name" className="labelPadding">
                wpisz hasło
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                type="password"
                name="second-Password"
                className="inputAction"
                id="second-Password"
                placeholder="Wpisz ponownie hasło"
                defaultValue=""
                onChange={getPassword}
              />
              <label htmlFor="name" className="labelPadding">
                Wpisz ponownie hasło
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
              changeUserPassword(userPassword);
            }}
          >
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalEditUserPassowrd;
