import Form2 from "./Pregnancy";
import Tables from "./TablesR1";
import Table2 from "./TableR2";
import Form1 from "./Form1";
import { BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/form1")}>Go to Form1</button>
      <button onClick={() => navigate("/form2")}>Go to Form2</button>
    </div>
  );
};
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/form2" element={<Form2 />} />
      </Routes>
    </Router>
  );
}

export default App;

