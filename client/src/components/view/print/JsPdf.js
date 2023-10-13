import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button, } from "react-bootstrap";
import "./Print.css";

import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const JsPdf = (props) => {

  const componentRef = useRef();
  const getDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}_${hours}-${minutes}`;
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Oferta_${props.state.customer?.name}_${getDate()}.pdf`,
    onAfterPrint: () => {
      addOffer();
      generateAndSavePDF();
    },
  });



  const addOffer = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_LOCALHOST}offer/add`, {
        data: new Date(),
        addEquipOneName: props.state.addEquipOneName,
        addEquipOnePrice: props.state.addEquipOnePrice,
        addEquipTwoName: props.state.addEquipTwoName,
        addEquipTwoPrice: props.state.addEquipTwoPrice,
        addEquipThreeName: props.state.addEquipThreeName,
        addEquipThreePrice: props.state.addEquipThreePrice,
        scontoCash: props.state.scontoCash,
        addInfo: props.state.addInfo,
        fileName: `Oferta_${props.state.customer?.name}_${getDate()}.pdf`,
        status: "open",
        user: props.user._id,
        customer: props.state.customer?._id,
        car: props.state.car._id,
        action: props.state.action?._id,
      });
      console.log("Oferta została dodana:", response.data);
    } catch (error) {
      console.error("Błąd podczas dodawania oferty:", error);
    }
  };

  const generateAndSavePDF = () => {
    const doc = new jsPDF();
    const elementToPdf = document.getElementById("getElementToPdf");
    const htmlContent = elementToPdf.innerHTML;
    doc.autoTable({ html: htmlContent });
    doc.text(20,30, `${props.state.customer?.name}`)
    doc.save(`Oferta_${props.state.customer?.name}_${getDate()}.pdf`);
  };

;


  return (
    <div ref={componentRef}>
      <div  className="pad10" id="getElementToPdf">
        
       Ala ma kota
      </div>
      <Button variant="outline-success" onClick={handlePrint}>
        Wydrukuj PDF
      </Button>
    </div>
  );
};

export default JsPdf;