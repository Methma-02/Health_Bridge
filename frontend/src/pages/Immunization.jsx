import { useState } from 'react';
import FormSubmitHandler from '../components/submit';

const ImmunizationForm = () => {
  const defaultVaccine = { date: '', batchNo: '', bcgScar: '', adverseEffects: false };

  const initialVaccineSchedule = [
    { age: 'At Birth', vaccines: ['B.C.G'], bcgScar: 'absent' },
    { age: '2 Months', vaccines: ['DPT 1', 'OPV 1', 'Hepatitis B1'] },
    { age: '4 Months', vaccines: ['DPT 2', 'OPV 2', 'Hepatitis B2'] },
    { age: '6 Months', vaccines: ['DPT 3', 'OPV 3', 'Hepatitis B3'] },
    { age: '9 Months', vaccines: ['Measles', 'Vitamin A'] },
    { age: '18 Months', vaccines: ['DPT 4', 'OPV 4', 'Vitamin A'] },
    { age: '3 Years', vaccines: ['Measles & Rubella', 'Vitamin A'] },
    { age: '5 Years', vaccines: ['D.T', 'OPV 5'] },
    { age: '10-14 Years', vaccines: ['Rubella', 'atd'] },
    { age: 'Japanese Encephalitis', vaccines: ['JE 1', 'JE 2', 'JE 3', 'JE 4'] },
    { age: '14-17', vaccines: ['Other'] },
  ].map((entry) => ({
    age: entry.age,
    vaccines: entry.vaccines.map((name) => ({ name, ...defaultVaccine }))
  }));

  const [vaccineRecords, setVaccineRecords] = useState(initialVaccineSchedule);

  const handleInputChange = (ageIndex, vaccineIndex, field, value) => {
    const updatedRecords = [...vaccineRecords];
    updatedRecords[ageIndex].vaccines[vaccineIndex][field] = value;
    setVaccineRecords(updatedRecords);
  };

  const prepareFormData = () => {
    return {
      immunizationRecords: {
        vaccineSchedule: vaccineRecords,
      }
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center" >Immunization Record</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Age</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Type of Vaccine</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Date</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Batch No.</th>
              <th className="p-3 text-left text-sm font-semibold text-blue-700">Adverse Effects</th>
              {vaccineRecords.some(group => group.age === 'At Birth') && (
                <th className="p-3 text-left text-sm font-semibold text-blue-700">BCG Scar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {vaccineRecords.map((ageGroup, ageIndex) => (
              ageGroup.vaccines.map((vaccine, vaccineIndex) => (
                <tr key={`${ageIndex}-${vaccineIndex}`} className="border-b border-blue-100 hover:bg-blue-50">
                  {vaccineIndex === 0 && (
                    <td rowSpan={ageGroup.vaccines.length} className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                      {ageGroup.age}
                    </td>
                  )}
                  <td className="p-3 text-sm text-blue-700">{vaccine.name}</td>
                  <td className="p-3">
                    <input
                      type="date"
                      value={vaccine.date}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'date', e.target.value)}
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={vaccine.batchNo}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'batchNo', e.target.value)}
                      className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                    />
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleInputChange(ageIndex, vaccineIndex, 'adverseEffects', !vaccine.adverseEffects)}
                      className={`px-3 py-1 rounded text-white transition ${
                        vaccine.adverseEffects ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                      }`}
                    >
                      {vaccine.adverseEffects ? 'Yes' : 'No'}
                    </button>
                  </td>
                  {ageGroup.age === 'At Birth' && (
                    <td className="p-3">
                      <select
                        value={vaccine.bcgScar}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'bcgScar', e.target.value)}
                        className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      >
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>

      <FormSubmitHandler 
        formData={prepareFormData()} 
      />

    </div>
  );
};

export default ImmunizationForm;