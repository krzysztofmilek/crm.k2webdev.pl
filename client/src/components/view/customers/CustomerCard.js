import { useState, useEffect } from "react";
import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "./CustomerCard.css";
import { Link } from "react-router-dom";
import Toasts from "../../toasts/Toasts";

const CustomerCard = (props) => {
  const [addCustomer, setAddCustomer] = useState({});
  const [newCustomer, setNewCustomer] = useState({});
  // eslint-disable-next-line
  const [customer, setCustomer] = useState("");

  const [showButtonAdd, setShowButtonAdd] = useState(props.showButtonAdd);
const [showNext, setShowNext] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastAlert, setShowToastAlert] = useState(false);
  const [showToastAlertName, setShowToastAlertName] = useState(false);
  const [showToastAlertPhone, setShowToastAlertPhone] = useState(false);
  const [showToastAlertEmail, setShowToastAlertEmail] = useState(false);
  const [token, setToken] = useState({});

  console.log("Buttons: ", props);
  const customerFromChance = props.state?.customer;

  const checkChance = () => {
    if (customerFromChance === undefined || " ") {
      console.log("no chance");
    } else {
      setAddCustomer(customerFromChance);
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
  const getMonth =
    preGetMonthAddOne < 10 ? "0" + preGetMonthAddOne : preGetMonthAddOne;
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
        name:
          addCustomer?.name || customerFromChance?.A || props.getCustomer?.name,
        phone:
          addCustomer?.phone ||
          customerFromChance?.B ||
          props.getCustomer?.phone,
        email:
          addCustomer?.email ||
          customerFromChance?.C ||
          props.getCustomer?.email,
        nameCompany: addCustomer.nameCompany,
        NIP: addCustomer.NIP,
        data: getDate,
        agreement_1: true,
        zip: addCustomer.zip,
        street: addCustomer.street,
        city: addCustomer.city,
      };
      const newCustomerRes = await axios.post(
        process.env.REACT_APP_LOCALHOST + "customer/add",
        pos
      );

      if (newCustomerRes.data.error) {
        setShowToastAlert(true);

        return;
      } else {
        setNewCustomer(newCustomerRes.data);
        setCustomer(newCustomerRes.data);
        setShowToast(true);
        setShowNext(true)
        if (props?.getCustomers) {
          props?.getCustomers();
        }
   
console.log("NowyKliet", newCustomer)
   
        // setShow("show");
      }
    }
  };

  const getCustomer = (e) => {
    setAddCustomer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setShowButtonAdd(false);
  };

  useEffect(() => {
    setToken(getIdUser);
    checkChance();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="getCenter">
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
        <Row className="mb-0">
          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
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
                  customerFromChance?.A ||
                  ""
                }
                onChange={getCustomer}
              />{" "}
              <label htmlFor="name" className="labelPadding">
                imię nazwisko
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
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

          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
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
              <label htmlFor="NIP" className="labelPadding">
                NIP
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
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
                  customerFromChance?.B ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="phone" className="labelPadding">
                Telefon
              </label>
            </Form.Floating>
          </Form.Group>
        </Row>
        <Row className="mb-0">
          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
            <Form.Floating className="mb-1">
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
                  customerFromChance?.C ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="email" className="labelPadding">
                Adres email
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
            <Form.Floating className="mb-1">
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
                  customerFromChance?.D ||
                  ""
                }
                onChange={getCustomer}
              />
              <label htmlFor="street" className="labelPadding">
                Ulica, nr
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
            <Form.Floating className="mb-1">
              <Form.Control
                type="text"
                className="inputField"
                placeholder="Kod pocztowy"
                name="zip"
                id="zip"
                value={addCustomer.zip || props.getCustomer?.zip || ""}
                onChange={getCustomer}
              />
              <label htmlFor="zip" className="labelPadding">
                Kod pocztowy
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} xs="12" sm="12" md="6" lg="6" xl="3">
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
          <Form.Group as={Col} md="12">
            <Form.Check
              type="switch"
              label="Wyrażam zgodę na przetwarzanie marketingowe"
              className="textCustomer"
              style={{ textAlign: "left", fontSize: "0.9em" }}
              required
              name="agreement1"
              id="agreement1"
              onChange={getCustomer}
              value={
                addCustomer.agreement_1 || props.getCustomer?.agreement_1 || ""
              }
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            className="top tw-text-left"
          >
            <Button
              variant="outline-success"
              onClick={add}
              className={(props.showButtonAdd || !showNext)? "show btn  tw-m-5" : "hidden btn  tw-m-5"}
              style={{
                 pointerEvents: showNext  ? "none" : "auto",
        
         
              }} 
            >Zapisz
            </Button>

            <Button
              className={ (props.showButtonNext || showNext)  ? "show" : "hidden"}
              variant="outline-success"
              as={Link}
              to="/action"
              state={{
                customer: props.getCustomer,
                newCustomer: newCustomer,
                token: token,
                getDate: getDate,
              }}
         /*      style={{
                 pointerEvents: showNext ? "auto" : "none", 
                background: showNext? "green" : "white",
                color: showNext ? "white" : "green",
              
              }} */
            >
              Dalej
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
};
export default CustomerCard;
