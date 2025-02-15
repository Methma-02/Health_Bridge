import React, { useState } from 'react';
import { useFormContext
 } from '../../contexts/FormContext';
const PregnancyRecordForm = () => {
  const { formData, setFormData } = useFormContext();

  // Handle input changes for top-level fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle input changes for nested fields (e.g., familyHistory, medicalConditions)
  const handleNestedInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Add a new past pregnancy entry
  const addPastPregnancy = () => {
    setFormData((prev) => ({
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
          age: '',
        },
      ],
    }));
  };

  // Remove a past pregnancy entry
  const removePastPregnancy = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      pastPregnancies: prev.pastPregnancies.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Handle changes for past pregnancy fields
  const handlePastPregnancyChange = (index, field, value) => {
    const updatedPastPregnancies = [...formData.pastPregnancies];
    updatedPastPregnancies[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      pastPregnancies: updatedPastPregnancies,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/pregnancy-form1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
      // Clear the form fields after successful submission
     
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  // Fetch data by registration number
  const fetchDataByRegistrationNumber = async () => {
    const { registrationNumber } = formData;

    if (!registrationNumber) {
      alert('Please enter a registration number.');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/pregnancy-form1/${registrationNumber}`
      );

      

      if (!response.ok) {
        throw new Error('No data found for this registration number.');
      }

      const data = await response.json();
      console.log(data);
      setFormData(prevFormData => ({
        ...prevFormData, 
        ...data           
    })); // Auto-fill the form with the fetched data
      alert('Data loaded successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('No data found for this registration number.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Basic Medical Information */}
      <div>
        <label>Registration Number</label>
        <input
          type="text"
          value={formData.registrationNumber}
          onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
        /> <br />

        <button
          type="button"
          onClick={fetchDataByRegistrationNumber}
        >
          Get Info
        </button> <br /> <br />
        
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
          onChange={(e) => handleInputChange('antenatalRiskConditions', e.target.value)}
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
          value={formData.rubellaStatus}
          onChange={(e) => handleInputChange('rubellaStatus', e.target.value)}
        />

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
          .filter((key) => key !== 'otherConditions')
          .map((condition) => (
            <div key={condition}>
              <input
                type="checkbox"
                id={condition}
                checked={formData.familyHistory[condition]}
                onChange={(e) =>
                  handleNestedInputChange('familyHistory', condition, e.target.checked)
                }
              />
              <label htmlFor={condition}>
                {condition.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </label>
            </div>
          ))}

        <label>Other Conditions</label>
        <input
          type="text"
          value={formData.familyHistory.otherConditions}
          onChange={(e) =>
            handleNestedInputChange('familyHistory', 'otherConditions', e.target.value)
          }
        />
      </div>

      {/* Medical/Surgical History */}
      <div>
        <h2>Medical/Surgical History</h2>
        {Object.keys(formData.medicalConditions).map((condition) => (
          <div key={condition}>
            <input
              type="checkbox"
              id={condition}
              checked={formData.medicalConditions[condition]}
              onChange={(e) =>
                handleNestedInputChange('medicalConditions', condition, e.target.checked)
              }
            />
            <label htmlFor={condition}>
              {condition.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
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
            onChange={(e) =>
              handleNestedInputChange('additionalMedicalHistory', 'previousDVT', e.target.checked)
            }
          />
          <label htmlFor="previousDVT">Previous DVT</label>
        </div>

        <div>
          <input
            type="checkbox"
            id="surgeriesOtherThanLSCS"
            checked={formData.additionalMedicalHistory.surgeriesOtherThanLSCS}
            onChange={(e) =>
              handleNestedInputChange(
                'additionalMedicalHistory',
                'surgeriesOtherThanLSCS',
                e.target.checked
              )
            }
          />
          <label htmlFor="surgeriesOtherThanLSCS">Surgeries other than LSCS</label>
        </div>

        <label>Other Specific Conditions</label>
        <input
          type="text"
          value={formData.additionalMedicalHistory.otherSpecificConditions}
          onChange={(e) =>
            handleNestedInputChange(
              'additionalMedicalHistory',
              'otherSpecificConditions',
              e.target.value
            )
          }
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