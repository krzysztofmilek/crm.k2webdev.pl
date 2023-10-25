import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";

import Footer from "../footer/Footer";

function NavBar() {
  const userToken = JSON.parse(localStorage.getItem("user"));
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

    <div className="getCenter border">
      <Link to="/home" className="tw-block">
        {" "}
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/windows/32/home-page.png"
            alt="analitics"
          />
          <span className="textCenter ">Home</span>
          <hr />
        </div>
      </Link>

      <Link to="/lead" token={userToken}>
        
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/ios/50/get-revenue.png"
            alt="analitics"
          />

          <span className="textCenter">Nowy Lead</span>
        </div>
      </Link>
      <Link to="/customers">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
          /*   src="https://img.icons8.com/external-thin-kawalan-studio/24/external-users-users-thin-kawalan-studio.png" */
          src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-Users-business-smashingstocks-hand-drawn-black-smashing-stocks.png"
            alt="analitics"
          />

          <span className="textCenter ">Klienci</span>
        </div>
      </Link>
      <Link to="/chance">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/external-outline-geotatah/64/null/external-chance-talent-management-outline-geotatah.png"
            alt="analitics"
          />

          <span className="textCenter ">Giełda</span>
          <div className="  tw-flex tw-w-full tw-end-2px tw-m-1 tw-border-0 tw-justify-end tw-items-center ">
            <span className="tw-border-2 tw-w-6 tw-h-6 tw-rounded-full tw-bg-red-600 tw-text-white">
              {lengthCollection ? lengthCollection : "0"}
            </span>
          </div>
        </div>
      </Link>
      <Link to="/warehouse">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/pastel-glyph/64/box--v3.png"
            alt="analitics"
          />

          <span className="textCenter ">Magazyn</span>
        </div>
      </Link>

      <Link to="/offers">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/hatch/64/discount--v1.png"
                alt="analitics"
          />

          <span className="textCenter ">Oferty</span>
        </div>
      </Link>

      {userToken.access ? (
        <Link to="/users">
          <div className="getCenterInPion">
            <img
              className="imgMenuLeft"
              src="https://img.icons8.com/windows/64/null/gender-neutral-user.png"
              alt="analitics"
            />
            <span className="textCenter ">Użytkownicy</span>
          </div>
        </Link>
      ) : null}

      <Link to="/settings">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/pulsar-line/48/null/settings.png"
            alt="analitics"
          />

          <span className="textCenter ">Ustawienia</span>
        </div>
      </Link>
      <Link to="/logout">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/ios-glyphs/60/null/logout-rounded--v1.png"
            alt="analitics"
          />

          <span className="textCenter ">Wyloguj</span>
        </div>
      </Link>
      <Footer />
    </div>


  );
}
export default NavBar;
