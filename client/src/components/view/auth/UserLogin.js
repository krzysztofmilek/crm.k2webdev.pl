import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import OverlayTrig from "../../overLay/OverlayTrig";
import axios from "axios";

const UserLogin = (props) => {

  const [lengthCollection, setLengthCollection] = useState(null);

  const getLenght = async () => {
    const viewChance = await axios.get(
      process.env.REACT_APP_LOCALHOST + "temp"
    );
    const arkusz1 = viewChance.data[0]?.Arkusz1;
    const lenghtArkusz = arkusz1?.length;
    setLengthCollection(lenghtArkusz);
  };
  useEffect(() => {
    getLenght();
  }, []);
  return (
    <div className="loginNavBar tw-flex">

    


      <div className="tw-flex  tw-justify-start tw-items-center ">
      <Link to="/chance">
 
      <img
            className="imgMenuLeft"
            src="https://img.icons8.com/pastel-glyph/64/e9e6df/combo-chart--v2.png"  alt="analitics"
          />
  
       
      </Link>
            <span className="tw-border-1 tw-h-4 tw-w-4 tw-rounded-full tw-text-center tw-bg-red-600 tw-text-white tw-text-xs">
              {lengthCollection ? lengthCollection : "0"}
            </span>
          </div>
          <div className="tw-w-full   tw-justify-end tw-flex blow ">
        {!props.getIdUser ? "" : props.getIdUser.name}&nbsp;&nbsp;
        <Link to="/logout">
          <OverlayTrig
            class="imgSetting"
            placement="left"
            imagePath="https://img.icons8.com/ios-glyphs/60/e9e6df/logout-rounded--v1.png"
            toltip="Wyloguj"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
