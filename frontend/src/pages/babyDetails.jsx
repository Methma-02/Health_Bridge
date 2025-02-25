import React,{ useState } from "react";
import FormSubmitHandler from "../components/submit";

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
            nursing:{
                position:'',
                connection:'',
            },
            Other: '',
            "":"",
        }],
        clinicDays: '',
    });

    const formattedData = {
        type: 'babyDetails',
        data: formData
      };
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
                className="input-field"
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
                    ...Array(4 - prev.healthDetails.length).fill().map(() => ({...template}))
                ]
            }));
        }
    };

    React.useEffect(() =>{
        ensureHealthDetails();
    },[]);
    

    const createBirthDataRow = (fieldName) => {
        return formData.birthData.map((birthData, idx) => (
            <td key={idx}>
                <input
                    type={fieldName === "dob" || fieldName === "registeredDate" ? "date" : "text"}
                    value={birthData[fieldName]}
                    onChange={(e) => handleBirthDataChange(idx, fieldName, e.target.value)}
                    className="input-field"
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
            <td key={idx}>
                <input
                    type="text"
                    value={care[fieldName]}
                    onChange={(e) => handleBabyCareChange(fieldName, e.target.value)}
                    className="input-field"
                />
            </td>
        ));
    };
    
    return (
        <div className="baby-details">
            <h2 className="title">Baby Details</h2>
            <table className="details-table">
                <tbody>
                    {Object.keys(formData.birthData[0]).map((field) => (
                        <tr key={field}>
                            <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td> {createBirthDataRow(field)}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h2 className="title">Newborn Baby Care</h2>
                <table className="details-table">
                    <tbody><tr>
                        <td className="apgar">
                            <div className="apgar-container">
                                <div className="field-label">APGAR Score</div>
                                {["1M", "2M", "3M"].map((minute) => (
                                    <div key={minute} className="apgar-row">
                                        <label className="apgar-label">{minute}</label>
                                        <input
                                            type="number" value={formData.babyCare[0].apga[minute]} onChange={(e) => handleApgarChange(0, minute, e.target.value)}className="apgar-input"/>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="measurement">
                                <div className="measurement-title">Birth weight (kg)</div>
                                {createBabyCareRow('birthWeight')}
                            </td>
                            <td className="measurement">
                                <div className="measurement-title">Head circumference at birth (cm)</div>
                                {createBabyCareRow('headCircumference')}
                            </td>
                            <td className="measurement">
                                <div className="measurement-title">Height at birth (cm)</div>
                                {createBabyCareRow('birthHeight')}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="title">Reason for special care</h2>
                <table className="details-table">
                    <tbody>
                        {Object.keys(formData.specialNeeds[0]).map((field) =>(
                            <tr key={field}>
                                <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td>     
                                <td>
                                <input 
                                        type="checkbox" 
                                        checked={formData.specialNeeds[0][field].checked}
                                        onChange={() => handleSpecialNeedsCheckBoxChange(field)} 
                                        className="checks"
                                    />
                                </td> 

                                <td>
                                <input 
                                        type="date" 
                                        value={formData.specialNeeds[0][field].date}
                                        onChange={(e) => handleSpecialNeedsDateChange(field, e.target.value)}
                                    />
                                </td>
                                
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="title">New born baby&apos;s health record</h2>
                <table className="details-table">
                    <thead>
                        <tr>
                            <th rowSpan={2}></th>
                            <th colSpan={2}>Birth to 10 days</th> 
                            <th>11 to 28 days</th>
                            <th>To 42 days</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr>
                            <th></th>
                            {[...Array(4)].map((_, i) =>(
                                <th key={i}>
                                    <input type="date"/>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                    {Object.keys(formData.healthDetails[0]).map((field) =>(
                        <tr key={field}>
                            <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td>
                        {[0,1,2,3].map((columnIndex) =>(
                            <td key={columnIndex}>
                                {createHealthDetailsCell(columnIndex, field)}
                            </td>
                        ))}
                    </tr>
                    
                ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="title"> Clinic days</h2>
                <table className="chart-table">
                <tbody>
                    {[...Array(5)].map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {[...Array(10)].map((_, colIndex) => (
                                <td key={colIndex}>
                                    <input type="date" className="date-input" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            </div>
            <FormSubmitHandler formData={formattedData} />
        </div>
    
)};

export default BabyDetails;