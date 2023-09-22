import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function VerifyEmail() {
  const parms = useParams();
  const [emailVerified, setEmailVerified] = useState("");
  const verifyToken = async () => {
    try {
     
      const response = await axios.post(process.env.REACT_APP_LOCALHOST+'api/auth/verify/', {
        token: parms.token,
      });
   
      if (response.data.success) {
        setEmailVerified('true');
  
      } else {
        setEmailVerified('false');
      
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      setEmailVerified('false');
    
    }
  };
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line 
  }, []);
  return (
    <div className="flex min-h-screen p-5 justify-center items-center">
      {// eslint-disable-next-line
      emailVerified == "" && (
        <h1 className="text-white text-4xl">
          Proszę poczekać na weryfikację adresu e-mail
        </h1>
      )}

{// eslint-disable-next-line
emailVerified == "true" && (
        <h1 className="text-white text-4xl">
         Twój e-mail został zweryfikowany poprawnie
        </h1>
       
      )}

{
// eslint-disable-next-line
emailVerified == "false" && (
        <h1 className="text-white text-4xl">
     Błędna weryfikacja
        </h1>
      )}

    </div>
  );
}

export default VerifyEmail;
