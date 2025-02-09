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
    <div className="immunization-container">
      <h1 className="immunization-title">Immunization Record</h1>
      <div className="table-container">
        <table className="immunization-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Type of Vaccine</th>
              <th>Date</th>
              <th>Batch No.</th>
              <th>Adverse Effects (Yes/No)</th>
              {vaccineRecords.some(group => group.age === 'At Birth') && (
                <th>BCG Scar</th>
              )}
            </tr>
          </thead>
          <tbody>
            {vaccineRecords.map((ageGroup, ageIndex) => (
              ageGroup.vaccines.map((vaccine, vaccineIndex) => (
                <tr key={`${ageIndex}-${vaccineIndex}`}>
                  {vaccineIndex === 0 && (
                    <td rowSpan={ageGroup.vaccines.length}>
                      {ageGroup.age}
                    </td>
                  )}
                  <td>{vaccine.name}</td>
                  <td>
                    <input
                      type="date"
                      value={vaccine.date}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'date', e.target.value)}
                      className="immunization-input"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={vaccine.batchNo}
                      onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'batchNo', e.target.value)}
                      className="immunization-input"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => handleInputChange(ageIndex, vaccineIndex, 'adverseEffects', !vaccine.adverseEffects)}
                      className={`adverse-effects-btn ${vaccine.adverseEffects ? 'active' : ''}`}
                    >
                      {vaccine.adverseEffects ? 'Yes' : 'No'}
                    </button>
                  </td>
                  {ageGroup.age === 'At Birth' && (
                    <td>
                      <select
                        type="text"
                        value={vaccine.bcgScar}
                        onChange={(e) => handleInputChange(ageIndex, vaccineIndex, 'bcgScar', e.target.value)}
                        className="immunization-input"
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
