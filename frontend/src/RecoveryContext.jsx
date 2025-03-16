import { createContext, useState } from "react";

export const RecoveryContext = createContext();

export function RecoveryProvider({ children }) {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState(null);
  const [page, setPage] = useState("forgotPassword");

  return (
    <RecoveryContext.Provider
      value={{ email, setEmail, otp, setOTP, page, setPage }}
    >
      {children}
    </RecoveryContext.Provider>
  );
}