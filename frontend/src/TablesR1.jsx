import React from 'react';
import { useForm2Context } from './contexts/Form2Context'; 

const Tables = () => {
    const { formData, setFormData } = useForm2Context();
    
    // Initialize pregnancyHistory if it doesn't exist in context
    if (!formData.pregnancyHistory) {
        setFormData({
            ...formData,
            pregnancyHistory: [
                { id: 1, result: '', details: '', placeOfBirth: '', bornWeight: '', complications: '', age: '' }
            ]
        });
    }

    const handleInputChange = (e, id, field) => {
        const updatedHistory = formData.pregnancyHistory.map((row) =>
            row.id === id ? { ...row, [field]: e.target.value } : row
        );
        
        setFormData({
            ...formData,
            pregnancyHistory: updatedHistory
        });
    };

    const addRow = () => {
        const newRow = { 
            id: formData.pregnancyHistory.length + 1, 
            result: '', 
            details: '', 
            placeOfBirth: '', 
            bornWeight: '', 
            complications: '', 
            age: '' 
        };
        
        setFormData({
            ...formData,
            pregnancyHistory: [...formData.pregnancyHistory, newRow]
        });
    };

    const deleteRow = (id) => {
        const updatedHistory = formData.pregnancyHistory.filter((row) => row.id !== id);
        
        setFormData({
            ...formData,
            pregnancyHistory: updatedHistory
        });
    };

    return (
        <div>
            <br /><hr /><br />
            <h2>Previous pregnancy history</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Pregnancies</th>
                        <th>Result</th>
                        <th>Details</th>
                        <th>Place of Birth</th>
                        <th>Born Weight</th>
                        <th>Complications during Pregnancy</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.pregnancyHistory && formData.pregnancyHistory.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                <input
                                    type="text"
                                    value={row.result}
                                    onChange={(e) => handleInputChange(e, row.id, 'result')}
                                />
                            </td>
                            <td>
                                <textarea
                                    value={row.details}
                                    onChange={(e) => handleInputChange(e, row.id, 'details')}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.placeOfBirth}
                                    onChange={(e) => handleInputChange(e, row.id, 'placeOfBirth')}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.bornWeight}
                                    onChange={(e) => handleInputChange(e, row.id, 'bornWeight')}
                                />
                            </td>
                            <td>
                                <textarea
                                    value={row.complications}
                                    onChange={(e) => handleInputChange(e, row.id, 'complications')}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.age}
                                    onChange={(e) => handleInputChange(e, row.id, 'age')}
                                />
                            </td>
                            <td>
                                <button onClick={() => deleteRow(row.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={addRow}>Add Row</button>
        </div>
    );
};

export default Tables;