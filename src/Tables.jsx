// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './style.css';
import GrowthChart from './BMI';
import FundalHeightChart from './FundalHeightChart';

const Tables = () => {
    const [formData, setFormData] = useState({
        visits: Array(10).fill().map(() => ({
            date: '',
            poa: '',
            urine: '',
            suger: '',
            pallor: '',
            oedema: '',
            bp: '',
            fundalHeight: '',
            foetalLie: '',
            presentation: '',
            engagement: '',
            fm: '',
            Fhs: '',
            Iron: '',
            folate: '',
            calcium: '',
            vitaminC: '',
            supplementation: '',
            signature: '',
            designation: '',
            POA:'',
            weight:'',
            weightGain:'',
        })),
        Auscultation: Array(2).fill().map(() =>({
            auscultation:'',
            mentalHealth:'',
            T1:'',
            T2:'',
            T3:'',
            bloodsugerPoa:'',
            bloodsugerResult:'',
            haemoglobinPoa:'',
            haemoglobinResult:'',
            Hospital:'',
            transport:'',
            cost:'',
            distance:'',
            time:'',

        })),
        

        twoCell: Array(1).fill().map(() =>({
            respiratory:'',
            examination:'',
            suger:'',
            haemoglobin:'',
            other:'',
            drugs:'',
            kick:'',
            poaBlood:'',
            dateBlood:'',
            referall:'',
            hiv:'',
            informedDate:'',
            companion:'',
            postnatal:'',
            milk:'',
            earlyChildhood: '',
            familyPlanning:'',
            counselling:'',
            planningReason:'',
            consentdate:'',

        })),
    });

    const headers = ["Session", "Date", "Husband", "Wife", "Other", "Signature"];
    const rows = ["1st T", "2nd T", "3rd T"];

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
    

    const handleVisitChange = (index, field, value) => {
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
    updatedData[index][field] = value;
    setAttendanceData(updatedData);
  };
      

    const fields = [
        'Date', 'poa', 'urine', 'suger/Albumin', 'pallor', 'oedema - Ankle','odema - Facial'
    ];

    const bpLevels = [
        '160', '150', '140','130','120','110','100','90','80','70','60','50'
    ];

    const fields2 = [
        'fundalHeight', 'foetalLie', 'presentation', 'engagement', 'fm', 'Fhs',
        'Iron', 'folate', 'calcium', 'vitaminC', 'supplementation', 'signature', 'designation'
    ];

    const dateTables =[
        {title: "Family health service officer visitation date" , rows:2, cols:6},
        {title:"clinic examination date", rows:2, cols:6},
    ];



    return (
        <><div>
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
            <td>Breast examination</td> {createTwoCellRow('be')}
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
            <td>Date of issuing <br></br> kick count chart</td> <td><input type='date'></input></td>
        </tr>
    </tbody>
</table>
</div>

<div className='screening'>
    <h2>Syphilis screening</h2>

    <tr>
        <td>POA at blood sampling</td> {createTwoCellRow('be')}
    </tr>
    <tr>
        <td>Date of blood sampling</td> 
        <td><input type='date'></input></td>
    </tr>
    <tr>
        <td>Date of result received</td> 
        <td><input type='date'></input></td>
    </tr>
    <td>Result: &nbsp;
    <label>NR
    <input type='radio' name='result' value="NR" ></input>
    </label>

    <label>&nbsp; R
    <input type='radio' name='result' value="R" ></input>
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
    <td
     key={i} className="border p-2"> <input type="date"/>
 </td> ))}
</tr>
                
    <tr>
    <td>Batch No.</td>
        {Array.from({ length: 6 }, (_, i) => (
        <td key={i}>
         <input type="text"/>
    </td>))}
</tr>
              </tbody>
            </table>

</div>

<div>
    <h2>Weight Gain Chart</h2>
    <tr>
        <td>POA</td> {createTableRow('POA')}
    </tr>

    <tr>
        <td>Weight</td> {createTableRow('weight')}
    </tr>

    <tr>
        <td  className='weightGain'>Weight gain</td> {createTableRow('weightGain')}
    </tr>
 </div>

 <div>
    <GrowthChart/>
 </div>
    <br></br>
<div>
    <FundalHeightChart/>
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
        <td>Intended hospital</td> {createAuscultation('intendedHospital')}
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
{dateTables.map(({ title, rows, cols }, i) => (
      <div key={i}>
        <h4>{title}</h4>
        <table>
          <tbody>
            {[...Array(rows)].map((_, r) => (
            <tr key={r}>
                {[...Array(cols)].map((_, c) => (
            <td key={c}>
                <input type="date" />
            </td>    ))}
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
    <td><input type='date'></input></td>
</tr>

<tr>
<td>Chosen method</td>
<label>T<input type='radio'/></label> 
<label>PL<input type='radio'/></label>
<label>L<input type='radio'/></label>
<label>IP<input type='radio'/></label>
<label>N<input type='radio'/></label>
<label>P<input type='radio'/></label>
<label>C<input type='radio'/></label>
</tr>

<tr>
    <td>Reason for not using a method</td> {createTwoCellRow('planningreason')}
</tr>

<tr>
    <td>Consent form signed date</td> {createTwoCellRow('consentdate')}
</tr>
</div>
     </>
    );

};
export default Tables;
