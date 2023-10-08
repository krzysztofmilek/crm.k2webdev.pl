import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ModalDeleteChance from "../../modals/ModalDeleteChance";
import OverlayTrig from "../../overLay/OverlayTrig";
import { Link } from "react-router-dom";

const ChanceTable = (props) => {
  const [chance, setChance] = useState([]);
    // eslint-disable-next-line
  const [simpleChance, setSimpleChance] = useState({});
  const [idArkusz, setIdArkusz] = useState({});
  const [lengthCollection, setLengthCollection] = useState({})



  const getChanceData = async (act) => {
   await axios.patch(process.env.REACT_APP_LOCALHOST+"temp/delete/" + idArkusz , {tabId: [act]});
    getChance();
    setLengthCollection(lengthCollection-1)
    if (lengthCollection <= 1){
      await axios.delete(process.env.REACT_APP_LOCALHOST+"temp/deleteCollection/" + idArkusz ); 
    } 
  };

  const getChance = async () => {
    const viewChance = await axios.get(process.env.REACT_APP_LOCALHOST+"temp");
    const sheet = viewChance.data[0]?.Arkusz1;
    const id_sheet = viewChance.data[0]?._id;
    setIdArkusz(id_sheet);
    setChance(sheet);
    setLengthCollection(sheet?.length)

  };

  useEffect(() => {
    getChance();
    // eslint-disable-next-line
  }, []);

  return (
    <span>
      <Table bordered>
        <tbody>
          {chance?.map((act, index) => (
            <tr key={index}>
              <td id="id1chance">{act.A}</td>
              <td id="id2chance">{act.B}</td>
              <td id="id3chance">{act.C}</td>
              <td id="id4chance">{act.D}</td>
     
              <td id="id5chance">
                <ModalDeleteChance
                  act={act._id}
                  _idArkusz={idArkusz}
                  getChance={getChance}
                />
              </td>
              {/*    </>
              ) : ( */}
              <td id="id6chance">
                <Link to="/lead"
                state={{ customer: act }}> 
                <OverlayTrig
                  imagePath="https://img.icons8.com/windows/30/null/checked-user-male--v1.png"
                  toltip="Pobierz"
                  onClick={(e) => {
                    getChanceData(act);
                  }}
                
                /></Link>
              </td>
              {/*  )} */}
            </tr>
          ))}
        </tbody>
      </Table>
    </span>
  );
};

export default ChanceTable;
