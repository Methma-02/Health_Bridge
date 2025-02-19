import { useState } from "react";

const HealthRecords = () => {
    const ageStages = [
        "1 month", "2 months", "4 months", "6 months", "9 months", 
        "18 months", "3 years", "4 years", "5 years"
    ];

    const [formData, setFormData] = useState({
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
            <td key={idx}>
                <input
                    type="text"
                    value={row[fieldName]}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className="input-field"
                    readOnly={fieldName === "Age"} // Make Age field read-only
                />
            </td>
        ));
    };

    return (
        <div>
            <h2 className="title">Child Health Records</h2>
            <table>
                <tbody>
                    {Object.keys(formData.table[0]).map((field) => (
                        <tr key={field}>
                            <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td>
                            {createTableRow(field)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HealthRecords;
