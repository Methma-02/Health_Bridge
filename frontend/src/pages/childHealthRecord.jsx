import { useState } from "react";


const ChildHealthRecords = () => {
    const ageStages = [
        "1 month", "2 months", "4 months", "6 months", "9 months", 
        "18 months", "3 years", "4 years", "5 years"
    ];

    const [formData, setFormData] = useState({
        regNo: '',
        table: ageStages.map(age => ({
            Age: age, // Assign predefined ages
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/api/baby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'physician', // Add this header to pass the middleware check
                },
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }
            
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
            table: prev.table.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        }));
    };

    const createTableRow = (fieldName) => {
        return formData.table.map((row, idx) => (
            <td key={idx} className="p-2">
                <input
                    type="text"
                    value={row[fieldName]}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className={`w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 ${
                        fieldName === "Age" ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    readOnly={fieldName === "Age"} // Make Age field read-only
                />
            </td>
        ));
    };

    const fetchDataByRegistrationNumber = async () => {
        const regNo = formData.regNo;
    
        if (!regNo) {
            alert('Please enter a registration number.');
            return;
        }
    
        try {
            const response = await fetch(
                `http://localhost:5000/api/baby/${regNo}`,
                {
                    headers: {
                        'x-user-role' : 'physician',
                    }
                }
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
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Child Health Records</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <tbody>
                        {Object.keys(formData.table[0]).map((field) => (
                            <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                    {field.replace(/([A-Z])/g, " $1").trim()}
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
    Submit Baby Details
  </button>
</div>
        </div>
        </form>
    );
};

export default ChildHealthRecords;