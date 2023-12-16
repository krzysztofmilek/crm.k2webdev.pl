import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import OverlayTrig from "../overLay/OverlayTrig";
import { Form, Button } from "react-bootstrap";
import ModalCloseActions from "./ModalCloseActions";
import "../view/action/Action.css";

import axios from "axios";
function ModalEditActions(props) {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState({});
  const [car, setCar] = useState({});
  const getIdUser = JSON.parse(localStorage.getItem("user"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  /*   const getAllCarsArray = async () => {
    const carsFind = await axios.get(process.env.REACT_APP_LOCALHOST + "car");
    setCars(carsFind.data);
  }; */

  const carFind = async () => {
    const carFindData = await axios.get(
      process.env.REACT_APP_LOCALHOST +
        "car/findData/" +
        props.idAction.offer?.car
    );
    setCar(carFindData.data);
  };
  console.log("jebać pis", car);
  useEffect(() => {
    setToken(getIdUser);
    carFind();
    /*  getAllCarsArray(); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/external-flatart-icons-outline-flatarticons/35/null/external-user-cv-resume-flatart-icons-outline-flatarticons.png"
        toltip="Szczegóły akcji"
        onClick={(e) => {
          handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Szczegóły zadania</Modal.Title>
          <button type="button" className="btn-close" onClick={handleClose}>
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios-glyphs/30/delete-sign.png"
              alt="delete-sign"
            />
          </button>
        </Modal.Header>

        <Modal.Body>
          {/*   <div className="">
            <div className="formAction ">
              <div className=""> */}

          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                required
                className="inputAction"
                type="text"
                id="nameCustomer"
                name="nameCustomer"
                readOnly
                defaultValue={props.idAction?.customer?.name}
              />
              <label htmlFor="name" className="labelPadding">
                imię nazwisko
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                className="inputAction"
                type="text"
                name="status"
                id="status"
                readOnly
                defaultValue={props.idAction?.customer?.nameCompany}
              />
              <label htmlFor="name" className="labelPadding">
                Nazwa firmy
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                className="inputAction"
                type="text"
                id="phoneCustomer"
                readOnly
                name="phoneCustomer"
                defaultValue={props.idAction?.customer?.phone}
              />
              <label htmlFor="name" className="labelPadding">
                Telefon
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                className="inputAction"
                type="text"
                name="emailCustomer"
                id="emailCustomer"
                readOnly
                defaultValue={props.idAction?.customer?.email}
              />
              <label htmlFor="name" className="labelPadding">
                Email
              </label>
            </Form.Floating>
          </Form.Group>

          {/*   <div className="inputBlock"> */}

          <div className="buttonAction tw-pt-3">
            {props?.idAction.fileName ? (
              <Button
                variant="outline-success"
                as={Link}
                to={
                  process.env.REACT_APP_LOCALHOST +
                  `import/importCustomerFile/` +
                  props.idAction.fileName
                }
                target="_blank"
              >
                Pokaż załącznik
              </Button>
            ) : (
              ""
            )}
            &nbsp;
            {props.idAction?.offer?.fileName ? (
              <Button
                variant="outline-success"
                size="sm"
                className="btn-small"
                as={Link}
                to="/offertscar"
                state={{
                  car: car,
                  customer: props.idAction.offer.customer,
                  user: props.user,
                  addEquipOnePrice: props.idAction.offer.addEquipOnePrice,
                  scontoCash: props.idAction.offer.scontoCash,
                  addEquipOneName: props.idAction.offer.addEquipOneName,
                  addEquipThreeName: props.idAction.offer.addEquipThreeName,
                  addEquipThreePrice: props.idAction.offer.addEquipThreePrice,
                  addEquipTwoName: props.idAction.offer.addEquipTwoName,
                  addEquipTwoPrice: props.idAction.offer.addEquipTwoPrice,
                  addInfo: props.idAction.offer.addInfo,
                }}
              >
                Podgląd
              </Button>
            ) : (
              ""
            )}
            {/*  <Button variant="outline-success" disabled={props.showOffer}>
              Pokaż ofertę
            </Button> */}
          </div>

          <Form.Group>
            <Form.Floating className="mb-1 ">
              <Form.Control
                as="textarea"
                type="textarea"
                className="inputAction"
                name="inputArea"
                id="inputArea"
                readOnly
                defaultValue={props.idAction?.information}
                style={{ height: "150px" }}
              />
              <label htmlFor="name" className="labelPadding">
                Informacje dodatkowe
              </label>
            </Form.Floating>
          </Form.Group>

          <div className="buttonAction">
            <Button
              variant="outline-success"
              as={Link}
              to="/action"
              state={{
                customer: props.idAction.customer,
                token: token,
                idAction: props.idAction._id,
              }}
              onClick={(e) => {}}
            >
              Nowa Akcja
            </Button>
            <span>&nbsp;</span>
            <ModalCloseActions
              getAct={props.getAct}
              post={props.idAction}
              closeAction={props.closeAction}
              /*      showAction={props.showAction}
                 
                */
            />
          </div>
          {/*  </div>
            </div>
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          {" "}
          <Button variant="outline-secondary" onClick={handleClose}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalEditActions;
