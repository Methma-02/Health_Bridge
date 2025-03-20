import React, { useState, useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import PostnatalPage8 from "./PostnatalPage8"; // Ensure this import is included
import { useFormContext } from '../../contexts/FormContext';

const PostnatalCare = () => {
  const { formData, setFormData } = useFormContext();
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const signatureRef = useRef(null);

  // Load signature when form data changes
  useEffect(() => {
    if (signatureRef.current && formData.signature) {
      // Clear existing signature first
      signatureRef.current.clear();
      
      // Need to wait for the clear operation to complete
      setTimeout(() => {
        // Now load the signature from the dataURL
        signatureRef.current.fromDataURL(formData.signature);
      }, 0);
    }
  }, [formData.signature]);

  const handleClearSignature = () => {
    signatureRef.current.clear();
  };

  const handleSaveSignature = () => {
    const signatureData = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    setFormData((prev) => ({ ...prev, signature: signatureData }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">
        Delivery & Postnatal Care
      </h1>

      {/* Hospital Section */}
      <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Hospital</h2>
        <textarea
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          placeholder="Enter hospital details"
          value={formData.hospital}
          onChange={(e) => handleInputChange("hospital", e.target.value)}
        />
      </div>

      {/* Nursing Office or Midwife Section */}
      <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          To be filled by the Nursing Office or Midwife at discharge
        </h2>

        {/* Fields for Baby Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-blue-700">Birth Weight</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Enter birth weight"
              value={formData.birthWeight}
              onChange={(e) => handleInputChange("birthWeight", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">POA</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Enter POA"
              value={formData.poapostnatal}
              onChange={(e) => handleInputChange("poapostnatal", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">Live Birth</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Enter live birth details"
              value={formData.liveBirth}
              onChange={(e) => handleInputChange("liveBirth", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">Still Birth</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Enter still birth details"
              value={formData.stillBirth}
              onChange={(e) => handleInputChange("stillBirth", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700">Abnormalities Detected in Baby</label>
            <input
              type="text"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Enter abnormalities"
              value={formData.abnormalitiesDetected}
              onChange={(e) =>
                handleInputChange("abnormalitiesDetected", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Delivery Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-blue-700">Date of Delivery</label>
            <input
              type="date"
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              value={formData.dateOfDelivery}
              onChange={(e) =>
                handleInputChange("dateOfDelivery", e.target.value)
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-700">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <span className="ml-2 text-sm text-blue-700">Female</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
                />
                <span className="ml-2 text-sm text-blue-700">Male</span>
              </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-700">Mode of Delivery</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="modeOfDelivery"
              value="VD"
              checked={formData.modeOfDelivery === "VD"}
              onChange={(e) => handleInputChange("modeOfDelivery", e.target.value)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
            />
            <span className="ml-2 text-sm text-blue-700">VD</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="modeOfDelivery"
              value="Forceps"
              checked={formData.modeOfDelivery === "Forceps"}
              onChange={(e) => handleInputChange("modeOfDelivery", e.target.value)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
            />
            <span className="ml-2 text-sm text-blue-700">Forceps</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="modeOfDelivery"
              value="Vacuum"
              checked={formData.modeOfDelivery === "Vacuum"}
              onChange={(e) => handleInputChange("modeOfDelivery", e.target.value)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
            />
            <span className="ml-2 text-sm text-blue-700">Vacuum</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="modeOfDelivery"
              value="LSCS"
              checked={formData.modeOfDelivery === "LSCS"}
              onChange={(e) => handleInputChange("modeOfDelivery", e.target.value)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-blue-300 rounded"
            />
            <span className="ml-2 text-sm text-blue-700">LSCS</span>
          </label>
        </div>
      </div>
    </div>

      {/* Signature Section */}
      <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Signature</h2>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{ width: 500, height: 200, className: "border p-2 bg-blue-50" }}
        />
        <div className="flex space-x-4 mt-2">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClearSignature}
          >
            Clear
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSaveSignature}
          >
            Save Signature
          </button>
        </div>
      </div>

      {/* Other Notes */}
      <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mb-6 shadow">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Any Other</h2>
        <textarea
          className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
          placeholder="Enter other notes"
          value={formData.otherNotes}
          onChange={(e) => handleInputChange("otherNotes", e.target.value)}
        />
      </div>

      {/* Date of Discharge and Special Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <label className="block text-sm font-medium text-blue-700">Date of Discharge</label>
          <input
            type="date"
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            value={formData.dateOfDischarge}
            onChange={(e) =>
              handleInputChange("dateOfDischarge", e.target.value)
            }
          />
        </div>
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Special Notes</h2>
          <textarea
            className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            placeholder="Enter special notes"
            value={formData.specialNotes}
            onChange={(e) => handleInputChange("specialNotes", e.target.value)}
          />
        </div>
      </div>

      {/* PostnatalPage8 Component */}
      <PostnatalPage8 />
    </div>
  );
};

export default PostnatalCare;