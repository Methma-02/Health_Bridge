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
    registrationDate: '',
    
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
    rubellaStatus: '',
    prePregnancyScreening: false,
    preconceptionalFolicAcid: false,
    subfertilityHistory: false,
    plannedPregnancy: false,
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
      diabetesMellitus: false,
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

  // Helper function to render input fields
  const renderInputFields = (fields) => {
    return fields.map((field) => (
      <div key={field.name}>
        <label>{field.label}</label>
        <input
          type={field.type || 'text'}
          value={formData[field.name]}
          onChange={(e) => handleInputChange(field.name, e.target.value)}
        />
      </div>
    ));
  };

  // Helper function to render checkbox fields
  const renderCheckboxFields = (fields, section) => {
    return fields.map((field) => (
      <div key={field.name}>
        <input
          type="checkbox"
          id={field.name}
          checked={formData[section][field.name]}
          onChange={(e) => handleNestedInputChange(section, field.name, e.target.checked)}
        />
        <label htmlFor={field.name}>{field.label}</label>
      </div>
    ));
  };

  // Basic Medical Information Fields
  const basicMedicalFields = [
    { name: 'bloodGroup', label: 'Blood Group', type: 'text' },
    { name: 'bmi', label: 'BMI', type: 'number' },
    { name: 'height', label: 'Height (cm)', type: 'number' },
    { name: 'allergies', label: 'Allergies', type: 'text' }
  ];

  // Personal Information Fields
  const personalInfoFields = [
    { name: 'name', label: "Mother's Name", type: 'text' },
    { name: 'ageOfMother', label: 'Age', type: 'number' },
    { name: 'nameOfHospitalClinic', label: 'Name of Hospital/Clinic', type: 'text' },
    { name: 'nameOfConsultantObstetrician', label: 'Name of Consultant Obstetrician', type: 'text' },
    { name: 'mohArea', label: 'MOH Area', type: 'text' },
    { name: 'phmArea', label: 'PHM Area', type: 'text' },
    { name: 'nameOfFieldClinic', label: 'Name of Field Clinic', type: 'text' },
    { name: 'gramaNiladhariDivision', label: 'Grama Niladhari Division', type: 'text' },
    { name: 'registrationNumber', label: 'Registration Number', type: 'text' },
    { name: 'registrationDate', label: 'Registration Date', type: 'date' }
  ];

  // Obstetric History Fields
  const obstetricHistoryFields = [
    { name: 'gravidity', label: 'Gravidity (G)', type: 'text' },
    { name: 'parity', label: 'Parity (P)', type: 'text' },
    { name: 'childrenCount', label: 'Children Count (C)', type: 'text' },
    { name: 'ageOfYoungestChild', label: 'Age of Youngest Child', type: 'text' },
    { name: 'lastMenstrualPeriod', label: 'Last Menstrual Period', type: 'date' },
    { name: 'expectedDueDate', label: 'Expected Due Date', type: 'date' },
    { name: 'dateOf40WeeksCompletion', label: 'Date of 40 Weeks Completion', type: 'date' },
    { name: 'ultrasonographyCorrectEDD', label: 'Ultrasonography Correct EDD', type: 'date' },
    { name: 'periodOfArrivalAtDatingScan', label: 'Period of Arrival at Dating Scan', type: 'text' },
    { name: 'dateOfQuickening', label: 'Date of Quickening', type: 'date' },
    { name: 'periodOfArrivalAtRegistration', label: 'Period of Arrival at Registration', type: 'text' }
  ];

  // Screening and Immunization Fields
  const screeningFields = [
    { name: 'consanguinity', label: 'Consanguinity', type: 'text' },
    { name: 'rubellaStatus', label: 'Rubella Immunization Status', type: 'text' }
  ];

  // Wife's Personal Information Fields
  const wifeInfoFields = [
    { name: 'wifeAge', label: 'Age', type: 'number' },
    { name: 'wifeHighestEducationLevel', label: 'Highest Education Level', type: 'text' },
    { name: 'wifeOccupation', label: 'Occupation', type: 'text' }
  ];

  // Husband's Personal Information Fields
  const husbandInfoFields = [
    { name: 'husbandAge', label: 'Age', type: 'number' },
    { name: 'husbandHighestEducationLevel', label: 'Highest Education Level', type: 'text' },
    { name: 'husbandOccupation', label: 'Occupation', type: 'text' }
  ];

  // Family History Fields
  const familyHistoryFields = [
    { name: 'diabetesMellitus', label: 'Diabetes Mellitus' },
    { name: 'hypertension', label: 'Hypertension' },
    { name: 'haematologicalDiseases', label: 'Haematological Diseases' },
    { name: 'twinOrMultiplePregnancies', label: 'Twin or Multiple Pregnancies' }
  ];

  // Medical/Surgical History Fields
  const medicalHistoryFields = [
    { name: 'diabetes', label: 'Diabetes' },
    { name: 'hypertension', label: 'Hypertension' },
    { name: 'cardiacDiseases', label: 'Cardiac Diseases' },
    { name: 'renalDiseases', label: 'Renal Diseases' },
    { name: 'hepaticDiseases', label: 'Hepatic Diseases' },
    { name: 'psychiatricIllnesses', label: 'Psychiatric Illnesses' },
    { name: 'epilepsy', label: 'Epilepsy' },
    { name: 'malignancies', label: 'Malignancies' },
    { name: 'haematologicalDiseases', label: 'Haematological Diseases' },
    { name: 'tuberculosis', label: 'Tuberculosis' },
    { name: 'thyroidDiseases', label: 'Thyroid Diseases' },
    { name: 'bronchialAsthma', label: 'Bronchial Asthma' }
  ];

  // Additional Medical History Fields
  const additionalMedicalHistoryFields = [
    { name: 'previousDVT', label: 'Previous DVT' },
    { name: 'surgeriesOtherThanLSCS', label: 'Surgeries other than LSCS' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {/* Basic Medical Information */}
      <div>
        <h2>Basic Medical Information</h2>
        {renderInputFields(basicMedicalFields)}
      </div>

      {/* Personal Information */}
      <div>
        <h2>Personal Information</h2>
        {renderInputFields(personalInfoFields)}
      </div>

      {/* Obstetric History */}
      <div>
        <h2>Obstetric History</h2>
        {renderInputFields(obstetricHistoryFields)}
      </div>

      {/* Screening and Immunization */}
      <div>
        <h2>Screening and Immunization</h2>
        {renderInputFields(screeningFields)}
        {renderCheckboxFields([
          { name: 'prePregnancyScreening', label: 'Pre-Pregnancy Screening Done' },
          { name: 'preconceptionalFolicAcid', label: 'Preconceptional Folic Acid' },
          { name: 'subfertilityHistory', label: 'History of Subfertility' },
          { name: 'plannedPregnancy', label: 'Planned Pregnancy' }
        ], '')}
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
        {renderInputFields(wifeInfoFields)}
      </div>

      {/* Husband's Personal Information */}
      <div>
        <h2>Husband's Personal Information</h2>
        {renderInputFields(husbandInfoFields)}
      </div>

      {/* Family History */}
      <div>
        <h2>Family History</h2>
        {renderCheckboxFields(familyHistoryFields, 'familyHistory')}
        <label>Other Conditions</label>
        <input
          type="text"
          value={formData.familyHistory.otherConditions}
          onChange={(e) => handleNestedInputChange('familyHistory', 'otherConditions', e.target.value)}
        />
      </div>

      {/* Medical/Surgical History */}
      <div>
        <h2>Medical/Surgical History</h2>
        {renderCheckboxFields(medicalHistoryFields, 'medicalConditions')}
      </div>

      {/* Additional Medical History */}
      <div>
        <h2>Additional Medical History</h2>
        {renderCheckboxFields(additionalMedicalHistoryFields, 'additionalMedicalHistory')}
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
            {renderInputFields([
              { name: 'gravidity', label: 'Antenatal Complications', type: 'text' },
              { name: 'placeAndModeOfDelivery', label: 'Place & Mode of Delivery', type: 'text' },
              { name: 'outcome', label: 'Outcome', type: 'text' },
              { name: 'birthWeight', label: 'Birth Weight (g)', type: 'text' },
              { name: 'postnatalComplications', label: 'Postnatal Complications', type: 'text' },
              { name: 'sex', label: 'Sex', type: 'text' },
              { name: 'age', label: 'Age', type: 'text' }
            ].map(field => ({
              ...field,
              value: pregnancy[field.name],
              onChange: (e) => handlePastPregnancyChange(index, field.name, e.target.value)
            })))}
            <button type="button" onClick={() => removePastPregnancy(index)}>
              Remove Pregnancy
            </button>
          </div>
        ))}
        <button type="button" onClick={addPastPregnancy}>
          Add Past Pregnancy
        </button>
      </div>

      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PregnancyRecordForm;