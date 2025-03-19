import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const SquareCard = ({ icon, title, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route); // Navigate to the nested route
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors duration-200 aspect-square"
      onClick={handleClick}
    >
      <div className="text-blue-600 text-2xl md:text-3xl mb-2 md:mb-3">{icon}</div>
      <div className="text-gray-700 font-medium text-sm md:text-base">{title}</div>
    </div>
  );
};

const MDashboard = () => {
  const location = useLocation(); // Get the current route location

  // Check if the current route is the root route ("/")
  const isRootRoute = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-4 lg:p-6">
      <div className="bg-blue-50 rounded-lg p-4 md:p-6 h-full">
        {/* Header */}
        <h1 className="text-blue-600 text-xl md:text-2xl font-bold flex items-center justify-center mb-4 md:mb-6">
          <span className="mr-2"></span>
          Baby Details
        </h1>

        {/* Conditionally render the cards grid or nested route content */}
        {isRootRoute ? (
          // Show the cards grid only on the root route
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
            <SquareCard icon="🤱" title="Baby Details" route="babyDetails" />
            <SquareCard icon="📊" title="Weight Charts" route="weightchart" />
            <SquareCard icon="📏" title="Height Charts" route="heightchart" />
            <SquareCard icon="💉" title="Vaccinations" route="immunization" />
            <SquareCard icon="👁️" title="Sensory Screening" route="sensoryscreening" />
            <SquareCard icon="🧩" title="Development Milestones" route="developmentmilestones" />
            <SquareCard icon="📋" title="Child Health Records" route="childhealthrecord" />
            <SquareCard icon="🎓" title="Student Health Records" route="studenthealthrecords" />
            <SquareCard icon="➝" title="Referral" route="referral" />
          </div>
        ) : (
          // Show the nested route content for all other routes
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <Outlet /> {/* Nested routes will render here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MDashboard;