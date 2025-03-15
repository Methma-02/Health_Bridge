import { useState, useEffect } from "react";
import RegisterPopup from "./RegisterPopup";

const FeaturePage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [motherData, setMotherData] = useState(null);