import { useState, useEffect } from "react";
import React from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import ModalDeleteCustomer from "../../modals/ModalDeleteCustomer";
import ModalEditCustomer from "../../modals/ModalEditCustomer";
import Menu from "../menu/Menu";
import CustomerCard from "./CustomerCard";
import "./Customers.css";
import Footer from "../footer/Footer";
import OverlayTrig from "../../overLay/OverlayTrig";

const Customers = (props) => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const getCustomers = async () => {
    const customer = await axios.get(process.env.REACT_APP_LOCALHOST+"customer/");
    setCustomers(customer.data);
  
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

  const getCustomerData = (cust) => {
    setCustomer(cust);
   // setShow(true);
    setShowButton(true);
  };

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line
  }, []);
  return (
    <span className="tw-flex  tw-flex-col  tw-justify-center tw-items-center">
    <Container className="" >
      <Menu />

      <div className="tw-w-full tw-min-h-[90%] ">
      <div className="conatinerDataCompany">
        <p className="tittle">Dodaj nowego Klienta</p>
        <hr />
        <CustomerCard
          getCustomers={props.getCustomers}
          getCustomer={customer}
          show={show}
          showButton={showButton}
          setShow={setShow}
          showClass="hidden"
          showClassButton="show"
        />
           </div>
      </div>
      <div className="down">
        <p className="tittle">Wyszukaj Klienta</p>
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
        <Table variant="light" striped bordered hover>
          <thead>
            <tr>
              <td>
                <div className="inputGroup">
                  <form id="formSearch" className="formSearch">
                    <span className="imgSearchBackground">
                      
                      <img
                        className="imgSearch"
                        src="https://img.icons8.com/small/null/find-user-male.png"
                        alt="znajdz"
                      />
                    </span>
                    <input
                      type="text"
                      className="input_Search"
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
                </div>
              </td>
            </tr>
          </thead>
        </Table>

        <p className="tittle">Lista Klientów</p>
        <hr />

        <Table variant="light" striped bordered hover className="fullWidth">
          <tbody>
            {customers
              .filter((cust) => {
                return search.toLowerCase() === ""
                  ? cust
                  : cust.name.toLowerCase().includes(search) ||
                      cust.email.toLowerCase().includes(search);
              })
              .map((cust, index) => (
                <tr key={index}>
                  <td  id="id1customer" className="col-3 tableFontSize">{cust.name}</td>
                  <td  id="id2customer" className="col-2 tableFontSize">{cust.phone}</td>
                  <td  id="id3customer" className="col-2 tableFontSize">{cust.email}</td>
                  <td  id="id4customer" className="">
                  <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
                    <OverlayTrig
                    
                      imagePath="https://img.icons8.com/windows/30/checked-user-male--v1.png"
                      toltip="Pobierz Dane Klienta"
                      onClick={(e) => {
                        getCustomerData(cust);
                      }}
                     
                    />
                    </div>
                  </td>
                  <td  id="id5customer" className="">
                    <ModalEditCustomer
                      cust={cust}
                      getCustomers={getCustomers}
                    />
                  </td>
             
                  <td id="id6customer" className="getCenter">
                    <ModalDeleteCustomer post={cust} getUsers={getCustomers} />
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
export default Customers;
