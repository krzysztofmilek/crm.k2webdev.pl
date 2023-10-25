import React from "react";
import Menu from "../menu/Menu";
import { Container } from "react-bootstrap";
import "./Settings.css";
import SettingsInfo from "./SettingsInfo";
import UserLogin from "../auth/UserLogin";


const Settings = () => {
  const getIdUser = JSON.parse(localStorage.getItem("user"));
  return (
    <span className="">
    <span className="tw-flex">
      <div className="colNav">
        <Menu />
      </div>

      <Container className="">
        <div className="textTopUser"><UserLogin getIdUser={getIdUser} /></div>
      <SettingsInfo />
      </Container>
</span>
      </span>
    
  );
};
export default Settings;
