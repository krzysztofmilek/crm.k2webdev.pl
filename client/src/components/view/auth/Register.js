import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [position, setPosition] = useState("");
  const [uCase, setUCase] = useState("orangeBag");
  const [num, setNum] = useState("orangeBag");
  const [sChar, setSChar] = useState("orangeBag");
  const [passLength, setPassLength] = useState("orangeBag");
  // eslint-disable-next-line
  const [emailTrue, setEmailTrue] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !position) {
      return toast.error("Wszystkie pola są wymagane");
    }
    if (password.length < 6) {
      return toast.error("Hasło musi zawierać minimum 6 znaków");
    }
    if (!validateEmail(email)) {
      setEmailTrue(false);
      return toast.error("Proszę wprowadzić prawidłowy email");
    } else {
      setEmailTrue(true);
    }

    if (password !== confirmPassword) {
      return toast.error("Hasła nie są takie same");
    }

    if (password === confirmPassword) {
      const userObj = {
        name,
        email,
        password,
        confirmPassword,
        position,
        admin: true,
        active: true,
      };
      try {
        toast.loading("Pobieram dane.....");
        const response = await axios.post(
          process.env.REACT_APP_LOCALHOST+"api/auth/register",
          userObj
        );
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Błąd logowania...");
      }
    } else {
      toast.error("Hasła nie zgadzają się");
    }
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase("green");
    } else {
      setUCase("orangeBag");
      return;
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum("green");
    } else {
      setNum("orangeBag");
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar("green");
    } else {
      setSChar("orangeBag");
    }
    // Check for PASSWORD LENGTH
    if (password.length > 5) {
      setPassLength("green");
    } else {
      setPassLength("red");
    }
  }, [password]);
  return (
    <div className="tw-flex tw-w-full tw-flex-row tw-justify-center tw-items-center tw-h-screen bg">
      <div className="tw-w-[330px] tw-flex tw-space-y-5 tw-flex-col tw-p-5 borderTurkuse tw-rounded-lg">
   

        <h1 className="tw-font-semibold tw-text-2xl tw-uppercase turkuse tw-text-center">
          Formularz rejestracji
        </h1>
  
 <div className="tw-flex tw-w-full tw-flex-row ">
                   <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
                <img
                  className="imgLoginUser"
                  src="https://img.icons8.com/pastel-glyph/32/person-male--v1.png"
                  alt="Hasło"
                />
              </span>



              <input
                type="text"
                className="tw-py-2  tw-px-2 tw-border tw-border-secondary   tw-rounded-r-3xl tw-w-full  tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
                placeholder="imię nazwisko"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>


            <div className="tw-flex tw-w-full tw-flex-row ">
                   <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
                <img
                  className="imgLoginUser"
                  src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/external-users-cv-resume-flatart-icons-outline-flatarticons.png"
                  alt="position"
                />
              </span>

            <input
                type="text"
                className="tw-py-2  tw-px-2 tw-border tw-border-secondary   tw-rounded-r-3xl tw-w-full  tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
                placeholder="stanowisko"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row ">
                   <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
                <img
                  className="imgLoginUser"
                  src="https://img.icons8.com/pastel-glyph/32/email--v2.png"
                  alt="Hasło"
                />
              </span>




              <input
                type="text"
                className="tw-py-2  tw-px-2 tw-border tw-border-secondary   tw-rounded-r-3xl tw-w-full  tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="tw-flex tw-w-full tw-flex-row ">
                   <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
                <img
                  className="imgLoginUser"
                  src="https://img.icons8.com/windows/32/null/user-lock--v1.png"
                  alt="Hasło"
                />
              </span>

              <input
                type="password"
                className="tw-py-2  tw-px-2 tw-border tw-border-secondary   tw-rounded-r-3xl tw-w-full  tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            
            <div className="tw-flex tw-w-full tw-flex-row ">
                   <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
                <img
                  className="imgLoginUser"
                  src="https://img.icons8.com/windows/32/null/user-lock--v1.png"
                  alt="Hasło"
                />
              </span>

              <input
                type="password"
                className="tw-py-2  tw-px-2 tw-border tw-border-secondary   tw-rounded-r-3xl tw-w-full  tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
                placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
              />
            </div>



        <div className="tw-flex tw-text-xs tw-flex-col tw-w-full tw-border-0 tw-ps-3">
         
          <span className=" tw-text-white"> weryfikacja hasła</span>
          <span className="form-list tw-flex tw-flex-col tw-p-0  tw-b-0">
           
            <span className={`${uCase}  tw-text-secondary`}>
              &nbsp;duże i małe litery
            </span>

            <span className={`${num}   tw-text-secondary`}>
              &nbsp;cyfra 
            </span>

            <span className={`${sChar}   tw-text-secondary`}>
              &nbsp;znak specjalny
            </span>

            <span
              className={`${passLength}  tw-text-secondary`}
            >
              &nbsp;min. 6 znaków
            </span>
          </span>
        </div>

        <div className="tw-flex tw-justify-between tw-items-end">
          <Link
            className="hover:tw-underline tw-uppercase tw-text-xs tw-text-[white]"
            to="/login"
          >
            Zaloguj się
          </Link>
          <button
              className="tw-text-white  tw-uppercase  tw-text-xs hover:tw-underline"
            onClick={registerUser}
          >
            Zarejestruj się
            </button>


       
        </div>
        
      </div>
      
    </div>
  );
}

export default Register;
