import React from "react";

import { Container } from "react-bootstrap";
import Menu from "../../menu/Menu";

import "../Warehouse.css";
import AddCarPanel from './AddCarPanel'
import UserLogin from "../../auth/UserLogin";


const Warehouse = (props) => { 

  const getIdUser = JSON.parse(localStorage.getItem("user"));

  return (
    <span className="tw-flex tw-w-full">
    <div className="colNav">
      <Menu />
    </div>

    <Container>
    <div className="textTopUser"><UserLogin getIdUser={getIdUser} /></div>
  <AddCarPanel />
  
      </Container>

  
    </span>
  );
};

export default Warehouse;
