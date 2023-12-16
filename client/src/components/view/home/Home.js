import React, { useEffect, useState } from "react";
import { Table, Form, Container } from "react-bootstrap";
import Menu from "../menu/Menu";
import "./Home.css";
import axios from "axios";
import AnaliticUserTop from "../analitics/AnaliticUserTop";
import UserLogin from "../auth/UserLogin";
import ModalEditAction from "../../modals/ModalEditAction";

const Home = (props) => {
  const [actions, setActions] = useState([]);
  /*   const [idAction, setIdAction] = useState({}); */

  const  showAction = true;
  const showAttachment = true;
  const showOffer = true;
  const [showWindow, setShowWindow] = useState("hidden");
  const [offer, setOffer] = useState([]);
  const [users, setUsers] = useState([]);
  const getIdUser = JSON.parse(localStorage.getItem("user"));
  const [userSelect, setUserSelect] = useState({
    salesMenSelect: getIdUser._id,
  });
  const start = new Date().toISOString().substring(0, 10);
  const propsMonth = start.slice(5, 7);
  const now = propsMonth.toString();
  const [dataSelect, setDataSelect] = useState({ monthSelect: now });


  const getOffer = async () => {
    const data = await axios.get(process.env.REACT_APP_LOCALHOST + "offer/");
    setOffer(data.data);
  };
  console.log(userSelect)

  const getAct = async (e) => {
    const getAction = await axios.get(
      process.env.REACT_APP_LOCALHOST + "action/"
    );
    setActions(getAction.data);
  };

  const getUsers = async () => {
    const viewUsers = await axios.get(
      process.env.REACT_APP_LOCALHOST + "user/allUser/"
    );
    setUsers(viewUsers.data);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getFD = new Date();

  const monPrev = months[getFD.getMonth() - 1];
  const monthPrev = monPrev.toLowerCase();
  const mon = months[getFD.getMonth()];
  const month = mon.toLowerCase();
  const getFullDate = new Date();
  const preGetMonth = getFullDate.getMonth();
  const preGetMonthAddOne = preGetMonth + 1;
  const getMonth =
    preGetMonthAddOne < 10 ? "0" + preGetMonthAddOne : preGetMonthAddOne;
  const getMonthPrev = preGetMonth < 10 ? "0" + preGetMonth : preGetMonth;
  const nowMonth = getMonth.toString();
  const prevMonth = getMonthPrev.toString();

  const getMonthSelected = (e) =>
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const getSalesMenSelected = (e) =>
    setUserSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const sold = actions.filter(
    (act) =>
      userSelect.salesMenSelect === act.user?._id &&
      act.status === "sold" &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const stockMarket = actions.filter(
    (act) =>
      act.direction === "gielda" &&
      userSelect.salesMenSelect === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect.monthSelect
  ).length;

  const initiative = actions.filter(
    (act) =>
      act.direction === "inicjatywa" &&
      userSelect.salesMenSelect === act.user?._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const routeIn = actions.filter(
    (act) =>
      act.direction === "Klient-firma" &&
      userSelect.salesMenSelect === act.user?._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const routeOut = actions.filter(
    (act) =>
      act.direction === "Firma-klient" &&
      userSelect.salesMenSelect === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const recomendations = actions.filter(
    (act) =>
      act.direction === "rekomendacje" &&
      userSelect.salesMenSelect === act.user?._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;
  const recomendationsInt = parseInt(recomendations);

  const lostChance = actions.filter(
    (act) =>
      (act.status === "other" ||
        act.status === "resignation" ||
        act.status === "competition") &&
      userSelect.salesMenSelect === act.user?._id &&
      /*  getIdUser._id === act.user._id && */
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const closeAction = async () => {
    setShowWindow("hidden");
  };

  useEffect(() => {
    getAct();
    getOffer();
    getUsers();

    // eslint-disable-next-line
  }, []);

  return (
    <span className="">
      <span className="tw-flex">
        <div className="colNav">
          <Menu    />
        </div>

        <Container className="">
          <div className="textTopUser">
            <UserLogin getIdUser={getIdUser} />
          </div>
          <div className="analaiticsSelect">
            <Form.Floating>
              <Form.Select
                className="form-floating selectMonth"
                id="monthSelect"
                defaultValue={nowMonth}
                name="monthSelect"
                onChange={getMonthSelected}
                /*   style={{ fontSize: "12px", width: "282px", marginTop: "10px"}} */
              >
                <option value={nowMonth}>Wybierz miesiąc </option>
                <option value={nowMonth}>Miesiąc bieżący</option>
                <option value={prevMonth}>Miesiąc poprzedni</option>
              </Form.Select>
            </Form.Floating>
          </div>
          <div className="analaiticsSelect">
            {getIdUser.access ? (
              <Form.Floating>
                <Form.Select
                  className="form-floating selectMonth"
                  id="slaesMenSelect"
                  defaultValue={getIdUser._id}
                  name="salesMenSelect"
                  onChange={getSalesMenSelected}
                  /*   style={{ fontSize: "12px", width: "282px", marginTop: "5px" , marginBottom: '10px'}} */
                >
                  <option value={getIdUser._id}>Wybierz handlowca </option>
                  {users.map((user, index) => (
                    <option key={index} value={user._id}>
                      {user.name}{" "}
                    </option>
                  ))}
                </Form.Select>
              </Form.Floating>
            ) : null}
          </div>{" "}
          <div className="analaiticsSelect">
            <AnaliticUserTop
              actions={actions}
              getIdUser={getIdUser}
              start={start}
              monthPrev={monthPrev}
              month={month}
              now={now}
              dataSelect={dataSelect}
              userSelect={userSelect.salesMenSelect}
              getAct={getAct}
              sold={sold}
              recomendations={recomendationsInt}
              lostChance={lostChance}
              stockMarket={stockMarket}
              initiative={initiative}
              routeIn={routeIn}
              routeOut={routeOut}
            />
          </div>
          <div className="tw-w-full conatinerDataCompany  conatinerDataCompanyPaddingMedia">
            <span className={showWindow}>
              <div>
                <br />
                <span className="title">Przeglądaj zadania</span>
                <hr />
              </div>
            </span>
            <hr />

            <span className="getLeft title">PRZETERMINOWANE ZADANIA </span>

            <Table
              variant="light"
              hover
              bordered
              size="sm"
              className="fullWidth"
            >
              <tbody>
                {actions
                  .filter((act) => {
                    return (
                      act.nextContactData.slice(0, 10) < start &&
                      act.user?._id === getIdUser._id &&
                      act.status === "open"
                    );
                  })
                  .map((act, index) => (
                    <tr className="red" key={index}>
                      <td className="col-1 tableFontSize" id="id1action">
                        {act.nextContactData?.slice(0, 10)}
                      </td>

                      <td className="col-2 tableFontSize" id="id3action">
                        {act.customer?.name}
                      </td>
                      <td className="col-1 tableFontSize" id="id4action">
                        {act.customer?.phone}
                      </td>
                      <td className="col-5 tableFontSize" id="id5action">
                        {act.information?.slice(0, 100)}{" "}
                      </td>
                      <td className="col-1 getCenter" id="id6action">
                        <ModalEditAction
                          idAction={act}
                          /*   showAction={showAction}
                  showAttachment={showAttachment}
                  showOffer={showOffer} */
                          closeAction={closeAction}
                          getAct={getAct}
                          getOffer={getOffer}
                          offer={offer}
                          actions={actions}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <span className="getLeft title"> DZISIEJSZE ZADANIA</span>
            <Table
              variant="light"
              hover
              bordered
              size="sm"
              className="fullWidth"
            >
              <tbody>
                {actions
                  .filter((act) => {
                    return (
                      act.nextContactData.slice(0, 10) === start &&
                      act.user?._id === getIdUser._id &&
                      act.status === "open"
                    );
                  })
                  .map((act, index) => (
                    <tr key={index}>
                      <td className="col-1 tableFontSize" id="id1action">
                        {act.nextContactData?.slice(0, 10)}
                      </td>

                      <td className="col-2 tableFontSize" id="id3action">
                        {act.customer?.name}
                      </td>
                      <td className="col-1 tableFontSize" id="id4action">
                        {act.customer?.phone}
                      </td>
                      <td className="col-5 tableFontSize" id="id5action">
                        {act.information?.slice(0, 100)}{" "}
                      </td>
                      <td className="col-1 getCenter" id="id6action">
                        <ModalEditAction
                          idAction={act}
                          showAction={showAction}
                          showAttachment={showAttachment}
                          showOffer={showOffer}
                          closeAction={closeAction}
                          getAct={getAct}
                         getOffer={getOffer}
                          offer={offer}
                          actions={actions}

             


                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <span className="getLeft title"> NADCHODZĄCE ZADANIA</span>
            <Table
              variant="light"
              hover
              bordered
              size="sm"
              className="fullWidth"
            >
              <tbody>
                {actions
                  .filter((act) => {
                    return (
                      act.nextContactData.slice(0, 10) > start &&
                      act.user?._id === getIdUser._id &&
                      act.status === "open"
                    );
                  })
                  .map((act, index) => (
                    <tr key={index}>
                      <td className="col-1 tableFontSize" id="id1action">
                        {act.nextContactData?.slice(0, 10)}
                      </td>

                      <td className="col-2 tableFontSize" id="id3action">
                        {act.customer?.name}
                      </td>
                      <td className="col-1 tableFontSize" id="id4action">
                        {act.customer?.phone}
                      </td>
                      <td className="col-5 tableFontSize" id="id5action">
                        {act.information?.slice(0, 100)}{" "}
                      </td>
                      <td className="col-1 getCenter" id="id6action">
                        <ModalEditAction
                          idAction={act}
                          showAction={showAction}
                          showAttachment={showAttachment}
                          showOffer={showOffer}
                          closeAction={closeAction}
                          getAct={getAct}
                          getOffer={getOffer}
                          offer={offer}
                          actions={actions}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </span>
    </span>
  );
};
export default Home;
