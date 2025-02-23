// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import GrowthChart from './BMI';
import FundalHeightChart from './FundalHeightChart';
import ClinicCare from './ClinicCare';
import { useFormContext } from '../../contexts/FormContext';

const Tables = () => {
    const {formData, setFormData} = useFormContext();
    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const headers = ["Session", "Date", "Husband", "Wife", "Other", "Signature"];
    const rows = ["1st T", "2nd T", "3rd T"];

    function updateResult(value) {

        setFormData(prev => ({
            ...prev,
            result : value
        }));
        
    }

    function chosenMethod(value) {

        setFormData(prev => ({
            ...prev,
            chosenmethod : value
        }));
        
    }

    const [attendanceData, setAttendanceData] = useState(
        rows.map((session) => ({
          session,
          date: "",
          husband: "",
          wife: "",
          other: "",
          signature: "",
        }))
      );
    
    const [fundalHeightPoints, setFundalHeightPoints] = useState([]);

    const handlePlotPoint = (x, y) => {
        setFundalHeightPoints(prev => [...prev, { x, y }]);
        console.log("Point added:", { x, y });
    };

    const [bmiPoints, setBmiPoints] = useState([]);

    const handleBmiPlotPoint = (x, y) => {
        setBmiPoints(prev => [...prev, { x, y }]);
        console.log("BMI Point added:", { x, y });
};

    
    const handleVisitChange = (index, field, value) => {
        console.log(field);
        console.log(value);
        field = field.toLowerCase();
        console.log(field);
        setFormData(prev => ({
            ...prev,
            visits: prev.visits.map((visit, i) =>
                i === index ? { ...visit, [field]: value } : visit
            )
        }));
    };

    const createTableRow = (fieldName) => {
        return formData.visits.map((visit, idx) => (
            <td key={idx}>
                <input
                    type='text'
                    value={visit[fieldName]}
                    onChange={(e) => handleVisitChange(idx, fieldName, e.target.value)}
                />
            </td>
        ));
    };

    const handleAuscultationChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            Auscultation: prev.Auscultation.map((ausc, i) =>
                i === index ? { ...ausc, [field]: value } : ausc
            )
        }));
    };
    

    const createAuscultation = (fieldName) => {
        return formData.Auscultation.map((ascu, idx) => (
            <td key={idx}>
                <input
                    type='text' value={ascu[fieldName]} onChange={(e) => handleAuscultationChange(idx,fieldName,e.target.value)}/> </td>
        ));
    };

    const createTwoCellRow = (fieldName) =>{
        return formData.twoCell.map((twocells, idx) =>(
            <td key={idx}><input type="text" value={twocells[fieldName]} onChange={(e) => handleTwoCellChange(idx, fieldName,e.target.value)} /></td>
        ))
    }

    const handleTwoCellChange = (index, field, value) => {
        console.log(index, field, value);
        setFormData(prev => ({
          ...prev,
          twoCell: prev.twoCell.map((cell, i) =>
            i === index ? {...cell, [field]: value} :cell
        )
            
        }));
      };

     // Handle input changes and update state
  const handleInputChange = (index, field, value) => {
    const updatedData = [...attendanceData];
    console.log("this is index",index);
    console.log("this is field",field);
    console.log("this is value",value);
    console.log("this is updatedData",updatedData);
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };
      
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:5000/api/pregnancy-form1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
      // Clear the form fields after successful submission
     
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };



    const fields = [
        'date', 'poa', 'urine', 'sugeralbumin', 'pallor', 'oedemaankle','oedemafacial'
    ];

    const bpLevels = [
        '160', '150', '140','130','120','110','100','90','80','70','60','50'
    ];

    const fields2 = [
        'fundalheight', 'foetallie', 'presentation', 'engagement', 'fm', 'fhs',
        'iron', 'folate', 'calcium', 'vitaminc', 'supplementation', 'signature', 'designation'
    ];

    const [dateTablesData, setDateTablesData] = useState(
        formData.dateTablesData || [
          {
            title: "Family health service officer visitation date",
            rows: 2,
            cols: 6,
            data: Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => "")),
          },
          {
            title: "clinic examination date",
            rows: 2,
            cols: 6,
            data: Array.from({ length: 2 }, () => Array.from({ length: 6 }, () => "")),
          },
        ]
      );
    
      const handleDateChange = (tableIndex, rowIndex, colIndex, value) => {
        const updatedTablesData = [...dateTablesData];
        updatedTablesData[tableIndex].data[rowIndex][colIndex] = value;
        setDateTablesData(updatedTablesData);
    
        // Update formData
        setFormData((prev) => ({
          ...prev,
          dateTablesData: updatedTablesData,
        }));
      };

      const handleTetanusDateChange = (index, value) => {
        const updatedDates = [...formData.immunizationData.dates];
        updatedDates[index] = value;
        setFormData((prev) => ({
          ...prev,
          immunizationData: {
            ...prev.immunizationData,
            dates: updatedDates,
          },
        }));
      };
      
      const handleBatchNumberChange = (index, value) => {
        const updatedBatchNumbers = [...formData.immunizationData.batchNumbers];
        updatedBatchNumbers[index] = value;
        setFormData((prev) => ({
          ...prev,
          immunizationData: {
            ...prev.immunizationData,
            batchNumbers: updatedBatchNumbers,
          },
        }));
      };

    return (
        <>
        <form onSubmit={handleSubmit}>
        <div>
            <h2>Clinic care</h2>
            <table className='clinicCare'>
                <tbody className='clinic_Care_table'>
                    {fields.map((field) => (
                        <tr key={field}>
                            <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                            {createTableRow(field)}
                        </tr>
                    ))}
                    <h3>Blood pressure</h3>
                    {bpLevels.map((field) => (
                        <tr key={field}>
                            <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                            {createTableRow(field)}
                        </tr>
                    ))}
                
                    {fields2.map((field) => (
                        <tr key={field}>
                            <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                            {createTableRow(field)}
                        </tr>
                    ))}
                </tbody>
            </table>

            <br></br>
        </div>
        <div>

<table className="table-auscultation">
    <tbody className='asculation'>
        <td></td>
        <td>Auscultation &nbsp;</td>
        <td>&nbsp;Mental Health</td>
        
        <tr>
        <td>T1</td> {createAuscultation('T1')}
        </tr><tr>
        <td>T2</td> {createAuscultation('T2')} </tr>
        <tr>
            <td>T3</td> {createAuscultation('T3')}
        </tr>
    </tbody>
</table>
     </div>

<br></br>
     <div className='respiratory'> 
        <tr>
            <td>Respiratory system</td> {createTwoCellRow('respiratory')}
        </tr>
        
        <tr>
            <td>Breast examination</td> {createTwoCellRow('breast')}
        </tr>
</div>

<div className='dental'>
    <h2>Dental care</h2>
    <tr>Refferred date</tr><td><input type='date'></input></td>
    <tr>Date of examination</tr> <td><input type='date'></input></td>
    <tr>
        Treatment &nbsp;
        <textarea value={formData.twoCell.twocells} onChange={(e) => handleTwoCellChange (e.target.value)}/>
    </tr>
</div>
     
<div>
    <h2>Investigations</h2>

<table>
    <tbody>
        <td></td>
        <td>POA &nbsp;</td>
        <td> Result</td>
        
        <tr>
        <td>Blood Sugar</td> {createAuscultation('bloodsugerPoa')} 
        </tr>
        
        <tr>
            <td></td> {createAuscultation('bloodsugerResult')}
        </tr>
<br></br>
        <tr>
        <td>Heamoglobin</td> {createAuscultation('haemoglobinPoa')} </tr>
        <tr>
            <td></td> {createAuscultation('haemoglobinResult')}
        </tr>

        <tr>
            <td>Other <br></br> Investigations</td> {createTwoCellRow('other')}
        </tr>

        <tr>
            <td>Antihelminthic <br></br>drugs</td> {createTwoCellRow('drugs')}
        </tr>
        <tr>
            <td>Date of issuing <br></br> kick count chart</td>{createTwoCellRow('kick')}
        </tr>
    </tbody>
</table>
</div>

<div className='screening'>
    <h2>Syphilis screening</h2>

    <tr>
        <td>POA at blood sampling</td> {createTwoCellRow('bloodsample')}
    </tr>
    <tr>
        <td>Date of blood sampling</td> 
        {createTwoCellRow('poaBlood')}
    </tr>
    <tr>
        <td>Date of result received</td> 
        {createTwoCellRow('dateBlood')}
    </tr>

    <td>Result: &nbsp;
            <label>
                NR
                <input 
                    type="radio" 
                    name="result" 
                    value="NR"
                    checked={formData.result === "NR"}
                    onChange={(e) => updateResult(e.target.value)} 
                />
            </label>

            <label>
                &nbsp; R
                <input 
                    type="radio" 
                    name="result" 
                    value="R"
                    checked={formData.result === "R"}
                    onChange={(e) => updateResult(e.target.value)} 
                />
            </label>
        </td>

    <tr>
        <td>If (R) date of referral</td> <td><input type='date'></input></td>
    </tr>

    <tr>
        <td>Blood taken date for HIV Screening</td> <td>
            <input type='date'/>
        </td>
    </tr>

    <tr>
        <td>date result informed to mother</td> 
        <td><input type='date'></input></td>
    </tr>
</div>

<div>
    <h2>Tetanus Toxoid Immunization</h2>
    
    <table>
        <thead>
            <tr>
                <th>Dose</th>
                {Array.from({ length: 5 }, (_, i) => (<th key={i + 1}>{i + 1}</th>))}
                <th>NE</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Date</td>
                {Array.from({ length: 6 }, (_, i) => (
                    <td key={i} className="border p-2">
                        <input
                            type="date"
                            value={formData.immunizationData.dates[i] || ''}
                            onChange={(e) => handleTetanusDateChange(i, e.target.value)}
                        />
                    </td>
                ))}
            </tr>
            
            <tr>
                <td>Batch No.</td>
                {Array.from({ length: 6 }, (_, i) => (
                    <td key={i}>
                        <input
                            type="text"
                            value={formData.immunizationData.batchNumbers[i] || ''}
                            onChange={(e) => handleBatchNumberChange(i, e.target.value)}
                        />
                    </td>
                ))}
            </tr>
        </tbody>
    </table>
</div>

<div>
    <h2>Weight Gain Chart</h2>
    <tr>
        <td>POA</td> {createTableRow('poaweight')}
    </tr>

    <tr>
        <td>Weight</td> {createTableRow('weight')}
    </tr>

    <tr>
        <td  className='weightGain'>Weight gain</td> {createTableRow('weightgain')}
    </tr>
 </div>

 <div>
    <GrowthChart/>
 </div>
    <br></br>
<div>
    <FundalHeightChart points = {fundalHeightPoints} onPlotPoints = {handlePlotPoint}/>
    <tr>
        <td>Companion of choice at labour discussed&nbsp;</td> {createTwoCellRow('companion')}
    </tr>
</div>

<div>
    <h2>Birth and emergency prepardness plan</h2>
    <table>
    <tbody>
        <td></td>
        <td>Delivery</td>
        <td>&nbsp;In an emergency</td>
        
        <tr>
        <td>Intended hospital</td> {createAuscultation('intendedhospital')}
        </tr><tr>
        <td>Mode of transport</td> {createAuscultation('transport')} </tr>
        <tr>
            <td>Average cost</td> {createAuscultation('cost')}
        </tr>
        <tr>
            <td>Distance from home</td> {createAuscultation('distance')}
        </tr>
        <tr>
            <td>Time taken to reach &nbsp;</td> {createAuscultation('time')}
        </tr>
    </tbody>
</table>
</div>

<div>
    <h2>Attendance at antenatal classes</h2>
    <table>
        <thead>
            <tr>
                {headers.map((header) => (
                <th key={header}>
                    {header}
                </th>
                    ))}
            </tr>
        </thead>

        <tbody>
            {attendanceData.map((row, index) => (
            <tr key={row.session}>
            {headers.map((header, i) => (
                <td key={i}>
                {i === 0 ? ( row.session) : (
                <input type="text" value={row[header.toLowerCase()]} onChange={(e) => handleInputChange(index, header.toLowerCase(), e.target.value)
                }
            />
                    )}
                    </td>
                ))}
                </tr>
            ))}
        </tbody>
    </table>
</div>

<div>
    <h2>IEC Material</h2>
    <tr>
        <td>Book about post pregnancy</td> {createTwoCellRow('postPregnancy')}
    </tr>

    <tr>
        <td>Book about breast feeding</td> {createTwoCellRow('milkBook')}
    </tr>

    <tr>
        <td>Book about early earlyChildhood development</td> {createTwoCellRow('earlychildhood')}
    </tr>

    <tr>
        <td>Book about family Planning</td> {createTwoCellRow('familyPlanning')}
    </tr>
</div>

<div>
      {dateTablesData.map(({ title, rows, cols, data }, tableIndex) => (
        <div key={tableIndex}>
          <h4>{title}</h4>
          <table>
            <tbody>
              {[...Array(rows)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(cols)].map((_, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="date"
                        value={data[rowIndex][colIndex]}
                        onChange={(e) =>
                          handleDateChange(
                            tableIndex,
                            rowIndex,
                            colIndex,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>

<div>
    <h2>Family Planning</h2>
    <tr>
        <td>Date of counselling</td>
        {createTwoCellRow('counsellingdate')}
    </tr>

    <tr>
        <td>Chosen method</td>
        <label>
                T
                <input
                  type="radio"
                  name="method"
                  value="T"
                  checked={formData.chosenmethod === "T"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                PL
                <input
                  type="radio"
                  name="method"
                  value="PL"
                  checked={formData.chosenmethod === "PL"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                L
                <input
                  type="radio"
                  name="method"
                  value="L"
                  checked={formData.chosenmethod === "L"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                IP
                <input
                  type="radio"
                  name="method"
                  value="IP"
                  checked={formData.chosenmethod === "IP"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                N
                <input
                  type="radio"
                  name="method"
                  value="N"
                  checked={formData.chosenmethod === "N"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                P
                <input
                  type="radio"
                  name="method"
                  value="P"
                  checked={formData.chosenmethod === "P"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
              <label>
                C
                <input
                  type="radio"
                  name="method"
                  value="C"
                  checked={formData.chosenmethod === "C"}
                  onChange={(e) => chosenMethod(e.target.value)}
                />
              </label>
    </tr>

    <tr>
        <td>Reason for not using a method</td> {createTwoCellRow('planningreason')}
    </tr>

    <tr>
        <td>Consent form signed date</td> {createTwoCellRow('consentdate')}
    </tr>
</div>

</form>

<ClinicCare/>
<button type='submit' onClick={handleSubmit}>Submit</button>
<br /> <br />

     </>

    );

};
export default Tables;
