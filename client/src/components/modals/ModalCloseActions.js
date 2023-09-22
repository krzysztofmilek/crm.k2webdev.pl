import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

function ModalCloseActions(props) {
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUser = (e) =>
    setEditUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const closeAction = async () => {
    await axios.put(
      process.env.REACT_APP_LOCALHOST+"action/edit/" + props.post._id,

      {
        _id: props.post._id,
        status: editUser.status,
      }
    );

    setEditUser(props.post.idAction);
    props.getAct();
    setShow(false);
    props.closeAction();
  
  };

  return (
    <span>
      <Button
        variant="outline-success "
        disabled={props.showAction}
        onClick={(e) => {
          handleShow(false);
        }}
      >
        Zamknij Lead
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>LEAD - Zamykanie</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <Form>
            <Form.Label>Podaj powód zamknięcia leada</Form.Label>
            <Form.Control
              as="select"
              name="status"
              id="status"
              onChange={getUser}
            >
              <option>wybierz</option>
              <option value="sold" name="status">
                Sprzedaż
              </option>
              <option value="competition" name="status">
                Zakup u konkurencji
              </option>
              <option value="resignation" name="status">
                Rezygnacja z zakupu
              </option>
              <option value="other" name="status">
                Inne
              </option>
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
              closeAction();
            }}
          >
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
export default ModalCloseActions;
