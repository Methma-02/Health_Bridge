// import { useState } from "react";

// const ChildHealthRecords = () => {
//     const ageStages = [
//         "1 month", "2 months", "4 months", "6 months", "9 months", 
//         "18 months", "3 years", "4 years", "5 years"
//     ];

//     const [formData, setFormData] = useState({
//         table: ageStages.map(age => ({
//             Age: age, // Assign predefined ages
//             clinicDate: '',
//             head: '',
//             disabilities: '',
//             eyes: '',
//             sight: '',
//             nightBlindness: '',
//             dental: '',
//             issues: '',
//             growth: '',
//             heartDiseases: '',
//             sandiya: '',
//             other: '',
//             signature: '',
//             designation: ''
//         }))
//     });

//     const handleTableChange = (index, field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             table: prev.table.map((row, i) =>
//                 i === index ? { ...row, [field]: value } : row
//             )
//         }));
//     };

//     const createTableRow = (fieldName) => {
//         return formData.table.map((row, idx) => (
//             <td key={idx}>
//                 <input
//                     type="text"
//                     value={row[fieldName]}
//                     onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
//                     className="input-field"
//                     readOnly={fieldName === "Age"} // Make Age field read-only
//                 />
//             </td>
//         ));
//     };

//     return (
//         <div>
//             <h2 className="title">Child Health Records</h2>
//             <table>
//                 <tbody>
//                     {Object.keys(formData.table[0]).map((field) => (
//                         <tr key={field}>
//                             <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td>
//                             {createTableRow(field)}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ChildHealthRecords;

import { useState } from "react";

const ChildHealthRecords = () => {
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
            <td key={idx} className="p-2">
                <input
                    type="text"
                    value={row[fieldName]}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className={`w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 ${
                        fieldName === "Age" ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    readOnly={fieldName === "Age"} // Make Age field read-only
                />
            </td>
        ));
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">Child Health Records</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <tbody>
                        {Object.keys(formData.table[0]).map((field) => (
                            <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                    {field.replace(/([A-Z])/g, " $1").trim()}
                                </td>
                                {createTableRow(field)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ChildHealthRecords;