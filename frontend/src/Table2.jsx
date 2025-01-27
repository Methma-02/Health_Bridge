import React, { useState } from 'react';

const Table2 = () => {
    // Define the headers vertically
    const headers = [
        'Date',
        'No. of weeks for the pregnancy',
        'Anemia',
        'Swelling',
        'Fundal height',
        'Fetal movement',
        'Fetal heart sound',
        'Main part',
        'Urine',
        'Albumin',
        'Sugar',
        'Prenatal health advise',
        'Nutritional needs',
        'Was the expectant mother informed about the expected delivery time',
        'Were relatives informed of any potential risks',
        'Conditions to avoid during pregnancy',
        'The importance of being aware of fetal movement',
        'Personal safety',
        'Postpartum',
        'Child protection',
        'Risk factors for a newborn baby',
        'Exclusive breastfeeding',
        'Correct breastfeeding position',
        'Knowing without doubt whether there is milk',
        'Postpartum risk factors',
        'The need for family organization',
        'Raising awareness about family planning methods',
        'Dates to visit clinic',
    ];

    // Initialize state for the table data
    const [data, setData] = useState(
        headers.map((header, index) => ({
            id: index + 1,
            header: header,
            values: Array(10).fill(''), // Initialize 10 empty input fields for each row
        }))
    );

    // Handle input change
    const handleInputChange = (e, rowId, colIndex) => {
        const updatedData = data.map((row) =>
            row.id === rowId
                ? {
                      ...row,
                      values: row.values.map((value, index) =>
                          index === colIndex ? e.target.value : value
                      ),
                  }
                : row
        );
        setData(updatedData);
    };

    return (
        <div>
            <br /><hr /><br />
            <h2>Vertical Header Table with 10 Input Columns</h2>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Headers</th>
                        {[...Array(10)].map((_, index) => (
                            <th key={index}>Data {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td>{row.header}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex}>
                                    <input
                                        type={
                                            row.header === 'Date' || row.header === 'Dates to visit clinic'
                                                ? 'date'
                                                : 'text'
                                        } // Set type to 'date' for Date and Dates to visit clinic rows
                                        value={value}
                                        onChange={(e) =>
                                            handleInputChange(e, row.id, colIndex)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table2;