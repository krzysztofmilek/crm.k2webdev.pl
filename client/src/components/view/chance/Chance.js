import React from "react";
import { Container } from "react-bootstrap";
import Menu from "../menu/Menu";

import Footer from "../footer/Footer";
import ChanceTable from "./ChanceTable";

const Chance = (props) => {


const tokenData = props.tokenData;


  return (
    <span className="tw-flex  tw-flex-col tw-justify-center tw-items-center chanceContainer">
      <Container>
        <Menu />
     
        <div className="conatinerDataCompany">
        <p className="tittle">Pobierz Klienta</p>
        <hr />
      <ChanceTable  tokenData={tokenData}/>
      </div>
      </Container>
      <Footer />
    </span>
  );
};
export default Chance;
