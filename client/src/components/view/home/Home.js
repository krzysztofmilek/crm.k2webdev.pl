import React, { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";

import { Container } from "react-bootstrap";
import Menu from "../menu/Menu";
import "./Home.css";
import Footer from "../footer/Footer";
import axios from "axios";
import ActionInfo from "../action/ActionInfo";
import OverlayTrig from "../../overLay/OverlayTrig";
import AnaliticUserTop from "../analitics/AnaliticUserTop";

const Home = (props) => {
  const [actions, setActions] = useState([]);
  const [idAction, setIdAction] = useState({});
  const [showAction, setShowAction] = useState(true);
  const [showAttachment, setShowAttachment] = useState(true);
  const [showOffer, setShowOffer] = useState(true);
  const [showWindow, setShowWindow] = useState("hidden");
  const [offer, setOffer] = useState([]);

  const start = new Date().toISOString().substring(0, 10);
  const propsMonth = start.slice(5, 7);
  const now = propsMonth.toString();

  const [dataSelect, setDataSelect] = useState({ monthSelect: now });
  const getIdUser = JSON.parse(localStorage.getItem("user"));

  const getDataAction = (act) => {
    //    console.log("Act",act)
    setIdAction(act);
    setShowAction(false);
    setShowWindow("show");

    act.fileName === undefined
      ? setShowAttachment(true)
      : setShowAttachment(false);

    act.offer?.fileName === undefined
      ? setShowOffer(true)
      : setShowOffer(false);
  };
  const getOffer = async () => {
    const data = await axios.get(process.env.REACT_APP_LOCALHOST + "offer/");
    setOffer(data.data);
  };

  const getAct = async (e) => {
    const getAction = await axios.get(
      process.env.REACT_APP_LOCALHOST + "action/"
    );
    setActions(getAction.data);
    console.log("wszystkie akcje z home", getAction.data);
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
  const getMonthPrev = preGetMonth < 10 ? "0" + preGetMonth : "";
  const nowMonth = getMonth.toString();
  const prevMonth = getMonthPrev.toString();

  const getMonthSelected = (e) =>
    setDataSelect((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const sold = actions.filter(
    (act) =>
      act.status === "sold" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const stockMarket = actions.filter(
    (act) =>
      act.direction === "gielda" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect.monthSelect
  ).length;

  const initiative = actions.filter(
    (act) =>
      act.direction === "inicjatywa" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const routeIn = actions.filter(
    (act) =>
      act.direction === "Klient-firma" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const routeOut = actions.filter(
    (act) =>
      act.direction === "Firma-klient" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;


  const recomendations = actions.filter(
    (act) =>
      act.direction === "rekomendacje" &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;
  const recomendationsInt = parseInt(recomendations);

  const lostChance = actions.filter(
    (act) =>
      (act.status === "other" ||
        act.status === "resignation" ||
        act.status === "competition") &&
      getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === dataSelect?.monthSelect
  ).length;

  const closeAction = async () => {
    setShowWindow("hidden");
    //  console.log(showWindow);
  };

  useEffect(() => {
    getAct();
    getOffer();

    // eslint-disable-next-line
  }, []);

  return (
    <span className="tw-flex android tw-flex-col  tw-justify-center tw-items-center">
      <Container className="">
        <Menu />
        <span className="showUsers conatinerDataCompany">
          <div className="tw-pb-3">
            <Form.Floating className="mb-1">
              <Form.Select
                id="monthSelect"
                defaultValue={nowMonth}
                name="monthSelect"
                onChange={getMonthSelected}
                style={{
                  borderRadius: "5px",
                  border: "1px solid #ccc ",
                }}
              >
                <option value={nowMonth}>Wybierz ... </option>
                <option value={nowMonth}>Miesiąc bieżący</option>
                <option value={prevMonth}>Miesiąc poprzedni</option>
              </Form.Select>
            </Form.Floating>
          </div>
          <div className="">
            <AnaliticUserTop
              actions={actions}
              getIdUser={getIdUser}
              start={start}
              monthPrev={monthPrev}
              month={month}
              now={now}
              dataSelect={dataSelect}
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
        </span>
        <div className="tw-w-full tw-min-h-[90%] conatinerDataCompany ">
          <span className={showWindow}>
            <div>
              <br />
              <span className="title">Przeglądaj zadania</span>
              <hr />

              <ActionInfo
                idAction={idAction}
                showAction={showAction}
                showAttachment={showAttachment}
                showOffer={showOffer}
                closeAction={closeAction}
                getAct={getAct}
                getOffer={getOffer}
                offer={offer}
                actions={actions}
              />
            </div>
          </span>
          <hr />

          <span className="getLeft title">PRZETERMINOWANE ZADANIA </span>

          <Table variant="light" hover bordered size="sm">
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
                    <td className="col-1 tableFontSize">
                      {act.nextContactData.slice(0, 10)}
                    </td>
                    <td className="col-2 tableFontSize">{act.user?.name}</td>
                    <td className="col-2 tableFontSize">
                      {act.customer?.name}
                    </td>
                    <td className="col-1 tableFontSize">
                      {act.customer?.phone}
                    </td>
                    <td className="col-5 tableFontSize">
                      {act.information?.slice(0, 100)}{" "}
                    </td>
                    <td className="col-1 getCenter">
                      <OverlayTrig
                        imagePath="https://img.icons8.com/external-flatart-icons-outline-flatarticons/35/null/external-user-cv-resume-flatart-icons-outline-flatarticons.png"
                        toltip="Zobacz szczegóły zadania"
                        onClick={(e) => {
                          getDataAction(act);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <span className="getLeft title"> DZISIEJSZE ZADANIA</span>
          <Table variant="light" striped bordered hover className="fullWidth">
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
                    <td className="col-1 tableFontSize">
                      {act.nextContactData.slice(0, 10)}
                    </td>
                    <td className="col-2 tableFontSize">{act.user?.name}</td>
                    <td className="col-2 tableFontSize">
                      {act.customer?.name}
                    </td>
                    <td className="col-1 tableFontSize">
                      {act.customer?.phone}
                    </td>
                    <td className="col-5 tableFontSize">
                      {act.information?.slice(0, 100)}{" "}
                    </td>
                    <td className="col-1 getCenter">
                      <OverlayTrig
                        imagePath="https://img.icons8.com/external-flatart-icons-outline-flatarticons/35/null/external-user-cv-resume-flatart-icons-outline-flatarticons.png"
                        toltip="Zobacz szczegóły zadania"
                        onClick={(e) => {
                          getDataAction(act);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <span className="getLeft title"> NADCHODZĄCE ZADANIA</span>
          <Table variant="light" striped bordered hover className="fullWidth">
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
                    <td className="col-1 tableFontSize">
                      {act.nextContactData?.slice(0, 10)}
                    </td>
                    <td className="col-2 tableFontSize">{act.user?.name}</td>
                    <td className="col-2 tableFontSize">
                      {act.customer?.name}
                    </td>
                    <td className="col-1 tableFontSize">
                      {act.customer?.phone}
                    </td>
                    <td className="col-5 tableFontSize">
                      {act.information?.slice(0, 100)}{" "}
                    </td>
                    <td className="col-1 getCenter">
                      <OverlayTrig
                        imagePath="https://img.icons8.com/external-flatart-icons-outline-flatarticons/35/null/external-user-cv-resume-flatart-icons-outline-flatarticons.png"
                        toltip="Zobacz szczegóły zadania - zadania nadchodzące"
                        onClick={(e) => {
                          getDataAction(act);
                        }}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
      <Footer />
    </span>
  );
};
export default Home;
