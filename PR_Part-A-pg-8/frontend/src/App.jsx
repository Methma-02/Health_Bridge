import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const PregnancyRecordForm = () => {
  // States for every single field in the document
  const [postPartumMorbidities, setPostPartumMorbidities] = useState('');
  const [zScore, setZScore] = useState('');
  const [homeVisitDates, setHomeVisitDates] = useState([]);
  const [micronutrientsIssueDates, setMicronutrientsIssueDates] = useState([]);
  const [postpartumClinicDate, setPostpartumClinicDate] = useState('');
  const [postpartumClinicPlace, setPostpartumClinicPlace] = useState('');

  // Postnatal Clinic Care States
  const [clinicDate, setClinicDate] = useState('');
  const [breastProblems, setBreastProblems] = useState('');
  const [vaginalDischarge, setVaginalDischarge] = useState('');
  const [excessiveVaginalBleeding, setExcessiveVaginalBleeding] = useState('');
  const [pallor, setPallor] = useState('');
  const [icterus, setIcterus] = useState('');
  const [oedema, setOedema] = useState('');
  const [bp, setBP] = useState('');
  const [cardiovascularSystem, setCardiovascularSystem] = useState('');
  const [respiratorySystem, setRespiratorySystem] = useState('');
  const [abdominalExamination, setAbdominalExamination] = useState('');
  const [vaginalExamination, setVaginalExamination] = useState('');
  const [mentalStatusEPDS, setMentalStatusEPDS] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [identifiedProblems, setIdentifiedProblems] = useState('');

  // Family Planning States
  const [familyPlanningMethodInUse, setFamilyPlanningMethodInUse] = useState('');
  const [familyPlanningChosen, setFamilyPlanningChosen] = useState('');
  const [familyPlanningNotUsingReason, setFamilyPlanningNotUsingReason] = useState('');
  const [familyPlanningClinicPlace, setFamilyPlanningClinicPlace] = useState('');
  const [familyPlanningClinicDate, setFamilyPlanningClinicDate] = useState('');
  const [familyPlanningClinicTime, setFamilyPlanningClinicTime] = useState('');
  const [familyPlanningSpecialNotes, setFamilyPlanningSpecialNotes] = useState('');

  // Emergency Contact States
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactTelephone, setEmergencyContactTelephone] = useState('');
  const [phmTelephone, setPHMTelephone] = useState('');
  const [mohOfficeTelephone, setMOHOfficeTelephone] = useState('');

  // Signature States
  const [officerSignature, setOfficerSignature] = useState('');
  const [officerDesignation, setOfficerDesignation] = useState('');

  const signaturePadRef = useRef();

  // Home Visit Dates Functions
  const addHomeVisitDate = () => {
    if (homeVisitDates.length < 8) {
      setHomeVisitDates([...homeVisitDates, '']);
    }
  };

  const removeHomeVisitDate = (index) => {
    const newDates = homeVisitDates.filter((_, i) => i !== index);
    setHomeVisitDates(newDates);
  };

  const updateHomeVisitDate = (index, value) => {
    const newDates = [...homeVisitDates];
    newDates[index] = value;
    setHomeVisitDates(newDates);
  };

  // Micronutrients Issue Dates Functions
  const addMicronutrientsIssueDate = () => {
    if (micronutrientsIssueDates.length < 8) {
      setMicronutrientsIssueDates([...micronutrientsIssueDates, '']);
    }
  };

  const removeMicronutrientsIssueDate = (index) => {
    const newDates = micronutrientsIssueDates.filter((_, i) => i !== index);
    setMicronutrientsIssueDates(newDates);
  };

  const updateMicronutrientsIssueDate = (index, value) => {
    const newDates = [...micronutrientsIssueDates];
    newDates[index] = value;
    setMicronutrientsIssueDates(newDates);
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setOfficerSignature('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signatureDataURL = signaturePadRef.current ? signaturePadRef.current.toDataURL() : '';
    setOfficerSignature(signatureDataURL);

    const formData = {
      postPartumMorbidities,
      zScore,
      homeVisitDates,
      micronutrientsIssueDates,
      postpartumClinicDate,
      postpartumClinicPlace,
      clinicDate,
      breastProblems,
      vaginalDischarge,
      excessiveVaginalBleeding,
      pallor,
      icterus,
      oedema,
      bp,
      cardiovascularSystem,
      respiratorySystem,
      abdominalExamination,
      vaginalExamination,
      mentalStatusEPDS,
      otherNotes,
      identifiedProblems,
      familyPlanningMethodInUse,
      familyPlanningChosen,
      familyPlanningNotUsingReason,
      familyPlanningClinicPlace,
      familyPlanningClinicDate,
      familyPlanningClinicTime,
      familyPlanningSpecialNotes,
      emergencyContactName,
      emergencyContactTelephone,
      phmTelephone,
      mohOfficeTelephone,
      officerSignature: signatureDataURL,
      officerDesignation
    };

    console.log(formData);
    // Add submission logic
  };

  return (
      <form onSubmit={handleSubmit}>
        {/* Post Partum Morbidities Section */}
        <div>
          <h2>Identified Post Partum Morbidities & Actions Taken</h2>
          <textarea 
            value={postPartumMorbidities}
            onChange={(e) => setPostPartumMorbidities(e.target.value)}
            style={{ width: '100%', minHeight: '100px' }}
          />
        </div>

        {/* Z Score Section */}
        <div>
          <h2>Z Score</h2>
          <input 
            type="text"
            value={zScore}
            onChange={(e) => setZScore(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        {/* Home Visit Date */}
        <div>
          <h2>Date of Home Visit by PHM</h2>
          {homeVisitDates.map((date, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input 
                type="date"
                value={date}
                onChange={(e) => updateHomeVisitDate(index, e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <button 
                type="button" 
                onClick={() => removeHomeVisitDate(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {homeVisitDates.length < 8 && (
            <button 
              type="button" 
              onClick={addHomeVisitDate}
            >
              Add Home Visit Date
            </button>
          )}
        </div>

        {/* Micronutrients Issue Date */}
        <div>
          <h2>Date of Issuing Micronutrients</h2>
          {micronutrientsIssueDates.map((date, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input 
                type="date"
                value={date}
                onChange={(e) => updateMicronutrientsIssueDate(index, e.target.value)}
                style={{ marginRight: '10px' }}
              />
              <button 
                type="button" 
                onClick={() => removeMicronutrientsIssueDate(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {micronutrientsIssueDates.length < 8 && (
            <button 
              type="button" 
              onClick={addMicronutrientsIssueDate}
            >
              Add Micronutrients Issue Date
            </button>
          )}
        </div>

        {/* Postpartum Clinic Date and Place */}
        <div>
          <h2>Date for Postpartum Clinic & Place</h2>
          <input 
            type="date"
            value={postpartumClinicDate}
            onChange={(e) => setPostpartumClinicDate(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Place"
            value={postpartumClinicPlace}
            onChange={(e) => setPostpartumClinicPlace(e.target.value)}
          />
        </div>

        {/* Postnatal Clinic Care Section */}
        <div>
          <h2>Postnatal Clinic Care</h2>
          <div>
            <label>Date:</label>
            <input 
              type="date"
              value={clinicDate}
              onChange={(e) => setClinicDate(e.target.value)}
            />
          </div>

          {/* Detailed Postnatal Care Inputs */}
          <div>
            <label>Breast Problems:</label>
            <input 
              type="text"
              value={breastProblems}
              onChange={(e) => setBreastProblems(e.target.value)}
            />
          </div>

          <div>
            <label>Abnormal Vaginal Discharge:</label>
            <input 
              type="text"
              value={vaginalDischarge}
              onChange={(e) => setVaginalDischarge(e.target.value)}
            />
          </div>

          <div>
            <label>Excessive Vaginal Bleeding:</label>
            <input 
              type="text"
              value={excessiveVaginalBleeding}
              onChange={(e) => setExcessiveVaginalBleeding(e.target.value)}
            />
          </div>

          <div>
            <label>Pallor:</label>
            <input 
              type="text"
              value={pallor}
              onChange={(e) => setPallor(e.target.value)}
            />
          </div>

          <div>
            <label>Icterus:</label>
            <input 
              type="text"
              value={icterus}
              onChange={(e) => setIcterus(e.target.value)}
            />
          </div>

          <div>
            <label>Oedema (ankle and/or facial):</label>
            <input 
              type="text"
              value={oedema}
              onChange={(e) => setOedema(e.target.value)}
            />
          </div>

          <div>
            <label>BP:</label>
            <input 
              type="text"
              value={bp}
              onChange={(e) => setBP(e.target.value)}
            />
          </div>

          <div>
            <label>Cardiovascular System:</label>
            <input 
              type="text"
              value={cardiovascularSystem}
              onChange={(e) => setCardiovascularSystem(e.target.value)}
            />
          </div>

          <div>
            <label>Respiratory System:</label>
            <input 
              type="text"
              value={respiratorySystem}
              onChange={(e) => setRespiratorySystem(e.target.value)}
            />
          </div>

          <div>
            <label>Abdominal Examination:</label>
            <input 
              type="text"
              value={abdominalExamination}
              onChange={(e) => setAbdominalExamination(e.target.value)}
            />
          </div>

          <div>
            <label>Vaginal Examination (if needed):</label>
            <input 
              type="text"
              value={vaginalExamination}
              onChange={(e) => setVaginalExamination(e.target.value)}
            />
          </div>

          <div>
            <label>Mental Status (EPDS):</label>
            <input 
              type="text"
              value={mentalStatusEPDS}
              onChange={(e) => setMentalStatusEPDS(e.target.value)}
            />
          </div>

          <div>
            <label>Other:</label>
            <input 
              type="text"
              value={otherNotes}
              onChange={(e) => setOtherNotes(e.target.value)}
            />
          </div>

          <div>
            <label>Identified Problems in Mother and Actions Taken:</label>
            <textarea 
              value={identifiedProblems}
              onChange={(e) => setIdentifiedProblems(e.target.value)}
            />
          </div>
        </div>

        {/* Family Planning Section */}
        <div>
          <h2>Family Planning</h2>
          <div>
            <label>Method in Use:</label>
            <select 
              value={familyPlanningMethodInUse}
              onChange={(e) => setFamilyPlanningMethodInUse(e.target.value)}
            >
              <option value="">Select</option>
              <option value="T">T</option>
              <option value="PL">PL</option>
            </select>
          </div>

          <div>
            <label>Chosen:</label>
            <select 
              value={familyPlanningChosen}
              onChange={(e) => setFamilyPlanningChosen(e.target.value)}
            >
              <option value="">Select</option>
              <option value="T">T</option>
              <option value="L">L</option>
              <option value="IP">IP</option>
              <option value="N">N</option>
              <option value="V">V</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label>If Not Using Reason:</label>
            <input 
              type="text"
              value={familyPlanningNotUsingReason}
              onChange={(e) => setFamilyPlanningNotUsingReason(e.target.value)}
            />
          </div>

          <div>
            <label>Family Planning Clinic Place:</label>
            <input 
              type="text"
              value={familyPlanningClinicPlace}
              onChange={(e) => setFamilyPlanningClinicPlace(e.target.value)}
            />
          </div>

          <div>
            <label>Date:</label>
            <input 
              type="date"
              value={familyPlanningClinicDate}
              onChange={(e) => setFamilyPlanningClinicDate(e.target.value)}
            />
          </div>

          <div>
            <label>Time:</label>
            <input 
              type="time"
              value={familyPlanningClinicTime}
              onChange={(e) => setFamilyPlanningClinicTime(e.target.value)}
            />
          </div>

          <div>
            <label>Special Notes:</label>
            <textarea 
              value={familyPlanningSpecialNotes}
              onChange={(e) => setFamilyPlanningSpecialNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div>
          <h2>Emergency Contact</h2>
          <div>
            <label>Name and Address of Contact Person:</label>
            <input 
              type="text"
              value={emergencyContactName}
              onChange={(e) => setEmergencyContactName(e.target.value)}
            />
          </div>

          <div>
            <label>Telephone No.:</label>
            <input 
              type="tel"
              value={emergencyContactTelephone}
              onChange={(e) => setEmergencyContactTelephone(e.target.value)}
            />
          </div>

          <div>
            <label>Telephone No. of PHM:</label>
            <input 
              type="tel"
              value={phmTelephone}
              onChange={(e) => setPHMTelephone(e.target.value)}
            />
          </div>

          <div>
            <label>Telephone No. of MOH Office:</label>
            <input 
              type="tel"
              value={mohOfficeTelephone}
              onChange={(e) => setMOHOfficeTelephone(e.target.value)}
            />
          </div>
        </div>

        {/* Signature Section */}
        <div>
          <h2>Signature</h2>
          <div>
          <label>Signature of the Officer Examined:</label>
          <div style={{ border: '1px solid #ccc', marginTop: '10px' }}>
            <SignatureCanvas
              ref={signaturePadRef}
              canvasProps={{
                width: 500,
                height: 200,
                className: 'signature-canvas',
                style: { width: '100%', height: '200px' }
              }}
            />
          </div>
          <button 
            type="button" 
            onClick={clearSignature} 
            style={{ marginTop: '10px' }}
          >
            Clear Signature
          </button>
          </div>

          <br></br>

          <div>
            <label>Designation:</label>
            <input 
              type="text"
              value={officerDesignation}
              onChange={(e) => setOfficerDesignation(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" style={{ marginTop: '20px' }}>
          Submit
        </button>
      </form>
  );
};

export default PregnancyRecordForm;