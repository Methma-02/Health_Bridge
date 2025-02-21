import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useFormContext } from '../../contexts/FormContext';

const PregnancyRecodForm = () => {
  const { formData, setFormData } = useFormContext();
  const signaturePadRef = useRef();

  // Home Visit Dates Functions
  const addHomeVisitDate = () => {
    if (formData.homeVisitDates.length < 8) {
      setFormData((prev) => ({
        ...prev,
        homeVisitDates: [...prev.homeVisitDates, ""],
      }));
    }
  };

  const removeHomeVisitDate = (index) => {
    const newDates = formData.homeVisitDates.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, homeVisitDates: newDates }));
  };

  const updateHomeVisitDate = (index, value) => {
    const newDates = [...formData.homeVisitDates];
    newDates[index] = value;
    setFormData((prev) => ({ ...prev, homeVisitDates: newDates }));
  };

  // Micronutrients Issue Dates Functions
  const addMicronutrientsIssueDate = () => {
    if (formData.micronutrientsIssueDates.length < 8) {
      setFormData((prev) => ({
        ...prev,
        micronutrientsIssueDates: [...prev.micronutrientsIssueDates, ""],
      }));
    }
  };

  const removeMicronutrientsIssueDate = (index) => {
    const newDates = formData.micronutrientsIssueDates.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, micronutrientsIssueDates: newDates }));
  };

  const updateMicronutrientsIssueDate = (index, value) => {
    const newDates = [...formData.micronutrientsIssueDates];
    newDates[index] = value;
    setFormData((prev) => ({ ...prev, micronutrientsIssueDates: newDates }));
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setFormData((prev) => ({ ...prev, officerSignature: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const signatureDataURL = signaturePadRef.current ? signaturePadRef.current.toDataURL() : '';
    setFormData((prev) => ({ ...prev, officerSignature: signatureDataURL }));

    console.log(formData);
    // Add submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Post Partum Morbidities Section */}
      <div>
        <h2>Identified Post Partum Morbidities & Actions Taken</h2>
        <textarea 
          value={formData.postPartumMorbidities}
          onChange={(e) => setFormData((prev) => ({ ...prev, postPartumMorbidities: e.target.value }))}
          style={{ width: '100%', minHeight: '100px' }}
        />
      </div>

      {/* Z Score Section */}
      <div>
        <h2>Z Score</h2>
        <input 
          type="text"
          value={formData.zScore}
          onChange={(e) => setFormData((prev) => ({ ...prev, zScore: e.target.value }))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Home Visit Date */}
      <div>
        <h2>Date of Home Visit by PHM</h2>
        {formData.homeVisitDates.map((date, index) => (
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
        {formData.homeVisitDates.length < 8 && (
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
        {formData.micronutrientsIssueDates.map((date, index) => (
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
        {formData.micronutrientsIssueDates.length < 8 && (
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
          value={formData.postpartumClinicDate}
          onChange={(e) => setFormData((prev) => ({ ...prev, postpartumClinicDate: e.target.value }))}
        />
        <input 
          type="text"
          placeholder="Place"
          value={formData.postpartumClinicPlace}
          onChange={(e) => setFormData((prev) => ({ ...prev, postpartumClinicPlace: e.target.value }))}
        />
      </div>

      {/* Postnatal Clinic Care Section */}
      <div>
        <h2>Postnatal Clinic Care</h2>
        <div>
          <label>Date:</label>
          <input 
            type="date"
            value={formData.clinicDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, clinicDate: e.target.value }))}
          />
        </div>

        {/* Detailed Postnatal Care Inputs */}
        <div>
          <label>Breast Problems:</label>
          <input 
            type="text"
            value={formData.breastProblems}
            onChange={(e) => setFormData((prev) => ({ ...prev, breastProblems: e.target.value }))}
          />
        </div>

        <div>
          <label>Abnormal Vaginal Discharge:</label>
          <input 
            type="text"
            value={formData.vaginalDischarge}
            onChange={(e) => setFormData((prev) => ({ ...prev, vaginalDischarge: e.target.value }))}
          />
        </div>

        <div>
          <label>Excessive Vaginal Bleeding:</label>
          <input 
            type="text"
            value={formData.excessiveVaginalBleeding}
            onChange={(e) => setFormData((prev) => ({ ...prev, excessiveVaginalBleeding: e.target.value }))}
          />
        </div>

        <div>
          <label>Pallor:</label>
          <input 
            type="text"
            value={formData.pallor}
            onChange={(e) => setFormData((prev) => ({ ...prev, pallor: e.target.value }))}
          />
        </div>

        <div>
          <label>Icterus:</label>
          <input 
            type="text"
            value={formData.icterus}
            onChange={(e) => setFormData((prev) => ({ ...prev, icterus: e.target.value }))}
          />
        </div>

        <div>
          <label>Oedema (ankle and/or facial):</label>
          <input 
            type="text"
            value={formData.oedema}
            onChange={(e) => setFormData((prev) => ({ ...prev, oedema: e.target.value }))}
          />
        </div>

        <div>
          <label>BP:</label>
          <input 
            type="text"
            value={formData.bp}
            onChange={(e) => setFormData((prev) => ({ ...prev, bp: e.target.value }))}
          />
        </div>

        <div>
          <label>Cardiovascular System:</label>
          <input 
            type="text"
            value={formData.cardiovascularSystem}
            onChange={(e) => setFormData((prev) => ({ ...prev, cardiovascularSystem: e.target.value }))}
          />
        </div>

        <div>
          <label>Respiratory System:</label>
          <input 
            type="text"
            value={formData.respiratorySystem}
            onChange={(e) => setFormData((prev) => ({ ...prev, respiratorySystem: e.target.value }))}
          />
        </div>

        <div>
          <label>Abdominal Examination:</label>
          <input 
            type="text"
            value={formData.abdominalExamination}
            onChange={(e) => setFormData((prev) => ({ ...prev, abdominalExamination: e.target.value }))}
          />
        </div>

        <div>
          <label>Vaginal Examination (if needed):</label>
          <input 
            type="text"
            value={formData.vaginalExamination}
            onChange={(e) => setFormData((prev) => ({ ...prev, vaginalExamination: e.target.value }))}
          />
        </div>

        <div>
          <label>Mental Status (EPDS):</label>
          <input 
            type="text"
            value={formData.mentalStatusEPDS}
            onChange={(e) => setFormData((prev) => ({ ...prev, mentalStatusEPDS: e.target.value }))}
          />
        </div>

        <div>
          <label>Other:</label>
          <input 
            type="text"
            value={formData.otherNotes}
            onChange={(e) => setFormData((prev) => ({ ...prev, otherNotes: e.target.value }))}
          />
        </div>

        <div>
          <label>Identified Problems in Mother and Actions Taken:</label>
          <textarea 
            value={formData.identifiedProblems}
            onChange={(e) => setFormData((prev) => ({ ...prev, identifiedProblems: e.target.value }))}
          />
        </div>
      </div>

      {/* Family Planning Section */}
      <div>
        <h2>Family Planning</h2>
        <div>
          <label>Method in Use:</label>
          <select 
            value={formData.familyPlanningMethodInUse}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningMethodInUse: e.target.value }))}
          >
            <option value="">Select</option>
            <option value="T">T</option>
            <option value="PL">PL</option>
          </select>
        </div>

        <div>
          <label>Chosen:</label>
          <select 
            value={formData.familyPlanningChosen}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningChosen: e.target.value }))}
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
            value={formData.familyPlanningNotUsingReason}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningNotUsingReason: e.target.value }))}
          />
        </div>

        <div>
          <label>Family Planning Clinic Place:</label>
          <input 
            type="text"
            value={formData.familyPlanningClinicPlace}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicPlace: e.target.value }))}
          />
        </div>

        <div>
          <label>Date:</label>
          <input 
            type="date"
            value={formData.familyPlanningClinicDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicDate: e.target.value }))}
          />
        </div>

        <div>
          <label>Time:</label>
          <input 
            type="time"
            value={formData.familyPlanningClinicTime}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicTime: e.target.value }))}
          />
        </div>

        <div>
          <label>Special Notes:</label>
          <textarea 
            value={formData.familyPlanningSpecialNotes}
            onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningSpecialNotes: e.target.value }))}
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
            value={formData.emergencyContactName}
            onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactName: e.target.value }))}
          />
        </div>

        <div>
          <label>Telephone No.:</label>
          <input 
            type="tel"
            value={formData.emergencyContactTelephone}
            onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactTelephone: e.target.value }))}
          />
        </div>

        <div>
          <label>Telephone No. of PHM:</label>
          <input 
            type="tel"
            value={formData.phmTelephone}
            onChange={(e) => setFormData((prev) => ({ ...prev, phmTelephone: e.target.value }))}
          />
        </div>

        <div>
          <label>Telephone No. of MOH Office:</label>
          <input 
            type="tel"
            value={formData.mohOfficeTelephone}
            onChange={(e) => setFormData((prev) => ({ ...prev, mohOfficeTelephone: e.target.value }))}
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
            value={formData.officerDesignation}
            onChange={(e) => setFormData((prev) => ({ ...prev, officerDesignation: e.target.value }))}
          />
        </div>
      </div>

      <button type="submit" style={{ marginTop: '20px' }}>
        Submit
      </button>
    </form>
  );
};

export default PregnancyRecodForm;