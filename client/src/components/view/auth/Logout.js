import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const Logout = () => {

    const navigate = useNavigate();

    const logout =() =>{
  
    localStorage.removeItem("user"); 

    const redirectToHome = () => {
      navigate("../login");
 
    }
    redirectToHome()
    
    }



    useEffect(() => {
      
      logout();

      
       // eslint-disable-next-line
    }, []);
   




  return (
    <div>


Wylogowano


    </div>
  )
}

export default Logout