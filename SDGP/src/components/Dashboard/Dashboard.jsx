import React from "react";
import { Link } from "react-router-dom";
import './Dashboard.css'
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Mother's Health Report</h1>
      <div className="dashboard-buttons">
        {/* Button 1: Registration Information */}
        <Link to="/registration" className="dashboard-button">
          Registration Information
        </Link>

        {/* Button 2: Clinic Care */}
        <Link to="/clinic-care" className="dashboard-button">
          Clinic Care
        </Link>

        {/* Button 3: Postnatal Care */}
        <Link to="/postnatal-care" className="dashboard-button">
          Postnatal Care
        </Link>

        {/* Button 4: Refferal */}
        <Link to="/refferal" className="dashboard-button">
          refferal
        </Link>


      </div>
    </div>
  );
};

export default Dashboard;
