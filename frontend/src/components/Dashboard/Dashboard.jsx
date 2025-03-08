import { Outlet, NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container ml-4 md:ml-5 px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-60 md:min-w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav>
              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="registration"
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                      }`
                    }
                  >
                    <span className="h-5 w-5 mr-3">📝</span>
                    Registration Information
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="clinic-care"
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                      }`
                    }
                  >
                    <span className="h-5 w-5 mr-3">🏥</span>
                    Clinic Care
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="postnatal-care"
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                      }`
                    }
                  >
                    <span className="h-5 w-5 mr-3">👶</span>
                    Postnatal Care
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="referral"
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                      }`
                    }
                  >
                    <span className="h-5 w-5 mr-3">➡️</span>
                    Referral
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="part-b"
                    className={({ isActive }) =>
                      `w-full flex items-center p-3 text-sm font-medium rounded-md ${
                        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-blue-50'
                      }`
                    }
                  >
                    <span className="h-5 w-5 mr-3">📋</span>
                    Pregnancy Form-Part B
                  </NavLink>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;