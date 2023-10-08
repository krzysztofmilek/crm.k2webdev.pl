import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrig from "../overLay/OverlayTrig";
import { Form, Button } from "react-bootstrap";

function ModalEditCustomer(props) {
  const [show, setShow] = useState(false);
  const [editCustomer, setEditCustomer] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCustomer = (e) =>
    setEditCustomer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.street]: e.target.value,
      [e.target.zip]: e.target.value,
      [e.target.city]: e.target.value,
      [e.target.NIP]: e.target.value,
      [e.target.agreement_1]: e.target.value,
      [e.target.nameCompany]: e.target.nameCompany,
    }));

  const saveEditCustomer = async (use) => {
    const user = await axios.put(
      process.env.REACT_APP_LOCALHOST+"customer/edit/" + props.cust._id,

      {
        _id: use._id,
        name: editCustomer.name,
        phone: editCustomer.phone,
        email: editCustomer.email,
        street: editCustomer.street,
        zip: editCustomer.zip,
        city: editCustomer.city,
        NIP: editCustomer.NIP,
        agreement_1: editCustomer.agreement_1,
        nameCompany: editCustomer.nameCompany,
      }
    );

    setEditCustomer(user.data);
    setShow(false);
    props.getCustomers();
    setEditCustomer(null);
  };

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/windows/30/000000/edit-user.png"
        toltip="Edytuj Klienta"
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
              defaultValue={props.cust.name}
              onChange={getCustomer}
            />

            <Form.Label>
              <b>Telefon</b>
            </Form.Label>
            <Form.Control
              name="phone"
              id="phone"
              defaultValue={props.cust.phone}
              onChange={getCustomer}
            />

            <Form.Label>
              <b>E-mail</b>
            </Form.Label>
            <Form.Control
              name="email"
              id="email"
              defaultValue={props.cust.email}
              onChange={getCustomer}
            />

            <Form.Label>Nazwa firmy </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nazwa firmy"
              name="nameCompany"
              id="nameCompany"
              defaultValue={props.cust.nameCompany}
              onChange={getCustomer}
            />

            <Form.Label>NIP</Form.Label>
            <Form.Control
              type="text"
              placeholder="NIP"
              name="NIP"
              id="NIP"
              defaultValue={props.cust.NIP}
              onChange={getCustomer}
            />

            <Form.Label>Kod pocztowy</Form.Label>
            <Form.Control
              type="text"
              placeholder="Kod pocztowy"
              name="zip"
              id="zip"
              defaultValue={props.cust.zip}
              onChange={getCustomer}
            />

            <Form.Label>Miasto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Miasto"
              name="city"
              id="city"
              defaultValue={props.cust.city}
              onChange={getCustomer}
            />

            <Form.Label>Ulica, nr domu i mieszkania</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ulica, nr domu i mieszkania"
              name="street"
              id="street"
              defaultValue={props.cust.street}
              onChange={getCustomer}
            />

            <Form.Check
              required
              label="Wyrażam zgodę na przetwarzanie marketingowe"
              feedback="Pole musi być zaznaczone"
              feedbackType="invalid"
              defaultValue={props.cust.agreement_1}
              onChange={getCustomer}
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
              saveEditCustomer(editCustomer);
            }}
          >
            Zapisz zmiany
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalEditCustomer;
