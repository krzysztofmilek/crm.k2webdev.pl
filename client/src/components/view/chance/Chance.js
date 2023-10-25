import React from "react";
import { Container } from "react-bootstrap";
import Menu from "../menu/Menu";
import UserLogin from "../auth/UserLogin";
import ChanceTable from "./ChanceTable";

const Chance = (props) => {


const tokenData = props.tokenData;
const getIdUser = JSON.parse(localStorage.getItem("user"));

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
        <div>
        <p className="tittle">Pobierz Klienta</p>
        <hr />
      <ChanceTable  tokenData={tokenData}/>
      </div>
      </div>
      </Container>
 
    {/*   <div className="tw-w-[200px]">TEST</div> */}
    </span>
  );
};
export default Chance;
