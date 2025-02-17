import StudentHealthRecords from "./studentHealthRecords";
import BabyDetails from "./babyDetails";
import ImmunizationForm from "./Immunization";
import DevelopmentMilestones from "./developmentMilestones";
import HealthRecords from "./childHealthRecord";
import SensoryScreening from "./scensoryScreening";


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
    
    </>
  )
}
export default App;