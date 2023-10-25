import React, { useEffect, useState } from "react";

import { Container, Button, Tab, Tabs, Table } from "react-bootstrap";
import Menu from "../menu/Menu";
import UserLogin from "../auth/UserLogin";
import { Link } from "react-router-dom";
import axios from "axios";
import OverlayTrig from "../../overLay/OverlayTrig";
import EditDetailCar from "./car/EditDetailCar";
import ModalDeleteCar from "../../modals/ModalDeleteCar";
import Calculation from "./Calculation";
import "./Warehouse.css";

const Warehouse = (props) => {
  const [car, setCar] = useState([]);
  const [carsArray, setCarsArray] = useState([]);
  const [show, setShow] = useState("show");
  const [showDetail, setShowDetail] = useState("hidden");
  const [showCalculation, setShowCalculation] = useState("hidden");
  const [media, setMedia] = useState([]);
  const [airCondition, setAirCondition] = useState([]);
  const [roof, setRoof] = useState([]);
  const [upholstery, setUpholstery] = useState([]);
  const [tempomat, setTempomat] = useState([]);
  const [light, setLight] = useState([]);
  const [safety, setSafety] = useState([]);
  const [customer, setCustomer] = useState([]);
  //eslint-disable-next-line
  const [user, setUser] = useState([]);
  // eslint-disable-next-line
  const [action, setAction] = useState([props.state?.idAction]);
  const [search, setSearch] = useState([]);
  const getIdUser = JSON.parse(localStorage.getItem("user"));

  const clear = () => {
    setSearch("");
    document.getElementById("formSearch").reset();
  };

  const findCustomer = (e) => {
    let getFindCustomer = e.target.value;
    let lowerGetFindCustomer = getFindCustomer.toLowerCase();
    setSearch(lowerGetFindCustomer);
  };

  const getData = () => {
    setCustomer(props.state?.customer);
    setUser(props.state?.token);
    setAction(props.state?.IdAction);
  };

  const getCategorys = async () => {
    const getMedia = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=media"
    );
    setMedia(getMedia.data);

    const getAirConditions = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=airConditions"
    );
    setAirCondition(getAirConditions.data);

    const getRoof = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=roof"
    );
    setRoof(getRoof.data);

    const getUpholstery = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=upholstery"
    );
    setUpholstery(getUpholstery.data);

    const getTempomat = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=tempomat"
    );
    setTempomat(getTempomat.data);

    const getLight = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=light"
    );
    setLight(getLight.data);

    const getSafety = await axios.get(
      process.env.REACT_APP_LOCALHOST + "category/?category=safety"
    );
    setSafety(getSafety.data);
  };

  const getAllCarsArray = async () => {
    const cars = await axios.get(process.env.REACT_APP_LOCALHOST + "car");
    setCarsArray(cars.data);
  };

  const getCalculation = (item) => {
    setCar(item);
    console.log(item)
    setShow("hidden");
    setShowCalculation("show");
  };

  const getCar = (item) => {
    setCar(item);
    setShow("hidden");
    setShowDetail("show");
    setShowCalculation("hidden");
  };

  const closeAction = async () => {
    setShowDetail("hidden");
    setShow("show");
  };

  useEffect(() => {
    getData();
    getAllCarsArray();
    getCategorys();
    // eslint-disable-next-line
  }, []);

  return (
    <span className="tw-flex tw-w-full">
    <div className="colNav">
      <Menu />
    </div>

    <Container>
      <div className="textTopUser">
        <UserLogin getIdUser={getIdUser} />
      </div>
      <div className="customerBoxPadding">

          <p className="tittle">Magazyn</p>
          <hr />
          <Tabs
            defaultActiveKey="carBox"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="carBox" title="Samochody">
              <div className="ButtonRight">
                <span className={showDetail}>
                  <EditDetailCar
                    closeAction={closeAction}
                    car={car}
                    media={media}
                    airCondition={airCondition}
                    roof={roof}
                    upholstery={upholstery}
                    tempomat={tempomat}
                    light={light}
                    safety={safety}
                  />
                </span>
                <span className={showCalculation}>
                  <Calculation
                    car={car}
                    cust={customer}
                    action={props.state?.idAction}
                  />
                </span>
               
                <span className={show}>
                  <Button variant="outline-success"  as={Link} to="/addcar">
                    Dodaj Samochód
                  </Button>
               
                </span>
                <div className="conatinerDataCompany tw-text-left ">
                  <form id="formSearch" className="">
                    Wyszukaj
                    <input
                      type="text"
                      className="input_Search corner"
                      name="inputSearch"
                      id="inputSearch"
                      onChange={findCustomer}
                    />
                    <div className="getCenterReset">
                      <Button variant="outline-success" onClick={clear}>
                        Reset
                      </Button>
                    </div>
                  </form>
                  <hr />
                  <div>
                    <Table
                      variant="light"
                      striped
                      bordered
                      hover
                      className="tableFontSize"
                    >
                        <thead>
                      <tr>
                        <th id="id1">Marka</th>
                        <th id="id2">Model</th>
                        <th id="id3">Nr rej.</th>
                        <th id="id4">VIN</th>
                        <th id="id5">Rocznik</th>
                        <th id="id6">Poj.</th>
                        <th id="id7">KM</th>
                        <th id="id8">Cena brutto</th>
                        <th id="id9" >Edycja</th>
                        <th id="id10">Oferta</th>
                        <th id="id11">Usuń</th>
                      

                      </tr>
                      </thead>
                      <tbody>
                        {carsArray
                          .filter((item) => {
                            return search === "" 
                              ? item
                              :
                              item.status === "magazyn" &&
                             ( item.nr_rejestracyjny
                                  .toLowerCase()
                                  .includes(search) ||
                                  item.model.toLowerCase().includes(search) ||
                                  item.make.toLowerCase().includes(search) ||
                                  item.vin.toLowerCase().includes(search)  )
                          })
                          .map((item, index) => {
                            return (
                              <tr key={index}>
                                <td id="id1"  className="tableFontSize">{item.make}</td>
                                <td id="id2"  className="tableFontSize">{item.model}</td>
                                <td id="id3"  className="tableFontSize">
                                  {item.nr_rejestracyjny}
                                </td>
                                <td id="id4"  className="tableFontSize">{item.vin} </td>
                                <td id="id5"  className="tableFontSize">{item.year}</td>
                                <td id="id6"  className="tableFontSize">
                                  {item.engine_capacity}
                                </td>
                                <td id="id7"  className="tableFontSize">
                                  {item.engine_power}
                                </td>
                                <td id="id8"  className="tableFontSize">{item.price}</td>
                                <td id="id9"  className="tableFontSize">
                                  <OverlayTrig
                                    imagePath="https://img.icons8.com/ios/30/edit-property.png"
                                    toltip="Szczegóły / Edycja"
                                    onClick={(e) => {
                                      getCar(item);
                                    }}
                                  />
                                </td>
                                <td id="id10" className="tableFontSize">
                                  <Link>
                                    <OverlayTrig
                                      imagePath="https://img.icons8.com/cotton/30/recieve.png"
                                      toltip="Oferta"
                                      onClick={(e) => {
                                        getCalculation(item);
                                      }}
                                    />
                                  </Link>
                                </td>
                                <td id="id11"  className="tableFontSize">
                                  <ModalDeleteCar
                                    post={item}
                                    getAllCarsArray={getAllCarsArray}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="scooter" title="Skutery">
              <div className="getRight">
                <Button variant="outline-success" as={Link} to="/addscooter">
                  Dodaj Skuter
                </Button>
              </div>
            </Tab>
          </Tabs>
        
        </div>
   
   </Container>
 {/*   <div className="tw-w-[200px]">TEST</div> */}
 </span>
  );
};

export default Warehouse;
