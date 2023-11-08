import React from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import OverlayTrig from "../overLay/OverlayTrig";
import { Form, Button } from "react-bootstrap";
import './Modal.css'

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
        props.getCustomers()
        handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="modalHeaderColor">
          <Modal.Title>Edycja użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBodyColor">
          <Form>

          <Form.Group  >
            <Form.Floating className="mb-1 ">
              <Form.Control
                required
                
                autoComplete="on"
                className=""
                placeholder="imię i nazwisko osoby kontaktowej"
                name="name"
                id="name"
       
                defaultValue={props.cust.name}
                onChange={getCustomer}
              />
              <label htmlFor="name" className="labelPadding">
                imię nazwisko
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group   >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="imię i nazwisko osoby kontaktowej"
                name="phone"
              id="phone"
              defaultValue={props.cust.phone}
              onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
               Telefon
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="imię i nazwisko osoby kontaktowej"
                name="email"
                id="email"
                defaultValue={props.cust.email}
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
               Email
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="Nazwa firmy"
              name="nameCompany"
              id="nameCompany"
              defaultValue={props.cust.nameCompany}
              onChange={getCustomer}
              style={{ width: '10px !important' }}
              />{" "}
              <label htmlFor="name" className="labelPadding">
              Nazwa Firmy
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="NIP"
                name="NIP"
                id="NIP"
                defaultValue={props.cust.NIP}
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
             NIP
              </label>
            </Form.Floating>
          </Form.Group>


         
          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="Kod pocztowy"
                name="zip"
                id="zip"
                defaultValue={props.cust.zip}
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
              Kod pocztowy
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="Miasto"
                name="city"
                id="city"
                defaultValue={props.cust.city}
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
              Miasto
              </label>
            </Form.Floating>
          </Form.Group>
          
          <Form.Group >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="Ulica, nr domu i mieszkania"
                name="street"
                id="street"
                defaultValue={props.cust.street}
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
             Ulica nr domu/mieszkania
              </label>
            </Form.Floating>
          </Form.Group>
        

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
