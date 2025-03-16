import React, { useContext } from "react";
import { RecoveryContext } from "./RecoveryContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendOTP } from "./api"; 

export default function ForgotPasswordPage() {
  const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);
  const navigate = useNavigate();

  function navigateToOtp() {
    console.log("navigateToOtp called");
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log("Generated OTP:", OTP);
      setOTP(OTP);
  
      console.log("Sending OTP to:", email);
      sendOTP(email, OTP)
        .then((response) => {
          console.log("OTP sent successfully:", response);
          // Navigate to OTP page
          navigate("/otp");
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          alert("Failed to send OTP. Please try again.");
        });
      return;
    }
    return alert("Please enter your email");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Forgot Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Enter your email to reset your password</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-5">
                <div>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <button
                    type="button" // Ensure this is a button, not a link
                    onClick={navigateToOtp}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}