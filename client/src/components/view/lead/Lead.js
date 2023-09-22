import React from 'react';
import Menu from '../menu/Menu';
import CustomerCard from "../customers/CustomerCard";
import { Container } from 'react-bootstrap';
import Footer from '../footer/Footer';


import { useLocation } from "react-router-dom";


const Lead = () => {
  let { state } = useLocation();
 

  return (
    <span className="tw-flex tw-flex-col tw-justify-center tw-items-center">
    <Container>

        <Menu />
        <div className="conatinerDataCompany">
        <p className="tittle">Dodaj nowego Klienta</p>
        <hr />
        <CustomerCard showClassButton="hidden" state={state}/>
       
</div>
    </Container>
   <Footer />
   </span>
  )

}
export default Lead;
