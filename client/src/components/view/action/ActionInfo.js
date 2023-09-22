import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalCloseActions from "../../modals/ModalCloseActions";
import ModalCloseWindowAction from "../../modals/ModalCloseWindowAction";


import "./Action.css";

const ActionInfo = (props) => {
  const [token, setToken] = useState({});

  const getIdUser = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    setToken(getIdUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="showTask">
      <span className="tw-flex tw-justify-end">
        {" "}
        <ModalCloseWindowAction closeAction={props.closeAction} />
      </span>
      <div className="formAction ">
        <div className="inputFlex">
          <div className="inputBlock">
            <div className="titleInputActionInfo">
              Imię i nazwisko os. kontaktowej:
            </div>
            <input
              className="inputAction"
              type="text"
              id="nameCustomer"
              name="nameCustomer"
              readOnly
              defaultValue={props.idAction.customer?.name}
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
              defaultValue={props.idAction.customer?.nameCompany}
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
              defaultValue={props.idAction.customer?.phone}
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
              defaultValue={props.idAction.customer?.email}
            />
          </div>
        </div>
        <div className="inputFlex">
          <div className="inputBlock getCenterActionInfo"></div>
          <div className="inputBlock getCenterActionInfo">
            <Button
              variant="outline-success"
              disabled={props.showAttachment}
              as={Link}
              to={
                process.env.REACT_APP_LOCALHOST +
                `import/importCustomerFile/` +
                props.idAction.fileName
              }
              style={{ pointerEvents: props.showAttachment ? "none" : "auto" }}
              target="_blank"
            >
              Pokaż załącznik
            </Button>
            &nbsp;
            <Button
              variant="outline-success"
              disabled={props.showOffer}
              as={Link}
              to={
                process.env.REACT_APP_LOCALHOST +
                `offers/` +
                props.idAction.offer?.fileName
              }
              style={{ pointerEvents: props.showOffer ? "none" : "auto" }}
              target="_blank"
            >
              Pokaż ofertę
            </Button>
            {/*  <Button variant="outline-success" disabled={props.showOffer}>
              Pokaż ofertę
            </Button> */}
          </div>
        </div>
        <div className="inputFlex">
          <div className="inputBlock">
            <p className="titleInputActionInfo">Informacje dodatkowe:</p>
            <textarea
              className="inputAction"
              name="inputArea"
              id="inputArea"
              readOnly
              defaultValue={props.idAction.information}
            ></textarea>
          </div>
        </div>
        <div className="inputFlex">
          <div className="inputBlock getCenterActionInfo">12 </div>
          <div className="inputBlock getCenterActionInfo">
            <Button
              variant="outline-success"
              as={Link}
              disabled={props.showAction}
              to="/action"
              state={{ customer: props.idAction.customer, token: token, idAction: props.idAction._id,}}
              style={{ pointerEvents: props.showAction ? "none" : "auto" }}
              onClick={(e) => {
                            }}
            >
              Nowa Akcja
            </Button>
            <span>&nbsp;</span>
            <ModalCloseActions
              post={props.idAction}
              showAction={props.showAction}
              getAct={props.getAct}
              closeAction={props.closeAction}
        
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionInfo;
