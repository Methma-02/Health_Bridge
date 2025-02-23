import StudentHealthRecords from "./pages/studentHealthRecords";
import BabyDetails from "./pages/babyDetails";
import ImmunizationForm from "./pages/Immunization";
import DevelopmentMilestones from "./pages/developmentMilestones";
import HealthRecords from "./pages/childHealthRecord";
import SensoryScreening from "./pages/sensoryScreening";
import WeightGainChart from "./pages/WeightChart";
import HeightGainChart from "./pages/HeightChart";


function App(){
  return(
    <>
    <BabyDetails/>
    <ImmunizationForm/>
    <StudentHealthRecords/> 
    <DevelopmentMilestones/>
    <HealthRecords/>
    <StudentHealthRecords/>
    <SensoryScreening/>
    <WeightGainChart/>
    <HeightGainChart/>
    
    </>
  )
}
export default App;