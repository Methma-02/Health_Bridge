import { useState } from "react";

const RegisterPopup = ({ onSubmit }) => {
  const [registerNumber, setRegisterNumber] = useState("");

  const handleSubmit = () => {
    if (registerNumber) {
      onSubmit(registerNumber);
    } else {
      alert("Please enter a register number.");
    }
  };