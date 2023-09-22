import React from 'react';
import NavBar from '../menu/NavBar';
import "./Analitics.css";
import AnaliticUserTop from './AnaliticUserTop';
import { Container } from "react-bootstrap";
const Analitics = () => {

  return (
    
      <Container>
        <NavBar />
        <div className="up">
        <AnaliticUserTop />
      </div>
     
      </Container>
  )

}
export default Analitics;
