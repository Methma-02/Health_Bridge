import './App.css';

function Pregnancy() {
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

    return (
        <div className='container'>
            <h1>Pregnancy Record Part-B</h1> <br /><br />

            <form action="Health">
                {registrationFields.map((field) => (
                    <div className='Register' key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea id={field.id} name={field.id} rows={field.rows} cols={field.cols} />
                        ) : (
                            <input type={field.type} id={field.id} name={field.id} />
                        )}
                    </div>
                ))}

                <hr /> <br />

                {personalInfoFields.map((field) => (
                    <div key={field.id}>
                        <label htmlFor={field.id}>{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea id={field.id} name={field.id} rows={field.rows} cols={field.cols} />
                        ) : (
                            <input type={field.type} id={field.id} name={field.id} />
                        )}
                    </div>
                ))}

                <div className='job'>
                    {jobFields.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <input type={field.type} id={field.id} name={field.id} />
                        </div>
                    ))}
                </div>

                <div>
                    <label htmlFor="age">Mother's age at the marriage:</label>
                    <input type="text" className='age' name='age' />
                </div>

                <br /><hr /><br />

                <div className='radio'>
                    {radioQuestions.map((question) => (
                        <div key={question.id}>
                            <label htmlFor={question.id}>{question.label}</label> <br />
                            <label>
                                <input type="radio" id="yes" name={question.name} value="Yes" />
                                Yes
                            </label>
                            <label>
                                <input type="radio" id="no" name={question.name} value="No" />
                                No
                            </label>
                        </div>
                    ))}
                </div>

                <br /><hr /> <br />

                <div className='currentStatus1'>
                    <h2>Current Pregnancy State</h2>

                    {currentPregnancyFields.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea id={field.id} name={field.id} rows={field.rows} cols={field.cols} />
                            ) : (
                                <input type={field.type} id={field.id} name={field.id} />
                            )}
                        </div>
                    ))}
                </div>

                <div className='currentStatus2'>
                    {currentStatusFields.map((field) => (
                        <div key={field.id}>
                            <label htmlFor={field.id}>{field.label}</label>
                            <textarea id={field.id} name={field.id} rows={field.rows} cols={field.cols} />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default Pregnancy;