import React, { useState } from 'react';

const Tables = () => {
    const [data, setData] = useState([
        { id: 1, result: '', details: '', placeOfBirth: '', bornWeight: '', complications: '', age: '' },
    ]);

    const handleInputChange = (e, id, field) => {
        const updatedData = data.map((row) =>
            row.id === id ? { ...row, [field]: e.target.value } : row
        );
        setData(updatedData);
    };

    const addRow = () => {
        const newRow = { id: data.length + 1, result: '', details: '', placeOfBirth: '', bornWeight: '', complications: '', age: '' };
        setData([...data, newRow]);
    };

    const deleteRow = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
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
                    {data.map((row) => (
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
                                    type="text"
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
                                    type="text"
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