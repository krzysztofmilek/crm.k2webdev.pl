import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserTable.css";
import { Table } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import OverlayTrig from "../../overLay/OverlayTrig";

import ModalDeletePlain from "../../modals/ModalDeletePlain";

const UserTable = (props) => {
  const [data, setData] = useState([]);
  const [onchangeData, setOnchangeData] = useState({});
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const [plain, setPlain] = useState({});

  const getData = async () => {
    const viewPlain = await axios.get(process.env.REACT_APP_LOCALHOST+"plain/");
    setData(viewPlain.data);
  };

  const getPlain = (e) =>
    setOnchangeData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const updatePlain = async (use) => {
    if (!onchangeData) return;
    const updatePlainData = await axios.put(
      process.env.REACT_APP_LOCALHOST+"plain/edit/" + use,
      {
        _id: use._id,
        january: onchangeData.january,
        february: onchangeData.february,
        march: onchangeData.march,
        april: onchangeData.april,
        may: onchangeData.may,
        june: onchangeData.june,
        july: onchangeData.july,
        august: onchangeData.august,
        september: onchangeData.september,
        october: onchangeData.october,
        november: onchangeData.november,
        december: onchangeData.december,
      }
    );
    setPlain(updatePlainData.data);
    getData();
    setShow(true);
    setOnchangeData(null);
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          bg="danger"
        >
          <Toast.Header>
            {/*  <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2 "
              alt=""
            /> */}
            <strong className="me-auto">Uaktualniono plan</strong>
          </Toast.Header>
          <Toast.Body> Uaktualniono plan</Toast.Body>
        </Toast>
      </ToastContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imię Nazwisko</th>
            <th>Styczeń</th>
            <th>Luty</th>
            <th>Marzec</th>
            <th>Kwiecień</th>
            <th>Maj</th>
            <th>Czerwiec</th>
            <th>Lipiec</th>
            <th>Sierpień</th>
            <th>Wrzesień</th>
            <th>Październik</th>
            <th>Listopad</th>
            <th>Grudzień</th>
            <th>Suma</th>
            <th>Ustaw</th>
            <th>Usuń</th>
          </tr>
        </thead>
        <tbody>
          {data.map((use, index) => (
            <tr key={index} >
              <td className="inputUserTable">
                <input
                disabled
                className="inputUserTable"
                  name="name"
                  defaultValue={use.name || ""}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="january"
                  defaultValue={use.january || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="february"
                  defaultValue={use.february || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="march"
                  defaultValue={use.march || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="april"
                  defaultValue={use.april || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="may"
                  defaultValue={use.may || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="june"
                  defaultValue={use.june || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="july"
                  defaultValue={use.july || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="august"
                  defaultValue={use.august || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="september"
                  defaultValue={use.september || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="october"
                  defaultValue={use.october || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="november"
                  defaultValue={use.november || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                <input
                  className="inputUserTableMonth"
                  name="december"
                  defaultValue={use.december || 0}
                  type="text"
                  onChange={getPlain}
                />
              </td>
              <td>
                {use.january +
                  use.february +
                  use.march +
                  use.april +
                  use.may +
                  use.june +
                  use.july +
                  use.august +
                  use.september +
                  use.october +
                  use.november +
                  use.december}
              </td>
              <td>
                <OverlayTrig
                  imagePath="https://img.icons8.com/ultraviolet/25/null/checked--v1.png"
                  toltip="Ustaw plan"
                  onClick={(e) => {
                    updatePlain(use._id);
                  }}
                />
              </td>
              <td>
                <ModalDeletePlain post={use} getData={getData} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>{" "}
    </>
  );
};

export default UserTable;
