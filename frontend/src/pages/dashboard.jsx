import { useState } from "react";
import BabyDetailsComponent from "./babyDetails";
import WeightGainChartComponent from "./WeightChart";
import HeightGainChartComponent from "./HeightChart";
import DevelopmentMilestonesComponent from "./developmentMilestones";
import ImmunizationFormComponent from "./Immunization";
import SensoryScreeningComponent from "./sensoryScreening";
import StudentHealthRecordsComponent from "./studentHealthRecords";
import ChildHealthRecordsComponent from "./childHealthRecord";
import ReferalComponent from "./referal";

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState("BabyDetails");

  // Render the active route component
  const renderRoute = () => {
    switch (activeRoute) {
      case "BabyDetails":
        return <BabyDetailsComponent />;
      case "WeightGainChart":
        return <WeightGainChartComponent />;
      case "HeightGainChart":
        return <HeightGainChartComponent />;
      case "ImmunizationForm":
        return <ImmunizationFormComponent />;
      case "SensoryScreening":
        return <SensoryScreeningComponent />;
      case "DevelopmentMilestones":
        return <DevelopmentMilestonesComponent />;
      case "ChildHealthRecords":
        return <ChildHealthRecordsComponent />;
      case "StudentHealthRecords":
        return <StudentHealthRecordsComponent />;  
      case "Referal":
        return <ReferalComponent />;
      default:
        return <ChildHealthRecordsComponent />;
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <div className="container ml-4 md:ml-5 px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-60 md:min-w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveRoute("BabyDetails")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "BabyDetails" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Baby Details - Baby icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 5h1v14h-1m-5-14v14m-7-7h12M4 12l4-4m0 0l4 4m-4-4v14"></path>
                      <circle cx="12" cy="7" r="3" strokeWidth="2"></circle>
                    </svg>
                    Baby Details
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("WeightGainChart")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "WeightGainChart" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Weight Charts - Scale icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                    Weight Charts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("HeightGainChart")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "HeightGainChart" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Height Charts - Updated vertical measuring tape icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3v18m0-10h4m-4 4h4m-4-8h4m-4-4h4M16 3v18"></path>
                    </svg>
                    Height Charts
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("ImmunizationForm")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "ImmunizationForm" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Vaccinations - Updated medical shield icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path>
                    </svg>
                    Vaccinations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("SensoryScreening")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "SensoryScreening" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Sensory Screening - Eye icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Sensory Screening
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("DevelopmentMilestones")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "DevelopmentMilestones" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Development Milestones - Growth/steps icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Development Milestones
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveRoute("Referal")}
                    className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                      activeRoute === "Referal" ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {/* Referrals - Document with arrow icon */}
                    <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16H9v-6h4l-2 2m5 4h-4"></path>
                    </svg>
                    Referrals
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
  
          {/* Main Content Area */}
          <main className="flex-1">
            {renderRoute()}
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;