// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import GrowthChart from './BMI';
import FundalHeightChart from './FundalHeightChart';
import ClinicCare from './ClinicCare'; // Added import
import { useFormContext } from '../../contexts/FormContext';

const Tables = () => {
    // Access form data and setter from context
    const { formData, setFormData } = useFormContext(); 

    // Define table headers and rows
    const headers = ["Session", "Date", "Husband", "Wife", "Other", "Signature"];
    const rows = ["1st T", "2nd T", "3rd T"];

    // Update form data when input changes
    function updateResult(value) {
        setFormData(prev => ({
            ...prev,
            result: value
        }));
    }

    // Update form data when input changes
    function chosenMethod(value) {
        setFormData(prev => ({
            ...prev,
            chosenmethod: value
        }));
    }

    // State to manage attendance data for the table
    const [attendanceData, setAttendanceData] = useState(
        rows.map((session) => ({
            session,
            date: "",
            husband: "",
            wife: "",
            other: "",
            signature: "",
        }))
    );

    // State to manage fundal height chart points
    const [fundalHeightPoints, setFundalHeightPoints] = useState([]);

    // Function to handle adding a point to the fundal height chart
    const handlePlotPoint = (x, y) => {
        setFundalHeightPoints(prev => [...prev, { x, y }]);
        console.log("Point added:", { x, y });
    };

    // State to manage BMI chart points
    const [bmiPoints, setBmiPoints] = useState([]);

    // Function to handle adding a point to the BMI chart
    const handleBmiPlotPoint = (x, y) => {
        setBmiPoints(prev => [...prev, { x, y }]);
        console.log("BMI Point added:", { x, y });
    };

    // Function to handle changes in visit data
    const handleVisitChange = (index, field, value) => {
        console.log(field);
        console.log(value);
        field = field.toLowerCase();
        console.log(field);
        setFormData(prev => ({
            ...prev,
            visits: prev.visits.map((visit, i) =>
                i === index ? { ...visit, [field]: value } : visit
            )
        }));
    };

    // Function to create a table row for a specific field
    const createTableRow = (fieldName) => {
        return formData.visits.map((visit, idx) => (
            <td key={idx}>
                <input
                    type='text'
                    value={visit[fieldName]}
                    onChange={(e) => handleVisitChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    // Function to handle changes in auscultation data
    const handleAuscultationChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            Auscultation: prev.Auscultation.map((ausc, i) =>
                i === index ? { ...ausc, [field]: value } : ausc
            )
        }));
    };

    // Function to create a table row for auscultation data
    const createAuscultation = (fieldName) => {
        return formData.Auscultation.map((ascu, idx) => (
            <td key={idx}>
                <input
                    type='text'
                    value={ascu[fieldName]}
                    onChange={(e) => handleAuscultationChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    // Function to handle changes in two cell row data
    const createTwoCellRow = (fieldName) => {
        return formData.twoCell.map((twocells, idx) => (
            <td key={idx}>
                <input
                    type="text"
                    value={twocells[fieldName]}
                    onChange={(e) => handleTwoCellChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    // Function to handle changes in two-cell data
    const handleTwoCellChange = (index, field, value) => {
        console.log(index, field, value);
        setFormData(prev => ({
            ...prev,
            twoCell: prev.twoCell.map((cell, i) =>
                i === index ? { ...cell, [field]: value } : cell
            )
        }));
    };

    // Function to handle changes in input fields
    const handleInputChange = (index, field, value) => {
        const updatedData = [...attendanceData];
        console.log("this is index", index);
        console.log("this is field", field);
        console.log("this is value", value);
        console.log("this is updatedData", updatedData);
        updatedData[index][field] = value;
        setAttendanceData(updatedData);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/pregnancy-form1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        }
    };

    // Define fields for the form
    const fields = [
        'date', 'poa', 'urine', 'sugeralbumin', 'pallor', 'oedemaankle', 'oedemafacial'
    ];

    // Define blood pressure levels
    const bpLevels = [
        '160', '150', '140', '130', '120', '110', '100', '90', '80', '70', '60', '50'
    ];

    // Define additional fields for the form
    const fields2 = [
        'fundalheight', 'foetallie', 'presentation', 'engagement', 'fm', 'fhs',
        'iron', 'folate', 'calcium', 'vitaminc', 'supplementation', 'signature', 'designation'
    ];

    // State to manage date tables data
    const [dateTablesData, setDateTablesData] = useState(
        formData.dateTablesData || [
            {
                title: "Family health service officer visitation date",
                rows: 2,
                cols: 6,
                data: Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => "")),
            },
            {
                title: "clinic examination date",
                rows: 2,
                cols: 6,
                data: Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => "")),
            },
        ]
    );

    // Function to handle changes in date tables
    const handleDateChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedTablesData = [...dateTablesData];
        updatedTablesData[tableIndex].data[rowIndex][colIndex] = value;
        setDateTablesData(updatedTablesData);

        setFormData((prev) => ({
            ...prev,
            dateTablesData: updatedTablesData,
        }));
    };

    // Function to handle changes in tetanus dates
    const handleTetanusDateChange = (index, value) => {
        const updatedDates = [...formData.immunizationData.dates];
        updatedDates[index] = value;
        setFormData((prev) => ({
            ...prev,
            immunizationData: {
                ...prev.immunizationData,
                dates: updatedDates,
            },
        }));
    };

    // Function to handle changes in batch numbers
    const handleBatchNumberChange = (index, value) => {
        const updatedBatchNumbers = [...formData.immunizationData.batchNumbers];
        updatedBatchNumbers[index] = value;
        setFormData((prev) => ({
            ...prev,
            immunizationData: {
                ...prev.immunizationData,
                batchNumbers: updatedBatchNumbers,
            },
        }));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
                    Clinic Visit Details
                </h1>

                {/* Clinic Care Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Clinic Care
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            {fields.map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </td>
                                    {createTableRow(field)}
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={formData.visits.length + 1} className="p-3 text-xl font-semibold text-blue-700">
                                    Blood Pressure
                                </td>
                            </tr>
                            {bpLevels.map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </td>
                                    {createTableRow(field)}
                                </tr>
                            ))}
                            {fields2.map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </td>
                                    {createTableRow(field)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Auscultation Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Auscultation & Mental Health
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">T1</td>
                                {createAuscultation('T1')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">T2</td>
                                {createAuscultation('T2')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">T3</td>
                                {createAuscultation('T3')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Respiratory and Breast Examination Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Respiratory & Breast Examination
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Respiratory system</td>
                                {createTwoCellRow('respiratory')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Breast examination</td>
                                {createTwoCellRow('breast')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Dental Care Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Dental Care
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Referred date</td>
                                <td>
                                    <input
                                        type='date'
                                        value={formData.dentalCare.referredDate || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dentalCare: {
                                                    ...prev.dentalCare,
                                                    referredDate: e.target.value,
                                                },
                                            }))
                                        }
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of examination</td>
                                <td>
                                    <input
                                        type='date'
                                        value={formData.dentalCare.examinationDate || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dentalCare: {
                                                    ...prev.dentalCare,
                                                    examinationDate: e.target.value,
                                                },
                                            }))
                                        }
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Treatment</td>
                                <td>
                                    <textarea
                                        value={formData.dentalCare.treatment || ''}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                dentalCare: {
                                                    ...prev.dentalCare,
                                                    treatment: e.target.value,
                                                },
                                            }))
                                        }
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Investigations Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Investigations
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Blood Sugar</td>
                                {createAuscultation('bloodsugerPoa')}
                                {createAuscultation('bloodsugerResult')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Hemoglobin</td>
                                {createAuscultation('haemoglobinPoa')}
                                {createAuscultation('haemoglobinResult')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Other Investigations</td>
                                {createTwoCellRow('other')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Antihelminthic drugs</td>
                                {createTwoCellRow('drugs')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of issuing kick count chart</td>
                                {createTwoCellRow('kick')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Syphilis Screening Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Syphilis Screening
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">POA at blood sampling</td>
                                {createTwoCellRow('bloodsample')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of blood sampling</td>
                                {createTwoCellRow('poaBlood')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of result received</td>
                                {createTwoCellRow('dateBlood')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Result:</td>
                                <td>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="result"
                                            value="NR"
                                            checked={formData.result === "NR"}
                                            onChange={(e) => updateResult(e.target.value)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-blue-700">NR</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="result"
                                            value="R"
                                            checked={formData.result === "R"}
                                            onChange={(e) => updateResult(e.target.value)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-blue-700">R</span>
                                    </label>
                                </td>
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">If (R) date of referral</td>
                                {createTwoCellRow('referall')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Blood taken date for HIV Screening</td>
                                {createTwoCellRow('hiv')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date result informed to mother</td>
                                {createTwoCellRow('informedDate')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Tetanus Toxoid Immunization Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Tetanus Toxoid Immunization
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                                <th className="p-3 text-left text-sm font-semibold text-blue-700">Dose</th>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <th key={i + 1} className="p-3 text-left text-sm font-semibold text-blue-700">{i + 1}</th>
                                ))}
                                <th className="p-3 text-left text-sm font-semibold text-blue-700">NE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date</td>
                                {Array.from({ length: 6 }, (_, i) => (
                                    <td key={i} className="p-3">
                                        <input
                                            type="date"
                                            value={formData.immunizationData.dates[i] || ''}
                                            onChange={(e) => handleTetanusDateChange(i, e.target.value)}
                                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                        />
                                    </td>
                                ))}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Batch No.</td>
                                {Array.from({ length: 6 }, (_, i) => (
                                    <td key={i} className="p-3">
                                        <input
                                            type="text"
                                            value={formData.immunizationData.batchNumbers[i] || ''}
                                            onChange={(e) => handleBatchNumberChange(i, e.target.value)}
                                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                        />
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Weight Gain Chart Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Weight Gain Chart
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">POA</td>
                                {createTableRow('poaweight')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Weight</td>
                                {createTableRow('weight')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Weight gain</td>
                                {createTableRow('weightgain')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Growth Chart Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Growth Chart
                    </h2>
                    <GrowthChart />
                </div>

                {/* Fundal Height Chart Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Fundal Height Chart
                    </h2>
                    <FundalHeightChart points={fundalHeightPoints} onPlotPoints={handlePlotPoint} />
                    <tr className="border-b border-blue-100 hover:bg-blue-50">
                        <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Companion of choice at labour discussed</td>
                        {createTwoCellRow('companion')}
                    </tr>
                </div>

                {/* Birth and Emergency Preparedness Plan Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Birth and Emergency Preparedness Plan
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Intended hospital</td>
                                {createAuscultation('intendedhospital')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Mode of transport</td>
                                {createAuscultation('transport')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Average cost</td>
                                {createAuscultation('cost')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Distance from home</td>
                                {createAuscultation('distance')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Time taken to reach</td>
                                {createAuscultation('time')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Attendance at Antenatal Classes Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Attendance at Antenatal Classes
                    </h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                                {headers.map((header) => (
                                    <th key={header} className="p-3 text-left text-sm font-semibold text-blue-700">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceData.map((row, index) => (
                                <tr key={row.session} className="border-b border-blue-100 hover:bg-blue-50">
                                    {headers.map((header, i) => (
                                        <td key={i} className="p-3">
                                            {i === 0 ? (
                                                row.session
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={row[header.toLowerCase()]}
                                                    onChange={(e) => handleInputChange(index, header.toLowerCase(), e.target.value)}
                                                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* IEC Material Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        IEC Material
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Book about post pregnancy</td>
                                {createTwoCellRow('postPregnancy')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Book about breastfeeding</td>
                                {createTwoCellRow('milkBook')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Book about early childhood development</td>
                                {createTwoCellRow('earlychildhood')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Book about family planning</td>
                                {createTwoCellRow('familyPlanning')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Date Tables Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    {dateTablesData.map(({ title, rows, cols, data }, tableIndex) => (
                        <div key={tableIndex}>
                            <h4 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {title}
                            </h4>
                            <table className="w-full border-collapse">
                                <tbody>
                                    {[...Array(rows)].map((_, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-blue-100 hover:bg-blue-50">
                                            {[...Array(cols)].map((_, colIndex) => (
                                                <td key={colIndex} className="p-3">
                                                    <input
                                                        type="date"
                                                        value={data[rowIndex][colIndex]}
                                                        onChange={(e) =>
                                                            handleDateChange(
                                                                tableIndex,
                                                                rowIndex,
                                                                colIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>

                {/* Family Planning Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Family Planning
                    </h2>
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of counselling</td>
                                {createTwoCellRow('counsellingdate')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Chosen method</td>
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        {['T', 'PL', 'L', 'IP', 'N', 'P', 'C'].map((method) => (
                                            <label key={method} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="method"
                                                    value={method}
                                                    checked={formData.chosenmethod === method}
                                                    onChange={(e) => chosenMethod(e.target.value)}
                                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                                                />
                                                <span className="ml-2 text-sm text-blue-700">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                </td>
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Reason for not using a method</td>
                                {createTwoCellRow('planningreason')}
                            </tr>
                            <tr className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Consent form signed date</td>
                                {createTwoCellRow('consentdate')}
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ClinicCare Component */}
                <ClinicCare />

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
        </>
    );
};

export default Tables;