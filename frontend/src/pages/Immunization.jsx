
import { useState, useEffect } from 'react';// Import necessary hooks from React

const ImmunizationForm = () => {// Define the main functional component for Immunization Form
  // Default structure for a vaccine object
  const defaultVaccine = { date: '', batchNo: '', bcgScar: '', adverseEffects: false };
  
  const initialVaccineSchedule = [//Initial vaccine schedule with age groups and corresponding vaccines
    { age: 'At Birth', vaccines: ['B.C.G'], bcgScar: 'absent' },
    { age: '2 Months', vaccines: ['DPT 1', 'OPV 1', 'Hepatitis B1'] },
    { age: '4 Months', vaccines: ['DPT 2', 'OPV 2', 'Hepatitis B2'] },
    { age: '6 Months', vaccines: ['DPT 3', 'OPV 3', 'Hepatitis B3'] },
    { age: '9 Months', vaccines: ['Measles', 'Vitamin A'] },
    { age: '18 Months', vaccines: ['DPT 4', 'OPV 4', 'Vitamin A'] },
    { age: '3 Years', vaccines: ['Measles & Rubella', 'Vitamin A'] },
    { age: '5 Years', vaccines: ['D.T', 'OPV 5'] },
    { age: '10-14 Years', vaccines: ['Rubella', 'atd'] },
    { age: 'Japanese Encephalitis', vaccines: ['JE 1', 'JE 2', 'JE 3', 'JE 4'] },
    { age: '14-17', vaccines: ['Other'] },
  ].map((entry) => ({
    age: entry.age,
    vaccines: entry.vaccines.map((name) => ({ name, ...defaultVaccine })) // Map vaccines to include default structure
  }));
  
  const [formData, setFormData] = useState({ //State to manage form data, including registration number and immunization records
    regNo: '',
    immunizationRecords: {
      vaccineSchedule: initialVaccineSchedule // Initial vaccine schedule
    }
  });

  // Load data on component mount
  useEffect(() => {
    // Check if there's a registration number in localStorage
    const savedRegNo = localStorage.getItem('immunizationRegNo');
    
    if (savedRegNo) {
      // Set the regNo from localStorage
      setFormData(prev => ({
        ...prev,
        regNo: savedRegNo
      }));
      
      // Fetch the data using the saved registration number
      fetchDataByRegistrationNumber(savedRegNo);
    }
  }, []); // Empty dependency array means this runs once on component mount
  // Function to handle input changes for vaccine details
  const handleInputChange = (ageIndex, vaccineIndex, field, value) => {
    const updatedSchedule = [...formData.immunizationRecords.vaccineSchedule];
    updatedSchedule[ageIndex].vaccines[vaccineIndex][field] = value;// Function to handle input changes for vaccine details
    setFormData({
      ...formData,
      immunizationRecords: {
        vaccineSchedule: updatedSchedule// Update the state with the modified schedule
      }
    });
  };
  
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
    
    try {// Send a POST request to the API with the form data
      const response = await fetch('http://localhost:3000/api/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'physician', 
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();//Send the form data as JSON
        throw new Error(errorData.message || 'Failed to submit form');
      }
      
      // Save registration number to localStorage after successful submission
      localStorage.setItem('immunizationRegNo', formData.regNo);
      // Log the successful submission and show an alert
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
    } catch (error) {// Log and handle any errors that occur during submission
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };
  
  // Handler for regNo
  const handleRegNoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      regNo: value //Update the registration number in state
    }));
  };
  // Function to fetch data by registration number
  const fetchDataByRegistrationNumber = async (regNoParam) => {
    const regNo = regNoParam || formData.regNo;// Use the provided registration number or fallback to state to get input
    
    if (!regNo) { // If no registration number is provided, show an alert and return
      alert('Please enter a registration number.');
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/baby/${regNo}`,
        {
          headers: {
            'x-user-role': 'physician',
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('No data found for this registration number.');
      }
      
      const data = await response.json();
      console.log('Fetched data:', data);
      
      // Save registration number to localStorage
      localStorage.setItem('immunizationRegNo', regNo);
      
      // Initialize immunizationRecords if it doesn't exist in fetched data
      const immunizationData = data.immunizationRecords?.vaccineSchedule 
        ? data.immunizationRecords 
        : { vaccineSchedule: initialVaccineSchedule };
      
      setFormData({
        regNo: data.regNo || regNo,
        immunizationRecords: immunizationData
      });
      
      // Don't show alert when loading automatically on page refresh
      if (regNoParam === undefined) {
        alert('Data loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (regNoParam === undefined) {
        alert('No data found for this registration number.');
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Immunization Record</h1>
        
        <div className="mb-6 bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
            </svg>
            Registration Information
          </h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-blue-700">Registration Number</label>
            <input
              type="text"
              value={formData.regNo || ''}
              onChange={(e) => handleRegNoChange(e.target.value)}
              className="flex-grow p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
            <button
              type="button"
              onClick={() => fetchDataByRegistrationNumber()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Get Info
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                <th className="p-3 text-left text-sm font-semibold text-blue-700">Age</th>
                <th className="p-3 text-left text-sm font-semibold text-blue-700">Type of Vaccine</th>
                <th className="p-3 text-left text-sm font-semibold text-blue-700">Date</th>
                <th className="p-3 text-left text-sm font-semibold text-blue-700">Batch No.</th>
                <th className="p-3 text-left text-sm font-semibold text-blue-700">Adverse Effects</th>
                {formData.immunizationRecords.vaccineSchedule.some(group => group.age === 'At Birth') && (
                  <th className="p-3 text-left text-sm font-semibold text-blue-700">BCG Scar</th>
                )}
              </tr>
            </thead>
            <tbody>
              {formData.immunizationRecords.vaccineSchedule.map((ageGroup, ageIndex) => (
                ageGroup.vaccines.map((vaccine, vaccineIndex) => (
                  <tr key={`${ageIndex}-${vaccineIndex}`} className="border-b border-blue-100 hover:bg-blue-50">
                    {vaccineIndex === 0 && (
                      <td rowSpan={ageGroup.vaccines.length} className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                        {ageGroup.age}
                      </td>
                    )}
                    <td className="p-3 text-sm text-blue-700">{vaccine.name}</td>
                    <td className="p-3">
                      <input
                        type="date"
                        value={vaccine.date || ''}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'date', e.target.value)}
                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={vaccine.batchNo || ''}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'batchNo', e.target.value)}
                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleInputChange(ageIndex, vaccineIndex, 'adverseEffects', !vaccine.adverseEffects)}
                        className={`px-3 py-1 rounded text-white transition ${
                          vaccine.adverseEffects ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {vaccine.adverseEffects ? 'Yes' : 'No'}
                      </button>
                    </td>
                    {ageGroup.age === 'At Birth' && (
                      <td className="p-3">
                        <select
                          value={vaccine.bcgScar || ''}
                          onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'bcgScar', e.target.value)}
                          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                        >
                          <option value="">Select</option>
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                        </select>
                      </td>
                    )}
                  </tr>
                ))
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-6'>
          <button
             type="submit"
             className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
          >
            Submit Vaccination Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default ImmunizationForm;