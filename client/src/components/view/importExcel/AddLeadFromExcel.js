import React, {  useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./AddLeadFromExcel.css";

import { Toast, ToastContainer } from "react-bootstrap";
import Toasts from "../../toasts/Toasts";

const AddLeadFromExcel = (props) => {
  const [showToast, setShowToast] = useState(false);
  const [showToastSuccess, setShowToastSuccess] = useState(false);

  const handleSubmit = async (e) => {
    const file = document.getElementById("file-field").files[0];
    try {
      if (file === undefined || file === null || !file) {
        setShowToast(true);
        return;
      } else {
        const url = process.env.REACT_APP_LOCALHOST+"upload/uploadFiles";
        const config = {
          headers: {
            "content-type": "multipart/form-data" ,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", 
          },
        };
        const data = new FormData();
        data.append("kolaborant", file);
        axios.post(url, data, config);
        setShowToastSuccess(true);
      }
    } catch (error) {
      console.log("błąd 500", error.message);
      return;
    }
  };

  return (
    <div>
<Toasts
bodyBackground="danger"
className="text-white"
title="UWAGA"
bodyText="Wybierz plik"
showWindow={showToast}
setShowWindow={setShowToast}

/>

      <ToastContainer
        className="p-3"
        position="middle-end"
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToastSuccess(false)}
          show={showToastSuccess}
          delay={4000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto text-black ">Success</strong>
          </Toast.Header>
          <Toast.Body className={"text-white"}>
            <strong>Dodano pomyślnie</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <p className="tittle">Załaduj plik - giełda</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <Form.Control
          id="file-field"
          type="file"
          name="kolaborant"
          accept=".xlsx, .xls"
        />
        <p className="getRight top10 red">
          {props.lengthCollection ? (
            "Przypisz wszystkie leady do Użytkowników"
          ) : (
            <input
              type="submit"
              value="Wyslij Dane"
              className="btn btn-outline-success"
            />
          )}
    
        </p>
      </form>
    </div>
  );
};

export default AddLeadFromExcel;
