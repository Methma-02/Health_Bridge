import React, { useState } from 'react';

const PregnancyRecordForm = () => {
  const [formData, setFormData] = useState({
    // Page 1 Fields
    bloodGroup: '',
    bmi: '',
    height: '',
    allergies: '',
    name: '',
    ageOfMother: '',
    nameOfHospitalClinic: '',
    nameOfConsultantObstetrician: '',
    mohArea: '',
    phmArea: '',
    nameOfFieldClinic: '',
    gramaNiladhariDivision: '',
    registrationNumber: '',
    regsitrationDate: '',
    
    // Risk Conditions
    antenatalRiskConditions: '',

    // Obstetric History
    gravidity: '',
    parity: '',
    childrenCount: '',
    ageOfYoungestChild: '',
    lastMenstrualPeriod: '',
    expectedDueDate: '',
    dateOf40WeeksCompletion: '',
    ultrasonographyCorrectEDD: '',
    periodOfArrivalAtDatingScan: '',
    dateOfQuickening: '',
    periodOfArrivalAtRegistration: '',

    // Screening and Immunization
    consanguinity: '',
    rubellaSatus: '',
    prePregnancyScreening: '',
    preconceptionalFolicAcid: '',
    subfertilityHistory: '',
    plannedPregnancy: '',
    lastFamilyPlanningMethod: '',

    // Wife's Personal Information
    wifeAge: '',
    wifeHighestEducationLevel: '',
    wifeOccupation: '',

    // Husband's Personal Information
    husbandAge: '',
    husbandHighestEducationLevel: '',
    husbandOccupation: '',

    // Family History
    familyHistory: {
      diabetesMelllitus: false,
      hypertension: false,
      haematologicalDiseases: false,
      twinOrMultiplePregnancies: false,
      otherConditions: ''
    },

    // Medical/Surgical History
    medicalConditions: {
      diabetes: false,
      hypertension: false,
      cardiacDiseases: false,
      renalDiseases: false,
      hepaticDiseases: false,
      psychiatricIllnesses: false,
      epilepsy: false,
      malignancies: false,
      haematologicalDiseases: false,
      tuberculosis: false,
      thyroidDiseases: false,
      bronchialAsthma: false
    },

    // Additional Medical History
    additionalMedicalHistory: {
      previousDVT: false,
      surgeriesOtherThanLSCS: false,
      otherSpecificConditions: ''
    },

    // Social Z Score
    socialZScore: '',

    // Past Obstetric History
    pastPregnancies: []

  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addPastPregnancy = () => {
    setFormData(prev => ({
      ...prev,
      pastPregnancies: [
        ...prev.pastPregnancies,
        {
          gravidity: '',
          placeAndModeOfDelivery: '',
          outcome: '',
          birthWeight: '',
          postnatalComplications: '',
          sex: '',
          age: ''
        }
      ]
    }));
  };

  const removePastPregnancy = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      pastPregnancies: prev.pastPregnancies.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handlePastPregnancyChange = (index, field, value) => {
    const updatedPastPregnancies = [...formData.pastPregnancies];
    updatedPastPregnancies[index][field] = value;
    setFormData(prev => ({
      ...prev,
      pastPregnancies: updatedPastPregnancies
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Pregnancy Record:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Basic Medical Information */}
      <div>
        <label>Blood Group</label>
        <input
          type="text"
          value={formData.bloodGroup}
          onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
        />

        <label>BMI</label>
        <input
          type="number"
          value={formData.bmi}
          onChange={(e) => handleInputChange('bmi', e.target.value)}
        />

        <label>Height (cm)</label>
        <input
          type="number"
          value={formData.height}
          onChange={(e) => handleInputChange('height', e.target.value)}
        />

        <label>Allergies</label>
        <input
          type="text"
          value={formData.allergies}
          onChange={(e) => handleInputChange('allergies', e.target.value)}
        />
      </div>

      {/* Personal Information */}
      <div>
        <h2>Personal Information</h2>
        <label>Mother's Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />

        <label>Age</label>
        <input
          type="number"
          value={formData.ageOfMother}
          onChange={(e) => handleInputChange('ageOfMother', e.target.value)}
        />

        <label>Name of Hospital/Clinic</label>
        <input
          type="text"
          value={formData.nameOfHospitalClinic}
          onChange={(e) => handleInputChange('nameOfHospitalClinic', e.target.value)}
        />

        <label>Name of Consultant Obstetrician</label>
        <input
          type="text"
          value={formData.nameOfConsultantObstetrician}
          onChange={(e) => handleInputChange('nameOfConsultantObstetrician', e.target.value)}
        />

        <label>MOH Area</label>
        <input
          type="text"
          value={formData.mohArea}
          onChange={(e) => handleInputChange('mohArea', e.target.value)}
        />

        <label>PHM Area</label>
        <input
          type="text"
          value={formData.phmArea}
          onChange={(e) => handleInputChange('phmArea', e.target.value)}
        />

        <label>Name of Field Clinic</label>
        <input
          type="text"
          value={formData.nameOfFieldClinic}
          onChange={(e) => handleInputChange('nameOfFieldClinic', e.target.value)}
        />

        <label>Grama Niladhari Division</label>
        <input
          type="text"
          value={formData.gramaNiladhariDivision}
          onChange={(e) => handleInputChange('gramaNiladhariDivision', e.target.value)}
        />

        <label>Registration Number</label>
        <input
          type="text"
          value={formData.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
        />

        <label>Registration Date</label>
        <input
          type="date"
          value={formData.registrationDate}
          onChange={(e) => handleInputChange('registrationDate', e.target.value)}
        />


        <label>Identified Antenatal Risk Conditions & Morbidities:</label>
        <textarea
          name="antenatalRiskConditions"
          value={formData.antenatalRiskConditions}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />

      </div>

      {/* Obstetric History */}
      <div>
        <h2>Obstetric History</h2>
        <label>Gravidity (G)</label>
        <input
          type="text"
          value={formData.gravidity}
          onChange={(e) => handleInputChange('gravidity', e.target.value)}
        />

        <label>Parity (P)</label>
        <input
          type="text"
          value={formData.parity}
          onChange={(e) => handleInputChange('parity', e.target.value)}
        />

        <label>Children Count (C)</label>
        <input 
          type="text"
          value={formData.childrenCount}
          onChange={(e) => handleInputChange('childrenCount', e.target.value)}
        />

        <label>Age of Youngest Child</label>
        <input
          type="text"
          value={formData.ageOfYoungestChild}
          onChange={(e) => handleInputChange('ageOfYoungestChild', e.target.value)}
        />

        <label>Last Menstrual Period</label>
        <input
          type="date"
          value={formData.lastMenstrualPeriod}
          onChange={(e) => handleInputChange('lastMenstrualPeriod', e.target.value)}
        />

        <label>Expected Due Date</label>
        <input
          type="date"
          value={formData.expectedDueDate}
          onChange={(e) => handleInputChange('expectedDueDate', e.target.value)}
        />

        <label>Date of 40 Weeks Completion</label>
        <input
          type="date"
          value={formData.dateOf40WeeksCompletion}
          onChange={(e) => handleInputChange('dateOf40WeeksCompletion', e.target.value)}
        />

        <label>Ultrasonography Correct EDD</label>
        <input
          type="date"
          value={formData.ultrasonographyCorrectEDD}
          onChange={(e) => handleInputChange('ultrasonographyCorrectEDD', e.target.value)}
        />

        <label>Period of Arrival at Dating Scan</label>
        <input
          type="text"
          value={formData.periodOfArrivalAtDatingScan}
          onChange={(e) => handleInputChange('periodOfArrivalAtDatingScan', e.target.value)}
        />

        <label>Date of Quickening</label>
        <input
          type="date"
          value={formData.dateOfQuickening}
          onChange={(e) => handleInputChange('dateOfQuickening', e.target.value)}
        />

        <label>Period of Arrival at Registration</label>
        <input
          type="text"
          value={formData.periodOfArrivalAtRegistration}
          onChange={(e) => handleInputChange('periodOfArrivalAtRegistration', e.target.value)}
        />
      </div>

      {/* Screening and Immunization */}
      <div>
        <h2>Screening and Immunization</h2>
        <label>Consanguinity</label>
        <input
          type="text"
          value={formData.consanguinity}
          onChange={(e) => handleInputChange('consanguinity', e.target.value)}
        />
        
        <label>Rubella Immunization Status</label>
        <input
          type="text"
          value={formData.rubellaSatus}
          onChange={(e) => handleInputChange('rubellaSatus', e.target.value)}
        />


        <p> </p>

        <div>
          <input
            type="checkbox"
            id="prePregnancyScreening"
            checked={formData.prePregnancyScreening}
            onChange={(e) => handleInputChange('prePregnancyScreening', e.target.checked)}
          />
          <label htmlFor="prePregnancyScreening">Pre-Pregnancy Screening Done</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="preconceptionalFolicAcid"
            checked={formData.preconceptionalFolicAcid}
            onChange={(e) => handleInputChange('preconceptionalFolicAcid', e.target.checked)}
          />
          <label htmlFor="preconceptionalFolicAcid">Preconceptional Folic Acid</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="subfertilityHistory"
            checked={formData.subfertilityHistory}
            onChange={(e) => handleInputChange('subfertilityHistory', e.target.checked)}
          />
          <label htmlFor="subfertilityHistory">History of Subfertility</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="plannedPregnancy"
            checked={formData.plannedPregnancy}
            onChange={(e) => handleInputChange('plannedPregnancy', e.target.checked)}
          />
          <label htmlFor="plannedPregnancy">Planned Pregnancy</label>
        </div>

        <br></br>

        <label>Last Family Planning Method Used</label>
        <input
          type="text"
          value={formData.lastFamilyPlanningMethod}
          onChange={(e) => handleInputChange('lastFamilyPlanningMethod', e.target.value)}
        />
      </div>

      {/* Wife's Personal Information */}
      <div>
        <h2>Wife's Personal Information</h2>
        <label>Age</label>
        <input
          type="number"
          value={formData.wifeAge}
          onChange={(e) => handleInputChange('wifeAge', e.target.value)}
        />

        <label>Highest Education Level</label>
        <input
          type="text"
          value={formData.wifeHighestEducationLevel}
          onChange={(e) => handleInputChange('wifeHighestEducationLevel', e.target.value)}
        />

        <label>Occupation</label>
        <input
          type="text"
          value={formData.wifeOccupation}
          onChange={(e) => handleInputChange('wifeOccupation', e.target.value)}
        />
      </div>

      {/* Husband's Personal Information */}
      <div>
        <h2>Husband's Personal Information</h2>
        <label>Age</label>
        <input
          type="number"
          value={formData.husbandAge}
          onChange={(e) => handleInputChange('husbandAge', e.target.value)}
        />

        <label>Highest Education Level</label>
        <input
          type="text"
          value={formData.husbandHighestEducationLevel}
          onChange={(e) => handleInputChange('husbandHighestEducationLevel', e.target.value)}
        />

        <label>Occupation</label>
        <input
          type="text"
          value={formData.husbandOccupation}
          onChange={(e) => handleInputChange('husbandOccupation', e.target.value)}
        />
      </div>

      {/* Family History */}
      <div>
        <h2>Family History</h2>
        {Object.keys(formData.familyHistory)
          .filter(key => key !== 'otherConditions')
          .map(condition => (
            <div key={condition}>
              <input
                type="checkbox"
                id={condition}
                checked={formData.medicalConditions[condition]}
                onChange={(e) => handleNestedInputChange('medicalConditions', condition, e.target.checked)}
              />
              <label htmlFor={condition}>
                {condition.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </div>
          ))}

        <label>Other Conditions</label>
        <input
          type="text"
          value={formData.medicalConditions.otherConditions}
          onChange={(e) => handleNestedInputChange('medicalConditions', 'otherConditions', e.target.value)}
        />
      </div>

      {/* Medical/Surgical History */}
      <div>
        <h2>Medical/Surgical History</h2>
        {Object.keys(formData.medicalConditions)
          .map(condition => (
            <div key={condition}>
              <input
                type="checkbox"
                id={condition}
                checked={formData.familyHistory[condition]}
                onChange={(e) => handleNestedInputChange('familyHistory', condition, e.target.checked)}
              />
              <label htmlFor={condition}>
                {condition.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
            </div>
          ))}
      </div>

      {/* Additional Medical History */}
      <div>
        <h2>Additional Medical History</h2>
        <div>
          <input
            type="checkbox"
            id="previousDVT"
            checked={formData.additionalMedicalHistory.previousDVT}
            onChange={(e) => handleNestedInputChange('additionalMedicalHistory', 'previousDVT', e.target.checked)}
          />
          <label htmlFor="previousDVT">Previous DVT</label>
        </div>

        <div>
      <input
        type="checkbox"
        id="surgeriesOtherThanLSCS"
        checked={formData.additionalMedicalHistory.surgeriesOtherThanLSCS}
        onChange={(e) => handleNestedInputChange('additionalMedicalHistory', 'surgeriesOtherThanLSCS', e.target.checked)}
      />
      <label htmlFor="surgeriesOtherThanLSCS">Surgeries other than LSCS</label>
    </div>

    <label>Other Specific Conditions</label>
    <input
      type="text"
      value={formData.additionalMedicalHistory.otherSpecificConditions}
      onChange={(e) => handleNestedInputChange('additionalMedicalHistory', 'otherSpecificConditions', e.target.value)}
    />
      </div>

      {/* Social Z Score */}
      <div>
        <label>Social Z Score</label>
        <input
          type="text"
          value={formData.socialZScore}
          onChange={(e) => handleInputChange('socialZScore', e.target.value)}
        />
      </div>

      {/* Past Obstetric History */}
      <div>
        <h2>Past Obstetric History</h2>
        
        {formData.pastPregnancies.length === 0 && (
          <p>No past pregnancies added. Click "Add Past Pregnancy" to enter details.</p>
        )}

        {formData.pastPregnancies.map((pregnancy, index) => (
          <div key={index}>
            <h3>Pregnancy {index + 1}</h3>
            <label>Antenatal Complications</label>
            <input
              type="text"
              value={pregnancy.gravidity}
              onChange={(e) => handlePastPregnancyChange(index, 'gravidity', e.target.value)}
            />

            <label>Place & Mode of Delivery</label>
            <input 
              type="text"
              value={pregnancy.placeAndModeOfDelivery}
              onChange={(e) => handlePastPregnancyChange(index, 'placeAndModeOfDelivery', e.target.value)}
            />

            <label>Outcome</label>
            <input
              type="text"
              value={pregnancy.outcome}
              onChange={(e) => handlePastPregnancyChange(index, 'outcome', e.target.value)}
            />

            <label>Birth Weight (g)</label>
            <input
              type="text"
              value={pregnancy.birthWeight}
              onChange={(e) => handlePastPregnancyChange(index, 'birthWeight', e.target.value)}
            />

            <label>Postnatal Complications</label>
            <input
              type="text"
              value={pregnancy.postnatalComplications}
              onChange={(e) => handlePastPregnancyChange(index, 'postnatalComplications', e.target.value)}
            />

            <label>Sex</label>
            <input
              type="text"
              value={pregnancy.sex}
              onChange={(e) => handlePastPregnancyChange(index, 'sex', e.target.value)}
            />

            <label>Age</label>
            <input
              type="text"
              value={pregnancy.age}
              onChange={(e) => handlePastPregnancyChange(index, 'age', e.target.value)}
            />

            <button 
              type="button" 
              onClick={() => removePastPregnancy(index)}
            >
              Remove Pregnancy
            </button>
          </div>
        ))}

        <br></br>

        <button type="button" onClick={addPastPregnancy}>
          Add Past Pregnancy
        </button>
      </div>

      <br></br>

      <button type="submit">Submit</button>
    </form>
  );
};

export default PregnancyRecordForm;