
import "./MobileBar.css";
import NavBar2 from "./NavBar2";
import MobileBar from "./MobileBar";


const Menu = (props) => {


  return (
    <div >
      <div className="visibleMenu">
        <NavBar2 />
      </div>
      <div className="hiddenMenu">
        <MobileBar  />
      </div>
    </div>
  );
};
export default Menu;
