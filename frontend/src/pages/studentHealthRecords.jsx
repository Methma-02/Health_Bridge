import { useState } from "react";

const StudentHealthRecords = () =>{
    const [formData, setFormData] = useState({
        table: Array(10).fill().map(() => ({
            Date:'',
            age:'',
            height:'',
            weight:'',
            "BMI":'',
            stunting:'',
            wasting:'',
            obesity:'',
            "Vitamin E defiencey":'',
            "Blood defincenty":'',
            Strabismus:'',
            "left eye sight":'',
            "right eye sight":'',
            "Left hearing":'',
            "right hearing":'',
            speaking:'',
            "dental trauma":'',
            "dental issues":'',
            flurosis:'',
            goiter:'',
            "defects in throat,ears or nose":'',
            "insensitive marks":'',
            "Oesteoporosis":'',
            "heart":'',
            "lungs":'',
            "Teacher support":'',
            "attenance below 75%":'',
            "Academically struggling":'',
            "other disablilties (consulting the teacher)":'',
            "Deworming pills & micronutrient supplements given by school" : '',
            "date given":'',
            "dewormimg pills":'', 
            "Vitamin A overdose":'',
            Iron:'',
            "folic acid":'',
            "other drugs":'',
            "Signature of the officer":''
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
                    />
                </td>
            ));
        };
    
        return (
            <div>
                <h2 className="title">Student Health Records</h2>
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
    
    export default StudentHealthRecords;
    
    