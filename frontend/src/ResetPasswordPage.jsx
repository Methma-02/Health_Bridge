import React, { useContext, useState } from "react";
import { RecoveryContext } from "./RecoveryContext";  // Context to store recovery-related data
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { resetPassword } from "./api"; // API function to reset password

export default function ResetPasswordPage() {
  const { email, setPage } = useContext(RecoveryContext);  // Get email and setPage function from context

   // State to manage password inputs
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to handle loading and success status
  const [isResetting, setIsResetting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Navigation hook to redirect user
  const navigate = useNavigate();

// Function to handle password reset
  function changePassword(e) {
    e.preventDefault();  // Prevent default form submission behavior
    
    console.log("Email from context:", email); // Debugging log to ensure email exists
    
    // If email is missing, alert the user and redirect to forgot password page
    if (!email) {
      alert("Email information is missing. Please try again from the beginning.");
      setPage("forgotPassword");
      return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    
    // Ensure password meets minimum length requirement
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    
    setIsResetting(true); // Set loading state
    
    // Call API function to reset password
    resetPassword(email, newPassword)
      .then((result) => {
        console.log("Password reset success:", result);
        setSuccess(true); // Mark reset as successful
        setIsResetting(false);
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        alert(`Failed to reset password: ${error.message || "Unknown error"}`);
        setIsResetting(false);
      });
  }

  // Redirect user to login page after successful reset
  function goToLogin() {
    navigate("/login");
  }

  // Show success message and login button if reset was successful
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

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

          {/* Header Section */}
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Password</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>Create a new password for your account</p>
            </div>
          </div>

{/* Password Reset Form */}
          <div>
            <form onSubmit={changePassword}>
              <div className="flex flex-col space-y-5">

                {/* New Password Input */}
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

{/* Confirm Password Input */}
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

{/* Submit Button */}
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