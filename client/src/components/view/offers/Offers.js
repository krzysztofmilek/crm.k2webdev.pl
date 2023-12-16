import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Menu from "../menu/Menu";
import axios from "axios";
import { Link } from "react-router-dom";
import Toasts from "../../toasts/Toasts";

import "./Offers.css";


import UserLogin from "../auth/UserLogin";

const Offers = (props) => {
  const [offer, setOffer] = useState([]);
  const [search, setSearch] = useState([]);
  const [showToastSend, setShowToastSend] = useState(false);
  const getIdUser = JSON.parse(localStorage.getItem("user"));
  const [company, setCompany] = useState([]);

  const getCompany = async () => {
    const data = await axios.get(process.env.REACT_APP_LOCALHOST+"company/");
    setCompany(data.data[0]);
  };


  const clear = () => {
    setSearch("");
    document.getElementById("formSearch").reset();
  };

  const findCustomer = (e) => {
    let getFindCustomer = e.target.value;
    let lowerGetFindCustomer = getFindCustomer.toLowerCase();
    setSearch(lowerGetFindCustomer);
  };
  const getOffer = async () => {
    const data = await axios.get(process.env.REACT_APP_LOCALHOST + "offer/");
    setOffer(data.data);
  };

  const sednOffer = async (use) => {
    await axios.post(process.env.REACT_APP_LOCALHOST + "api/auth/sendOffer", {
      data: use,
      company: company,
    });
    setShowToastSend(true);
  };
  
  useEffect(() => {
    getOffer();
    getCompany();
  }, []);

  console.log(offer)

  return (
    <span className="tw-flex tw-w-full">
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Wysyłanie"
        bodyText="Ofertę wysłano "
        showWindow={showToastSend}
        setShowWindow={setShowToastSend}
      />
      <div className="colNav">
        <Menu />
      </div>

      <Container>
        <div className="textTopUser">
          <UserLogin getIdUser={getIdUser} />
        </div>
        <div className="customerBoxPadding">
          <div>
          <p className="tittle">Przeglądaj ofery</p>
          <hr />
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

          <Table
            variant="light"
            striped
            bordered
            hover
            className="tableFontSize"
          >
            <tbody>
              {offer
                .filter((use) => {
                  return (
                    (search === ""
                      ? use
                      : use.customer?.name.toLowerCase().includes(search) ||
                        use.customer?.email.toLowerCase().includes(search) ||
                        use.customer?.phone.toLowerCase().includes(search)) &&
                    use.user?._id === props.user._id
                  );
                })
                .map((use, index) => (
                  <tr key={index}>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.data.slice(0, 10)}
                    </td>
                    <td className="tableFontSize">{use.customer?.name}</td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.car?.make} {use.car?.model} {use.car?.version}{" "}
                      {use.car?.engine_capacity}ccm {use.car?.engine_power}KM{" "}
                      {use.car?.fuel_type}
                    </td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.customer?.email}
                    </td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.customer?.phone}
                    </td>

                  
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      <Button
                           className="btn-small"
                        variant="outline-success"
                        size="sm"
                      
                        onClick={(e) => {
                          sednOffer(use);
                        }}
                      >
                     Wyślij
                      </Button>
                    </td>
                    <td>
                    <Button
                      
                      variant="outline-success"
                      size="sm"
                        className="btn-small"
                        as={Link}
                        to="/offertscar"
                        state={{
                          car: use.car,
                          customer: use.customer,
                          user: props.user,
                          addEquipOnePrice: use.addEquipOnePrice,
                          scontoCash: use.scontoCash,
                          addEquipOneName: use.addEquipOneName,
                          addEquipThreeName: use.addEquipThreeName,
                          addEquipThreePrice: use.addEquipThreePrice,
                          addEquipTwoName: use.addEquipTwoName,
                          addEquipTwoPrice: use.addEquipTwoPrice,
                          addInfo: use.addInfo,
                        }}
                      >
                    Podgląd
                      </Button>
                    </td>
                     
                    
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        </div>
      </Container>
  
    </span>
  );
};

export default Offers;
