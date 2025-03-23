import React from 'react';
import { useForm2Context } from '../../contexts/Form2Context';

const Table2 = () => {
    const { formData, setFormData } = useForm2Context();

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

    // Initialize prenatalFieldNote if it doesn't exist in context
    if (!formData.prenatalFieldNote) {
        const initialPrenatalData = headers.map((header, index) => ({
            id: index + 1,
            header: header,
            values: Array(10).fill(''), // Initialize 10 empty input fields for each row
        }));

        setFormData({
            ...formData,
            prenatalFieldNote: initialPrenatalData
        });
    }

    // Handle input change
    const handleInputChange = (e, rowId, colIndex) => {
        if (!formData.prenatalFieldNote) return;

        const updatedPrenatalData = formData.prenatalFieldNote.map((row) =>
            row.id === rowId
                ? {
                    ...row,
                    values: row.values.map((value, index) =>
                        index === colIndex ? e.target.value : value
                    ),
                }
                : row
        );

        setFormData({
            ...formData,
            prenatalFieldNote: updatedPrenatalData
        });
    };

    return (
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Prenatal Field Note
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Headers</th>
                            {[...Array(10)].map((_, index) => (
                                <th key={index} className="p-3 text-left text-sm font-semibold text-blue-700">Data {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {formData.prenatalFieldNote && formData.prenatalFieldNote.map((row) => (
                            <tr key={row.id} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm text-blue-700 whitespace-nowrap">{row.header}</td>
                                {row.values.map((value, colIndex) => (
                                    <td key={colIndex} className="p-3">
                                        <input
                                            type={
                                                row.header === 'Date' || row.header === 'Dates to visit clinic'
                                                    ? 'date'
                                                    : 'text'
                                            }
                                            value={value}
                                            onChange={(e) => handleInputChange(e, row.id, colIndex)}
                                            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table2;