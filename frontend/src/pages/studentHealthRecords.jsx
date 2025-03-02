// // import { useState } from "react";

// // const StudentHealthRecords = () =>{
// //     const [formData, setFormData] = useState({
// //         table: Array(10).fill().map(() => ({
// //             Date:'',
// //             age:'',
// //             height:'',
// //             weight:'',
// //             "BMI":'',
// //             stunting:'',
// //             wasting:'',
// //             obesity:'',
// //             "Vitamin E defiencey":'',
// //             "Blood defincenty":'',
// //             Strabismus:'',
// //             "left eye sight":'',
// //             "right eye sight":'',
// //             "Left hearing":'',
// //             "right hearing":'',
// //             speaking:'',
// //             "dental trauma":'',
// //             "dental issues":'',
// //             flurosis:'',
// //             goiter:'',
// //             "defects in throat,ears or nose":'',
// //             "insensitive marks":'',
// //             "Oesteoporosis":'',
// //             "heart":'',
// //             "lungs":'',
// //             "Teacher support":'',
// //             "attenance below 75%":'',
// //             "Academically struggling":'',
// //             "other disablilties (consulting the teacher)":'',
// //             "Deworming pills & micronutrient supplements given by school" : '',
// //             "date given":'',
// //             "dewormimg pills":'', 
// //             "Vitamin A overdose":'',
// //             Iron:'',
// //             "folic acid":'',
// //             "other drugs":'',
// //             "Signature of the officer":''
// //         }))
// //         });

// //         const handleTableChange = (index, field, value) => {
// //             setFormData(prev => ({
// //                 ...prev,
// //                 table: prev.table.map((row, i) =>
// //                     i === index ? { ...row, [field]: value } : row
// //                 )
// //             }));
// //         };
    
// //         const createTableRow = (fieldName) => {
// //             return formData.table.map((row, idx) => (
// //                 <td key={idx}>
// //                     <input
// //                         type="text"
// //                         value={row[fieldName]}
// //                         onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
// //                         className="input-field"
// //                     />
// //                 </td>
// //             ));
// //         };
    
// //         return (
// //             <div>
// //                 <h2 className="title">Student Health Records</h2>
// //                 <table>
// //                     <tbody>
// //                         {Object.keys(formData.table[0]).map((field) => (
// //                             <tr key={field}>
// //                                 <td className="field-label">{field.replace(/([A-Z])/g, " $1").trim()}</td>
// //                                 {createTableRow(field)}
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         );
// //     };
    
// //     export default StudentHealthRecords;
    
//  import { useState } from "react";

// const StudentHealthRecords = () => {
//     const [formData, setFormData] = useState({
//         table: Array(10).fill().map(() => ({
//             Date: '',
//             age: '',
//             height: '',
//             weight: '',
//             "BMI": '',
//             stunting: '',
//             wasting: '',
//             obesity: '',
//             "Vitamin E defiencey": '',
//             "Blood defincenty": '',
//             Strabismus: '',
//             "left eye sight": '',
//             "right eye sight": '',
//             "Left hearing": '',
//             "right hearing": '',
//             speaking: '',
//             "dental trauma": '',
//             "dental issues": '',
//             flurosis: '',
//             goiter: '',
//             "defects in throat,ears or nose": '',
//             "insensitive marks": '',
//             "Oesteoporosis": '',
//             "heart": '',
//             "lungs": '',
//             "Teacher support": '',
//             "attenance below 75%": '',
//             "Academically struggling": '',
//             "other disablilties (teachers consult)": '',
//             "Deworming & micronutrient supplements": '',
//             "date given": '',
//             "dewormimg pills": '',
//             "Vitamin A overdose": '',
//             Iron: '',
//             "folic acid": '',
//             "other drugs": '',
//             "Signature of the officer": ''
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
//             <td key={idx} className="p-2">
//                 <input
//                     type="text"
//                     value={row[fieldName]}
//                     onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
//                     className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
//                 />
//             </td>
//         ));
//     };

//     return (
//         <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
//             <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">Student Health Records</h1>
//             <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//                 <table className="w-full border-collapse">
//                     <tbody>
//                         {Object.keys(formData.table[0]).map((field) => (
//                             <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
//                                 <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
//                                     {field.replace(/([A-Z])/g, " $1").trim()}
//                                 </td>
//                                 {createTableRow(field)}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default StudentHealthRecords;   
import { useState } from "react";

const StudentHealthRecords = () => {
    const [formData, setFormData] = useState({
        table: Array(10).fill().map(() => ({
            Date: '',
            age: '',
            height: '',
            weight: '',
            "BMI": '',
            stunting: '',
            wasting: '',
            obesity: '',
            "Vitamin E defiencey": '',
            "Blood defincenty": '',
            Strabismus: '',
            "left eye sight": '',
            "right eye sight": '',
            "Left hearing": '',
            "right hearing": '',
            speaking: '',
            "dental trauma": '',
            "dental issues": '',
            flurosis: '',
            goiter: '',
            "defects in throat,ears or nose": '',
            "insensitive marks": '',
            "Oesteoporosis": '',
            "heart": '',
            "lungs": '',
            "Teacher support": '',
            "attenance below 75%": '',
            "Academically struggling": '',
            "other disablilties (teachers consult)": '',
            "Deworming & micronutrient supplements": '',
            "date given": '',
            "dewormimg pills": '',
            "Vitamin A overdose": '',
            Iron: '',
            "folic acid": '',
            "other drugs": '',
            "Signature of the officer": ''
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
            <td key={idx} className="p-1">
                <input
                    type={fieldName === 'Date' || fieldName === 'date given' ? 'date' : 'text'}
                    value={row[fieldName]}
                    onChange={(e) => handleTableChange(idx, fieldName, e.target.value)}
                    className="w-full p-1 text-xs border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    style={{ maxWidth: '100px' }} // Smaller width for inputs
                />
            </td>
        ));
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">Student Health Records</h1>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="w-full border-collapse">
                    <tbody>
                        {Object.keys(formData.table[0]).map((field) => (
                            <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                <td className="p-2 text-sm font-medium text-blue-700 whitespace-nowrap">
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

export default StudentHealthRecords;