import React, { useState } from 'react';

const Tables = () => {
    const [data, setData] = useState([
        { id: 1, name: '', age: '', email: '' },
    ]);

    const handleInputChange = (e, id, field) => {
        const updatedData = data.map((row) =>
            row.id === id ? { ...row, [field]: e.target.value } : row
        );
        setData(updatedData);
    };

    const addRow = () => {
        const newRow = { id: data.length + 1, name: '', age: '', email: '' };
        setData([...data, newRow]);
    };

    const deleteRow = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
    };

    return (
        <div>
            <h2>Editable Table</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Pregnancies</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Email</th>
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
                                    value={row.name}
                                    onChange={(e) => handleInputChange(e, row.id, 'name')}
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
                                <input
                                    type="email"
                                    value={row.email}
                                    onChange={(e) => handleInputChange(e, row.id, 'email')}
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
