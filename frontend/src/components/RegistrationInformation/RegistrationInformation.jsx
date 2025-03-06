import React, { useState, useEffect } from 'react';
import { useFormContext } from '../../contexts/FormContext';

const PregnancyRecordForm = () => {
  const { formData, setFormData } = useFormContext();
  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
      })); // Auto-fill the form with the fetched data
      alert('Data loaded successfully!');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('No data found for this registration number.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
        Pregnancy Record Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Medical Information */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Basic Medical Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Registration Number</label>
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <button
              type="button"
              onClick={fetchDataByRegistrationNumber}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Get Info
            </button>
            <div>
              <label className="block text-sm font-medium text-blue-700">Blood Group</label>
              <input
                type="text"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">BMI</label>
              <input
                type="number"
                value={formData.bmi}
                onChange={(e) => handleInputChange('bmi', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Height (cm)</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Allergies</label>
              <input
                type="text"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Mother's Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Age</label>
              <input
                type="number"
                value={formData.ageOfMother}
                onChange={(e) => handleInputChange('ageOfMother', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Name of Hospital/Clinic</label>
              <input
                type="text"
                value={formData.nameOfHospitalClinic}
                onChange={(e) => handleInputChange('nameOfHospitalClinic', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Name of Consultant Obstetrician</label>
              <input
                type="text"
                value={formData.nameOfConsultantObstetrician}
                onChange={(e) => handleInputChange('nameOfConsultantObstetrician', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">MOH Area</label>
              <input
                type="text"
                value={formData.mohArea}
                onChange={(e) => handleInputChange('mohArea', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">PHM Area</label>
              <input
                type="text"
                value={formData.phmArea}
                onChange={(e) => handleInputChange('phmArea', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Name of Field Clinic</label>
              <input
                type="text"
                value={formData.nameOfFieldClinic}
                onChange={(e) => handleInputChange('nameOfFieldClinic', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Grama Niladhari Division</label>
              <input
                type="text"
                value={formData.gramaNiladhariDivision}
                onChange={(e) => handleInputChange('gramaNiladhariDivision', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Registration Date</label>
              <input
                type="date"
                value={formData.registrationDate}
                onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Identified Antenatal Risk Conditions & Morbidities</label>
              <textarea
                name="antenatalRiskConditions"
                value={formData.antenatalRiskConditions}
                onChange={(e) => handleInputChange('antenatalRiskConditions', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Obstetric History */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Obstetric History</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Gravidity (G)</label>
              <input
                type="text"
                value={formData.gravidity}
                onChange={(e) => handleInputChange('gravidity', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Parity (P)</label>
              <input
                type="text"
                value={formData.parity}
                onChange={(e) => handleInputChange('parity', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Children Count (C)</label>
              <input
                type="text"
                value={formData.childrenCount}
                onChange={(e) => handleInputChange('childrenCount', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Age of Youngest Child</label>
              <input
                type="text"
                value={formData.ageOfYoungestChild}
                onChange={(e) => handleInputChange('ageOfYoungestChild', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Last Menstrual Period</label>
              <input
                type="date"
                value={formData.lastMenstrualPeriod}
                onChange={(e) => handleInputChange('lastMenstrualPeriod', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Expected Due Date</label>
              <input
                type="date"
                value={formData.expectedDueDate}
                onChange={(e) => handleInputChange('expectedDueDate', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Date of 40 Weeks Completion</label>
              <input
                type="date"
                value={formData.dateOf40WeeksCompletion}
                onChange={(e) => handleInputChange('dateOf40WeeksCompletion', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Ultrasonography Correct EDD</label>
              <input
                type="date"
                value={formData.ultrasonographyCorrectEDD}
                onChange={(e) => handleInputChange('ultrasonographyCorrectEDD', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Period of Arrival at Dating Scan</label>
              <input
                type="text"
                value={formData.periodOfArrivalAtDatingScan}
                onChange={(e) => handleInputChange('periodOfArrivalAtDatingScan', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Date of Quickening</label>
              <input
                type="date"
                value={formData.dateOfQuickening}
                onChange={(e) => handleInputChange('dateOfQuickening', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Period of Arrival at Registration</label>
              <input
                type="text"
                value={formData.periodOfArrivalAtRegistration}
                onChange={(e) => handleInputChange('periodOfArrivalAtRegistration', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Screening and Immunization */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Screening and Immunization</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Consanguinity</label>
              <input
                type="text"
                value={formData.consanguinity}
                onChange={(e) => handleInputChange('consanguinity', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Rubella Immunization Status</label>
              <input
                type="text"
                value={formData.rubellaStatus}
                onChange={(e) => handleInputChange('rubellaStatus', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="prePregnancyScreening"
                checked={formData.prePregnancyScreening}
                onChange={(e) => handleInputChange('prePregnancyScreening', e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="prePregnancyScreening" className="ml-2 text-sm text-blue-700">
                Pre-Pregnancy Screening Done
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="preconceptionalFolicAcid"
                checked={formData.preconceptionalFolicAcid}
                onChange={(e) => handleInputChange('preconceptionalFolicAcid', e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="preconceptionalFolicAcid" className="ml-2 text-sm text-blue-700">
                Preconceptional Folic Acid
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="subfertilityHistory"
                checked={formData.subfertilityHistory}
                onChange={(e) => handleInputChange('subfertilityHistory', e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="subfertilityHistory" className="ml-2 text-sm text-blue-700">
                History of Subfertility
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="plannedPregnancy"
                checked={formData.plannedPregnancy}
                onChange={(e) => handleInputChange('plannedPregnancy', e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="plannedPregnancy" className="ml-2 text-sm text-blue-700">
                Planned Pregnancy
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Last Family Planning Method Used</label>
              <input
                type="text"
                value={formData.lastFamilyPlanningMethod}
                onChange={(e) => handleInputChange('lastFamilyPlanningMethod', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Wife's Personal Information */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Wife's Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Age</label>
              <input
                type="number"
                value={formData.wifeAge}
                onChange={(e) => handleInputChange('wifeAge', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Highest Education Level</label>
              <input
                type="text"
                value={formData.wifeHighestEducationLevel}
                onChange={(e) => handleInputChange('wifeHighestEducationLevel', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Occupation</label>
              <input
                type="text"
                value={formData.wifeOccupation}
                onChange={(e) => handleInputChange('wifeOccupation', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Husband's Personal Information */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Husband's Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Age</label>
              <input
                type="number"
                value={formData.husbandAge}
                onChange={(e) => handleInputChange('husbandAge', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Highest Education Level</label>
              <input
                type="text"
                value={formData.husbandHighestEducationLevel}
                onChange={(e) => handleInputChange('husbandHighestEducationLevel', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Occupation</label>
              <input
                type="text"
                value={formData.husbandOccupation}
                onChange={(e) => handleInputChange('husbandOccupation', e.target.value)}
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Family History */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Family History</h2>
          <div className="space-y-4">
            {Object.keys(formData.familyHistory)
              .filter((key) => key !== 'otherConditions')
              .map((condition) => (
                <div key={condition} className="flex items-center">
                  <input
                    type="checkbox"
                    id={condition}
                    checked={formData.familyHistory[condition]}
                    onChange={(e) =>
                      handleNestedInputChange('familyHistory', condition, e.target.checked)
                    }
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                  />
                  <label htmlFor={condition} className="ml-2 text-sm text-blue-700">
                    {condition.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                  </label>
                </div>
              ))}
            <div>
              <label className="block text-sm font-medium text-blue-700">Other Conditions</label>
              <input
                type="text"
                value={formData.familyHistory.otherConditions}
                onChange={(e) =>
                  handleNestedInputChange('familyHistory', 'otherConditions', e.target.value)
                }
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Medical/Surgical History */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Medical/Surgical History</h2>
          <div className="space-y-4">
            {Object.keys(formData.medicalConditions).map((condition) => (
              <div key={condition} className="flex items-center">
                <input
                  type="checkbox"
                  id={condition}
                  checked={formData.medicalConditions[condition]}
                  onChange={(e) =>
                    handleNestedInputChange('medicalConditions', condition, e.target.checked)
                  }
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <label htmlFor={condition} className="ml-2 text-sm text-blue-700">
                  {condition.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Medical History */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Additional Medical History</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="previousDVT"
                checked={formData.additionalMedicalHistory.previousDVT}
                onChange={(e) =>
                  handleNestedInputChange('additionalMedicalHistory', 'previousDVT', e.target.checked)
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="previousDVT" className="ml-2 text-sm text-blue-700">
                Previous DVT
              </label>
            </div>
            <div className="flex items-center">
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
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
              />
              <label htmlFor="surgeriesOtherThanLSCS" className="ml-2 text-sm text-blue-700">
                Surgeries other than LSCS
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-700">Other Specific Conditions</label>
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
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* Social Z Score */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Social Z Score</h2>
          <div>
            <label className="block text-sm font-medium text-blue-700">Social Z Score</label>
            <input
              type="text"
              value={formData.socialZScore}
              onChange={(e) => handleInputChange('socialZScore', e.target.value)}
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
          </div>
        </div>

        {/* Past Obstetric History */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Past Obstetric History</h2>
          {formData.pastPregnancies.length === 0 && (
            <p className="text-sm text-blue-700">No past pregnancies added. Click "Add Past Pregnancy" to enter details.</p>
          )}
          {formData.pastPregnancies.map((pregnancy, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-700">Pregnancy {index + 1}</h3>
              <div>
                <label className="block text-sm font-medium text-blue-700">Antenatal Complications</label>
                <input
                  type="text"
                  value={pregnancy.gravidity}
                  onChange={(e) => handlePastPregnancyChange(index, 'gravidity', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Place & Mode of Delivery</label>
                <input
                  type="text"
                  value={pregnancy.placeAndModeOfDelivery}
                  onChange={(e) => handlePastPregnancyChange(index, 'placeAndModeOfDelivery', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Outcome</label>
                <input
                  type="text"
                  value={pregnancy.outcome}
                  onChange={(e) => handlePastPregnancyChange(index, 'outcome', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Birth Weight (g)</label>
                <input
                  type="text"
                  value={pregnancy.birthWeight}
                  onChange={(e) => handlePastPregnancyChange(index, 'birthWeight', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Postnatal Complications</label>
                <input
                  type="text"
                  value={pregnancy.postnatalComplications}
                  onChange={(e) => handlePastPregnancyChange(index, 'postnatalComplications', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Sex</label>
                <input
                  type="text"
                  value={pregnancy.sex}
                  onChange={(e) => handlePastPregnancyChange(index, 'sex', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-blue-700">Age</label>
                <input
                  type="text"
                  value={pregnancy.age}
                  onChange={(e) => handlePastPregnancyChange(index, 'age', e.target.value)}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
              <button
                type="button"
                onClick={() => removePastPregnancy(index)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Pregnancy
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPastPregnancy}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Past Pregnancy
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
          >
            Submit All Records
          </button>
        </div>
      </form>
    </div>
  );
};

export default PregnancyRecordForm;