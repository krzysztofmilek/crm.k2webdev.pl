import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const parms = useParams();
  const navigate = useNavigate();

   const resetPassword = async () => {

    console.log(parms.token)
     try {
    toast.loading(" Zmiana w trakcie.");
      const response = await axios.post(
        process.env.REACT_APP_LOCALHOST+"api/auth/resetpassword",
        { password, token: parms.token }
      );

      if (response.data.success) {
        toast.success(response.data.mesage);
        navigate("/login");
      } else {
        toast.error("Błedny link");
      }
      toast.dismiss();
    } catch (error) {}
  }; 
  return (
    <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-h-screen tw-bg-gradient-to-b tw-from-blue-500 tw-from-30% tw-via-sky-500 tw-via-60% tw-to-white-500 tw-to-100%" >
      <div className="tw-flex tw-flex-col ">
       
        
        
        <div className="tw-w-[350px] md:tw-min-w-0 tw-bg-white tw-flex tw-space-y-5 tw-flex-col tw-p-5 tw-shadow-lg tw-border-2 tw-border-secondary-500 tw-rounded-lg">
       <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_ff305byc.json"
          
        // " https://assets3.lottiefiles.com/temp/lf20_ODCUyx.json"
          background="transparent"
          speed="1"
          loop
          style={{ height:250+"px"}}
          autoplay
        ></lottie-player> 
          <h1 className="tw-font-semibold tw-text-2xl tw-uppercase tw-text-primary tw-text-center">
            ZMiana hasła
          </h1>

          <input
            type="password"
            className="tw-py-1 tw-px-3 tw-border-2 tw-border-secondary  focus:tw-outline-none tw-w-full tw-rounded"
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <input
            type="password"
            className="tw-py-1 tw-px-3 tw-border-2 tw-border-secondary  focus:tw-outline-none tw-w-full tw-rounded"
          
            placeholder=""
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <div className="tw-flex tw-justify-between tw-items-end">
            <Link
              className="hover:tw-underline tw-text-xs tw-uppercase  tw-text-secondary"
              to="/login"
            >
              Strona główna
            </Link>
            <button
              className="tw-py-1 tw-px-5 tw-text-white tw-bg-primary tw-rounded-3xl"
             onClick={resetPassword}
            >
              Zresetuj hasło
            </button>
          </div>
        </div>

        <div className="tw-text-center tw-p-3  tw-text-xs ">
          <a href="wwww.k2webdev.pl" target="_blank" className="k2webdevLink ">
            <span className="tw-text-white">K2</span>
            <span className="orange">web</span>
            <span className="tw-text-white">dev</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
