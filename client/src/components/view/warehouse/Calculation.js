import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Calculation = (props) => {
  //eslint-disable-next-line
  const [priceCar, setPriceCar] = useState([]);
  //eslint-disable-next-line
  const [car, setCar] = useState([]);
  const [data, setData] = useState([]);
  const [addEquip, setAddEquip] = useState([]);
  const [action, setAction] = useState([]);
  const [newCustomerAdd, setNewCustomerAdd] = useState(props.newCust);

  const getPrice = (e) =>
    setPriceCar((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  // eslint-disable-next-line
  const getValue = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  //eslint-disable-next-line
  const getAddEquip = (e) => {
    setAddEquip({
      ...addEquip,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setCar(props.car);
    setAction(props.action);

    //eslint-disable-next-line
  }, []);

  return (
    <span>
      <div className="fullFlex">
        <div className="conatinerDataCompany tw-text-left tw-m-1">
          <p className="tittle">Kalkulacja</p>
          <hr />
          <Form.Floating className="mb-1">
            <Form.Control
              defaultValue={props.car.price}
              name="price"
              onChange={getPrice}
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc ",
              }}
            />
            <label htmlFor="price">Cena brutto</label>
          </Form.Floating>

          <Form.Floating className="mb-1">
            <Form.Control
              name="scontoCash"
              onChange={getPrice}
              defaultValue={priceCar?.scontoCash ? props.car.price : 0}
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc ",
              }}
            />
            <label htmlFor="scontoCash">Rabat gotówkowy</label>
          </Form.Floating>
          <Form.Floating className="mb-1">
            <Form.Control
              onChange={getPrice}
              name="summary"
              defaultValue={
                priceCar?.scontoCash
                  ? props.car.price - priceCar?.scontoCash
                  : props.car.price
              }
              style={{
                borderRadius: "5px",
                border: "1px solid #ccc ",
              }}
            />
            <label htmlFor="summary">Cena brutto po rabacie</label>
          </Form.Floating>
        </div>
        {/*  <div className="conatinerDataCompany tw-text-left tw-m-1 ">
          <p className="tittle">Doposażenie</p>
          <hr />
          <div className="tw-flex">
            <Form.Floating className="mb-1 me-2">
              <Form.Control
                onChange={getAddEquip}
                name="addEquipOneName"
                placeholder="name@example.com"
                className="inputAddEqip"
              
              />
              <label htmlFor="addEquip">Wpisz doposażenie</label>
            </Form.Floating>

            <Form.Floating className="mb-1">
              <Form.Control
                name="addEquipOnePrice"
                onChange={getAddEquip}
                placeholder="name@example.com"
                className="inputAddEqiupPrice"
              />
              <label htmlFor="addEquipOnePrice">Cena brutto</label>
            </Form.Floating>
          </div>
          <div className="tw-flex">
            <Form.Floating className="mb-1 me-2">
              <Form.Control
                onChange={getAddEquip}
                className="inputAddEqip"
                name="addEquipTwoName"
                placeholder="name@example.com"
           
              />
              <label htmlFor="addEquip">Wpisz doposażenie</label>
            </Form.Floating>

            <Form.Floating className="mb-1">
              <Form.Control
                name="addEquipTwoPrice"
                onChange={getAddEquip}
                placeholder="name@example.com"
                className="inputAddEqiupPrice"
           
              />
              <label htmlFor="addEquipTwoPrice">Cena brutto</label>
            </Form.Floating>
          </div>
          <div className="tw-flex">
            <Form.Floating className="mb-1 me-2">
              <Form.Control
                onChange={getAddEquip}
                name="addEquipThreeName"
                placeholder="name@example.com"
                className="inputAddEqip"
             
              />
              <label htmlFor="addEquip">Wpisz doposażenie</label>
            </Form.Floating>

            <Form.Floating className="mb-1">
              <Form.Control
                name="addEquipThreePrice"
                onChange={getAddEquip}
                placeholder="name@example.com"
                className="inputAddEqiupPrice"
             
              />
              <label htmlFor="addEquipThreePrice">Cena brutto</label>
            </Form.Floating>
          </div>
        </div> */}
      </div>

      <div className="conatinerDataCompany tw-text-left tw-m-1">
        <p className="tittle">Dodatkow informacje ( drukowane na ofercie )</p>
        <hr />
        <Form.Floating className="mb-1">
          <Form.Control
            as="textarea"
            name="addInfo"
            onChange={getAddEquip}
            placeholder="name@example.com"
            style={{
              borderRadius: "5px",
              border: "1px solid #ccc ",
              height: "100px",
            }}
          />
          <label htmlFor="addInfo">Dodatkowe informacje</label>
        </Form.Floating>

        <div className="getRight">
          <Button
            variant="outline-success"
            as={Link}
            to="/offertscar"
            state={{
              car: props.car,
              customer: props?.cust,
              newCustomer: newCustomerAdd,
              addEquipOneName: addEquip.addEquipOneName,
              addEquipOnePrice: addEquip.addEquipOnePrice,
              addEquipThreeName: addEquip.addEquipThreeName,
              addEquipThreePrice: addEquip.addEquipThreePrice,
              addEquipTwoName: addEquip.addEquipTwoName,
              addEquipTwoPrice: addEquip.addEquipTwoPrice,
              addInfo: addEquip.addInfo,
              scontoCash: priceCar.scontoCash,
              action: action,
            }}
          >
            Podgląd oferty
          </Button>
        </div>
      </div>
    </span>
  );
};
export default Calculation;
