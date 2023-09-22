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
        props.getIdUser._id === act.user._id &&
        act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
    );
    setSoldData(solds.length);
  };

/*   const sold = action.filter(
    (act) =>
      act.status === "sold" &&
      props.getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
  ).length; */

  const actionAll = action.filter(
    (act) =>
      props.getIdUser._id === act.user._id &&
      act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

  const offerAll = offer.filter(
    (act) =>
      props.getIdUser._id === act.user._id &&
      act.data.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

  const effectiveness = ((props.sold / actionAll) * 100).toFixed(0);
  const kpiContactOffer = ((actionAll / offerAll) * 100).toFixed(0);
  const kpiOfferSold = ((props.sold / offerAll) * 100).toFixed(0);

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
          <Col xxl={3} xl={4} lg={4} md={6} sm={12} >
            <div className="analiticUserContainer">
              <h4>PLan miesięczny</h4>
              <hr />

              <ul>
                <li>
                  Sprzedaż :
                  {data
                    .filter((act) => {
                      return act.name === userName;
                    })
                    .map((act, index) => (
                      <span key={index} className="tw-p-2">
                        {props.dataSelect?.monthSelect === props.now
                          ? act[props.month]
                          : act[props.monthPrev]}
                      </span>
                    ))}
                </li>
                <li>Skuteczność: 25%</li>
              </ul>
              <br />
              <h4>Wskaźniki KPI</h4>
              <hr />
              <ul>
                <li>Kontakty/Oferty: {actionAll ? kpiContactOffer : 0} %</li>
                <li>Kontakty/Sprzedaż: {actionAll ? effectiveness : 0} %</li>
                <li>Oferty/Sprzedaż: {props.sold ? kpiOfferSold : 0} %</li>
              </ul>
            </div>
          </Col>
          <Col xxl={3} xl={4} lg={4}  md={6} sm={12}  className="getCenter">
            <div className="analiticUserContainer">
              <h4>Lejek sprzedaży</h4>
              <hr />

              <ul>
                <li> ilość kontaktów: {actionAll}</li>
                <li> ilość ofert: {offerAll}</li>

                <li>ilość sprzedaży: {props.sold}</li>
                <li> Skuteczność: {props.sold ? effectiveness : 0} %</li>
              </ul>
              <br />
            </div>
          </Col>
          <Col xxl={6} xl={6} lg={8} md={12} sm={12}>
            <div className="analiticUserContainerChat">
              <h4>Tablica</h4>
              <hr />
            </div>
          </Col>{" "}
        </Row>
      </span>
    </span>
  );
};

export default AnaliticUserTop;
