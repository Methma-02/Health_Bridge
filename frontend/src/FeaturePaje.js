import { useState, useEffect } from "react";
import RegisterPopup from "./RegisterPopup";

const FeaturePage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [motherData, setMotherData] = useState(null);

  const handleRegisterSubmit = async (registerNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/mother/${registerNumber}`);
      const data = await response.json();

      if (response.ok) {
        setMotherData(data);
        setShowPopup(false);
      } else {
        alert("Register number not found.");
      }
    } catch (error) {
      alert("Error fetching data.");
    }
  };
