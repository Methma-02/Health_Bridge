import { createContext, useState } from "react";

// Create a context for managing recovery-related state
export const RecoveryContext = createContext();

export function RecoveryProvider({ children }) {
  // State to store the user's email during the recovery process
  const [email, setEmail] = useState("");

  // State to track the current page in the recovery process (e.g., forgot password, OTP verification)
  const [otp, setOTP] = useState(null);
  const [page, setPage] = useState("forgotPassword");

  return (
    // Provide the recovery-related state and functions to all child components
    <RecoveryContext.Provider
      value={{ email, setEmail, otp, setOTP, page, setPage }}
    >
      {children}
    </RecoveryContext.Provider>
  );
}