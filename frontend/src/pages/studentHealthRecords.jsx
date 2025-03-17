import { useState, useEffect } from "react";

// Constants for field mappings
const FIELD_MAPPINGS = {
    date: "Date",
    age: "age",
    height: "height",
    weight: "weight",
    BMI: "BMI",
    stunting: "stunting",
    wasting: "wasting",
    obesity: "obesity",
    vitaminEDeficiency: "Vitamin E deficiency",
    bloodDeficiency: "Blood deficiency",
    strabismus: "Strabismus",
    leftEyeSight: "left eye sight",
    rightEyeSight: "right eye sight",
    leftHearing: "Left hearing",
    rightHearing: "right hearing",
    speaking: "speaking",
    dentalTrauma: "dental trauma",
    dentalIssues: "dental issues",
    fluorosis: "fluorosis",
    goiter: "goiter",
    defectsInThroatEarsOrNose: "facial defects",
    insensitiveMarks: "insensitive marks",
    osteoporosis: "Osteoporosis",
    heart: "heart",
    lungs: "lungs",
    teacherSupport: "Teacher support",
    attendanceBelow75: "attendance below 75%",
    academicallyStruggling: "Academically struggling",
    otherDisabilities: "other disabilities",
    dewormingPillsAndMicronutrientSupplements: "Deworm, micronutrient ",
    dateGiven: "date given",
    dewormingPills: "deworm pills",
    vitaminAOverdose: "Vitamin A overdose",
    iron: "Iron",
    folicAcid: "folic acid",
    otherDrugs: "other drugs",
    signatureOfOfficer: "Signature of the officer"
};

// Helper function to initialize table rows
const initializeTable = () => {
    return Array(10).fill().map(() => {
        const row = {};
        Object.values(FIELD_MAPPINGS).forEach(field => {
            row[field] = '';
        });
        return row;
    });
};

const StudentHealthRecords = () => {
    const [formData, setFormData] = useState({
        regNo: "",
        table: initializeTable()
    });

    // Load data on component mount
    useEffect(() => {
        const savedRegNo = localStorage.getItem('studentHealthRegNo');
        if (savedRegNo) {
            setFormData(prev => ({ ...prev, regNo: savedRegNo }));
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

    const handleRegNoChange = (value) => {
        setFormData(prev => ({ ...prev, regNo: value }));
    };

    const fetchDataByRegistrationNumber = async (regNoParam) => {
        const regNo = regNoParam || formData.regNo;
        if (!regNo) {
            alert('Please enter a registration number.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/baby/${regNo}`, {
                headers: { 'x-user-role': 'physician' }
            });

            if (!response.ok) throw new Error('No data found for this registration number.');

            const data = await response.json();
            localStorage.setItem('studentHealthRegNo', regNo);

            const healthRecordsData = data.studentHealthRecords?.length > 0
                ? data.studentHealthRecords
                : formData.table;

            const tableData = initializeTable().map((row, i) => {
                if (i < healthRecordsData.length) {
                    Object.keys(FIELD_MAPPINGS).forEach(key => {
                        row[FIELD_MAPPINGS[key]] = healthRecordsData[i][key] || '';
                    });
                }
                return row;
            });

            setFormData({
                regNo: data.regNo || regNo,
                table: tableData
            });

            if (regNoParam === undefined) alert('Data loaded successfully!');
        } catch (error) {
            console.error('Error fetching data:', error);
            if (regNoParam === undefined) alert('No data found for this registration number.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.regNo) {
            alert('Please enter a registration number.');
            return;
        }

        try {
            const studentHealthRecords = formData.table
                .filter(row => row.Date || row.age || row.weight)
                .map(row => {
                    const record = {};
                    Object.keys(FIELD_MAPPINGS).forEach(key => {
                        record[key] = row[FIELD_MAPPINGS[key]];
                    });
                    return record;
                });

            const getResponse = await fetch(`http://localhost:5000/api/baby/${formData.regNo}`, {
                headers: { 'x-user-role': 'physician' }
            });

            let existingData = {};
            if (getResponse.ok) existingData = await getResponse.json();

            const dataToSend = {
                regNo: formData.regNo,
                ...existingData,
                studentHealthRecords
            };

            const response = await fetch('http://localhost:5000/api/baby', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-role': 'physician'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) throw new Error('Failed to submit form');

            localStorage.setItem('studentHealthRegNo', formData.regNo);
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
                    style={{ maxWidth: '100px' }}
                />
            </td>
        ));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full max-w-5xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Student Health Records</h1>
                
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
                            {Object.values(FIELD_MAPPINGS).map((field) => (
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