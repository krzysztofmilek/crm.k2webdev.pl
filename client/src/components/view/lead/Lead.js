import React from 'react';
import Menu from '../menu/Menu';
import CustomerCard from "../customers/CustomerCard";
import { Container } from 'react-bootstrap';
import Footer from '../footer/Footer';
import UserLogin from "../auth/UserLogin";

import { useLocation } from "react-router-dom";


const Lead = () => {
  let { state } = useLocation();
  const getIdUser = JSON.parse(localStorage.getItem("user"));

  return (
    <span className="">
      <span className="tw-flex">
        <div className="colNav">
          <Menu />
        </div>

        <Container className="">
          <div className="textTopUser"><UserLogin getIdUser={getIdUser} /></div>
<div className="twoSelectBoxFlex">
          <div className="newCustomerContainer">
    
        <p className="tittle">Dodaj nowego Klienta</p>
        <hr />
        <CustomerCard showClassButton="show" showClass="show" state={state}/>
       

</div>
</div>
    </Container>
  {/*   <div className="tw-w-[200px]">TEST</div> */}
   </span>
   </span>
  )

}
export default Lead;
