import React from 'react';
import { useForm2Context } from '../../contexts/Form2Context';

const ClinicForm = () => {
  const { formData, setFormData } = useForm2Context();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/pregnancy', {
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
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
        Clinic Visit Details
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Clinic Visit Details */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Clinic Visit Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Date of Visit', name: 'dateOfVisit', type: 'date' },
              { label: 'Weeks into Pregnancy', name: 'weeksIntoPregnancy', type: 'number' },
              { label: 'Weight', name: 'weight', type: 'text' },
              { label: 'Sugar', name: 'sugar', type: 'text' },
              { label: 'Urine', name: 'urine', type: 'text' },
              { label: 'Albumin', name: 'albumin', type: 'text' },
              { label: 'Security', name: 'security', type: 'text' },
              { label: 'Swelling', name: 'swelling', type: 'text' },
              { label: 'Blood Pressure', name: 'bloodPressure', type: 'text' },
              { label: 'Fetal Height', name: 'fetalHeight', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Fetal Movement', name: 'fetalMovement', type: 'text' },
              { label: 'Heart Sounds', name: 'heartSounds', type: 'text' },
              { label: 'Iron Folate', name: 'ironFolate', type: 'text' },
              { label: 'Vitamin C', name: 'vitaminC', type: 'text' },
              { label: 'Calcium/Treatment of', name: 'calciumTreatment', type: 'text' },
              { label: 'Malletha', name: 'malletha', type: 'text' },
              { label: 'Thripocha', name: 'thripocha', type: 'text' },
              { label: 'Tested by (name)', name: 'testedBy', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Other Tests */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Other Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Height', name: 'height', type: 'text' },
              { label: 'BMI', name: 'bmi', type: 'text' },
              { label: 'Breast Examination', name: 'breastExamination', type: 'text' },
              { label: 'Heart Examination', name: 'heartExamination', type: 'text' },
              { label: 'Lungs', name: 'lungs', type: 'text' },
              { label: 'Dental Disaster', name: 'dentalDisaster', type: 'text' },
              { label: 'Scrofula', name: 'scrofula', type: 'text' },
              { label: 'Worm Treatment', name: 'wormTreatment', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* VRDL */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            VRDL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Dates of Blood Sampling', name: 'vrdlDates', type: 'date' },
              { label: 'Result Date', name: 'vrdlResultDate', type: 'date' },
              { label: 'Result', name: 'vrdlResult', type: 'text' },
              { label: 'Date of referral for further Treatment', name: 'referralDate', type: 'date' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Blood Tests */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Blood Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Blood Clot', name: 'bloodClot', type: 'text' },
              { label: 'Hemoglobin', name: 'hemoglobin', type: 'text' },
              { label: 'Blood Sugar', name: 'bloodSugar', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* The Outpouring */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            The Outpouring
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Date', name: 'outpouringDate', type: 'date' },
              { label: 'Batch No', name: 'batchNo', type: 'text' },
              { label: 'Participating Clinics', name: 'participatingClinics', type: 'text' },
              { label: 'Reason for Other Clinic', name: 'reasonForOtherClinic', type: 'text' },
              { label: 'Place', name: 'place', type: 'text' },
              { label: 'Actions taken by the Mother', name: 'actionsTakenByMother', type: 'text' },
              { label: 'Actions taken by family health officer in motor dating', name: 'actionsTakenByFamilyHealthOfficer', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
            {['mohClinic', 'specialClinic', 'privateClinic', 'otherClinic'].map((field) => (
              <div key={field} className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={field}
                    checked={formData[field]}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                  />
                  <span className="ml-2 text-sm text-blue-700">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Antenatal and Postnatal Chart */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Antenatal and Postnatal Chart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Birth Place', name: 'birthPlace', type: 'select', options: ['', 'Hospital', 'Home'] },
              { label: 'Birth Date', name: 'birthDate', type: 'date' },
              { label: 'Result', name: 'birthResult', type: 'select', options: ['', 'Live Birth', 'Stillbirth', 'Abortion'] },
              { label: 'Name of the Institution', name: 'institutionName', type: 'text' },
              { label: 'Done by', name: 'doneBy', type: 'text' },
              { label: 'Date of Discharge from the hospital', name: 'dischargeDate', type: 'date' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Obstetric Details */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Obstetric Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Obstetric Details', name: 'obstetricDetails', type: 'select', options: ['', 'Normal', 'Cesarean', 'Other'] },
              { label: 'Obstetric Complications', name: 'obstetricComplications', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                  />
                )}
              </div>
            ))}
            {[
              'scratchesWound',
              'remainingApura',
              'prolongedLabour',
              'postpartumBleeding',
              'circumcisionDone',
              'otherComplications',
            ].map((field) => (
              <div key={field} className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name={field}
                    checked={formData[field]}
                    onChange={handleChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                  />
                  <span className="ml-2 text-sm text-blue-700">
                    {field.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Maternal Deaths */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Maternal Deaths
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Date', name: 'maternalDeathsDate', type: 'date' },
              { label: 'Reason', name: 'maternalDeathsReason', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="maternalDeathsInvestigated"
                  checked={formData.maternalDeathsInvestigated}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <span className="ml-2 text-sm text-blue-700">Investigated</span>
              </label>
            </div>
          </div>
        </div>

        {/* Postnatal Care */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Postnatal Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Mother Temperature', name: 'postnatalCareMotherTemperature', type: 'text' },
              { label: 'Security', name: 'postnatalCareMotherSecurity', type: 'text' },
              { label: 'Contractions', name: 'contractions', type: 'text' },
              { label: 'Users', name: 'users', type: 'text' },
              { label: 'Coral Blood', name: 'coralBlood', type: 'text' },
              { label: 'Paul-Smelling Discharge', name: 'paulSmellingDischarge', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="discontinued"
                  checked={formData.discontinued}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <span className="ml-2 text-sm text-blue-700">Were There Discontinued</span>
              </label>
            </div>
          </div>
        </div>

        {/* Health Symptoms */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Health Symptoms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Mental Changes', name: 'mentalChanges', type: 'text' },
              { label: 'Upper Abdominal Pain', name: 'upperAbdominalPain', type: 'text' },
              { label: 'Diarrhea', name: 'diarrhea', type: 'text' },
              { label: 'Vomiting', name: 'vomiting', type: 'text' },
              { label: 'Difficulty Breathing', name: 'difficultyBreathing', type: 'text' },
              { label: 'Visual Impairment', name: 'visualImpairment', type: 'text' },
              { label: 'Pain in the Grain', name: 'painInTheGrain', type: 'text' },
              { label: 'Child Abnormalities', name: 'childAbnormalities', type: 'text' },
              { label: 'Fever', name: 'fever', type: 'text' },
              { label: 'Color', name: 'color', type: 'text' },
              { label: 'Public Infections', name: 'publicInfections', type: 'text' },
              { label: 'The White', name: 'theWhite', type: 'text' },
              { label: 'Breastfeeding Observed', name: 'breastfeedingObserved', type: 'text' },
              { label: 'Marilore’s Medicines', name: 'mariloresMedicines', type: 'text' },
              { label: 'Child’s Medicine', name: 'childsMedicine', type: 'text' },
              { label: 'Peasant Clinic Day Attendance', name: 'peasantClinicDayAttendance', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Neonatal Information */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Neonatal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Newborn SCR', name: 'newbornScr', type: 'text' },
              { label: 'Neonatal Deaths Below / days', name: 'neonatalDeathsBelowDays', type: 'text' },
              { label: 'Neonatal Deaths days + 28', name: 'neonatalDeathsDays28', type: 'text' },
              { label: 'Inspected', name: 'inspected', type: 'text' },
              { label: 'Cause of Death', name: 'causeOfDeath', type: 'text' },
              { label: 'Postpartum Clinic Attendance', name: 'postpartumClinicAttendance', type: 'text' },
              { label: 'Accepted a family organization system', name: 'acceptedFamilyOrganizationSystem', type: 'text' },
              { label: 'If not accepted, the return', name: 'ifNotAcceptedReturn', type: 'text' },
            ].map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
          >
            Submit All Records
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicForm;