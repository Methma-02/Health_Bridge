import React, { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useFormContext } from '../../contexts/FormContext';

const PregnancyRecordForm = () => {
  const { formData, setFormData } = useFormContext();
  const signaturePadRef = useRef(null);

  // Load signature when form data changes
  useEffect(() => {
    if (signaturePadRef.current && formData.officerSignature) {
      // Clear existing signature first
      signaturePadRef.current.clear();
      
      // Need to wait for the clear operation to complete
      setTimeout(() => {
        // Now load the signature from the dataURL
        signaturePadRef.current.fromDataURL(formData.officerSignature);
      }, 0);
    }
  }, [formData.officerSignature]);

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
      setFormData((prev) => ({ 
        ...prev, 
        officerSignature: "",
        officerDesignation: "" 
      }));
    }
  };

  const handleSignatureEnd = () => {
    const signature = signaturePadRef.current.toDataURL();
    setFormData((prev) => ({ ...prev, officerSignature: signature }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signatureDataURL = signaturePadRef.current.toDataURL();
      setFormData((prev) => ({ ...prev, officerSignature: signatureDataURL }));
    }

    try {
      const response = await fetch('http://localhost:5000/api/pregnancy-form1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Convert date strings to Date objects if needed
          homeVisitDates: formData.homeVisitDates.map(date => new Date(date)),
          micronutrientsIssueDates: formData.micronutrientsIssueDates.map(date => new Date(date))
        }),
      });

      if (!response.ok) throw new Error('Failed to submit form');
      
      const result = await response.json();
      console.log('Form submitted successfully:', result);
      alert('Form submitted successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
        Pregnancy Record Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Post Partum Morbidities Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Identified Post Partum Morbidities & Actions Taken</h2>
          <textarea
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            value={formData.postPartumMorbidities}
            onChange={(e) => setFormData((prev) => ({ 
              ...prev, 
              postPartumMorbidities: e.target.value 
            }))}
          />
        </div>

        {/* Z Score Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Z Score</h2>
          <input
            type="text"
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            value={formData.zScore}
            onChange={(e) => setFormData((prev) => ({ 
              ...prev, 
              zScore: e.target.value 
            }))}
          />
        </div>

        {/* Home Visit Date Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Date of Home Visit by PHM</h2>
          {formData.homeVisitDates.map((date, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="date"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={date}
                onChange={(e) => updateHomeVisitDate(index, e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => removeHomeVisitDate(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {formData.homeVisitDates.length < 8 && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={addHomeVisitDate}
            >
              Add Home Visit Date
            </button>
          )}
        </div>

        {/* Micronutrients Issue Date Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Date of Issuing Micronutrients</h2>
          {formData.micronutrientsIssueDates.map((date, index) => (
            <div key={index} className="flex items-center space-x-4 mb-2">
              <input
                type="date"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={date}
                onChange={(e) => updateMicronutrientsIssueDate(index, e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => removeMicronutrientsIssueDate(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {formData.micronutrientsIssueDates.length < 8 && (
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={addMicronutrientsIssueDate}
            >
              Add Micronutrients Issue Date
            </button>
          )}
        </div>

        {/* Postpartum Clinic Date and Place Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Date for Postpartum Clinic & Place</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              value={formData.postpartumClinicDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, postpartumClinicDate: e.target.value }))}
            />
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Place"
              value={formData.postpartumClinicPlace}
              onChange={(e) => setFormData((prev) => ({ ...prev, postpartumClinicPlace: e.target.value }))}
            />
          </div>
        </div>

        {/* Postnatal Clinic Care Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Postnatal Clinic Care</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Date:</label>
              <input
                type="date"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.clinicDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, clinicDate: e.target.value }))}
              />
            </div>

            {/* Detailed Postnatal Care Inputs */}
            <div>
              <label className="block text-sm font-medium text-blue-700">Breast Problems:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.breastProblems}
                onChange={(e) => setFormData((prev) => ({ ...prev, breastProblems: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Abnormal Vaginal Discharge:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.vaginalDischarge}
                onChange={(e) => setFormData((prev) => ({ ...prev, vaginalDischarge: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Excessive Vaginal Bleeding:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.excessiveVaginalBleeding}
                onChange={(e) => setFormData((prev) => ({ ...prev, excessiveVaginalBleeding: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Pallor:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.pallor}
                onChange={(e) => setFormData((prev) => ({ ...prev, pallor: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Icterus:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.icterus}
                onChange={(e) => setFormData((prev) => ({ ...prev, icterus: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Oedema (ankle and/or facial):</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.oedema}
                onChange={(e) => setFormData((prev) => ({ ...prev, oedema: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">BP:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.bp}
                onChange={(e) => setFormData((prev) => ({ ...prev, bp: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Cardiovascular System:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.cardiovascularSystem}
                onChange={(e) => setFormData((prev) => ({ ...prev, cardiovascularSystem: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Respiratory System:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.respiratorySystem}
                onChange={(e) => setFormData((prev) => ({ ...prev, respiratorySystem: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Abdominal Examination:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.abdominalExamination}
                onChange={(e) => setFormData((prev) => ({ ...prev, abdominalExamination: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Vaginal Examination (if needed):</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.vaginalExamination}
                onChange={(e) => setFormData((prev) => ({ ...prev, vaginalExamination: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Mental Status (EPDS):</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.mentalStatusEPDS}
                onChange={(e) => setFormData((prev) => ({ ...prev, mentalStatusEPDS: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Other:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.otherNotes}
                onChange={(e) => setFormData((prev) => ({ ...prev, otherNotes: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Identified Problems in Mother and Actions Taken:</label>
              <textarea
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.identifiedProblems}
                onChange={(e) => setFormData((prev) => ({ ...prev, identifiedProblems: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Family Planning Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Family Planning</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Method in Use:</label>
              <select
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningMethodInUse}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningMethodInUse: e.target.value }))}
              >
                <option value="">Select</option>
                <option value="T">T</option>
                <option value="PL">PL</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Chosen:</label>
              <select
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
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
              <label className="block text-sm font-medium text-blue-700">If Not Using Reason:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningNotUsingReason}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningNotUsingReason: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Family Planning Clinic Place:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningClinicPlace}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicPlace: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Date:</label>
              <input
                type="date"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningClinicDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicDate: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Time:</label>
              <input
                type="time"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningClinicTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningClinicTime: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Special Notes:</label>
              <textarea
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.familyPlanningSpecialNotes}
                onChange={(e) => setFormData((prev) => ({ ...prev, familyPlanningSpecialNotes: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Emergency Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-blue-700">Name and Address of Contact Person:</label>
              <input
                type="text"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.emergencyContactName}
                onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactName: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Telephone No.:</label>
              <input
                type="tel"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.emergencyContactTelephone}
                onChange={(e) => setFormData((prev) => ({ ...prev, emergencyContactTelephone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Telephone No. of PHM:</label>
              <input
                type="tel"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.phmTelephone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phmTelephone: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700">Telephone No. of MOH Office:</label>
              <input
                type="tel"
                className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                value={formData.mohOfficeTelephone}
                onChange={(e) => setFormData((prev) => ({ ...prev, mohOfficeTelephone: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Signature</h2>
          <div>
            <label className="block text-sm font-medium text-blue-700">Signature of the Officer Examined:</label>
            <div className="border border-blue-200 p-2 bg-blue-50 rounded">
              <SignatureCanvas
                ref={signaturePadRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: 'w-full h-48',
                }}
              />
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-2"
              onClick={clearSignature}
            >
              Clear Signature
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-blue-700">Designation:</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              value={formData.officerDesignation}
              onChange={(e) => setFormData((prev) => ({ 
                ...prev, 
                officerDesignation: e.target.value 
              }))}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PregnancyRecordForm;