import React, { useContext } from "react";
import { RecoveryContext } from "./RecoveryContext";
import axios from "axios";

export default function ResetPasswordPage() {
  const { email, setPage } = useContext(RecoveryContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changePassword() {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:3000/api/auth/reset-password", {
        email,
        newPassword,
      })
      .then(() => {
        alert("Password reset successfully.");
        setPage("login");
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to reset password. Please try again.");
      });
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Reset Password</p>
            </div>
          </div>

          <div>
            <form>
              <div className="flex flex-col space-y-5">
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <button
                    onClick={changePassword}
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Reset Password
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