import { useState } from "react";
import { Baby, BarChart, Ruler, ShieldCheck, Eye, Footprints, FileText, GraduationCap, ArrowRight } from "lucide-react";
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
      case "Referral":
        return <ReferalComponent />;
      default:
        return <ChildHealthRecordsComponent />;
    }
  };

  const navItems = [
    { id: "BabyDetails", label: "Baby Details", icon: <Baby className="h-4 w-4 mr-1" /> },
    { id: "WeightGainChart", label: "Weight Charts", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { id: "HeightGainChart", label: "Height Charts", icon: <Ruler className="h-4 w-4 mr-1" /> },
    { id: "ImmunizationForm", label: "Vaccinations", icon: <ShieldCheck className="h-4 w-4 mr-1" /> },
    { id: "SensoryScreening", label: "Sensory Screening", icon: <Eye className="h-4 w-4 mr-1" /> },
    { id: "DevelopmentMilestones", label: "Development Milestones", icon: <Footprints className="h-4 w-4 mr-0.5" /> },
    { id: "ChildHealthRecords", label: "Child Health Records", icon: <FileText className="h-4 w-4 mr-1" /> },
    { id: "StudentHealthRecords", label: "Student Health Records", icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { id: "Referral", label: "Referral", icon: <ArrowRight className="h-4 w-4 mr-1" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container ml-4 md:ml-5 px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-60 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav>
              <ul className="space-y-2">
                {navItems.map(({ id, label, icon }) => (
                  <li key={id}>
                    <button
                      onClick={() => setActiveRoute(id)}
                      className={`w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        activeRoute === id ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {icon} {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
          <main className="flex-1 bg-white rounded-lg shadow-md p-6">{renderRoute()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
