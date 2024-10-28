import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import VerificationImg from "../images/Verification.png";
import { useActivationMutation } from "../redux/features/auth/authApi";
import { useSelector } from "react-redux";

const Verification = () => {
  let navigate = useNavigate();
  const [invalidError, setInvalidError] = useState(false);
  const {token} = useSelector((state) => state.auth)
  console.log(token)
  const [activation, { isLoading, isSuccess, error, data }] = useActivationMutation();
  const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));
  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verficationHandler = async () => {

    const veificationNumber = Object.values(verifyNumber).join("");
    if(veificationNumber.length !== 4){
      setInvalidError(true);
      return;
    }
     await activation({
      token : token,
      activationCode : veificationNumber
     })
  };

  useEffect(() => {
  if(isSuccess){
    toast.success("Account activated successfully")
    navigate("/login");
  }
  if(error){
    toast.error(error?.data?.message)
  }
  else{
    console.log("An error occured", error)
  }
  }, [isSuccess, error])

  const handleInputChange = (i, v) => {
    setInvalidError(false);
    const newVerficationNumber = { ...verifyNumber, [i]: v };
    setVerifyNumber(newVerficationNumber);
    if (v === "" && i > 0) {
      inputRefs.current[i - 1].current?.focus();
    } else if (v.length === 1 && i < 3) {
      inputRefs.current[i + 1].current?.focus();
    }
  };

  return (
    <>
      <style>
        {`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <div className="login-form">
        <div className="login-form-center">
          <div className="verification-form">
          <Toaster />
            <h1 className="text-white text-center p-3">Verify Your Account</h1>
            <div className="verification-img my-5">
              <img src={VerificationImg} alt="" />
            </div>
            <div className="d-flex gap-2">
              {Object.keys(verifyNumber).map((key, index) => (
                <input
                  type="number"
                  key={key}
                  ref={inputRefs.current[index]}
                  maxLength={1}
                  value={verifyNumber[key]}

                  style={{
                    width: "50px",
                    padding: "8px",
                    outline: "none",
                    backgroundColor: "transparent",
                    border: invalidError ? "1px solid red" : "1px solid black",
                    borderRadius: "5px",
                    color: "white",
                  }}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>

            <button
              className="btn btn-primary my-5 p-2 w-100"
              onClick={verficationHandler}
              style={{ borderRadius: "50px" }}
            >
              Verify OTP
            </button>

            <div className="mt-3 text-center text-white">
              <p>Go back to signin? <Link to="/login">SignIn</Link></p>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Verification;