import React from 'react';
import './App.css';
import { useForm2Context } from './contexts/Form2Context';

const ClinicForm = () => {
  const { formData, setFormData } = useForm2Context();

  const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/pregnancy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Data saved successfully!');
            } else {
                alert('Failed to save data.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while saving data.');
        }
    };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Clinic Visit Details</h2>
      <label>
        Date of Visit:
        <input type="date" name="dateOfVisit" value={formData.dateOfVisit} onChange={handleChange} />
      </label>
      <label>
        Weeks into Pregnancy:
        <input type="number" name="weeksIntoPregnancy" value={formData.weeksIntoPregnancy} onChange={handleChange} />
      </label>
      <label>
        Weight:
        <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
      </label>
      <label>
        Sugar:
        <input type="text" name="sugar" value={formData.sugar} onChange={handleChange} />
      </label>
      <label>
        Urine:
        <input type="text" name="urine" value={formData.urine} onChange={handleChange} />
      </label>
      <label>
        Albumin:
        <input type="text" name="albumin" value={formData.albumin} onChange={handleChange} />
      </label>
      <label>
        Security:
        <input type="text" name="security" value={formData.security} onChange={handleChange} />
      </label>
      <label>
        Swelling:
        <input type="text" name="swelling" value={formData.swelling} onChange={handleChange} />
      </label>
      <label>
        Blood Pressure:
        <input type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} />
      </label>
      <label>
        Fetal Height:
        <input type="text" name="fetalHeight" value={formData.fetalHeight} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <label>
        Fetal Movement:
        <input type="text" name="fetalMovement" value={formData.fetalMovement} onChange={handleChange} />
      </label>
      <label>
        Heart Sounds:
        <input type="text" name="heartSounds" value={formData.heartSounds} onChange={handleChange} />
      </label>
      <label>
        Iron Folate:
        <input type="text" name="ironFolate" value={formData.ironFolate} onChange={handleChange} />
      </label>
      <label>
        Vitamin C:
        <input type="text" name="vitaminC" value={formData.vitaminC} onChange={handleChange} />
      </label>
      <label>
        Calcium/Treatment of:
        <input type="text" name="calciumTreatment" value={formData.calciumTreatment} onChange={handleChange} />
      </label>
      <label>
        Malletha:
        <input type="text" name="malletha" value={formData.malletha} onChange={handleChange} />
      </label>
      <label>
        Thripocha:
        <input type="text" name="thripocha" value={formData.thripocha} onChange={handleChange} />
      </label>
      <label>
        Tested by (name):
        <input type="text" name="testedBy" value={formData.testedBy} onChange={handleChange} />
      </label>

      <h2>Other Tests</h2>
      <label>
        Height:
        <input type="text" name="height" value={formData.height} onChange={handleChange} />
      </label>
      <label>
        BMI:
        <input type="text" name="bmi" value={formData.bmi} onChange={handleChange} />
      </label>
      <label>
        Breast Examination:
        <input type="text" name="breastExamination" value={formData.breastExamination} onChange={handleChange} />
      </label>
      <label>
        Heart Examination:
        <input type="text" name="heartExamination" value={formData.heartExamination} onChange={handleChange} />
      </label>
      <label>
        Lungs:
        <input type="text" name="lungs" value={formData.lungs} onChange={handleChange} />
      </label>
      <label>
        Dental Disaster:
        <input type="text" name="dentalDisaster" value={formData.dentalDisaster} onChange={handleChange} />
      </label>
      <label>
        Scrofula:
        <input type="text" name="scrofula" value={formData.scrofula} onChange={handleChange} />
      </label>
      <label>
        Worm Treatment:
        <input type="text" name="wormTreatment" value={formData.wormTreatment} onChange={handleChange} />
      </label>

      <h2>VRDL</h2>
      <label>
        Dates of Blood Sampling:
        <input type="date" name="vrdlDates" value={formData.vrdlDates} onChange={handleChange} />
      </label>
      <label>
        Result Date:
        <input type="date" name="vrdlResultDate" value={formData.vrdlResultDate} onChange={handleChange} />
      </label>
      <label>
        Result:
        <input type="text" name="vrdlResult" value={formData.vrdlResult} onChange={handleChange} />
      </label>
      <label>
        Date of referral for further Treatment:
        <input type="date" name="referralDate" value={formData.referralDate} onChange={handleChange} />
      </label>

      <h2>Blood Tests</h2>
      <label>
        Blood Clot:
        <input type="text" name="bloodClot" value={formData.bloodClot} onChange={handleChange} />
      </label>
      <label>
        Hemoglobin:
        <input type="text" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} />
      </label>
      <label>
        Blood Sugar:
        <input type="text" name="bloodSugar" value={formData.bloodSugar} onChange={handleChange} />
      </label>

      <h2>The Outpouring</h2>
      <label>
        Date:
        <input type="date" name="outpouringDate" value={formData.outpouringDate} onChange={handleChange} />
      </label>
      <label>
        Batch No:
        <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} />
      </label>
      <label>
        Participating Clinics:
        <input type="text" name="participatingClinics" value={formData.participatingClinics} onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="mohClinic" checked={formData.mohClinic} onChange={handleChange} />
        MOH Clinic
      </label>
      <label>
        <input type="checkbox" name="specialClinic" checked={formData.specialClinic} onChange={handleChange} />
        Special Clinic
      </label>
      <label>
        <input type="checkbox" name="privateClinic" checked={formData.privateClinic} onChange={handleChange} />
        Private Clinic
      </label>
      <label>
        <input type="checkbox" name="otherClinic" checked={formData.otherClinic} onChange={handleChange} />
        Other Clinic
      </label>
      <label>
        Reason for Other Clinic:
        <input type="text" name="reasonForOtherClinic" value={formData.reasonForOtherClinic} onChange={handleChange} />
      </label>
      <label>
        Place:
        <input type="text" name="place" value={formData.place} onChange={handleChange} />
      </label>
      <label>
        Actions taken by the Mother:
        <input type="text" name="actionsTakenByMother" value={formData.actionsTakenByMother} onChange={handleChange} />
      </label>
      <label>
        Actions taken by family health officer in motor dating:
        <input type="text" name="actionsTakenByFamilyHealthOfficer" value={formData.actionsTakenByFamilyHealthOfficer} onChange={handleChange} />
      </label>

      <h2>Antenatal and Postnatal Chart</h2>
      <label>
        Birth Place:
        <select name="birthPlace" value={formData.birthPlace} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Hospital">Hospital</option>
          <option value="Home">Home</option>
        </select>
      </label>
      <label>
        Birth Date:
        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
      </label>
      <label>
        Result:
        <select name="birthResult" value={formData.birthResult} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Live Birth">Live Birth</option>
          <option value="Stillbirth">Stillbirth</option>
          <option value="Abortion">Abortion</option>
        </select>
      </label>
      <label>
        Name of the Institution:
        <input type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} />
      </label>
      <label>
        Done by:
        <input type="text" name="doneBy" value={formData.doneBy} onChange={handleChange} />
      </label>
      <label>
        Date of Discharge from the hospital:
        <input type="date" name="dischargeDate" value={formData.dischargeDate} onChange={handleChange} />
      </label>

      <h2>Obstetric Details</h2>
      <label>
        Obstetric Details:
        <select name="obstetricDetails" value={formData.obstetricDetails} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Normal">Normal</option>
          <option value="Cesarean">Cesarean</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Obstetric Complications:
        <input type="text" name="obstetricComplications" value={formData.obstetricComplications} onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="scratchesWound" checked={formData.scratchesWound} onChange={handleChange} />
        Scratches wound
      </label>
      <label>
        <input type="checkbox" name="remainingApura" checked={formData.remainingApura} onChange={handleChange} />
        Remaining Apura
      </label>
      <label>
        <input type="checkbox" name="prolongedLabour" checked={formData.prolongedLabour} onChange={handleChange} />
        Prolonged labour
      </label>
      <label>
        <input type="checkbox" name="postpartumBleeding" checked={formData.postpartumBleeding} onChange={handleChange} />
        Postpartum bleeding
      </label>
      <label>
        <input type="checkbox" name="circumcisionDone" checked={formData.circumcisionDone} onChange={handleChange} />
        Was Circumcision done
      </label>
      <label>
        <input type="checkbox" name="otherComplications" checked={formData.otherComplications} onChange={handleChange} />
        Other
      </label>

      <h2>Maternal Deaths</h2>
      <label>
        Date:
        <input type="date" name="maternalDeathsDate" value={formData.maternalDeathsDate} onChange={handleChange} />
      </label>
      <label>
        Reason:
        <input type="text" name="maternalDeathsReason" value={formData.maternalDeathsReason} onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="maternalDeathsInvestigated" checked={formData.maternalDeathsInvestigated} onChange={handleChange} />
        Investigated
      </label>

      <h2>Postnatal Care</h2>
      <label>
        Mother Temperature:
        <input type="text" name="postnatalCareMotherTemperature" value={formData.postnatalCareMotherTemperature} onChange={handleChange} />
      </label>
      <label>
        Security:
        <input type="text" name="postnatalCareMotherSecurity" value={formData.postnatalCareMotherSecurity} onChange={handleChange} />
      </label>
      <label>
        Contractions:
        <input type="text" name="contractions" value={formData.contractions} onChange={handleChange} />
      </label>
      <label>
        Users:
        <input type="text" name="users" value={formData.users} onChange={handleChange} />
      </label>
      <label>
        Coral Blood:
        <input type="text" name="coralBlood" value={formData.coralBlood} onChange={handleChange} />
      </label>
      <label>
        Paul-Smelling Discharge:
        <input type="text" name="paulSmellingDischarge" value={formData.paulSmellingDischarge} onChange={handleChange} />
      </label>
      <label>
        <input type="checkbox" name="discontinued" checked={formData.discontinued} onChange={handleChange} />
        Were There Discontinued
      </label>

      <h2>Health Symptoms</h2>
      <label>
        Mental Changes:
        <input type="text" name="mentalChanges" value={formData.mentalChanges} onChange={handleChange} />
      </label>
      <label>
        Upper Abdominal Pain:
        <input type="text" name="upperAbdominalPain" value={formData.upperAbdominalPain} onChange={handleChange} />
      </label>
      <label>
        Diarrhea:
        <input type="text" name="diarrhea" value={formData.diarrhea} onChange={handleChange} />
      </label>
      <label>
        Vomiting:
        <input type="text" name="vomiting" value={formData.vomiting} onChange={handleChange} />
      </label>
      <label>
        Difficulty Breathing:
        <input type="text" name="difficultyBreathing" value={formData.difficultyBreathing} onChange={handleChange} />
      </label>
      <label>
        Visual Impairment:
        <input type="text" name="visualImpairment" value={formData.visualImpairment} onChange={handleChange} />
      </label>
      <label>
        Pain in the Grain:
        <input type="text" name="painInTheGrain" value={formData.painInTheGrain} onChange={handleChange} />
      </label>
      <label>
        Child Abnormalities:
        <input type="text" name="childAbnormalities" value={formData.childAbnormalities} onChange={handleChange} />
      </label>
      <label>
        Fever:
        <input type="text" name="fever" value={formData.fever} onChange={handleChange} />
      </label>
      <label>
        Color:
        <input type="text" name="color" value={formData.color} onChange={handleChange} />
      </label>
      <label>
        Public Infections:
        <input type="text" name="publicInfections" value={formData.publicInfections} onChange={handleChange} />
      </label>
      <label>
        The White:
        <input type="text" name="theWhite" value={formData.theWhite} onChange={handleChange} />
      </label>
      <label>
        Breastfeeding Observed:
        <input type="text" name="breastfeedingObserved" value={formData.breastfeedingObserved} onChange={handleChange} />
      </label>
      <label>
        Marilore’s Medicines:
        <input type="text" name="mariloresMedicines" value={formData.mariloresMedicines} onChange={handleChange} />
      </label>
      <label>
        Child’s Medicine:
        <input type="text" name="childsMedicine" value={formData.childsMedicine} onChange={handleChange} />
      </label>
      <label>
        Peasant Clinic Day Attendance:
        <input type="text" name="peasantClinicDayAttendance" value={formData.peasantClinicDayAttendance} onChange={handleChange} />
      </label>

      <h2>Neonatal Information</h2>
      <label>
        Newborn SCR:
        <input type="text" name="newbornScr" value={formData.newbornScr} onChange={handleChange} />
      </label>
      <label>
        Neonatal Deaths Below / days:
        <input type="text" name="neonatalDeathsBelowDays" value={formData.neonatalDeathsBelowDays} onChange={handleChange} />
      </label>
      <label>
        Neonatal Deaths days + 28:
        <input type="text" name="neonatalDeathsDays28" value={formData.neonatalDeathsDays28} onChange={handleChange} />
      </label>
      <label>
        Inspected:
        <input type="text" name="inspected" value={formData.inspected} onChange={handleChange} />
      </label>
      <label>
        Cause of Death:
        <input type="text" name="causeOfDeath" value={formData.causeOfDeath} onChange={handleChange} />
      </label>
      <label>
        Postpartum Clinic Attendance:
        <input type="text" name="postpartumClinicAttendance" value={formData.postpartumClinicAttendance} onChange={handleChange} />
      </label>
      <label>
        Accepted a family organization system:
        <input type="text" name="acceptedFamilyOrganizationSystem" value={formData.acceptedFamilyOrganizationSystem} onChange={handleChange} />
      </label>
      <label>
        If not accepted, the return:
        <input type="text" name="ifNotAcceptedReturn" value={formData.ifNotAcceptedReturn} onChange={handleChange} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ClinicForm;