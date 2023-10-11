import React from "react";
import { Col, Row } from "react-bootstrap";

import { useState, useEffect } from "react";
import axios from "axios";

const AnaliticUserTop = (props) => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState([]);
  const [offer, setOffer] = useState([]);
  //eslint-disable-next-line
  const [soldData, setSoldData] = useState([]);

  const getName = JSON.parse(localStorage.getItem("user"));
  const userName = getName.name;

  const getData = async () => {
    const viewOffer = await axios.get(
      process.env.REACT_APP_LOCALHOST + "offer/"
    );
    setOffer(viewOffer.data);

    const viewPlain = await axios.get(
      process.env.REACT_APP_LOCALHOST + "plain/"
    );
    setData(viewPlain?.data);

    const getAction = await axios.get(
      process.env.REACT_APP_LOCALHOST + "action/"
    );
    setAction(getAction.data);

    const solds = action.filter(
      (act) =>
        act.status === "sold" &&
        props.getIdUser._id === act.user?._id &&
        act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
    );
    setSoldData(solds.length);
  };

  const actionAll = action.filter(
    (act) =>
      props.getIdUser._id === act.user?._id &&
      act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

  const offerAll = offer.filter(
    (act) =>
      props.getIdUser._id === act.user?._id &&
      act.data.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

 const effectiveness = ((props.sold / actionAll) * 100).toFixed(0);
  const kpiContactOffer = ((offerAll / actionAll) * 100).toFixed(0);
  const kpiOfferSold = ((props.sold / offerAll) * 100).toFixed(0);
  const kpiRecomdationData = ((props.recomendations / actionAll) * 100).toFixed(0);
  const kpiInitiativeData = ((props.initiative / actionAll) * 100).toFixed(0);
  const kpiStockMarketData = ((props.stockMarket / actionAll) * 100).toFixed(0);
  const kpiLostChanceData = ((props.lostChance / actionAll) * 100).toFixed(0);
const effectivenessToInt = parseInt(effectiveness) || 0;



const salespersonInitiative = (props.recomendations + props.initiative + props.stockMarket+ props.routeIn) 
const companyInitiative = (props.routeOut)
  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <span className="analiticUserBox">
      <span
        style={{
          border: "0px solid #ccc ",
        }}
      >
        <Row className="getCenter">
          <Col xxl={3} xl={4} lg={4} md={6} sm={12} className="getCenter">
            <div className="analiticUserContainer">
              <h4>Lejek sprzedaży</h4>
              <hr />

              <ul>
                  <li className="marginLeft"> ilość kontaktów: {actionAll}</li>
                  <li className="marginLeft"> ilość ofert: {offerAll}</li>

                  <li className="marginLeft">ilość sprzedaży: {props.sold}</li>
                  <li className="marginLeft"> Skuteczność: {props.sold ? effectivenessToInt : 0} %</li>
              </ul>
            </div>
          </Col>
          <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
            <div className="analiticUserContainer">
              <h4>PLan miesięczny</h4>
              <hr />

              <ul>
                  <li className="marginLeft">
                  Sprzedaż :
                  {data
                    .filter((act) => {
                      return act.name === userName;
                    })
                    .map((act, index) => (
                      <span key={index} className="tw-p-2">
                        {props.dataSelect?.monthSelect === props.now
                          ? act[props.month]<props.sold ? <span className="green bold">{act[props.month]}</span>:<span className="red bold">{act[props.month]}</span>
                          : act[props.monthPrev]<props.sold ? <span className="green bold">{act[props.monthPrev]}</span>:<span className="red bold">{act[props.monthPrev]}</span>
                        }
                      </span>
                    ))}
                </li>
                  <li className="marginLeft">Skuteczność: {(effectivenessToInt < 25)? <span className="red bold"> 25%</span>: <span className="green bold"> 25%</span>}</li>
              </ul>
            </div>
          </Col>
          <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
            <div className="analiticUserContainer">
              <h4>Wskaźniki KPI</h4>
              <hr />
              <ul>
                  <li className="marginLeft">Kontakty/Oferty: {actionAll ? kpiContactOffer : 0} %</li>
                  <li className="marginLeft">Kontakty/Sprzedaż: {actionAll ? effectiveness : 0} %</li>
                  <li className="marginLeft">Oferty/Sprzedaż: {props.sold ? kpiOfferSold : 0} %</li>
                  <li className="marginLeft">Utracone szanse: {actionAll ? kpiLostChanceData : 0} %</li>
              </ul>
            </div>
          </Col>{" "}
          <Col xxl={3} xl={4} lg={4} md={6} sm={12}>
            <div className="analiticUserContainer">
              <h4>Inicjatywa</h4>
              <hr />
              <ul>
                  <li className="marginLeft">
                  Inicjatywa własna: {actionAll ? kpiInitiativeData : 0}%{" "}
                </li>
                  <li className="marginLeft">Rekomendacje: {actionAll ? kpiRecomdationData : 0}%</li>
                  <li className="marginLeft">Giełda: {actionAll ? kpiStockMarketData : 0}% </li>
                <li className="marginLeft">
                  Inicjatywa po stronie:{" "}
                  {(companyInitiative === 0 && salespersonInitiative ===0 )? " Brak Danych" :((salespersonInitiative > companyInitiative) ?<span className="green">Handlowca</span> : <span className="red bold">Klienta</span>)}
                </li>
              </ul>
            </div>
          </Col>{" "}
        </Row>
      </span>
    </span>
  );
};

export default AnaliticUserTop;
