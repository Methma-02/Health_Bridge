import Form2 from "./Pregnancy";
import TablesR1 from "./TablesR1";
import Table2 from "./TableR2";
import Form1 from "./Form1";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Registration from "./components/RegistrationInformation/RegistrationInformation";
import ClinicCareTables from "./components/ClinicCare/Tables";  // Renamed to ClinicCareTables

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/clinic-care" element={<ClinicCareTables />} />
      </Routes>
    </Router>
  );
}

export default App;