import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Baby, BarChart, Ruler, ShieldCheck, Eye, Footprints, FileText, GraduationCap, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState("babyDetails");
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    setActiveRoute(route);
    navigate(route); // Navigate to the nested route
  };

  const navItems = [
    { id: "babyDetails", label: "Baby Details", icon: <Baby className="h-4 w-4 mr-1" /> },
    { id: "weightChart", label: "Weight Charts", icon: <BarChart className="h-4 w-4 mr-1" /> },
    { id: "heightChart", label: "Height Charts", icon: <Ruler className="h-4 w-4 mr-1" /> },
    { id: "immunization", label: "Vaccinations", icon: <ShieldCheck className="h-4 w-4 mr-1" /> },
    { id: "sensoryScreening", label: "Sensory Screening", icon: <Eye className="h-4 w-4 mr-1" /> },
    { id: "developmentMilestones", label: "Development Milestones", icon: <Footprints className="h-4 w-4 mr-0.5" /> },
    { id: "childHealthRecord", label: "Child Health Records", icon: <FileText className="h-4 w-4 mr-1" /> },
    { id: "studentHealthRecords", label: "Student Health Records", icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { id: "referral", label: "Referral", icon: <ArrowRight className="h-4 w-4 mr-1" /> },
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
                      onClick={() => handleNavigation(id)}
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
          <main className="flex-1 bg-white rounded-lg shadow-md p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;