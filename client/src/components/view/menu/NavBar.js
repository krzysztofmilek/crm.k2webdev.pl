import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import OverlayTrig from "../../overLay/OverlayTrig";

function NavBar() {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [lengthCollection, setLengthCollection] = useState(null);

 
  const getLenght = async () => {
    const viewChance = await axios.get(process.env.REACT_APP_LOCALHOST+"temp");
    const arkusz1 = viewChance.data[0]?.Arkusz1;
    const lenghtArkusz = arkusz1?.length;
    setLengthCollection(lenghtArkusz); 
     };

  useEffect(() => {
    getLenght();
  }, []);

  return (
    <div className="getCenter">
      <div className="loginNavBar">
        <span className=" tw-justify-end tw-flex tw-flex-row tw-p-3">
          {!userToken ? "" : userToken.name}

          {!userToken.access ? " :  Użytkownik" : " :  Administrator  "}
          <Link to="/logout">
            <OverlayTrig
              class="imgSetting"
              placement="right"
              imagePath="https://img.icons8.com/ios-glyphs/20/null/logout-rounded--v1.png"
              toltip="Wyloguj"
            />
          </Link>
        </span>
      </div>
      <div className="mainMenu">
        <Link to="/home" className="btnFull">
          {" "}
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/cotton/64/null/home--v3.png"
              alt="analitics"
            />
          </div>
          <div>Home</div>
        </Link>
        <Link to="/lead" className="btnFull" token={userToken}>
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/cotton/64/null/receive-cash--v6.png"
              alt="analitics"
            />
          </div>
          <div>Nowy Lead</div>
        </Link>
        <Link to="/customers" className="btnFull">
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/cotton/64/null/conference-call.png"
              alt="analitics"
            />
          </div>
          <div>Klienci</div>
        </Link>

        <Link to="/chance" className="btnFull">
          <div className="mainCenter">
            <img
              className="imgMenu"
              src="https://img.icons8.com/external-outline-geotatah/64/null/external-chance-talent-management-outline-geotatah.png"
              alt="analitics"
            />
          </div>
          <div>
            {" "}
            Giełda
            <div className="  tw-flex tw-w-full tw-end-2px tw-border-0 tw-justify-end tw-items-center ">
              <span className="tw-border-2 tw-w-6 tw-h-6 tw-rounded-full tw-bg-red-600 tw-text-white">
                {lengthCollection ? lengthCollection : "0"}
              </span>
            </div>
          </div>
        </Link>
        <Link to="/warehouse" className="btnFull">
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/cotton/64/cloud-storage.png"
              alt="analitics"
            />
          </div>
          <div> Magazyn</div>
        </Link>
        <Link to="/offers" className="btnFull">
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/cotton/64/exclusive-sale--v1.png"
              alt="analitics"
            />
          </div>
          <div>Oferty</div>
        </Link>

      {/*      {userToken.access ? (
          <Link to="/analitics" className="btnFull">
            <div>
              <img
                className="imgMenu"
                src="https://img.icons8.com/cotton/64/null/analytics.png"
                alt="analitics"
              />
            </div>
            <div> Analityka</div>
          </Link>
        ) : null} */} 

        {userToken.access ? (
          <Link to="/users" className="btnFull">
            <div>
              <img
                className="imgMenu"
                src="https://img.icons8.com/windows/64/null/gender-neutral-user.png"
                alt="analitics"
              />
            </div>
            <div>Użytkownicy</div>{" "}
          </Link>
        ) : null}

        <Link to="/settings" className="btnFull">
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/pulsar-line/48/null/settings.png"
              alt="analitics"
            />
          </div>
          <div>Ustawienia</div>{" "}
        </Link>

        <Link to="/logout" className="btnFull">
          <div>
            <img
              className="imgMenu"
              src="https://img.icons8.com/ios-glyphs/60/null/logout-rounded--v1.png"
              alt="analitics"
            />
          </div>
          <div>Wyloguj</div>{" "}
        </Link>
      </div>
    </div>
  );
}
export default NavBar;
