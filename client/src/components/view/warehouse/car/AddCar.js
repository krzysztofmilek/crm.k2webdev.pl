import React from "react";

import { Container } from "react-bootstrap";
import Menu from "../../menu/Menu";
import Footer from "../../footer/Footer";
import "../Warehouse.css";
import AddCarPanel from './AddCarPanel'

const Warehouse = (props) => { 



  return (
    <span className="tw-flex tw-flex-col tw-justify-center tw-items-center">
      <Container>
        <Menu />
  <AddCarPanel />
  
      </Container>

      <Footer />
    </span>
  );
};

export default Warehouse;
