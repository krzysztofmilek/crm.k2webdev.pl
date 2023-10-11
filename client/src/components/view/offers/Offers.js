import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Menu from "../menu/Menu";
import Footer from "../footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import Toasts from "../../toasts/Toasts";
import OverlayTrig from "../../overLay/OverlayTrig";
 import  "./Offers.css" 

const Offers = (props) => {
  const [offer, setOffer] = useState([]);
  const [search, setSearch] = useState([]);
  const [showToastSend, setShowToastSend] = useState(false);

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
    });
    setShowToastSend(true);
  };
  useEffect(() => {
    getOffer();
  }, []);

  return (
    <span className="tw-flex tw-flex-col tw-justify-center tw-items-center">
      <Toasts
        bodyBackground="success"
        className="text-white"
        title="Wysyłanie"
        bodyText="Ofertę wysłano "
        showWindow={showToastSend}
        setShowWindow={setShowToastSend}
      />
      <Container>
        <Menu />
        <div className="conatinerDataCompany">
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
                      {use.car.make} {use.car.model} {use.car.version}{" "}
                      {use.car.engine_capacity}ccm {use.car.engine_power}KM{" "}
                      {use.car.fuel_type}
                    </td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.customer?.email}
                    </td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      {use.customer?.phone}
                    </td>

                    <td className="tableFontSize tw-items-center tw-justify-center">
                      <a
                        href={process.env.REACT_APP_LOCALHOST+`/offers/${use.fileName}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <OverlayTrig
                          imagePath="https://img.icons8.com/officel/40/pdf.png"
                          toltip="Podgląd pdf"
                        />
                      </a>
                    </td>
                    <td className="tableFontSize tw-items-center tw-justify-center">
                      <Button
                        variant="link"
                        size="sm"
                        className="btn-small smallSize"
                                   >
                        <OverlayTrig 
                          imagePath="https://img.icons8.com/pastel-glyph/64/send.png"
                          toltip="Wyslij ofertę"
                          onClick={(e) => {
                            sednOffer(use);
                          }}
                        />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="link"
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
                        <OverlayTrig
                          imagePath="https://img.icons8.com/pulsar-line/48/preview-pane.png"
                          toltip="Podgląd oferty"
                        />
                      </Button>
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

export default Offers;
