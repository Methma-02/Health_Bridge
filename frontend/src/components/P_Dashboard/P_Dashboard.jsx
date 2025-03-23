import React from "react";
import { Link } from "react-router-dom";
import Header from "../../HeaderFooter/Header";
import Footer from "../../HeaderFooter/Footer";

const Dashboard = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6 flex flex-col items-center">
      <div className="bg-blue-50 rounded-lg p-4 md:p-6 w-full max-w-4xl">
        {/* Header */}
        <h1 className="text-blue-600 text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
          Mother's Dashboard
        </h1>

        {/* Buttons Grid */}
        <div className="flex flex-wrap justify-center gap-8 p-2">
          {/* Button 1: Registration Information */}
          <Link
            to="/registration"
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">📝</div>
            <div className="text-gray-700 font-medium text-sm md:text-base">Registration Information</div>
          </Link>

          {/* Button 2: Clinic Care */}
          <Link
            to="/clinic-care"
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">🏥</div>
            <div className="text-gray-700 font-medium text-sm md:text-base">Clinic Care</div>
          </Link>

          {/* Button 3: Postnatal Care */}
          <Link
            to="/postnatal-care"
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">👶</div>
            <div className="text-gray-700 font-medium text-sm md:text-base">Postnatal Care</div>
          </Link>

          {/* Button 4: Referral */}
          <Link
            to="/refferal"
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">➝</div>
            <div className="text-gray-700 font-medium text-sm md:text-base">Referral</div>
          </Link>

          {/* Button 5: PartB */}
          <Link
            to="/PartB"
            className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
          >
            <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">📋</div>
            <div className="text-gray-700 font-medium text-sm md:text-base">Pregnancy Form-Part B</div>
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;