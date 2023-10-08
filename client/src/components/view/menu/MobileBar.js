import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const MobileBar = (props) => {
  const userToken = JSON.parse(localStorage.getItem("user"));

  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="getCenter">
   
      <nav>
        
        <div className="burger-logo">K2<span className="orange">WEB</span>DEV CRM</div>
        <div className="burger-menu "  onClick={updateMenu}>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          
        </div>
      </nav>
      <span className=" tw-flex tw-justify-end tw-flex-row  text-right tw-w-full"> 
        <span>
            {!userToken ? "" :  userToken.name}</span> 
           <span  className="tw-px-2">
          <Link to="/logout">
     
       <OverlayTrigger
         key="top"
         placement="top"
         overlay={<Tooltip id="tooltip-top">Wyloguj</Tooltip>}
       >
         <img
           className="imgSetting"
           src="https://img.icons8.com/ios-filled/50/null/logout-rounded.png"
           alt="wyloguj"
         />
       </OverlayTrigger> 
     
     </Link>
     </span> 
        </span>

      <div className={menu_class}>
      
   
            <div className="burger-menu-class">
           
          <Link to="/home"  className="burger-menu-class-link">
            Home
          </Link>
          </div>
          <div className="burger-menu-class">
          <Link to="/lead" className="burger-menu-class-link">
            Nowy Lead
          </Link>
          </div>
          <div className="burger-menu-class">
          <Link to="/customers" className="burger-menu-class-link">
            Klienci
          </Link>
          </div>
          <div className="burger-menu-class">
          <Link to="/chance" className="burger-menu-class-link">
            Giełda
          </Link>
          </div>
          <div className="burger-menu-class">

        
            <Link to="/warehouse" className="burger-menu-class-link">
             Magazyn
            </Link>
         
            </div> 
            <div className="burger-menu-class">

        
<Link to="/offers" className="burger-menu-class-link">
 Oferty
</Link>

</div> 
          <div className="burger-menu-class">

          {userToken.access ? (
            <Link to="/users" className="burger-menu-class-link">
              Użytkownicy
            </Link>
          ) : null}
            </div>
          <div className="burger-menu-class">

          {userToken.access ? (
            <Link to="/settings" className="burger-menu-class-link">
              Ustawienia
            </Link>
          ) : null}
          </div>
          <div className="burger-menu-class">
          <Link to="/logout" className="burger-menu-class-link">
            Wyloguj
          </Link>
          </div>
        
      </div>
    </div>
  );
};
export default MobileBar;
