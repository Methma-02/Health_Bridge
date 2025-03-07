import React, { useEffect, useState } from 'react';
import Tables from './TablesR1';
import Table2 from "./TableR2";
import Pregnancy2 from "./Pregnancy2";
import { useForm2Context } from './contexts/Form2Context';

const registrationFields = [
    { id: 'regNo', label: 'Registration No.:', type: 'text' },
    { id: 'regDate', label: 'Registration Date:', type: 'text' },
    { id: 'regPlace', label: 'Registration Place:', type: 'text' },
    { id: 'regFam', label: 'D.O.R in the family registry', type: 'text' },
    { id: 'regArea', label: 'Grama Niladari Area:', type: 'text' },
    { id: 'midwife', label: 'Midwife Area:', type: 'text' },
];

const personalInfoFields = [
    { id: 'name', label: "Pregnant Mother's Name:", type: 'text' },
    { id: 'age', label: "Mother's Age:", type: 'text' },
    { id: 'husbandName', label: "Husband's Name:", type: 'text' },
    { id: 'husbandAge', label: "Husband's Age:", type: 'text' },
    { id: 'address', label: 'Address:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'contact', label: 'Contact No.:', type: 'text' },
    { id: 'eduMother', label: "Mother's Education Qualifications:", type: 'textarea', rows: 5, cols: 10 },
    { id: 'eduFather', label: "Husband's Education Qualifications:", type: 'textarea', rows: 5, cols: 10 },
];

const jobFields = [
    { id: 'motherJob', label: "Mother's Profession:", type: 'text' },
    { id: 'distance', label: "Distance to mother's workplace:", type: 'text' },
    { id: 'husbandJob', label: "Husband's Profession:", type: 'text' },
];

const radioQuestions = [
    { id: 'relative', label: 'A marriage between blood relatives?', name: 'relative' },
    { id: 'vaccine', label: 'Have you vaccinated against Rubella?', name: 'vaccine' },
    { id: 'prenatal', label: 'Have you had the prenatal checkup?', name: 'prenatal' },
    { id: 'folic', label: 'Have you taken folic acid?', name: 'folic' },
    { id: 'fertility', label: 'Is there a history of subfertility?', name: 'fertility' },
];

const currentPregnancyFields = [
    { id: 'pregnancyNo', label: 'Which Pregnancy is this?', type: 'number' },
    { id: 'childNo', label: 'Number of living children?', type: 'number' },
    { id: 'youngest', label: 'Age of the youngest child?', type: 'text' },
    { id: 'menstruation', label: 'Date of last menstruation?', type: 'date' },
    { id: 'hopedate', label: 'Hope Date', type: 'date' },
    { id: 'hopetime', label: 'Hope time', type: 'date' },
    { id: 'fetal', label: 'Date of first fetal movement', type: 'date' },
    { id: 'noOfWeeks', label: 'Number of weeks pregnant at the time of Registration', type: 'text' },
    { id: 'famPlan', label: 'Did you use any family planning method before getting pregnant? If so, what\'s the method?', type: 'textarea', rows: 5, cols: 10 },
];

const currentStatusFields = [
    { id: 'minOrMax', label: 'Under 20 and over 35 years old', type: 'textarea', rows: 5, cols: 5 },
    { id: 'morePreg', label: 'Five or more Pregnancies', type: 'textarea', rows: 5, cols: 5 },
];

const additionalFields = [
    { id: 'bloodPressure', label: 'Blood Pressure:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'vaginalBleeding', label: 'Vaginal Bleeding:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'fetusStatus', label: 'Fetus Status:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'casualPosition', label: 'Casual Position:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'unknownDeliveryDate', label: 'Not knowing the exact date of delivery:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'other', label: 'Other:', type: 'textarea', rows: 5, cols: 10 },
];

const otherRiskFactorsFields = [
    { id: 'bmi', label: 'Body mass index less than 18.5 or more than 25:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'diabetes', label: 'Diabetes:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'malaria', label: 'Malaria:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'heartProblems', label: 'Heart problems:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'kidneyProblems', label: 'Kidney problems:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'otherProblems', label: 'Other problems:', type: 'textarea', rows: 5, cols: 10 },
];

const familyMedicalHistoryFields = [
    { id: 'familyDiabetes', label: 'Family Diabetes:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'familyBloodPressure', label: 'Family Blood Pressure:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'hematologicalConditions', label: 'Hematological Conditions:', type: 'textarea', rows: 5, cols: 10 },
    { id: 'otherConditions', label: 'Other Conditions:', type: 'textarea', rows: 5, cols: 10 },
];

function Pregnancy() {
    const { formData, setFormData } = useForm2Context();

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleGetInfo = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pregnancy/${formData.regNo}`);
            if (response.ok) {
                const data = await response.json();
                setFormData(data); // Populate form with fetched data
            } else {
                alert('Record not found. Please fill out the form.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/pregnancy', {
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

    const renderInputFields = (fields) => {
        return fields.map((field) => (
            <div key={field.id} className="mb-4">
                <label htmlFor={field.id} className="block text-sm font-medium text-blue-700 mb-1">
                    {field.label}
                </label>
                {field.type === 'textarea' ? (
                    <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        rows={field.rows}
                        cols={field.cols}
                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    />
                ) : (
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    />
                )}
            </div>
        ));
    };

    const renderRadioButtons = (questions) => {
        return questions.map((question) => (
            <div key={question.id} className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-1">
                    {question.label}
                </label>
                <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name={question.name}
                            value="Yes"
                            checked={formData[question.name] === "Yes"}
                            onChange={(e) => handleChange(e)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                        />
                        <span className="ml-2 text-sm text-blue-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name={question.name}
                            value="No"
                            checked={formData[question.name] === "No"}
                            onChange={(e) => handleChange(e)}
                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                        />
                        <span className="ml-2 text-sm text-blue-700">No</span>
                    </label>
                </div>
            </div>
        ));
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
                Pregnancy Record Part-B
            </h1>

            <form>
                {/* Render Registration Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Registration Details
                    </h2>
                    {renderInputFields(registrationFields)}
                    <button
                        type="button"
                        onClick={handleGetInfo}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        Get Info
                    </button>
                </div>

                {/* Render Personal Info Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal Information
                    </h2>
                    {renderInputFields(personalInfoFields)}
                </div>

                {/* Render Job Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Job Details
                    </h2>
                    {renderInputFields(jobFields)}
                </div>

                {/* Mother's Age at Marriage */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Mother's Age at Marriage
                    </h2>
                    <div className="mb-4">
                        <label htmlFor="marriageAge" className="block text-sm font-medium text-blue-700 mb-1">
                            Mother's age at the marriage:
                        </label>
                        <input
                            type="text"
                            id="marriageAge"
                            name="marriageAge"
                            value={formData.marriageAge}
                            onChange={handleChange}
                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                        />
                    </div>
                </div>

                {/* Render Radio Buttons */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Additional Questions
                    </h2>
                    {renderRadioButtons(radioQuestions)}
                </div>

                {/* Render Current Pregnancy Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        Current Pregnancy State
                    </h2>
                    {renderInputFields(currentPregnancyFields)}
                </div>

                {/* Render Current Status Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Current Status
                    </h2>
                    {renderInputFields(currentStatusFields)}
                </div>

                {/* Render Additional Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Additional Information
                    </h2>
                    {renderInputFields(additionalFields)}
                </div>

                {/* Render Other Risk Factors Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Other Risk Factors
                    </h2>
                    {renderInputFields(otherRiskFactorsFields)}
                </div>

                {/* Render Family Medical History Fields */}
                <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Family Medical History
                    </h2>
                    {renderInputFields(familyMedicalHistoryFields)}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                    >
                        Submit All Records
                    </button>
                </div>
            </form>

            {/* Imported Components */}
            <Tables />
            <Table2 />
            <Pregnancy2 />
        </div>
    );
}

export default Pregnancy;