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
    <div className="tw-flex tw-w-full bg tw-flex-row tw-justify-center tw-items-center tw-h-screen " >
      <div className="tw-flex tw-flex-col  ">
       
        
        
        <div className="tw-w-[350px] borderTurkuse md:tw-min-w-0 tw-flex tw-space-y-5 tw-flex-col tw-p-5 tw-shadow-lg tw-border-2 tw-border-secondary-500 tw-rounded-lg">
       <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_ff305byc.json"
          
        // " https://assets3.lottiefiles.com/temp/lf20_ODCUyx.json"
          background="transparent"
          speed="1"
          loop
          style={{ height:250+"px"}}
          autoplay
        ></lottie-player> 
          <h1 className="tw-font-semibold tw-text-2xl tw-uppercase turkuse tw-text-center">
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
              className="hover:tw-underline tw-text-xs tw-uppercase  tw-text-white"
              to="/login"
            >
              Strona główna
            </Link>
            <button
              className="tw-py-1 tw-px-5 tw-text-white tw-uppercase tw-bg-primary tw-rounded-3xl"
             onClick={resetPassword}
            >
              Zresetuj hasło
            </button>
          </div>
        </div>

        <div className="tw-text-center tw-p-3  tw-text-xs ">
          <a href="wwww.k2webdev.pl" target="_blank" className="k2webdevLink ">
            <span className="tw-text-[#ccc]">K2</span>
            <span className="orange">web</span>
            <span className="tw-text-[#ccc]">dev</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
