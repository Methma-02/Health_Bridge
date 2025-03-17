import { useState, useEffect } from "react";

const ChildHealthRecords = () => {
    const ageStages = [
        "1 month", "2 months", "4 months", "6 months", "9 months", 
        "18 months", "3 years", "4 years", "5 years"
    ];

    const [formData, setFormData] = useState({
        regNo: '',
        childHealthRecords: ageStages.map(age => ({
            age: age, // Assign predefined ages
            clinicDate: '',
            head: '',
            disabilities: '',
            eyes: '',
            sight: '',
            nightBlindness: '',
            dental: '',
            issues: '',
            growth: '',
            heartDiseases: '',
            sandiya: '',
            other: '',
            signature: '',
            designation: ''
        }))
    });

    // Load data when component mounts
    useEffect(() => {
        // Check if there's a registration number in localStorage
        const savedRegNo = localStorage.getItem('childHealthRegNo');
        
        if (savedRegNo) {
            // Set the regNo from localStorage
            setFormData(prev => ({
                ...prev,
                regNo: savedRegNo
            }));
            
            // Fetch the data using the saved registration number
            fetchDataByRegistrationNumber(savedRegNo);
        }
    }, []);  // Empty dependency array means this runs once on component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.regNo) {
            alert('Please enter a registration number.');
            return;
        }
        
        try {
            // First, fetch the existing record
            const fetchResponse = await fetch(
                `http://localhost:5000/api/baby/${formData.regNo}`,
                {
                    headers: {
                        'x-user-role': 'physician',
                    }
                }
            );
            
            let existingData = {};
            if (fetchResponse.ok) {
                existingData = await fetchResponse.json();
            }
            
            // Merge the data
            const response = await fetch('http://localhost:5000/api/baby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'physician', // Add this header to pass the middleware check
                },
                body: JSON.stringify({
                    ...existingData,
                    regNo: formData.regNo,
                    childHealthRecords: formData.childHealthRecords
                }),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }
            
            // Save registration number to localStorage after successful submission
            localStorage.setItem('childHealthRegNo', formData.regNo);
            
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to submit form: ${error.message}`);
        }
    };

    // New handler for regNo
    const handleRegNoChange = (value) => {
        setFormData(prev => ({
            ...prev,
            regNo: value
        }));
    };

    const handleTableChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            childHealthRecords: prev.childHealthRecords.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        }));
    };

    const createTableRow = (fieldName) => {
        return formData.childHealthRecords.map((row, idx) => (
            <td key={idx} className="p-2">
                <input
                    type={fieldName === "clinicDate" ? "date" : "text"}
                    value={row[fieldName] || ''}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className={`w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 ${
                        fieldName === "age" ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    readOnly={fieldName === "age"} // Make Age field read-only
                />
            </td>
        ));
    };

    const fetchDataByRegistrationNumber = async (regNoParam) => {
        const regNo = regNoParam || formData.regNo;
    
        if (!regNo) {
            alert('Please enter a registration number.');
            return;
        }
    
        try {
            const response = await fetch(
                `http://localhost:5000/api/baby/${regNo}`,
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
            console.log('Data fetched:', data);
            
            // Save registration number to localStorage
            localStorage.setItem('childHealthRegNo', regNo);
            
            // Initialize health records if they don't exist in fetched data
            const healthRecords = data.childHealthRecords && Array.isArray(data.childHealthRecords) 
                ? data.childHealthRecords 
                : ageStages.map(age => ({ age, clinicDate: '', head: '', disabilities: '', eyes: '', sight: '', nightBlindness: '', dental: '', issues: '', growth: '', heartDiseases: '', sandiya: '', other: '', signature: '', designation: '' }));
            
            setFormData({
                regNo: data.regNo || regNo,
                childHealthRecords: healthRecords
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
        <div className="w-full max-w-5xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Child Health Records</h1>

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

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <tbody>
                        {Object.keys(formData.childHealthRecords[0]).map((field) => (
                            <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-1 text-sm font-medium text-blue-700 whitespace-nowrap">
                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1").trim()}
                                </td>
                                {createTableRow(field)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6">
              <button 
                type="submit" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
              >
                Submit Health Records
              </button>
            </div>
        </div>
        </form>
    );
};

export default ChildHealthRecords;