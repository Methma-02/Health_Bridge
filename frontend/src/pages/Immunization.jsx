import { useState } from 'react';

const ImmunizationForm = () => {
  const defaultVaccine = { date: '', batchNo: '', bcgScar:'', adverseEffects: false };

  const initialVaccineSchedule = [
    { age: 'At Birth', vaccines: ['B.C.G'], bcgScar:'absent'},
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

  return (
    <div className="max-w-5xl mx-auto p-6 bg-blue shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Immunization Record</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-pink-200 text-gray-700">
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Type of Vaccine</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Batch No.</th>
              <th className="p-2 border">Adverse Effects</th>
              {vaccineRecords.some(group => group.age === 'At Birth') && (
                <th className="p-2 border">BCG Scar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {vaccineRecords.map((ageGroup, ageIndex) => (
              ageGroup.vaccines.map((vaccine, vaccineIndex) => (
                <tr key={`${ageIndex}-${vaccineIndex}`} className="hover:bg-gray-100">
                  {vaccineIndex === 0 && (
                    <td rowSpan={ageGroup.vaccines.length} className="p-2 border font-semibold">
                      {ageGroup.age}
                    </td>
                  )}
                  <td className="p-2 border">{vaccine.name}</td>
                  <td className="p-2 border">
                    <input
                      type="date"
                      value={vaccine.date}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'date', e.target.value)}
                      className="p-1 border rounded w-full focus:ring focus:ring-blue-200"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={vaccine.batchNo}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'batchNo', e.target.value)}
                      className="p-1 border rounded w-full focus:ring focus:ring-blue-200"
                    />
                  </td>
                  <td className="p-2 border text-center">
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
                    <td className="p-2 border">
                      <select
                        value={vaccine.bcgScar}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'bcgScar', e.target.value)}
                        className="p-1 border rounded w-full focus:ring focus:ring-blue-200"
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
    </div>
  );
};

export default ImmunizationForm;