import { useState, useEffect } from "react";
import React from "react";
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
import "./CustomerCard.css";
import { Link } from "react-router-dom";
import Toasts from "../../toasts/Toasts";
import OverlayTrigText from "../../overLay/OverlayTrigText";

const CustomerCard = (props) => {
  const [addCustomer, setAddCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({});
  // eslint-disable-next-line
  const [customer, setCustomer] = useState("");

  const [show, setShow] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [showToastAlert, setShowToastAlert] = useState(false);
  const [showToastAlertName, setShowToastAlertName] = useState(false);
  const [showToastAlertPhone, setShowToastAlertPhone] = useState(false);
  const [showToastAlertEmail, setShowToastAlertEmail] = useState(false);
  const [token, setToken] = useState({});
  const chance = props.state?.customer;


  const checkChance = () => {
    if (chance === undefined || " ") {

    } else {
      setAddCustomer(chance);
    }
  };

  // get full Date
  const getFullDate = new Date();

  //Day
  const getDay =
    getFullDate.getDate() < 10
      ? "0" + getFullDate.getDate()
      : getFullDate.getDate();
  const getNextDay = getDay;
  const preGetMonth = getFullDate.getMonth();
  const preGetMonthAddOne = preGetMonth + 1;
  const getMonth = preGetMonthAddOne < 10 ? "0" + preGetMonthAddOne : "";
  const getYear = getFullDate.getFullYear();
  const dateSubString = getYear + "-" + getMonth + "-" + getNextDay;
  const getDate = dateSubString.toString();

  const getIdUser = JSON.parse(localStorage.getItem("user"));

  const add = async () => {
    checkChance();

    const messageName = document.getElementById("name").value;
    const messageEmail = document.getElementById("email").value;
    const messagePhone = document.getElementById("phone").value;
    if (messageName === "") {
        setShowToastAlertName(true);
      return;
    } else if (messagePhone === "") {
      setShowToastAlertPhone(true);
      return;
    } else if (messageEmail === "") {
      setShowToastAlertEmail(true);
      return;
    } else {
      const pos = {
        name: addCustomer?.name || chance?.A || props.getCustomer?.name,
        phone: addCustomer?.phone || chance?.B || props.getCustomer?.phone,
        email: addCustomer?.email || chance?.C || props.getCustomer?.email,
        nameCompany: addCustomer.nameCompany,
        NIP: addCustomer.NIP,
        data: getDate,
        agreement_1: true,
        zip: addCustomer.zip,
        street: addCustomer.street,
        city: addCustomer.city,
      };
      const newCustomerRes = await axios.post(
        process.env.REACT_APP_LOCALHOST+"customer/add",
        pos
      );

      if (newCustomerRes.data.error) {
        setShowToastAlert(true);
        return;
      } else {
        setNewCustomer(newCustomerRes.data);
        setCustomer(newCustomerRes.data);
        setShowToast(true);
        setShow(false);
      }
    }
  };

  const getCustomer = (e) =>
    setAddCustomer((prevState) => ({
      ...prevState,
      [e.target.city]: e.target.value,
      [e.target.agreement_1]: e.target.value,
      [e.target.data]: getDate,
      [e.target.email]: e.target.value,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.street]: e.target.value,
      [e.target.zip]: e.target.value,
      [e.target.NIP]: e.target.value,
      [e.target.nameCompany]: e.target.value,
    }));

  useEffect(() => {
    setToken(getIdUser);
    checkChance();
    // eslint-disable-next-line
  }, []);



  return (
    <div className="getLeft">
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Dodawanie Klienta"
        bodyText="Klient dodany prawidłowo"
        showWindow={showToast}
        setShowWindow={setShowToast}
      />

      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA"
        bodyText="Klient z podanym adresem email już istnieje"
        showWindow={showToastAlert}
        setShowWindow={setShowToastAlert}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wypełnij pole z imieniem i nazwiskiem"
        showWindow={showToastAlertName}
        setShowWindow={setShowToastAlertName}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Podaj telefon"
        showWindow={showToastAlertPhone}
        setShowWindow={setShowToastAlertPhone}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wypełnij pole Email"
        showWindow={showToastAlertEmail}
        setShowWindow={setShowToastAlertEmail}
      />

      <Form>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="4" // controlId="validationCustom01"
          >
            <Form.Floating className="mb-1">
              <Form.Control
                required
                type="text"
                autoComplete="on"
                className="inputField"
                placeholder="imię i nazwisko osoby kontaktowej"
                name="name"
                id="name"
                value={
                  addCustomer?.name ||
                  props.getCustomer?.name ||
                  chance?.A ||
                  ""
                }
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
                imię nazwisko
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group
            as={Col}
            md="4" //controlId="validationCustom02"
          >
            <Form.Floating className="mb-1">
              <Form.Control
                type="text"
                className="inputField"
                placeholder="Nazwa firmy"
                name="nameCompany"
                id="nameCompany"
                value={
                  addCustomer.nameCompany ||
                  props.getCustomer?.nameCompany ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="nameCompany" className="labelPadding">
                Nazwa firmy
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating className="mb-1">
              <Form.Control
                type="text"
                className="inputField"
                placeholder="NIP"
                name="NIP"
                id="NIP"
                value={addCustomer.NIP || props.getCustomer?.NIP || ""}
                onChange={getCustomer}
              />
              <label htmlFor="NIP">NIP</label>
            </Form.Floating>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="4" //controlId="validationCustom04"
          >
            <Form.Floating className="mb-1">
              <Form.Control
                className="inputField"
                required
                type="text"
                placeholder="Telefon"
                autoComplete="on"
                name="phone"
                id="phone"
                value={
                  addCustomer.phone ||
                  props.getCustomer?.phone ||
                  chance?.B ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="phone" className="labelPadding">
                Telefon
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <InputGroup>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Floating>
                <Form.Control
                  type="text"
                  className="inputField"
                  autoComplete="on"
                  placeholder="Adres e-mail"
                  name="email"
                  id="email"
                  value={
                    addCustomer.email ||
                    props.getCustomer?.email ||
                    chance?.C ||
                    ""
                  }
                  onChange={getCustomer}
                />
                <label htmlFor="email" className="labelPadding">Adres email</label>
              </Form.Floating>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                //className="tw-hidden"
                type="text"
                className="inputField"
                placeholder="Ulica, nr"
                name="street"
                id="street"
                value={
                  addCustomer.street ||
                  props.getCustomer?.street ||
                  chance?.D ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="street" className="labelPadding">Ulica, nr</label>
            </Form.Floating>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group
            as={Col}
            md="4" 
          >
            <Form.Floating>
              <Form.Control
                type="text"
                className="inputField"
                placeholder="Kod pocztowy"
                name="zip"
                id="zip"
                value={addCustomer.zip || props.getCustomer?.zip || ""}
                onChange={getCustomer}
              />
              <label htmlFor="zip" className="labelPadding">Kod pocztowy</label>
            </Form.Floating>
          </Form.Group>
          <Form.Group
            as={Col}
            md="4" 
          >
            <Form.Floating>
              <Form.Control
                type="text"
                className="inputField"
                placeholder="Miejscowośc"
                name="city"
                id="city"
                value={addCustomer.city || props.getCustomer?.city || ""}
                onChange={getCustomer}
              />
              <label htmlFor="city" className="labelPadding">
                Miejscowość
              </label>
            </Form.Floating>
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col} md="5">
            <Form.Check
            type="switch"
            label="Wyrażam zgodę na przetwarzanie marketingowe"
              className="textCustomer"
              required
             name="agreement1"
             id="agreement1"
              onChange={getCustomer}
              value={
                addCustomer.agreement_1 || props.getCustomer?.agreement_1 || ""
              }
            />
 {/*          <label htmlFor="agreement_1" className="">Wyrażam zgodę na przetwarzanie marketingowe</label> */}
          </Form.Group>
          <Form.Group as={Col} md="3" className="top">
            <Button
              variant="outline-success"
              onClick={add}
              className={props.showClass}
            >
              Zapisz
            </Button>
            <ButtonGroup></ButtonGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" className="top">
            <Button
              className={props.showClass}
              variant="outline-success"
              as={Link}
              disabled={show}
              to="/action"
              state={{ customer: newCustomer, token: token, getDate: getDate }}
              style={{ pointerEvents: show ? "none" : "auto" }}
            >
              Dalej
            </Button>
            <Button
              className={props.showClassButton}
              variant="outline-success"
              as={Link}
              disabled={!props.showButton}
              to="/action"
              state={{
                customer: props.getCustomer,
                token: token,
                getDate: getDate,
              }}
              style={{
                pointerEvents: props.show ? "none" : "auto",
                background: props.showButton ? "green" : "white",
                color: props.showButton ? "white" : "green",
              }}
            >
              {props.showButton ? (
                "Dalej"
              ) : (
                <OverlayTrigText
                  toltip="Aby uaktywnić przycisk :  Pobierz dane Klienta"
                  text="Dalej"
                />
              )}
            </Button>
          </Form.Group>
        </Row>
      </Form>
  
    </div>
  );
};
export default CustomerCard;
