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
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
            <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Previous Pregnancy History
            </h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Pregnancies</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Result</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Details</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Place of Birth</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Born Weight</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Complications during Pregnancy</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Age</th>
                            <th className="p-3 text-left text-sm font-semibold text-blue-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.pregnancyHistory && formData.pregnancyHistory.map((row) => (
                            <tr key={row.id} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm text-blue-700">{row.id}</td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.result}
                                        onChange={(e) => handleInputChange(e, row.id, 'result')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <textarea
                                        value={row.details}
                                        onChange={(e) => handleInputChange(e, row.id, 'details')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.placeOfBirth}
                                        onChange={(e) => handleInputChange(e, row.id, 'placeOfBirth')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.bornWeight}
                                        onChange={(e) => handleInputChange(e, row.id, 'bornWeight')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <textarea
                                        value={row.complications}
                                        onChange={(e) => handleInputChange(e, row.id, 'complications')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <input
                                        type="text"
                                        value={row.age}
                                        onChange={(e) => handleInputChange(e, row.id, 'age')}
                                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                    />
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => deleteRow(row.id)}
                                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-4">
                <button
                    onClick={addRow}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
                >
                    Add Row
                </button>
            </div>
        </div>
    );
};

export default Tables;