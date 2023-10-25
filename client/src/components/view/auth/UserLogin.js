import React from "react";
import { Link } from "react-router-dom";
import OverlayTrig from "../../overLay/OverlayTrig";

const UserLogin = (props) => {
  return (
    <div className="loginNavBar">

    
      <div className=" tw-justify-end tw-flex ">
        {!props.getIdUser ? "" : props.getIdUser.name}&nbsp;&nbsp;
        <Link to="/logout">
          <OverlayTrig
            class="imgSetting"
            placement="left"
            imagePath="https://img.icons8.com/ios-glyphs/20/null/logout-rounded--v1.png"
            toltip="Wyloguj"
          />
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
