import React, { useState, useContext } from "react";
import { RecoveryContext } from "./RecoveryContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OTPInput() {
  const { email, otp, setPage } = useContext(RecoveryContext);
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:3000/api/auth/send-otp", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has been sent to your email."))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      setPage("resetPassword");
      return;
    }
    alert("The code you entered is incorrect. Please try again.");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>OTP Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        maxLength="1"
                        className="w-full h-full text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={(e) => {
                          const newOTP = [...OTPinput];
                          newOTP[index] = e.target.value;
                          setOTPinput(newOTP);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={verifyOTP}
                      className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Verify OTP
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      onClick={resendOTP}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}