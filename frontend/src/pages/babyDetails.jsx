import { useState, useEffect } from "react";

const BabyDetails = () => {
    const [formData, setFormData] = useState({
        birthData: [{
            healthDivision: '',
            postPregnancyDivision: '',
            id: '',
            dob: '',
            registeredDate: '',
            mother: '',
            age: '',
            address: '',
        }],
        babyCare: [{
            apga: {
                "1M": '',
                "2M": '',
                "3M": '',
            },
            birthWeight: '',
            headCircumference: '',
            birthHeight: '',
            infantHealth: '',
            vitaminK: '',
        }],
        specialNeeds: [{
            premature: { checked: false, date: '' },
            underWeight: { checked: false, date: '' },
            neonatalComplications: { checked: false, date: '' },
            congenitalDiseases: { checked: false, date: '' },
            afterBirthDiseases: { checked: false, date: '' },
            powderMilk: { checked: false, date: '' },
            growthStunting: { checked: false, date: '' },
            feedingComplications: { checked: false, date: '' },
            parentalDeath: { checked: false, date: '' },
            parentalImmigration: { checked: false, date: '' },
            other: { checked: false, date: '' },
        }],
        healthDetails: [{
            skinColor: '',
            eyes: '',
            navel: '',
            breastFeeding: '',
            nursing: {
                position: '',
                connection: '',
            },
            Other: '',
            "": "",
        }],
        clinicDays: '',
    });

    const handleBirthDataChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            birthData: prev.birthData.map((cell, i) =>
                i === index ? { ...cell, [field]: value } : cell
            )
        }));
    };

    const handleApgarChange = (index, minute, value) => {
        setFormData(prev => ({
            ...prev,
            babyCare: prev.babyCare.map((care, i) =>
                i === index ? {
                    ...care,
                    apga: { ...care.apga, [minute]: value }
                } : care
            )
        }));
    };

    const handleSpecialNeedsCheckBoxChange = (field) => {
        setFormData(prev => ({
            ...prev,
            specialNeeds: prev.specialNeeds.map((needs) => ({
                ...needs,
                [field]: {
                    ...needs[field],
                    checked: !needs[field].checked
                }
            }))
        }));
    };

    const handleSpecialNeedsDateChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            specialNeeds: prev.specialNeeds.map((needs) => ({
                ...needs,
                [field]: {
                    ...needs[field],
                    date: value
                }
            }))
        }));
    };

    const handleHealthDetailsChange = (index, field, subField, value) => {
        setFormData((prev) => ({
            ...prev,
            healthDetails: prev.healthDetails.map((details, i) =>
                i === index
                    ? {
                        ...details,
                        [field]: subField
                            ? { ...details[field], [subField]: value }
                            : value,
                    }
                    : details
            ),
        }));
    };

    const createHealthDetailsCell = (index, fieldName) => {
        const details = formData.healthDetails[0];  // We only need the template from the first item

        if (typeof details[fieldName] === "object") {
            return Object.keys(details[fieldName]).map((subField) => (
                <input
                    key={subField}
                    type="text"
                    placeholder={subField}
                    value={formData.healthDetails[index]?.[fieldName]?.[subField] || ""}
                    onChange={(e) =>
                        handleHealthDetailsChange(
                            index,
                            fieldName,
                            subField,
                            e.target.value
                        )
                    }
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            ));
        }

        return (
            <input
                type="text"
                value={formData.healthDetails[index]?.[fieldName] || ""}
                onChange={(e) =>
                    handleHealthDetailsChange(
                        index,
                        fieldName,
                        null,
                        e.target.value
                    )
                }
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
        );
    };

    const ensureHealthDetails = () => {
        if (formData.healthDetails.length < 4) {
            const template = formData.healthDetails[0];
            setFormData(prev => ({
                ...prev,
                healthDetails: [
                    ...prev.healthDetails,
                    ...Array(4 - prev.healthDetails.length).fill().map(() => ({ ...template }))
                ]
            }));
        }
    };

    useEffect(() => {
        ensureHealthDetails();
    }, []);

    const createBirthDataRow = (fieldName) => {
        return formData.birthData.map((birthData, idx) => (
            <td key={idx} className="p-2">
                <input
                    type={fieldName === "dob" || fieldName === "registeredDate" ? "date" : "text"}
                    value={birthData[fieldName]}
                    onChange={(e) => handleBirthDataChange(idx, fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    const handleBabyCareChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            babyCare: prev.babyCare.map(care => ({
                ...care,
                [field]: value
            }))
        }));
    };

    const createBabyCareRow = (fieldName) => {
        return formData.babyCare.map((care, idx) => (
            <td key={idx} className="p-2">
                <input
                    type="text"
                    value={care[fieldName]}
                    onChange={(e) => handleBabyCareChange(fieldName, e.target.value)}
                    className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                />
            </td>
        ));
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Baby Details</h1>

            {/* Birth Data Section */}
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {Object.keys(formData.birthData[0]).map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1).trim()}
                                    </td>
                                    {createBirthDataRow(field)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Newborn Baby Care Section */}
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Newborn Baby Care
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            <tr className="border-b border-blue-100">
                                <td className="p-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm">
                                        <div className="font-medium text-blue-700 mb-2">APGAR Score</div>
                                        {["1M", "2M", "3M"].map((minute) => (
                                            <div key={minute} className="flex items-center mb-2">
                                                <label className="w-8 text-sm text-blue-600">{minute}</label>
                                                <input
                                                    type="number"
                                                    value={formData.babyCare[0].apga[minute]}
                                                    onChange={(e) => handleApgarChange(0, minute, e.target.value)}
                                                    className="w-16 p-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm h-full">
                                        <div className="font-medium text-blue-700 mb-2">Birth weight (kg)</div>
                                        {createBabyCareRow('birthWeight')}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm h-full">
                                        <div className="font-medium text-blue-700 mb-2">Head circumference (cm)</div>
                                        {createBabyCareRow('headCircumference')}
                                    </div>
                                </td>
                                <td className="p-3">
                                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm h-full">
                                        <div className="font-medium text-blue-700 mb-2">Height at birth (cm)</div>
                                        {createBabyCareRow('birthHeight')}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Special Care Section */}
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Reason for Special Care
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {Object.keys(formData.specialNeeds[0]).map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap w-1/3">
                                        {field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1).trim()}
                                    </td>
                                    <td className="p-3 w-16">
                                        <input
                                            type="checkbox"
                                            checked={formData.specialNeeds[0][field].checked}
                                            onChange={() => handleSpecialNeedsCheckBoxChange(field)}
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                                        />
                                    </td>
                                    <td className="p-3">
                                        <input
                                            type="date"
                                            value={formData.specialNeeds[0][field].date}
                                            onChange={(e) => handleSpecialNeedsDateChange(field, e.target.value)}
                                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                            disabled={!formData.specialNeeds[0][field].checked}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Baby Health Record Section */}
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Newborn Baby Health Record
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                                <th className="p-3 text-left text-sm font-semibold text-blue-700"></th>
                                <th colSpan={2} className="p-3 text-center text-sm font-semibold text-blue-700">Birth to 10 days</th>
                                <th className="p-3 text-center text-sm font-semibold text-blue-700">11 to 28 days</th>
                                <th className="p-3 text-center text-sm font-semibold text-blue-700">To 42 days</th>
                            </tr>
                            <tr>
                                <th className="p-3"></th>
                                {[...Array(4)].map((_, i) => (
                                    <th key={i} className="p-3">
                                        <input 
                                            type="date" 
                                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                        />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(formData.healthDetails[0]).filter(key => key !== "").map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.replace(/([A-Z])/g, " $1").charAt(0).toUpperCase() + field.replace(/([A-Z])/g, " $1").slice(1).trim()}
                                    </td>
                                    {[0, 1, 2, 3].map((columnIndex) => (
                                        <td key={columnIndex} className="p-3">
                                            {createHealthDetailsCell(columnIndex, field)}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Clinic Days Section */}
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Clinic Days
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <tbody>
                            {[...Array(5)].map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-blue-100">
                                    {[...Array(10)].map((_, colIndex) => (
                                        <td key={colIndex} className="p-2">
                                            <input 
                                                type="date" 
                                                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BabyDetails;