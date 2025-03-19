import Form2 from "./components/PregnancyPartB/Pregnancy"
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Registration from "./components/RegistrationInformation/RegistrationInformation";
import ClinicCareTables from "./components/ClinicCare/Tables"; 
import PostnatalCare from "./components/PostnatalCare/PostnatalCare";
import Refferal from "./components/Refferal/Refferal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/clinic-care" element={<ClinicCareTables />} />
        <Route path="/postnatal-care" element={<PostnatalCare />} />
        <Route path="/refferal" element={<Refferal />} />
        <Route path="/PartB" element={<Form2 />} />
      </Routes>
    </Router>
  );
}

export default App;