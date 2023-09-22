import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import "./SettingsInfo.css";
import axios from "axios";
import ModalEditUserPassword from "../../modals/ModalEditUserPassword";
import AddLeadFromExcel from "../importExcel/AddLeadFromExcel";
import Toasts from "../../toasts/Toasts";

const SettingsInfo = () => {
  const [forms, setForms] = useState({});
  const [lengthCollection, setLengthCollection] = useState({});
  const [companyLenght, setCompanyLenght] = useState({});
  const [companyData, setCompanyData] = useState({});
  const [user, setUser] = useState({});
  const [jwtToken, setJwtToken] = useState({});
  const [show, setShow] = useState(false);
  const [showCompanyEdit, setShowCompanyEdit] = useState(false);

 

  const getUsers = async () => {
    const viewChance = await axios.get(
      process.env.REACT_APP_LOCALHOST + "temp"
    );
    const dataChance = viewChance.data[0]?.Arkusz1;
    const lenghtdataChance = dataChance?.length;
    setLengthCollection(lenghtdataChance);
  };

  const changePasswordLabel = "ZMIANA HASŁA";
  const getCompany = (e) =>
    setForms((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const getUserJWT = async () => {
    const user_jwt = JSON.parse(localStorage.getItem("user"));
    const getUserData = await axios.get(
      process.env.REACT_APP_LOCALHOST + "user/findData/" + user_jwt._id
    );

    setUser(getUserData.data);
    setJwtToken(user_jwt._id);
  };

  const updateUser = async (use) => {
    const userUpdate = await axios.put(
      process.env.REACT_APP_LOCALHOST + "user/edit/" + jwtToken,

      {
        _id: jwtToken,
        name: user.name,
        phone: user.phone,
        position: user.position,
        email: user.email,
        login: user.email,
      }
    );
    setShow(true);
    setUser(userUpdate.data);
  
  };

  const getUser = (e) =>
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const addCompany = async (e) => {
    const post = {
      nameCompany: forms.nameCompany,
      streetAdress: forms.streetAdress,
      zipAdress: forms.zipAdress,
      cityAdress: forms.cityAdress,
      emailCompany: forms.emailCompany,
      phoneCompany: forms.phoneCompany,
      phoneDepartment: forms.phoneDepartment,
      NIP: forms.NIP,
      REGON: forms.REGON,
      bankAccount: forms.bankAccount,
      siteWWW: forms.siteWWW,
    };

    await axios.post(process.env.REACT_APP_LOCALHOST + "company/add/", post);
  };

  const getCompanyLenght = async () => {
    const getAllCompany = await axios.get(
      process.env.REACT_APP_LOCALHOST + "company/"
    );
    setCompanyLenght(getAllCompany.data.length);
    setCompanyData(getAllCompany.data[0]);
  };

  const handleSubmit = async (e) => {
    const companyEdits = await axios.put(
      process.env.REACT_APP_LOCALHOST +
        "company/changeCompanyData/" +
        companyData._id,
      {
        _id: companyData._id,
        nameCompany: forms.nameCompany,
        NIP: forms.NIP,
        streetAdress: forms.streetAdress,
        cityAdress: forms.cityAdress,
        zipAdress: forms.zipAdress,
        emailCompany: forms.emailCompany,
        phoneCompany: forms.phoneCompany,
        phoneDepartment: forms.phoneDepartment,
        REGON: forms.REGON,
        bankAccount: forms.bankAccount,
        siteWWW: forms.siteWWW,
      }
    );
    setCompanyData(companyEdits);
    getCompanyLenght();
    setShowCompanyEdit(true)
  };

  useEffect(() => {
    getCompanyLenght();
    getUserJWT();
    getUsers();
  }, []);
  return (
    <div>
        <Toasts
        bodyBackground="success"
        className="text-white"
        title="Edycja danych firmy"
        bodyText="Zaktualizowano dane firmy"
        showWindow={showCompanyEdit}
        setShowWindow={setShowCompanyEdit}
      />
         <Toasts
        bodyBackground="success"
        className="text-white"
        title="Edycja danych Użytkownika"
        bodyText="Zaktualizowano dane użytkownia"
        showWindow={show}
        setShowWindow={setShow}
      />
      {user.admin ? (
        <div className="conatinerDataCompany">
          <div>
            <AddLeadFromExcel lengthCollection={lengthCollection} />
          </div>
        </div>
      ) : (
        ""
      )}
{user.admin ? (
      <div className="conatinerDataCompany">
        <h1>Dane firmy</h1>
        <hr />
        <Row className="tw-pt-0">
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                className="inputUser"
                required
                type="text"
                placeholder="Wpisz nazwę firmy"
                name="nameCompany"
                // z id="nameComapny"
                value={forms?.nameCompany || companyData?.nameCompany || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Nazwa firmy
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                className="inputUser"
                type="text"
                placeholder="NIP"
                name="NIP"
                // id="NIP"
                value={forms?.NIP || companyData?.NIP || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="NIP">
                NIP
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                className="inputUser"
                type="text"
                placeholder="REGON"
                name="REGON"
                // id="NIP"
                value={forms?.REGON || companyData?.REGON || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                REGON
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                placeholder="Wpisz ulicę"
                className="inputUser"
                name="streetAdress"
                // id="streetAdress"
                value={forms?.streetAdress || companyData?.streetAdress || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Ulica i nr
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="Wpisz kod Pocztowy"
                name="zipAdress"
                value={forms?.zipAdress || companyData?.zipAdress || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Kod Pocztowy
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="Wpisz miejscowość"
                name="cityAdress"
                value={forms?.cityAdress || companyData?.cityAdress || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Miejscowość
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                name="phoneCompany"
                value={forms?.phoneCompany || companyData?.phoneCompany || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Telefon Ogólny{" "}
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="Telefon - Dział Sprzedaży"
                name="phoneDepartment"
                value={
                  forms?.phoneDepartment || companyData?.phoneDepartment || ""
                }
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Telefon - Dział Sprzedaży
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="Wpisz email"
                name="emailCompany"
                value={forms?.emailCompany || companyData?.emailCompany || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                email
              </label>
            </Form.Floating>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="strona wwww"
                name="siteWWW"
                value={forms?.siteWWW || companyData?.siteWWW || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                Strona wwww
              </label>
            </Form.Floating>
          </Form.Group>
          <Form.Group as={Col} md="8">
            <Form.Floating>
              <Form.Control
                required
                type="text"
                className="inputUser"
                placeholder="NR konta bankowego"
                name="bankAccount"
                value={forms?.bankAccount || companyData?.bankAccount || ""}
                onChange={getCompany}
              />
              <label className="labelPadding" htmlFor="model">
                nr konta bankowego
              </label>
            </Form.Floating>
          </Form.Group>

          <span className="tw-4 tw-pb-4 tw-flex tw-w-full  tw-flex-col  tw-items-end ">
            <Form.Group controlId="submit">
              <Button
                variant="outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                AKTUALIZUJ
              </Button>
            </Form.Group>
          </span>
        </Row>

        {!companyLenght ? (
          <Row>
            <Form.Group controlId="submit">
              <Button
                variant="outline-success"
                type="submit"
                onClick={addCompany}
              >
                Zapisz
              </Button>
            </Form.Group>
          </Row>
        ) : (
          ""
        )}
      </div>): ""}
      <div className="conatinerDataCompany">
        <h1>Dane użytkownika</h1>
        <hr />
        <Row>
          <Form>
            <Row className="">
              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    className="inputUser"
                    required
                    type="text"
                    placeholder="Imię i nazwisko"
                    name="name"
                    id="name"
                    value={user.name || ""}
                    onChange={getUser}
                  />
                  <label className="labelPadding" htmlFor="model">
                    Imię i nazwisko
                  </label>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    required
                    className="inputUser"
                    type="text"
                    placeholder="Stanowisko"
                    name="position"
                    id="position"
                    value={user.position || ""}
                    onChange={getUser}
                  />
                  <label className="labelPadding" htmlFor="model">
                    Stanowisko
                  </label>
                </Form.Floating>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    required
                    className="inputUser"
                    type="text"
                    placeholder="Telefon"
                    name="phone"
                    id="phone"
                    value={user.phone || ""}
                    onChange={getUser}
                  />
                  <label className="labelPadding" htmlFor="model">
                    Telefon bezpośredni
                  </label>
                </Form.Floating>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    required
                    className="inputUser"
                    type="text"
                    placeholder="Wpisz E-mail"
                    name="email"
                    id="email"
                    value={user.email || ""}
                    onChange={getUser}
                  />{" "}
                  <label className="labelPadding" htmlFor="model">
                    E-mail
                  </label>
                </Form.Floating>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mt-4 tw-flex tw-w-full  tw-flex-col  tw-items-end "
              >
                <Button
                  type="submit"
                  variant="outline-success"
                  onClick={updateUser}
                >
                  AKTUALIZUJ DANE
                </Button>
              </Form.Group>
              <Form.Group
                as={Col}
                md="4"
                className="mt-4 tw-flex tw-w-full  tw-flex-col  tw-items-end "
              >
                <ModalEditUserPassword
                  use={user}
                  getUsers={getUserJWT}
                  position="end"
                  changePasswordLabel={changePasswordLabel}
                />
              </Form.Group>
            </Row>
          </Form>
        </Row>
      </div>
    </div>
  );
};
export default SettingsInfo;
