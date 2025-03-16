import React, { useContext, useState } from "react";
import { RecoveryContext } from "./RecoveryContext";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "./api"; // Import the API function

export default function ResetPasswordPage() {
  const { email } = useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  function changePassword(e) {
    e.preventDefault(); // Prevent form submission
    
    if (!email) {
      alert("Email information is missing. Please try again from the beginning.");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    
    setIsResetting(true);
    
    // Use the API function instead of axios directly
    resetPassword(email, newPassword)
      .then(() => {
        setSuccess(true);
        setIsResetting(false);
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        alert(`Failed to reset password: ${error.message || "Unknown error"}`);
        setIsResetting(false);
      });
  }

  function goToLogin() {
    navigate("/login");
  }

  // If password reset was successful, show success message and redirect button
  if (success) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
        <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-green-600">
                <p>Password Reset Successful!</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-600 mt-4">
                <p>Your password has been successfully reset.</p>
              </div>
            </div>
            
            <div>
              <button
                onClick={goToLogin}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular password reset form
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Create a new password for your account</p>
            </div>
          </div>

          <div>
            <form onSubmit={changePassword}>
              <div className="flex flex-col space-y-5">
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isResetting}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    {isResetting ? "Resetting..." : "Reset Password"}
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