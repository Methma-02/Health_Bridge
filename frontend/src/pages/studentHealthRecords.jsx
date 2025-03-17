import { useState, useEffect } from "react";

const StudentHealthRecords = () => {
    const [formData, setFormData] = useState({
        regNo: "",
        table: Array(10).fill().map(() => ({
            Date: '',
            age: '',
            height: '',
            weight: '',
            "BMI": '',
            stunting: '',
            wasting: '',
            obesity: '',
            "Vitamin E defiencey": '',
            "Blood defincenty": '',
            Strabismus: '',
            "left eye sight": '',
            "right eye sight": '',
            "Left hearing": '',
            "right hearing": '',
            speaking: '',
            "dental trauma": '',
            "dental issues": '',
            flurosis: '',
            goiter: '',
            "facial defects": '',
            "insensitive marks": '',
            "Oesteoporosis": '',
            "heart": '',
            "lungs": '',
            "Teacher support": '',
            "attendance below 75%": '',
            "Academically struggling": '',
            "other disablilties": '',
            "Deworming, micronutrients ": '',
            "date given": '',
            "dewormimg pills": '',
            "Vitamin A overdose": '',
            Iron: '',
            "folic acid": '',
            "other drugs": '',
            "Signature of the officer": ''
        }))
    });

    // Load data on component mount
    useEffect(() => {
        // Check if there's a registration number in localStorage
        const savedRegNo = localStorage.getItem('studentHealthRegNo');
        
        if (savedRegNo) {
            // Set the regNo from localStorage
            setFormData(prev => ({
                ...prev,
                regNo: savedRegNo
            }));
            
            // Fetch the data using the saved registration number
            fetchDataByRegistrationNumber(savedRegNo);
        }
    }, []);

    const handleTableChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            table: prev.table.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        }));
    };

    // Handler for regNo change
    const handleRegNoChange = (value) => {
        setFormData(prev => ({
            ...prev,
            regNo: value
        }));
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
            console.log('Fetched data:', data);
            
            // Save registration number to localStorage
            localStorage.setItem('studentHealthRegNo', regNo);
            
            // Check if studentHealthRecords data exists
            const healthRecordsData = data.studentHealthRecords && data.studentHealthRecords.length > 0 
                ? data.studentHealthRecords 
                : formData.table;
            
            // Map the fetched data to our table format
            const tableData = Array(10).fill().map((_, i) => {
                if (i < healthRecordsData.length) {
                    // Convert DB field names to match the form field names
                    return {
                        "Date": healthRecordsData[i].date || '',
                        "age": healthRecordsData[i].age || '',
                        "height": healthRecordsData[i].height || '',
                        "weight": healthRecordsData[i].weight || '',
                        "BMI": healthRecordsData[i].BMI || '',
                        "stunting": healthRecordsData[i].stunting || '',
                        "wasting": healthRecordsData[i].wasting || '',
                        "obesity": healthRecordsData[i].obesity || '',
                        "Vitamin E defiencey": healthRecordsData[i].vitaminEDeficiency || '',
                        "Blood defincenty": healthRecordsData[i].bloodDeficiency || '',
                        "Strabismus": healthRecordsData[i].strabismus || '',
                        "left eye sight": healthRecordsData[i].leftEyeSight || '',
                        "right eye sight": healthRecordsData[i].rightEyeSight || '',
                        "Left hearing": healthRecordsData[i].leftHearing || '',
                        "right hearing": healthRecordsData[i].rightHearing || '',
                        "speaking": healthRecordsData[i].speaking || '',
                        "dental trauma": healthRecordsData[i].dentalTrauma || '',
                        "dental issues": healthRecordsData[i].dentalIssues || '',
                        "flurosis": healthRecordsData[i].flurosis || '',
                        "goiter": healthRecordsData[i].goiter || '',
                        "facial defects": healthRecordsData[i].defectsInThroatEarsOrNose || '',
                        "insensitive marks": healthRecordsData[i].insensitiveMarks || '',
                        "Oesteoporosis": healthRecordsData[i].osteoporosis || '',
                        "heart": healthRecordsData[i].heart || '',
                        "lungs": healthRecordsData[i].lungs || '',
                        "Teacher support": healthRecordsData[i].teacherSupport || '',
                        "attendance below 75%": healthRecordsData[i].attendanceBelow75 || '',
                        "Academically struggling": healthRecordsData[i].academicallyStruggling || '',
                        "other disablilties": healthRecordsData[i].otherDisabilities || '',
                        "Deworming, micronutrients ": healthRecordsData[i].dewormingPillsAndMicronutrientSupplements || '',
                        "date given": healthRecordsData[i].dateGiven || '',
                        "dewormimg pills": healthRecordsData[i].dewormingPills || '',
                        "Vitamin A overdose": healthRecordsData[i].vitaminAOverdose || '',
                        "Iron": healthRecordsData[i].iron || '',
                        "folic acid": healthRecordsData[i].folicAcid || '',
                        "other drugs": healthRecordsData[i].otherDrugs || '',
                        "Signature of the officer": healthRecordsData[i].signatureOfOfficer || ''
                    };
                }
                return formData.table[i];
            });
            
            setFormData({
                regNo: data.regNo || regNo,
                table: tableData
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.regNo) {
            alert('Please enter a registration number.');
            return;
        }
        
        try {
            // Transform the table data to match the backend schema
            const studentHealthRecords = formData.table
                .filter(row => row.Date || row.age || row.weight) // Only include rows with some data
                .map(row => ({
                    date: row.Date,
                    age: row.age,
                    height: row.height,
                    weight: row.weight,
                    BMI: row.BMI,
                    stunting: row.stunting,
                    wasting: row.wasting,
                    obesity: row.obesity,
                    vitaminEDeficiency: row["Vitamin E defiencey"],
                    bloodDeficiency: row["Blood defincenty"],
                    strabismus: row.Strabismus,
                    leftEyeSight: row["left eye sight"],
                    rightEyeSight: row["right eye sight"],
                    leftHearing: row["Left hearing"],
                    rightHearing: row["right hearing"],
                    speaking: row.speaking,
                    dentalTrauma: row["dental trauma"],
                    dentalIssues: row["dental issues"],
                    flurosis: row.flurosis,
                    goiter: row.goiter,
                    defectsInThroatEarsOrNose: row["facial defects"],
                    insensitiveMarks: row["insensitive marks"],
                    osteoporosis: row.Oesteoporosis,
                    heart: row.heart,
                    lungs: row.lungs,
                    teacherSupport: row["Teacher support"],
                    attendanceBelow75: row["attendance below 75%"],
                    academicallyStruggling: row["Academically struggling"],
                    otherDisabilities: row["other disablilties"],
                    dewormingPillsAndMicronutrientSupplements: row["Deworming, micronutrients "],
                    dateGiven: row["date given"],
                    dewormingPills: row["dewormimg pills"],
                    vitaminAOverdose: row["Vitamin A overdose"],
                    iron: row.Iron,
                    folicAcid: row["folic acid"],
                    otherDrugs: row["other drugs"],
                    signatureOfOfficer: row["Signature of the officer"]
                }));
            
            // Fetch existing data first
            const getResponse = await fetch(
                `http://localhost:5000/api/baby/${formData.regNo}`,
                {
                    headers: {
                        'x-user-role': 'physician',
                    }
                }
            );
            
            let existingData = {};
            if (getResponse.ok) {
                existingData = await getResponse.json();
            }
            
            // Prepare the data to be sent
            const dataToSend = {
                regNo: formData.regNo,
                ...existingData,
                studentHealthRecords
            };
            
            // Send the data
            const response = await fetch('http://localhost:5000/api/baby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'physician',
                },
                body: JSON.stringify(dataToSend),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }
            
            // Save registration number to localStorage after successful submission
            localStorage.setItem('studentHealthRegNo', formData.regNo);
            
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Student health records submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to submit form: ${error.message}`);
        }
    };

    const createTableRow = (fieldName) => {
        return formData.table.map((row, idx) => (
            <td key={idx} className="p-1">
                <input
                    type={fieldName === 'Date' || fieldName === 'date given' ? 'date' : 'text'}
                    value={row[fieldName]}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className="w-full p-1 text-xs border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    style={{ maxWidth: '100px' }} // Smaller width for inputs
                />
            </td>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full max-w-5xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Student Health Records</h1>
                
                {/* Registration Number Section */}
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
                            {Object.keys(formData.table[0]).map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-2 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.replace(/([A-Z])/g, " $1").trim()}
                                    </td>
                                    {createTableRow(field)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className='flex justify-center mt-6'>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                    >
                        Save Health Records
                    </button>
                </div>
            </div>
        </form>
    );
};

export default StudentHealthRecords;