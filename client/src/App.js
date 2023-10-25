import "./App.css";
import axios from "axios";
import { useState } from "react";
import AppR from "./components/routes/AppR";


function App() {

  const [customers, setCustomers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'))

  axios.defaults.headers.common['Authorization'] =  (user ? user.jwt_token : "");
  const userToken = JSON.parse(localStorage.getItem('user'));


  const getCustomers = async () => {
    const customer = await axios.get(process.env.REACT_APP_LOCALHOST+"customer");
    setCustomers(customer.data);
  };


  return (
   <span className="App" >
      <span className="App tw-flex tw-w-full  tw-flex-col  tw-h-screen  " > 
      <AppR getCustomers={getCustomers} customers={customers} userToken={userToken} />
</span>
    </span>
  );
}

export default App;

