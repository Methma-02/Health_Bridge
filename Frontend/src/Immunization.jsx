import { useState } from 'react';

const ImmunizationForm = () => {
  const defaultVaccine = { date: '', batchNo: '', bcgScar: '', adverseEffects: false };

  const initialVaccineSchedule = [
    { age: 'At Birth', vaccines: ['B.C.G', 'B.C.G 2nd dose (if no scar'] },
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
    <>
      <h1 className="text-xl font-bold">Immunization Record</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left">Age</th>
              <th className="p-2 border text-left">Type of Vaccine</th>
              <th className="p-2 border text-left">Date</th>
              <th className="p-2 border text-left">Batch No.</th>
              <th className="p-2 border text-left">Adverse Effects (Yes/No)</th>
              {vaccineRecords.some(group => group.age === 'At Birth') && (
                <th className="p-2 border text-left">BCG Scar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {vaccineRecords.map((ageGroup, ageIndex) => (
              ageGroup.vaccines.map((vaccine, vaccineIndex) => (
                <tr key={`${ageIndex}-${vaccineIndex}`}>
                  {vaccineIndex === 0 && (
                    <td 
                      className="p-2 border" 
                      rowSpan={ageGroup.vaccines.length}
                    >
                      {ageGroup.age}
                    </td>
                  )}
                  <td className="p-2 border">{vaccine.name}</td>
                  <td className="p-2 border">
                    <input
                      type="date"
                      value={vaccine.date}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'date', e.target.value)}
                      className="w-full border-gray-300 border rounded-md"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      value={vaccine.batchNo}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'batchNo', e.target.value)}
                      className="w-full border-gray-300 border rounded-md"
                    />
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() => handleInputChange(ageIndex, vaccineIndex, 'adverseEffects', !vaccine.adverseEffects)}
                      className="px-2 py-1 border border-gray-300 rounded-md"
                    >
                      {vaccine.adverseEffects ? 'Yes' : 'No'}
                    </button>
                  </td>
                  {ageGroup.age === 'At Birth' && (
                    <td className="p-2 border">
                      <input
                        type="text"
                        value={vaccine.bcgScar}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'bcgScar', e.target.value)}
                        className="w-full border-gray-300 border rounded-md"
                      />
                    </td>
                  )}
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>  
    </>
  );
};

export default ImmunizationForm;
