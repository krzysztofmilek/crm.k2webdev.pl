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
  const [uCase, setUCase] = useState("red");
  const [num, setNum] = useState("red");
  const [sChar, setSChar] = useState("red");
  const [passLength, setPassLength] = useState("red");
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
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      setEmailTrue(false);
      return toast.error("Please enter a valid email");
    } else {
      setEmailTrue(true);
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
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
        toast.error("Somtingh went wrong...");
      }
    } else {
      toast.error("Password not match");
    }
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase("green");
    } else {
      setUCase("red");
      return;
    }
    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNum("green");
    } else {
      setNum("red");
    }
    // Check for special character
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar("green");
    } else {
      setSChar("red");
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
      <div className="tw-w-[400px] tw-flex tw-space-y-5 tw-flex-col tw-p-5 tw-shadow-lg tw-border-2 tw-border-secondary-500 tw-rounded-lg tw-bg-white">
        <lottie-player
          src=" https://assets3.lottiefiles.com/temp/lf20_ODCUyx.json"
          background="transparent"
          speed="1"
          loop
          style={{ hight: 250 + "px" }}
          autoplay
        ></lottie-player>

        <h1 className="tw-font-semibold tw-text-2xl tw-uppercase tw-text-primary tw-text-center">
          Formularz rejestracji
        </h1>
        <input
          type="text"
          className="tw-py-2 tw-px-3 tw-border tw-border-secondary focus:tw-outline-none tw-w-full tw-rounded-3xl focus:tw-ring-0  focus:tw-border-secondary"
          placeholder="imię nazwisko"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          className="tw-py-2 tw-px-3 tw-border tw-border-secondary focus:tw-outline-none tw-w-full tw-rounded-3xl focus:tw-ring-0  focus:tw-border-secondary"
          placeholder="stanowisko"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        />

        <input
          type="text"
          className="tw-py-2 tw-px-3 tw-border tw-border-secondary focus:tw-outline-none tw-w-full tw-rounded-3xl focus:tw-ring-0  focus:tw-border-secondary"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          className="tw-py-2 tw-px-3 tw-border tw-border-secondary focus:tw-outline-none tw-w-full tw-rounded-3xl focus:tw-ring-0  focus:tw-border-secondary"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          className="tw-py-2 tw-px-3 tw-border tw-border-secondary focus:tw-outline-none tw-w-full tw-rounded-3xl focus:tw-ring-0  focus:tw-border-secondary"
          placeholder="confirm password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
        />

        <div className="tw-flex tw-text-xs tw-flex-col tw-w-full tw-border-0 tw-ps-3">
          <span className="form-list tw-flex tw-flex-row ">
            <span className={`${uCase} tw-flex tw-flex-col tw-text-secondary`}>
              &nbsp;duże i małe •
            </span>

            <span className={`${num} tw-flex tw-flex-col tw-text-secondary`}>
              &nbsp;cyfra •
            </span>

            <span className={`${sChar} tw-flex tw-flex-row tw-text-secondary`}>
              &nbsp;znak specjalny •
            </span>

            <span
              className={`${passLength} tw-flex tw-flex-row tw-text-secondary`}
            >
              &nbsp;min. 6 znaków
            </span>
          </span>
        </div>

        <div className="tw-flex tw-justify-between tw-items-end">
          <Link
            className="hover:tw-underline tw-uppercase tw-text-xs tw-text-secondary"
            to="/login"
          >
            Zaloguj się
          </Link>
          <button
            className="tw-py-1 tw-px-5 tw-text-white tw-bg-primary tw-uppercase tw-rounded-3xl"
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
