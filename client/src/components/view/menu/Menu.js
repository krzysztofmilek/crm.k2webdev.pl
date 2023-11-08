
import "./MobileBar.css";
import NavBar from "./NavBar";
import MobileBar from "./MobileBar";


const Menu = (props) => {


  return (
    <div >
      <div className="visibleMenu">
        <NavBar />
      </div>
      <div className="hiddenMenu">
        <MobileBar  />
      </div>
    </div>
  );
};
export default Menu;
