import React, { useEffect, useState } from 'react';
import './App.css';

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

function Pregnancy() {
    const [formData, setFormData] = useState({
        regNo: '',
        regDate: '',
        regPlace: '',
        regFam: '',
        regArea: '',
        midwife: '',
        name: '',
        age: '',
        husbandName: '',
        husbandAge: '',
        address: '',
        contact: '',
        eduMother: '',
        eduFather: '',
        motherJob: '',
        distance: '',
        husbandJob: '',
        marriageAge: '',
        relative: '',
        vaccine: '',
        prenatal: '',
        folic: '',
        fertility: '',
        pregnancyNo: '',
        childNo: '',
        youngest: '',
        menstruation: '',
        hopedate: '',
        hopetime: '',
        fetal: '',
        noOfWeeks: '',
        famPlan: '',
        minOrMax: '',
        morePreg: '',
    });

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
                setFormData({
                    regNo: '',
                    regDate: '',
                    regPlace: '',
                    regFam: '',
                    regArea: '',
                    midwife: '',
                    name: '',
                    age: '',
                    husbandName: '',
                    husbandAge: '',
                    address: '',
                    contact: '',
                    eduMother: '',
                    eduFather: '',
                    motherJob: '',
                    distance: '',
                    husbandJob: '',
                    marriageAge: '',
                    relative: '',
                    vaccine: '',
                    prenatal: '',
                    folic: '',
                    fertility: '',
                    pregnancyNo: '',
                    childNo: '',
                    youngest: '',
                    menstruation: '',
                    hopedate: '',
                    hopetime: '',
                    fetal: '',
                    noOfWeeks: '',
                    famPlan: '',
                    minOrMax: '',
                    morePreg: '',
                });
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
            <div key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                {field.type === 'textarea' ? (
                    <textarea
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                        rows={field.rows}
                        cols={field.cols}
                    />
                ) : (
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id]}
                        onChange={handleChange}
                    />
                )}
            </div>
        ));
    };

    const renderRadioButtons = (questions) => {
        return questions.map((question) => (
            <div key={question.id}>
                <label htmlFor={question.id}>{question.label}</label> <br />
                <label>
                    <input
                        type="radio"
                        id="yes"
                        name={question.name}
                        value="Yes"
                        onChange={handleChange}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        id="no"
                        name={question.name}
                        value="No"
                        onChange={handleChange}
                    />
                    No
                </label>
            </div>
        ));
    };

    return (
        <div className='container'>
            <h1>Pregnancy Record Part-B</h1> <br /><br />

            <form onSubmit={handleSubmit}>
                {/* Render Registration Fields */}
                {renderInputFields(registrationFields)}

                {/* Add a "Get Info" Button */}
                <button type="button" onClick={handleGetInfo}>
                    Get Info
                </button>

                <hr /> <br />

                {/* Render Personal Info Fields */}
                {renderInputFields(personalInfoFields)}

                {/* Render Job Fields */}
                <div className='job'>
                    {renderInputFields(jobFields)}
                </div>

                {/* Mother's Age at Marriage */}
                <div>
                    <label htmlFor="marriageAge">Mother's age at the marriage:</label>
                    <input
                        type="text"
                        id="marriageAge"
                        name="marriageAge"
                        value={formData.marriageAge}
                        onChange={handleChange}
                    />
                </div>

                <br /><hr /><br />

                {/* Render Radio Buttons */}
                <div className='radio'>
                    {renderRadioButtons(radioQuestions)}
                </div>

                <br /><hr /> <br />

                {/* Render Current Pregnancy Fields */}
                <div className='currentStatus1'>
                    <h2>Current Pregnancy State</h2>
                    {renderInputFields(currentPregnancyFields)}
                </div>

                {/* Render Current Status Fields */}
                <div className='currentStatus2'>
                    {renderInputFields(currentStatusFields)}
                </div>

                {/* Submit Button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Pregnancy;