import React from 'react';
import { useNavigate } from 'react-router-dom';

const SquareCard = ({ icon, title, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
      onClick={handleClick}
    >
      <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">{icon}</div>
      <div className="text-gray-700 font-medium text-sm md:text-base">{title}</div>
    </div>
  );
};

const MDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6">
      <div className="bg-blue-50 rounded-lg p-4 md:p-6 h-full">
        {/* Header */}
        <h1 className="text-blue-600 text-xl md:text-2xl font-bold flex items-center justify-center mb-4 md:mb-6">
          Baby Dashboard
        </h1>

        {/* Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 p-2">
          <SquareCard icon="🤱" title="Baby Details" route="/babyDetails" />
          <SquareCard icon="📊" title="Weight Charts" route="/weightChart" />
          <SquareCard icon="📏" title="Height Charts" route="/heightChart" />
          <SquareCard icon="💉" title="Vaccinations" route="/immunization" />
          <SquareCard icon="👁️" title="Sensory Screening" route="/sensoryScreening" />
          <SquareCard icon="🧩" title="Development Milestones" route="/developmentMilestones" />
          <SquareCard icon="📋" title="Child Health Records" route="/childHealthRecord" />
          <SquareCard icon="🎓" title="Student Health Records" route="/studentHealthRecords" />
          <SquareCard icon="➝" title="Referral" route="/referral" />
        </div>
      </div>
    </div>
  );
};

export default MDashboard;