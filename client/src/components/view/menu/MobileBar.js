import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import OverlayTrig from "../../overLay/OverlayTrig"

function NavBar() {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const [lengthCollection, setLengthCollection] = useState(null);
  const [show, setShow] = useState(false);


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

    <div className="getCenter border ">
      <Link to="/home" className="tw-block">
        {" "}
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
          src="https://img.icons8.com/windows/32/home.png" 

            alt="analitics"
          />
     
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

      
        </div>
      </Link>
      <Link to="/customers">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/external-smashingstocks-hand-drawn-black-smashing-stocks/99/external-Users-business-smashingstocks-hand-drawn-black-smashing-stocks.png"
            alt="analitics"
          />

     
        </div>
      </Link>
      <Link to="/chance">
        <div className="getCenterInPion">
    {/*     <span className="tw-border-2 tw-w-6 tw-h-6 tw-rounded-full tw-bg-red-600 tw-text-white">
              {lengthCollection ? lengthCollection : "0"}
            </span> */}
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/external-outline-geotatah/64/null/external-chance-talent-management-outline-geotatah.png"
            alt="analitics"
          />
 
  
       
        </div>
      </Link>
      <Link to="/warehouse">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/pastel-glyph/64/box--v3.png"
            alt="analitics"
          />

    
        </div>
      </Link>

      <Link to="/offers">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/hatch/64/discount--v1.png"
            alt="analitics"
          />

          
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

      
        </div>
      </Link>
      <Link to="/logout">
        <div className="getCenterInPion">
          <img
            className="imgMenuLeft"
            src="https://img.icons8.com/ios-glyphs/60/null/logout-rounded--v1.png"
            alt="analitics"
          />

      
        </div>
      </Link>
    </div>


  );
}
export default NavBar;
