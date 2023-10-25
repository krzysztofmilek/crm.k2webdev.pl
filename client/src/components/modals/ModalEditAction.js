import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Link } from "react-router-dom";
import OverlayTrig from "../overLay/OverlayTrig";
import { Button } from "react-bootstrap";
import ModalCloseActions from "./ModalCloseActions";
import "../view/action/Action.css"

function ModalEditActions(props) {
  const [show, setShow] = useState(false);
  const [token, setToken] = useState({});

  const getIdUser = JSON.parse(localStorage.getItem("user"));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(props);

  useEffect(() => {
    setToken(getIdUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tw-flex tw-w-full  tw-flex-col  tw-items-center ">
      <OverlayTrig
        imagePath="https://img.icons8.com/external-flatart-icons-outline-flatarticons/35/null/external-user-cv-resume-flatart-icons-outline-flatarticons.png"
        toltip="Szczegóły akcji"
        onClick={(e) => {
          handleShow(false);
        }}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header  >
          <Modal.Title>Szczegóły zadania</Modal.Title>
          <button type="button" className="btn-close"
                         onClick={handleClose}>
                     <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/delete-sign.png" alt="delete-sign"/> 
                    </button>
        </Modal.Header>
 
        <Modal.Body>
          <div className="">
            <div className="formAction ">
              <div className="">
                <div className="inputBlock">
                  <p className=" titleInputActionInfo">Imię nazwisko</p>
                  <input
                  className="inputAction"
                    type="text"
                    id="nameCustomer"
                    name="nameCustomer"
                    readOnly
                    defaultValue={props.idAction?.customer?.name}
                  />
                </div>
                <div className="inputBlock">
                  <p className="titleInputActionInfo">Nazwa firmy: </p>
                  <input
                className="inputAction"
                    type="text"
                    name="status"
                    id="status"
                    readOnly
                    defaultValue={props.idAction?.customer?.nameCompany}
                  />
                </div>

                <div className="inputBlock">
                  <p className="titleInputActionInfo">Telefon:</p>
                  <input
                    className="inputAction"
                    type="text"
                    id="phoneCustomer"
                    readOnly
                    name="phoneCustomer"
                    defaultValue={props.idAction?.customer?.phone}
                  />
                </div>

                <div className="inputBlock">
                  <p className="titleInputActionInfo">Email:</p>
                  <input
                    className="inputAction"
                    type="text"
                    name="emailCustomer"
                    id="emailCustomer"
                    readOnly
                    defaultValue={props.idAction?.customer?.email}
                  />
                </div>
              </div>
              <div className="buttonAction tw-pt-3">
                {props?.idAction.fileName ? (
                  <Button
                    variant="outline-success"
             
                    as={Link}
                    to={
                      process.env.REACT_APP_LOCALHOST +
                      `import/importCustomerFile/` +
                      props.idAction.fileName
                    }
                    target="_blank"
                  >
                    Pokaż załącznik
                  </Button>
                ) : (
                  ""
                )}
                &nbsp;
                {props.idAction?.offer?.fileName ? (
                  <Button
                    variant="outline-success"
                  
                    as={Link}
                    to={
                      process.env.REACT_APP_LOCALHOST +
                      `offers/` +
                      props.idAction.offer.fileName
                    }
                    target="_blank"
                  >
                    Pokaż ofertę
                  </Button>
                ) : (
                  ""
                )}
                {/*  <Button variant="outline-success" disabled={props.showOffer}>
              Pokaż ofertę
            </Button> */}
              </div>
              <div className="inputFlex">
                <div className="inputBlock">
                  <p className="titleInputActionInfo">Informacje dodatkowe:</p>
                  <textarea
                    className="inputAction"
                    name="inputArea"
                    id="inputArea"
                    readOnly
                    defaultValue={props.idAction?.information}
                  ></textarea>
                </div>
              </div>
              <div className="buttonAction">
                <Button
                  variant="outline-success"
                  as={Link}
              
                  to="/action"
                  state={{
                    customer: props.idAction.customer,
                    token: token,
                    idAction: props.idAction._id,
                  }}
                  onClick={(e) => {}}
                >
                  Nowa Akcja
                </Button>
                <span>&nbsp;</span>
                <ModalCloseActions
                 getAct={props.getAct}
                  post={props.idAction}
                  closeAction={props.closeAction}
             /*      showAction={props.showAction}
                 
                */
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>  <Button variant="outline-secondary" onClick={handleClose}>
            Anuluj
          </Button></Modal.Footer>
      </Modal>
    </div>
  );
}
export default ModalEditActions;
