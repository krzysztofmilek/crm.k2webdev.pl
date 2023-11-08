import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import OverlayTrig from "../overLay/OverlayTrig";
import Toasts from "../toasts/Toasts";





function ModalEditUserPremission (props) {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [editUser, setEditUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = (e) =>
    setEditUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.position]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
      [e.target.admin]: e.target.value,
    }));

  const saveEditUser = async (use) => {
    const user = await axios.put(
      process.env.REACT_APP_LOCALHOST+"user/edit/" + props.use._id,

      {
        _id: use._id,
        admin: editUser.admin,
      }
    );

    setEditUser(user.data);
    setShow(false);
    setShowToast(true);
       props.getUsers();
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
          <Toasts
        bodyBackground="success"
        className="text-white"
        title="Zmiana hasła"
        bodyText="Zaktualizowano hasło"
        showWindow={showToast}
        setShowWindow={setShowToast}
      />

<OverlayTrig
        imagePath="https://img.icons8.com/windows/30/null/users-settings.png"
        toltip="Zmień uprawnienia"
        onClick={(e) => {
          handleShow(false);
        }}
      />




   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja uprawnień {props.use.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <Form>
          <Form.Label>Wybierz uprawnienia dla {props.use.name} </Form.Label>
              <Form.Control
                as="select"
                name="admin"
                id="admin"
                onChange={getUser}
              ><option >Wybierz uprawnienia</option>
                <option value="false" name="admin">Użytkownik</option>
                <option value="true" name="admin">Administrator</option>
             
              </Form.Control>
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
export default ModalEditUserPremission;
