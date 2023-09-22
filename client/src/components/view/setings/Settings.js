import React from "react";
import Menu from "../menu/Menu";
import { Container } from "react-bootstrap";
import "./Settings.css";
import SettingsInfo from "./SettingsInfo";
import Footer from "../footer/Footer";

const Settings = () => {
  return (
    <span className="tw-flex tw-flex-col tw-justify-center tw-items-center">
    <Container>
      <Menu />
      <SettingsInfo />
      </Container>
      <Footer />
      </span>
    
  );
};
export default Settings;
