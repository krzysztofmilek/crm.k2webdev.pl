import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ModalDelete from "../../modals/ModalDelete";
import ModalEditUser from "../../modals/ModalEditUser";
import ModalEditUserPassword from "../../modals/ModalEditUserPassword";
import ModalEditUserPremission from "../../modals/ModalEditUserPremission";
import Menu from "../menu/Menu";
import UserTable from "./UserTable";
import "./Users.css";
import Footer from "../footer/Footer";

import Toasts from "../../toasts/Toasts";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});


  const [showToastAddUser, setShowToastAddUser] = useState(false);
  //eslint-disable-next-line
  const [showToastAddPlain, setShowToastAddPlain] = useState(false);
  const addPlain  =  (id) => {
  const plain = {
    name: user.name,
    id_user: id,
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

 axios.post(process.env.REACT_APP_LOCALHOST + "plain/add", plain);
  setShowToastAddPlain(true);
}


  const addUser = async () => {
    const post = {
      name: user.name,
      password: user.password,
      active: true,
      admin: false,
      phone: user.phone,
      position: user.position,
      email: user.email,
      isVerifed: "true",
    };

   const userAdd =  await axios.post(process.env.REACT_APP_LOCALHOST + "user/addUser/", post);
   setUser(userAdd.data);

   getUsers();
   setShowToastAddUser(true);
   addPlain(userAdd.data._id)
  };




  const getUser = (e) =>
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.phone]: e.target.value,
      [e.target.position]: e.target.value,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
      // [e.target.confirmPassword]: e.target.value,
    }));

  const getUsers = async () => {
    const viewUsers = await axios.get(
      process.env.REACT_APP_LOCALHOST + "user/allUser"
    );
    setUsers(viewUsers.data);
  };

  useEffect(() => {
    getUsers();

    // eslint-disable-next-line
  }, []);

  return (
    <span className="tw-block">
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Użytkownicy"
        bodyText="Dodano użytkownika"
        showWindow={showToastAddUser}
        setShowWindow={setShowToastAddUser}
      />

      <Container className="">
        <Menu />
        <div className="conatinerDataCompany">
          <div className="tableFontSize">
            <div className="hiddenMobile">
              <p className="tittle">ustal plan</p>
              <hr />

              <UserTable getUsers={getUsers} />
            </div>
          </div>
        </div>
        <div className="conatinerDataCompany">
          <p className="tittle">Dodaj nowego użytkownika</p>
          <hr />
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
                  <label className="labelPadding">Imię nazwisko</label>
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
                  <label className="labelPadding">Stanowisko</label>
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
                  <label className="labelPadding">Telefon</label>
                </Form.Floating>
              </Form.Group>
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
                  />
                  <label className="labelPadding">Wpisz e-mail</label>
                </Form.Floating>
              </Form.Group>

              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    required
                    className="inputUser"
                    type="password"
                    placeholder="Hasło"
                    name="password"
                    id="password"
                    value={user.password || ""}
                    onChange={getUser}
                  />
                  <label className="labelPadding">Hasło</label>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Floating>
                  <Form.Control
                    required
                    type="password"
                    className="inputUser"
                    placeholder="Hasło"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={user.confirmPassword || ""}
                    onChange={getUser}
                  />
                  <label className="labelPadding">Powtórz hasło</label>
                </Form.Floating>
              </Form.Group>
              <Form.Group as={Col} md="12" className="mt-4">
                <p className="getRight">
                  <Button
                    type="submit"
                    variant="outline-success"
                    onClick={addUser}
                  >
                    Dodaj użytkownika
                  </Button>
                </p>
              </Form.Group>
            </Row>
          </Form>

          <div className="conatinerDataCompany">
            <p className="tittle">Lista użytkowników</p>
            <hr />
            <Table
              variant="light"
              striped
              bordered
              hover
              className="tableFontSize"
            >
              <tbody>
                {users
                  .filter((use) => {
                    return use.active === true;
                  })
                  .map((use, index) => (
                    <tr key={index}>
                      <td className="tableFontSize" id="one">{use.name}</td>
                      <td className="tableFontSize tw-items-center tw-justify-center" id="two">
                        {use.phone}
                      </td>
                      <td className="tableFontSize tw-items-center tw-justify-center" id="three">
                        {use.email}
                      </td>
                      <td className="tableFontSize tw-items-center tw-justify-center" id="four">
                        {use.position}
                      </td>

                      <td id="fife">
                        <ModalEditUserPassword use={use} getUsers={getUsers} />
                      </td>
                      <td id="sixt">
                        <ModalEditUserPremission
                          use={use}
                          getUsers={getUsers}
                        />
                      </td>
                      <td id="seven">
                        <ModalEditUser use={use} getUsers={getUsers} />
                      </td>
                      <td id="eight">
                        <ModalDelete post={use} getUsers={getUsers} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <Footer />
    </span>
  );
};
export default Users;
