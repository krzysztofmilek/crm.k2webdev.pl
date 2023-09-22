import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

function Login() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    const userObj = {
      email,
      password,
    };
    try {
      toast.loading("Czekaj, Sprawdzam dane.", {
        style: {
          duration: 3000,
          border: "1px solid #713200",
          color: "black",
          background: "white",
          width: "300px",
        },
      });
      toast.loading("Pobieram dane....", { className: "toastLoading" });
      const response = await axios.post(
        process.env.REACT_APP_LOCALHOST+"api/auth/login",
        userObj
      );
      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message, { className: "toastSuccess" });
        localStorage.setItem("user", JSON.stringify(response.data));
        const redirectToHome = () => {
          navigate("/", {
            state: {
              name: response.data.name,
              access: response.data.admin,
              token: response.data.jwt,
            },
          });
        };
        redirectToHome();
      } else {
        toast(response.data.message, {
          duration: 5000,
          className: "toastError",
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Somtingh went wrong...");
    }
  };

  const sendResetPasswordLink = async () => {
    try {
      toast.loading("Pobieram dane....");
      const response = await axios.post(
        process.env.REACT_APP_LOCALHOST+"api/auth/sendpasswordresetlink",
        {
          email,
        }
      );
      toast.dismiss();
      if (response.data.success) {
        console.log(response);
        toast.success(response.data.message);
        setShowForgotPassword(false);
      } else {
        toast.error(response.data.message, {
          style: {
            border: "1px solid #713200",
            color: "white",
            background: "red",
          },
        });
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Somtingh went wrong...");
    }
  };
  return (
    // eslint-disable-next-line 
    <div className="tw-flex tw-w-full  tw-flex-col tw-justify-center tw-items-center tw-h-screen bg ">
      
      {!showForgotPassword && (
        <div className="main ">
        <div className="intro">
        <strong>Cel:</strong> <br />
      
        Celem projektu jest stworzenie systemu do zarządzania szeroko pojętymi relacjami z obecnymi i potencjalnymi klientami. 
        Ma umożliwiać ocenę szans sprzedaży, ułatwiać obsługę kontrahentów oraz analizować przeprowadzone działania. 
        Moduł ofertowania ma być skalowalny i dostosowywany do specyfiki danej branży.
        <br />  <br /> 
        <strong>Stack:</strong> <br /> FrontEnd: JavaScript, React, HTML, CSS 
        <br />Biblioteki: React Router, Multer, React-Table,  React-Bootstrap, Axios, JWT, Bcrypt, js-html2pdf, react-to-print, React-hot-toast, JWT 
        <br />Backend: Node, Express, MongoDB<br /><br />
        <strong> Dane logowania:</strong>
        <br /> admin: a@k2webdev.pl password 1234
        <br /> user: u@k2webdev.pl password 1234 


        </div>
         <div className="tw-flex tw-space-y-5 tw-flex-col tw-p-5 tw-justify-center ">
        
          <h1 className="tw-font-semibold tw-text-2xl tw-uppercase turkuse tw-text-center">
            CRM k2webdev
          </h1>
          <div className="tw-flex  tw-flex-row ">
            <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 tw-bg-white ">
              <img
                className="imgLoginUser"
                src="https://img.icons8.com/windows/32/null/user-lock--v1.png"
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
          <div className="tw-flex  tw-flex-row">
            <span className="tw-border tw-px-2  tw-py-2 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0  tw-bg-white ">
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
          <div className="">
          <Button
                type="submit"
                className="buttonLogin "
                variant="success"
            onClick={loginUser} 
          >Zaloguj <img
              className="imgLogin"
              src="https://img.icons8.com/ios-filled/50/null/login-rounded-right.png"
              alt="znajdz"
            />
          </Button>
          </div>
       <div className="tw-flex tw-justify-center tw-items-end">
            <div className="tw-flex tw-flex-row tw-w-[350px] tw-space-x-20 ">
            {/*   <h1
                className="tw-uppercase tw-text-[#ffffff] tw-cursor-pointer tw-text-xs shadow"
                onClick={() => setShowForgotPassword(true)}
              >
                Nie pamiętasz hasła?
              </h1>
              <Link
                className="tw-uppercase tw-text-[#ffffff] tw-text-xs tw-cursor-pointer shadow"
                to="/register"
              >
                Rejestracja
              </Link> */}
            </div> 
          </div>
        </div>
      </div>)}

      {showForgotPassword && (
        <div className="tw-flex tw-space-y-5 tw-flex-col tw-p-5 tw-shadow-lg tw-border-2 tw-border-secondary-500 tw-rounded-lg tw-bg-white">
          <lottie-player
            src="
            https://assets2.lottiefiles.com/packages/lf20_iwyr6aqu.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ height: 250 + "px" }}
          ></lottie-player>
          <h3 className="tw-font-semibold tw-text-xl tw-uppercase tw-text-primary tw-text-left">
            Wpisz adres mailowy
          </h3>
          <div className="tw-flex  tw-flex-row">
            <span className="tw-border tw-px-2  tw-py-1 tw-border-secondary tw-rounded-l-3xl tw-border-r-white tw-border-r-0 ">
              <img
                className="imgLoginUser"
                src="https://img.icons8.com/windows/32/null/user-lock--v1.png"
                alt="Hasło"
              />
            </span>

            <input
              type="text"
              className="tw-py-2  tw-px-1 tw-border tw-border-secondary  tw-w-full tw-rounded-r-3xl tw-border-l-white tw-border-l-0 focus:tw-ring-0  focus:tw-border-secondary"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="tw-flex tw-justify-between tw-items-end ">
            <button
              className="tw-py-2 tw-px-5 tw-text-white tw-bg-primary tw-uppercase tw-rounded-3xl tw-transition tw-duration-150 tw-ease-in-out tw-w-full"
              onClick={sendResetPasswordLink}
            >
              Wyślij link do zmiany hasła
            </button>
          </div>
          <div className="tw-text-right ">
            <Link
              className=" tw-uppercase tw-text-secondary tw-justify-center tw-hover:backgronud:red tw-text-xs"
              to="/"
            >
              strona główna
            </Link>
          </div>
        </div>
      )}
      <div className="tw-text-right tw-p-3  tw-text-xs">
        <a href="wwww.k2webdev.pl" target="_blank" className="k2webdevLink">
          <span className="orange">K2</span>
          <span className="k2">web</span>
          <span className="k2">dev</span>
        </a>
      </div>
    </div>
  );
}

export default Login;
