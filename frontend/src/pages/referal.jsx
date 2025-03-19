import { useState, useEffect } from "react";
import { Plus, Trash2, Search } from "lucide-react";

const Referral = () => {
  // Registration number state
  const [regNo, setRegNo] = useState("");
  
  // Combined state for both hospitalizations and referrals
  const [hospitalizations, setHospitalizations] = useState([
    {
      id: Date.now(),
      date: "",
      reason: "",
      disease: "",
      result: ""
    }
  ]);
  
  const [referrals, setReferrals] = useState([
    {
      id: Date.now(),
      date: "",
      reason: "",
      place: "",
      result: ""
    }
  ]);

  // Load data on initial render
  useEffect(() => {
    // Check if there's a registration number in localStorage
    const savedRegNo = localStorage.getItem('babyRegNo');
    
    if (savedRegNo) {
      setRegNo(savedRegNo);
      fetchDataByRegistrationNumber(savedRegNo);
    }
  }, []);

  // Fetch data from the server based on registration number
  const fetchDataByRegistrationNumber = async (regNoParam) => {
    const registrationNumber = regNoParam || regNo;
    
    if (!registrationNumber) {
      alert('Please enter a registration number.');
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/baby/${registrationNumber}`,
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
      
      // Save registration number to localStorage
      localStorage.setItem('babyRegNo', registrationNumber);
      
      // Update state with fetched data or use default values if not available
      if (data.hospitalizations && data.hospitalizations.length > 0) {
        // Add id property to each item for UI tracking if it doesn't exist
        const hospitalizationsWithIds = data.hospitalizations.map(item => ({
          ...item,
          id: item.id || Date.now() + Math.random()
        }));
        setHospitalizations(hospitalizationsWithIds);
      }
      
      if (data.referrals && data.referrals.length > 0) {
        // Add id property to each item for UI tracking if it doesn't exist
        const referralsWithIds = data.referrals.map(item => ({
          ...item,
          id: item.id || Date.now() + Math.random()
        }));
        setReferrals(referralsWithIds);
      }
      
      // Only show alert if manually fetching (not on page load)
      if (!regNoParam) {
        alert('Data loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Only show alert if manually fetching (not on page load)
      if (!regNoParam) {
        alert('No data found for this registration number or there was an error.');
      }
    }
  };

  // Submit data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!regNo) {
      alert('Please enter a registration number.');
      return;
    }
    
    try {
      // Prepare data for submission
      // Remove the temporary id property we added for UI tracking
      const dataToSubmit = {
        regNo: regNo,
        hospitalizations: hospitalizations.map(({ id, ...rest }) => rest),
        referrals: referrals.map(({ id, ...rest }) => rest)
      };
      
      const response = await fetch('http://localhost:5000/api/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'physician',
        },
        body: JSON.stringify(dataToSubmit),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit data');
      }
      
      // Save registration number to localStorage after successful submission
      localStorage.setItem('babyRegNo', regNo);
      
      const result = await response.json();
      console.log('Data submitted successfully:', result);
      alert('Hospitalization and referral data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert(`Failed to submit data: ${error.message}`);
    }
  };

  // Hospitalization functions
  const addHospitalization = () => {
    setHospitalizations([
      ...hospitalizations,
      {
        id: Date.now() + Math.random(),
        date: "",
        reason: "",
        disease: "",
        result: ""
      }
    ]);
  };

  const handleHospitalizationChange = (id, field, value) => {
    setHospitalizations(hospitalizations.map(hospitalization => 
      hospitalization.id === id ? { ...hospitalization, [field]: value } : hospitalization
    ));
  };

  const deleteHospitalization = (id) => {
    if (hospitalizations.length > 1) {
      setHospitalizations(hospitalizations.filter(hospitalization => hospitalization.id !== id));
    }
  };

  // Referral functions
  const addReferral = () => {
    setReferrals([
      ...referrals,
      {
        id: Date.now() + Math.random(),
        date: "",
        reason: "",
        place: "",
        result: ""
      }
    ]);
  };

  const handleReferralChange = (id, field, value) => {
    setReferrals(referrals.map(referral => 
      referral.id === id ? { ...referral, [field]: value } : referral
    ));
  };

  const deleteReferral = (id) => {
    if (referrals.length > 1) {
      setReferrals(referrals.filter(referral => referral.id !== id));
    }
  };

  // Generic tracker table component to avoid duplication
  const TrackerTable = ({ 
    items, 
    onChangeHandler, 
    onDeleteHandler, 
    columns, 
    placeholders 
  }) => (
    <div className="overflow-hidden rounded-lg border border-blue-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-50">
              {columns.map((column, index) => (
                <th key={index} className="px-3 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-blue-100">
                  {column}
                </th>
              ))}
              <th className="px-3 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-blue-100 w-16">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-3 py-1.5">
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => onChangeHandler(item.id, "date", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 transition-colors duration-200"
                    style={{ maxWidth: "120px" }} // Smaller width for date inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={item.reason}
                    onChange={(e) => onChangeHandler(item.id, "reason", e.target.value)}
                    placeholder={placeholders[0]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={columns[2] === "Disease" ? item.disease : item.place}
                    onChange={(e) => onChangeHandler(
                      item.id, 
                      columns[2] === "Disease" ? "disease" : "place", 
                      e.target.value
                    )}
                    placeholder={placeholders[1]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={item.result}
                    onChange={(e) => onChangeHandler(item.id, "result", e.target.value)}
                    placeholder={placeholders[2]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5 text-center">
                  <button
                    onClick={() => onDeleteHandler(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={items.length === 1}
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Registration Number Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label htmlFor="regNo" className="block text-sm font-medium text-blue-700">
                Registration Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="regNo"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-blue-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter baby's registration number"
                />
                <button
                  type="button"
                  onClick={() => fetchDataByRegistrationNumber()}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-blue-300 text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Get Info
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hospitalizations Section */}
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-blue-600">Severe Hospitalizations</h3>
            <button
              type="button"
              onClick={addHospitalization}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              Add Hospitalization
            </button>
          </div>

          <TrackerTable 
            items={hospitalizations}
            onChangeHandler={handleHospitalizationChange}
            onDeleteHandler={deleteHospitalization}
            columns={["Date", "Reason", "Disease", "Refer Again/Result"]}
            placeholders={["Enter reason", "Enter disease", "Enter result"]}
          />
        </div>

        {/* Referrals Section */}
        <div className="space-y-6 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-blue-600">Referrals</h3>
            <button
              type="button"
              onClick={addReferral}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
              Add Referral
            </button>
          </div>

          <TrackerTable 
            items={referrals}
            onChangeHandler={handleReferralChange}
            onDeleteHandler={deleteReferral}
            columns={["Date", "Reason", "Referred Place", "Refer Again/Result"]}
            placeholders={["Enter reason", "Enter place", "Enter result"]}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-colors duration-200"
          >
            Save Records
          </button>
        </div>
      </div>
    </form>
  );
};

export default Referral;