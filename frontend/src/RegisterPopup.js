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

  return (
    <div className="popup">
      <h3>Enter Register Number</h3>
      <input
        type="text"
        placeholder="Register Number"
        value={registerNumber}
        onChange={(e) => setRegisterNumber(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default RegisterPopup;