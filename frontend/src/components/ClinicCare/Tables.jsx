import React, { useEffect, useState } from 'react';
import GrowthChart from './BMI'; // Import for GrowthChart
import FundalHeightChart from './FundalHeightChart'; // Import for FundalHeightChart
import ClinicCare from './ClinicCare'; // Import for ClinicCare
import { useFormContext } from '../../contexts/FormContext';

const Tables = () => {
    const { formData, setFormData } = useFormContext();
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const headers = ["Session", "Date", "Husband", "Wife", "Other", "Signature"];
    const rows = ["1st T", "2nd T", "3rd T"];

    function updateResult(value) {
        setFormData((prev) => ({
            ...prev,
            result: value,
        }));
    }

    function chosenMethod(value) {
        setFormData((prev) => ({
            ...prev,
            chosenmethod: value,
        }));
    }

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

    const [fundalHeightPoints, setFundalHeightPoints] = useState([]);

    const handlePlotPoint = (x, y) => {
        setFundalHeightPoints((prev) => [...prev, { x, y }]);
        console.log("Point added:", { x, y });
    };

    const [bmiPoints, setBmiPoints] = useState([]);

    const handleBmiPlotPoint = (x, y) => {
        setBmiPoints((prev) => [...prev, { x, y }]);
        console.log("BMI Point added:", { x, y });
    };

    const handleVisitChange = (index, field, value) => {
        console.log(field);
        console.log(value);
        field = field.toLowerCase();
        console.log(field);
        setFormData((prev) => ({
            ...prev,
            visits: prev.visits.map((visit, i) =>
                i === index ? { ...visit, [field]: value } : visit
            ),
        }));
    };

    const createTableRow = (fieldName) => {
        return formData.visits.map((visit, idx) => (
            <td key={idx}>
                <input
                    type="text"
                    value={visit[fieldName]}
                    onChange={(e) => handleVisitChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    const handleAuscultationChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            Auscultation: prev.Auscultation.map((ausc, i) =>
                i === index ? { ...ausc, [field]: value } : ausc
            ),
        }));
    };

    const createAuscultation = (fieldName) => {
        return formData.Auscultation.map((ascu, idx) => (
            <td key={idx}>
                <input
                    type="text"
                    value={ascu[fieldName]}
                    onChange={(e) => handleAuscultationChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

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

    const handleTwoCellChange = (index, field, value) => {
        console.log(index, field, value);
        setFormData((prev) => ({
            ...prev,
            twoCell: prev.twoCell.map((cell, i) =>
                i === index ? { ...cell, [field]: value } : cell
            ),
        }));
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = [...attendanceData];
        console.log("this is index", index);
        console.log("this is field", field);
        console.log("this is value", value);
        console.log("this is updatedData", updatedData);
        updatedData[index][field] = value;
        setAttendanceData(updatedData);
    };

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

    const fields = [
        'date', 'poa', 'urine', 'sugeralbumin', 'pallor', 'oedemaankle', 'oedemafacial',
    ];

    const bpLevels = [
        '160', '150', '140', '130', '120', '110', '100', '90', '80', '70', '60', '50',
    ];

    const fields2 = [
        'fundalheight', 'foetallie', 'presentation', 'engagement', 'fm', 'fhs',
        'iron', 'folate', 'calcium', 'vitaminc', 'supplementation', 'signature', 'designation',
    ];

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

    const handleDateChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedTablesData = [...dateTablesData];
        updatedTablesData[tableIndex].data[rowIndex][colIndex] = value;
        setDateTablesData(updatedTablesData);

        // Update formData
        setFormData((prev) => ({
            ...prev,
            dateTablesData: updatedTablesData,
        }));
    };

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
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
                Pregnancy Record Form
            </h1>

            <form onSubmit={handleSubmit}>
                {/* Clinic Care Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Clinic Care</h2>
                    <div className="overflow-x-auto">
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
                                    <td colSpan={fields.length + 1} className="p-3 text-sm font-medium text-blue-700">
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
                </div>

                {/* Auscultation Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Auscultation & Mental Health</h2>
                    <div className="overflow-x-auto">
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
                </div>

                {/* Respiratory and Breast Examination Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Respiratory & Breast Examination</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Respiratory System</td>
                                    {createTwoCellRow('respiratory')}
                                </tr>
                                <tr className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Breast Examination</td>
                                    {createTwoCellRow('breast')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dental Care Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Dental Care</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <tbody>
                                <tr className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Referred Date</td>
                                    <td>
                                        <input
                                            type="date"
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
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">Date of Examination</td>
                                    <td>
                                        <input
                                            type="date"
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
                </div>

                {/* Growth Chart Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Growth Chart</h2>
                    <GrowthChart />
                </div>

                {/* Fundal Height Chart Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Fundal Height Chart</h2>
                    <FundalHeightChart points={fundalHeightPoints} onPlotPoints={handlePlotPoint} />
                </div>

                {/* Clinic Care Section */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">Clinic Care</h2>
                    <ClinicCare />
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

export default Tables;