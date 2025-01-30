import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
'./PostnatalCare.css'; 

const PostnatalCare = () => {
  const [formData, setFormData] = useState({
    hospital: "",
    birthWeight: "",
    poa: "",
    liveBirth: "",
    stillBirth: "",
    abnormalitiesDetected: "",
    dateOfDelivery: "",
    gender: "",
    modeOfDelivery: "",
    bloodPressure: "",
    episitomy: "",
    bodyTempNormal: "",
    vaginalExam: "",
    maternalComplications: "",
    episInfection: "",
    familyPlanning: "",
    postpartumSignals: "",
    breastfeedingEstablished: "",
    vitAMegadose: "",
    rubellaImmunization: "",
    antiD: "",
    diagnosisCard: "",
    chrd: "",
    prescription: "",
    referred: "",
    otherNotes: "",
    dateOfDischarge: "",
    signature: "",
    specialNotes: ""
  });

  const signatureRef = useRef(null);

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
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-2xl font-bold">Delivery & Postnatal Care</h1>

      {/* Hospital Section */}
      <div className="grid grid-cols-2 gap-4 border p-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold">Hospital</h2>
        </div>
        <div>
          <textarea
            className="border p-2 w-full"
            placeholder="Enter hospital details"
            value={formData.hospital}
            onChange={(e) => handleInputChange("hospital", e.target.value)}
          />
        </div>
      </div>

      {/* Nursing Office or Midwife Section */}
      <h2 className="text-lg font-semibold mb-2">
        To be filled by the Nursing Office or Midwife at discharge
      </h2>

      {/* Fields for Baby Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Birth Weight</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter birth weight"
            value={formData.birthWeight}
            onChange={(e) => handleInputChange("birthWeight", e.target.value)}
          />
        </div>
        <div>
          <label>POA</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter POA"
            value={formData.poa}
            onChange={(e) => handleInputChange("poa", e.target.value)}
          />
        </div>
        <div>
          <label>Live Birth</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter live birth details"
            value={formData.liveBirth}
            onChange={(e) => handleInputChange("liveBirth", e.target.value)}
          />
        </div>
        <div>
          <label>Still Birth</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter still birth details"
            value={formData.stillBirth}
            onChange={(e) => handleInputChange("stillBirth", e.target.value)}
          />
        </div>
        <div>
          <label>Abnormalities Detected in Baby</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Enter abnormalities"
            value={formData.abnormalitiesDetected}
            onChange={(e) =>
              handleInputChange("abnormalitiesDetected", e.target.value)
            }
          />
        </div>
      </div>

      {/* Delivery Details */}
      <div className="border p-4 mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Date of Delivery</label>
            <input
              type="date"
              className="border p-2 w-full"
              value={formData.dateOfDelivery}
              onChange={(e) =>
                handleInputChange("dateOfDelivery", e.target.value)
              }
            />
          </div>
          <div>
            <label>Gender</label>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                />
                Male
              </label>
            </div>
          </div>
        </div>

        <div>
          <label>Mode of Delivery</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="modeOfDelivery"
                value="VD"
                onChange={(e) =>
                  handleInputChange("modeOfDelivery", e.target.value)
                }
              />
              VD
            </label>
            <label>
              <input
                type="radio"
                name="modeOfDelivery"
                value="Forceps"
                onChange={(e) =>
                  handleInputChange("modeOfDelivery", e.target.value)
                }
              />
              Forceps
            </label>
            <label>
              <input
                type="radio"
                name="modeOfDelivery"
                value="Vacuum"
                onChange={(e) =>
                  handleInputChange("modeOfDelivery", e.target.value)
                }
              />
              Vacuum
            </label>
            <label>
              <input
                type="radio"
                name="modeOfDelivery"
                value="LSCS"
                onChange={(e) =>
                  handleInputChange("modeOfDelivery", e.target.value)
                }
              />
              LSCS
            </label>
          </div>
        </div>
      </div>

      {/* Signature Section */}
      <div className="border p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Signature</h2>
        <SignatureCanvas
          ref={signatureRef}
          canvasProps={{ width: 500, height: 200, className: "border p-2" }}
        />
        <div className="flex space-x-4 mt-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleClearSignature}
          >
            Clear
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSaveSignature}
          >
            Save Signature
          </button>
        </div>
      
      </div>

      {/* Other Notes */}
      <div className="border p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Any Other</h2>
        <textarea
          className="border p-2 w-full"
          placeholder="Enter other notes"
          value={formData.otherNotes}
          onChange={(e) => handleInputChange("otherNotes", e.target.value)}
        />
      </div>

      {/* Date of Discharge and Special Notes */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Date of Discharge</label>
          <input
            type="date"
            className="border p-2 w-full"
            value={formData.dateOfDischarge}
            onChange={(e) =>
              handleInputChange("dateOfDischarge", e.target.value)
            }
          />
        </div>
        <div className="border p-4">
          <h2 className="text-lg font-semibold">Special Notes</h2>
          <textarea
            className="border p-2 w-full"
            placeholder="Enter special notes"
            value={formData.specialNotes}
            onChange={(e) => handleInputChange("specialNotes", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostnatalCare;
