import React from "react";
import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import Toasts from "../../toasts/Toasts";

import axios from "axios";
import { Link } from "react-router-dom";

const Action = (props) => {
  const [show, setShow] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showDob, setShowDob] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [dataPicker, setDataPicker] = useState();
  const [selectData, setSelectData] = useState({});
  const [showNext, setShowNext] = useState("hidden");
  const [idAction, setIdAction] = useState([]);

  const customer = props.state.customer;
  const token = props.state.token;
  const tomorrow = props.state.getDate;

  const getDatePicker = (e) => {
    let dat = e.target.value;
    setDataPicker(dat);
  };

  const getValue = (e) => {
    setSelectData({
      ...selectData,
      [e.target.name]: e.target.value,
    });
  };

  const continueAction = async () => {
    if (props.state?.idAction) {
      await axios.put(
        process.env.REACT_APP_LOCALHOST + "action/edit/" + props.state.idAction,

        {
          _id: props.state.idAction,
          status: "continue",
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    const messageDirection = document.getElementById("directionAdd").value;
    const messageContactWay = document.getElementById("contactWayAdd").value;
    const messageInformation = document.getElementById("informationAdd").value;
    const messageDob = document.getElementById("dob").value;

    if (messageDirection === "") {
      setShow(true);
      return;
    } else if (messageContactWay === "") {
      setShowContact(true);
      return;
    } else if (messageInformation === "") {
      setShowInformation(true);
      return;
    } else if (messageDob === "") {
      setShowDob(true);
      return;
    } else {
      const file = document.getElementById("file-field").files[0];
      const url =
        process.env.REACT_APP_LOCALHOST + "upload/uploadCustomerFiles";
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const data = new FormData();
      data.append("customerFiles", file);
      axios.post(url, data, config);
      const pos = {
        contactData: tomorrow,
        nextContactData: dataPicker,
        information: selectData.information,
        conatactWay: selectData.conatactWay,
        direction: selectData.direction,
        fileName: file?.name,
        status: "open",
        user: token._id,
        customer: customer._id,
      };

      const newAction = await axios.post(
        process.env.REACT_APP_LOCALHOST + "action/add",
        pos
      );
      setIdAction(newAction.data);
      setShowSuccess(true);
      setShowNext("show");
      continueAction();
    }
  };

  return (
    <span className="tw-flex  tw-flex-col  tw-justify-center tw-items-center">
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wybierz kierunek kontaktu"
        showWindow={show}
        setShowWindow={setShow}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wybierz sposób kontaktu"
        showWindow={showContact}
        setShowWindow={setShowContact}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wpisz informacje dodatkowe"
        showWindow={showInformation}
        setShowWindow={setShowInformation}
      />
      <Toasts
        bodyBackground="danger"
        className="text-white"
        title="UWAGA POLE WYMAGANE"
        bodyText="Wybierz datę ponownego kontaktu"
        showWindow={showDob}
        setShowWindow={setShowDob}
      />
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Sukces"
        bodyText="Dane wprowadzone prawidłowo"
        showWindow={showSuccess}
        setShowWindow={setShowSuccess}
      />
      <Container>
        <Menu />

        <div className="formAction">
          <div className="inputFlex">
            <div className="inputBlock">
              <p className="tittle">Kierunek kontaktu :</p>
              <select
                className="selectAction"
                name="direction"
                as="select"
                id="directionAdd"
                onChange={getValue}
                required
              >
                <option></option>
                <option value="rekomendacje" name="rekomendacje">
                  Rekomendacje
                </option>
                <option value="inicjatywa" name="inicjatywa">
                  Inicjatywa własna
                </option>
                <option value="gielda" name="gielda">
                  Giełda
                </option>
                <option value="Klient-firma" name="kft">
                  Klient - Firma
                </option>
                <option value="Firma-klient" name="fkt">
                  Firma - Klient
                </option>
             
              </select>
            </div>
            <div className="inputBlock">
              <p className="tittle">Sposób kontaktu :</p>

              <select
                className="selectAction"
                as="select"
                name="contactWay"
                id="contactWayAdd"
                onChange={getValue}
              >
                <option></option>
                <option value="wizytaHandlowca" name="contactWay">
                  Wizyta handlowca u Klienta
                </option>
                <option value="wizytaKlient" name="contactWay">
                  Wizyta Klienta w firmie
                </option>
                <option value="email" name="contactWay">
                  Email
                </option>
                <option value="telefon" name="contactWay">
                  Telefon
                </option>
              </select>
            </div>
          </div>
          <div className="inputFlex">
            <div className="inputBlock">
              <p className="tittle">Informacje :</p>

              <textarea
                className="inputAction"
                aria-label="With textarea"
                id="informationAdd"
                name="information"
                onChange={getValue}
              ></textarea>
            </div>
            <div className="inputBlock">
              {" "}
              <p className="tittle">Dodaj załącznik</p>
              <hr />
              <div>
                <input id="file-field" type="file" name="customerFiles" />
              </div>
              <hr />
              <p className="tittle">Wybierz datę nastepnego kontaktu</p>
              <hr />
              <div>
                <Form.Group>
                  <Form.Control
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="Date"
                    onChange={getDatePicker}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <Button
            variant="outline-success"
            className="btn m-3"
            onClick={() => {
              handleSubmit();
            }}
            /*  as={Link}
            to="/warehouse" */
          >
            Zapisz
          </Button>
          <span className={showNext}>
            <Button
              variant="outline-success"
              className="btn m-3"
              as={Link}
              to="/warehouse"
              state={{
                customer: props.state.customer,
                token: props.state.token,
                idAction: idAction,
              }}
            >
              Dalej
            </Button>
          </span>
        </div>
      </Container>
      <Footer />
    </span>
  );
};

export default Action;
