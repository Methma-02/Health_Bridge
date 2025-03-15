import React from "react";
import { Link } from "react-router-dom";

const DashboardNavigation = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg p-4">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/registration"
            className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Registration Information
          </Link>
        </li>
        <li>
          <Link
            to="/clinic-care"
            className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Clinic Care
          </Link>
        </li>
        <li>
          <Link
            to="/postnatal-care"
            className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Postnatal Care
          </Link>
        </li>
        <li>
          <Link
            to="/refferal"
            className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Refferal
          </Link>
        </li>
        <li>
          <Link
            to="/PartB"
            className="block px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            Pregnancy Form-Part B
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavigation;