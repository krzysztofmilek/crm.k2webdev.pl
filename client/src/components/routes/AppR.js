import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../view/auth/Login";
import Register from "../view/auth/Register";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "../view/auth/VerifyEmail";
import ResetPassword from "../view/auth/ResetPassword";
import Lead from "../view/lead/Lead";
import Settings from "../view/setings/Settings";
import Home from "../view/home/Home";
import Logout from "../view/auth/Logout";
import Action from "../view/action/Action";
import Users from "../view/users/Users";
import Customers from "../view/customers/Customers";
import Analitics from "../view/analitics/Analitics";
import Chance from "../view/chance/Chance";
import Warehouse from "../view/warehouse/Warehouse";
import AddCar from "../view/warehouse/car/AddCar";
import Offers from "../view/offers/Offers";
import JsPdf from "../view/print/JsPdf";


import { useLocation } from "react-router-dom";
import OffertCarPrint from "../view/print/OffertCarPrint";

function AppR(props) {
  const location = useLocation();
  const getToken = props.userToken;
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-w-full ">
      <Toaster position="top-center" reversOrder={false} />
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectorRouts>
              <Home
                customer={props.customers}
                getCustomers={props.getCustomers}
                resData={props.state}
              />
            </ProtectorRouts>
          }
        />
        <Route
          path="/"
          element={
            <ProtectorRouts>
              <Home
                customer={props.customers}
                getCustomers={props.getCustomers}
                resData={props.state}
              />
            </ProtectorRouts>
          }
        />
        <Route
          path="/lead"
          element={
            <ProtectorRouts>
              <Lead />
            </ProtectorRouts>
          }
        />
        <Route
          path="/offers"
          element={
            <ProtectorRouts>
              <Offers user={user} />
            </ProtectorRouts>
          }
        />
        <Route
          path="/warehouse"
          element={
            <ProtectorRouts>
              <Warehouse state={location.state} />
            </ProtectorRouts>
          }
        />
        <Route
          path="/offertscar"
          element={
            <ProtectorRouts>
              <OffertCarPrint state={location.state} user={user} />
            </ProtectorRouts>
          }
        />
          <Route
          path="/jspdf"
          element={
            <ProtectorRouts>
              <JsPdf state={location.state} user={user} />
            </ProtectorRouts>
          }
        />
 
        <Route
          path="/addcar"
          element={
            <ProtectorRouts>
              <AddCar />
            </ProtectorRouts>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectorRouts>
              <Settings />
            </ProtectorRouts>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectorRouts>
              <Logout />
            </ProtectorRouts>
          }
        />
        <Route
          path="/action"
          element={
            <ProtectorRouts>
              <Action state={location.state} />
            </ProtectorRouts>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectorRouts>
              <Users />
            </ProtectorRouts>
          }
        />
        <Route
          path="/analitics"
          element={
            <ProtectorRouts>
              <Analitics />
            </ProtectorRouts>
          }
        />

        <Route
          path="/chance"
          element={
            <ProtectorRouts>
              <Chance tokenData={getToken} />{" "}
            </ProtectorRouts>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectorRouts>
              <Customers
                customer={props.customers}
                getCustomers={props.getCustomers}
              />
            </ProtectorRouts>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRouts>
              <Login />
            </PublicRouts>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRouts>
              <Register />
            </PublicRouts>
          }
        />
        <Route
          path="/verify/:token"
          element={
            <PublicRouts>
              <VerifyEmail />
            </PublicRouts>
          }
        />
        <Route
          /* path="/resetpass" */
           path="/resetpassword/:token" 
          element={
            <PublicRouts>
              <ResetPassword />
              </PublicRouts>
          }
        />
      </Routes>
    </div>
  );
}

export function ProtectorRouts({ children }) {
  const user = localStorage.getItem("user");
  if (user !== " " && user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function PublicRouts({ children }) {
  const user = localStorage.getItem("user");
  if (user !== " " && user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default AppR;
