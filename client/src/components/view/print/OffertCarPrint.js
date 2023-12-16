import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, Row, Col } from "react-bootstrap";
import "./Print.css";
import { FooterPrint } from "./FooterPrint";
import axios from "axios";
import "jspdf-autotable";


const OffertCarPrint = (props) => {
  const [showAdd, setShowAdd] = useState({});
  const [showSconto, setShowSconto] = useState({});
  const [user, setUser] = useState({});

  const getFullDate = new Date();

  const getDay =
    getFullDate.getDate() < 10
      ? "0" + getFullDate.getDate()
      : getFullDate.getDate();

  const preGetMonth = getFullDate.getMonth();
  const preGetMonthAddOne = preGetMonth + 1;
  const getMonth =
    preGetMonthAddOne < 10 ? "0" + preGetMonthAddOne : preGetMonthAddOne;
  const getYear = getFullDate.getFullYear();
  const dateSubString = getYear + "-" + getMonth + "-" + getDay;
  const getDate = dateSubString.toString();
  const getHours = getFullDate.getHours();
  const getMinutes = getFullDate.getMinutes();
  let priceAllAddEquip = 0;
  const documentName = `Oferta_${
    props.state.customer?.name || props.state.newCustomer?.name
  }_${getDate}_${getHours}.${getMinutes}.pdf`;

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: documentName,
    onAfterPrint: () => {
      addOffer();

    },
  });

  const getUser = async () => {
    const getUserData = await axios.get(
      process.env.REACT_APP_LOCALHOST + "user/findData/" + props.user._id
    );

    setUser(getUserData.data);
  };



  const addOffer = async () => {
    const pos = {
      data: getDate,
      addEquipOneName: props.state.addEquipOneName,
      addEquipOnePrice: props.state.addEquipOnePrice,
      addEquipTwoName: props.state.addEquipTwoName,
      addEquipTwoPrice: props.state.addEquipTwoPrice,
      addEquipThreeName: props.state.addEquipThreeName,
      addEquipThreePrice: props.state.addEquipThreePrice,
      scontoCash: props.state.scontoCash,
      addInfo: props.state.addInfo,
      fileName: documentName,
      status: "open",
      user: props.user._id,
      customer: props.state.customer?._id || props.state.newCustomer?._id,
      car: props.state.car._id,
      action: props.state.action?._id,
    };

    axios.post(process.env.REACT_APP_LOCALHOST + "offer/add", pos);
  };

  const pageStyles = () => {
    return `@page {  
      margin: 30px 0px 50px 0px !important;
     }`;
  };

  useEffect(() => {
    props.state?.addEquipOnePrice ? setShowAdd("show") : setShowAdd("hidden");
    props.state.scontoCash ? setShowSconto("show") : setShowSconto("hidden");
    getUser();
    //eslint-disable-next-line
  }, []);
  return (
    <span className="bodyPrint pad10" >
      <div ref={componentRef} className="pad10" >
        <div>
          <style>{pageStyles()}</style>
          {/* <Table className="pad10 shadow-none"> */}
          <Row>
            <Col md={12} xs={12} className="getRight">
              Wrocław {getDate}
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12} className="getRight shadow-none">
              <img
                className="imgFull"
                src={
                  process.env.REACT_APP_LOCALHOST +
                  "import/importImages/" +
                 /*  props.state.car._id +
                  "/" + */
                  props.state.car.imagesFilesName[0]
                }
                alt=""
              />
            </Col>
          </Row>
    
          <Row>
            <Col md={12} xs={12} className="pad10"></Col>{" "}
          </Row>

          <Row>
            <Col className="titlePrint tw-uppercase getCenter " xs={12}>
              Oferta handlowa dla {props.state.customer?.name}{" "}
              {props.state.customer?.nameCompany}{" "}
              {props.state.newCustomer?.name}
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12} className="pad10"></Col>{" "}
          </Row>
          <Row>
            <Col className="titlePrint tw-uppercase getCenter" xs={12}>
              {props.state.car.make} {props.state.car.model}{" "}
              {props.state.car.version} {props.state.car.engine_power}KM{" "}
              {props.state.car.engine_capacity}ccm
            </Col>
          </Row>
          <Row>
            <Col>
              <br /> <br /> <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Skrzynia biegów :</span>
              {props.state.car.gearbox}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Napęd :</span>
              {props.state.car.drive}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Stan :</span>
              {props.state.car.new_used === "used" ? "Używany" : "Nowy"}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Przebieg :</span>
              {props.state.car.mileage}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Lakier :</span>
              {props.state.car.lakier} {props.state.car.colour}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Typ:</span>
              {props.state.car.body_type}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Bezwypadkowy :</span>
              {props.state.car.noCrash}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Zarejestrowany :</span>
              {props.state.car.registration === "TAK"
                ? props.state.car.date_registration
                : "NIE"}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Nr Rejestracyjny :</span>
              {props.state.car.registration === "TAK"
                ? props.state.car.nr_rejestracyjny
                : "BRAK"}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Paliwo :</span>
              {props.state.car.fuel_type}
            </Col>
          </Row>
          <Row>
            <Col>
              <span className="boldPrint">Ilość siedzeń :</span>
              {props.state.car.number_seats}
            </Col>
          </Row>
          <Row>
            <Col className="boldPrint">
              <br /> <br /> <br />
            </Col>
          </Row>
          <Row>
            <Col className="removeBorder">
              {props.state?.addEquipOneName ? (
                <span className="boldPrint">Doposażenie</span>
              ) : null}
              {props.state?.addEquipOneName ? (
                <li className="removeBorder">
                  {props.state?.addEquipOneName} {props.state?.addEquipOnePrice}
                </li>
              ) : null}
              {props.state?.addEquipTwoName ? (
                <li className="removeBorder">
                  {props.state?.addEquipTwoName} {props.state?.addEquipTwoPrice}
                </li>
              ) : null}
              {props.state?.addEquipThreeName ? (
                <li className="removeBorder">
                  {props.state?.addEquipThreeName}{" "}
                  {props.state?.addEquipThreePrice}
                </li>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col className="tw-border-0  ">
              {props.state?.addInfo ? (
                <p className="tw-uppercase boldPrint">Dodatkowe informacje</p>
              ) : null}
              {props.state?.addInfo ? (
                <p className="removeBorder">{props.state?.addInfo}</p>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <br />
            </Col>
          </Row>
          <Row>
            <Col className="boldPrint tw-border-0">
              <p className="removeBorder">Wyposażenie dodatkowe</p>
              {props.state.car.carOptions.map((item, i) => {
                return (
                  <li className="removeBorder" key={i}>
                    {item.nameOption}
                  </li>
                );
              })}
            </Col>
          </Row>
          <Row>
            <Col style={{ whiteSpace: "break-spaces" }}>
              <p className="boldPrint"> Wyposażenie standardowe:</p>
              <p className="removeBorder">{props.state.car.description}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />

              <p className={`boldPrint titlePrint tw-uppercase ${showSconto}`}>
                Cena brutto przed rabatem : {parseInt(props.state.car.price)}{" "}
              </p>
              <p className={`boldPrint titlePrint tw-uppercase ${showSconto}`}>
                Rabat : {props.state.scontoCash ? props.state.scontoCash : 0}{" "}
              </p>
              <p className="boldPrint titlePrint tw-uppercase">
                Cena sprzedaży brutto :{" "}
                {parseInt(props.state.car.price) -
                  parseInt(props.state.scontoCash ? props.state.scontoCash : 0)}
              </p>
              <p className={`boldPrint titlePrint tw-uppercase ${showAdd}`}>
                Doposażenie :{" "}
                {
                  (priceAllAddEquip =
                    parseInt(
                      props.state?.addEquipOnePrice
                        ? props.state.addEquipOnePrice
                        : 0
                    ) +
                    parseInt(
                      props.state?.addEquipTwoPrice
                        ? props.state.addEquipTwoPrice
                        : 0
                    ) +
                    parseInt(
                      props.state?.addEquipThreePrice
                        ? props.state.addEquipThreePrice
                        : 0
                    ))
                }
              </p>
              <p className={`boldPrint titlePrint tw-uppercase ${showAdd}`}>
                Cena sprzedaży brutto z doposażeniem :{" "}
                {(props.state.car.price ? props.state.car.price : 0) +
                  (priceAllAddEquip ? priceAllAddEquip : 0) -
                  (props.state.scontoCash ? props.state.scontoCash : 0)}
              </p>

              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <p className="boldPrint">Ważnośc oferty:</p>
              <p className="removeBorder">
                Oferta ważna 30 dni lub do wyczerpania zapasów.
              </p>
              <br />
            </Col>
          </Row>
          {/* </Table> */}

          <FooterPrint user={user} />
          <div className="getRight">
            <Button variant="outline-success" onClick={handlePrint}>
              Wydrukuj PDF
            </Button>
          </div>
          {props.state.car.imagesFilesName.map((item, i) => (
            <Row key={i}>
              <Col md={12} xs={12}>
                <img
                  className="imgSmall"
                  src={
                    process.env.REACT_APP_LOCALHOST +
                    "import/importImages/" +
                  /*   props.state.car._id +
                    "/" + */
                    item
                  }
                  alt=""
                />
              </Col>
            </Row>
          ))}
        </div>
      </div>
    </span>
  );
};

export default OffertCarPrint;
