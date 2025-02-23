import StudentHealthRecords from "./studentHealthRecords";
import BabyDetails from "./babyDetails";
import ImmunizationForm from "./Immunization";
import DevelopmentMilestones from "./developmentMilestones";
import HealthRecords from "./childHealthRecord";
import SensoryScreening from "./sensoryScreening";
import WeightGainChart from "../WeightChart";
import HeightGainChart from "../HeightChart";


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