import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

const Referal = () => {
  // Combined state for both hospitalizations and referrals
  const [hospitalizations, setHospitalizations] = useState([
    {
      id: Date.now(),
      date: "",
      reason: "",
      disease: "",
      result: ""
    }
  ]);
  
  const [referrals, setReferrals] = useState([
    {
      id: Date.now(),
      date: "",
      reason: "",
      place: "",
      result: ""
    }
  ]);

  // Hospitalization functions
  const addHospitalization = () => {
    setHospitalizations([
      ...hospitalizations,
      {
        id: Date.now(),
        date: "",
        reason: "",
        disease: "",
        result: ""
      }
    ]);
  };

  const handleHospitalizationChange = (id, field, value) => {
    setHospitalizations(hospitalizations.map(hospitalization => 
      hospitalization.id === id ? { ...hospitalization, [field]: value } : hospitalization
    ));
  };

  const deleteHospitalization = (id) => {
    if (hospitalizations.length > 1) {
      setHospitalizations(hospitalizations.filter(hospitalization => hospitalization.id !== id));
    }
  };

  // Referral functions
  const addReferral = () => {
    setReferrals([
      ...referrals,
      {
        id: Date.now(),
        date: "",
        reason: "",
        place: "",
        result: ""
      }
    ]);
  };

  const handleReferralChange = (id, field, value) => {
    setReferrals(referrals.map(referral => 
      referral.id === id ? { ...referral, [field]: value } : referral
    ));
  };

  const deleteReferral = (id) => {
    if (referrals.length > 1) {
      setReferrals(referrals.filter(referral => referral.id !== id));
    }
  };

  // Generic tracker table component to avoid duplication
  const TrackerTable = ({ 
    items, 
    onChangeHandler, 
    onDeleteHandler, 
    columns, 
    placeholders 
  }) => (
    <div className="overflow-hidden rounded-lg border border-blue-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-50">
              {columns.map((column, index) => (
                <th key={index} className="px-3 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-blue-100">
                  {column}
                </th>
              ))}
              <th className="px-3 py-2 text-left text-xs font-medium text-blue-700 uppercase tracking-wider border-b border-blue-100 w-16">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-3 py-1.5">
                  <input
                    type="date"
                    value={item.date}
                    onChange={(e) => onChangeHandler(item.id, "date", e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 transition-colors duration-200"
                    style={{ maxWidth: "120px" }} // Smaller width for date inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={item.reason}
                    onChange={(e) => onChangeHandler(item.id, "reason", e.target.value)}
                    placeholder={placeholders[0]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={columns[2] === "Disease" ? item.disease : item.place}
                    onChange={(e) => onChangeHandler(
                      item.id, 
                      columns[2] === "Disease" ? "disease" : "place", 
                      e.target.value
                    )}
                    placeholder={placeholders[1]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="text"
                    value={item.result}
                    onChange={(e) => onChangeHandler(item.id, "result", e.target.value)}
                    placeholder={placeholders[2]}
                    className="w-full px-2 py-1 text-xs border border-blue-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 placeholder-gray-400 transition-colors duration-200"
                    style={{ maxWidth: "150px" }} // Smaller width for text inputs
                  />
                </td>
                <td className="px-3 py-1.5 text-center">
                  <button
                    onClick={() => onDeleteHandler(item.id)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={items.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Hospitalizations Section */}
      <div className="space-y-6 mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-blue-600">Severe Hospitalizations</h3>
          <button
            onClick={addHospitalization}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Add Hospitalization
          </button>
        </div>

        <TrackerTable 
          items={hospitalizations}
          onChangeHandler={handleHospitalizationChange}
          onDeleteHandler={deleteHospitalization}
          columns={["Date", "Reason", "Disease", "Refer Again/Result"]}
          placeholders={["Enter reason", "Enter disease", "Enter result"]}
        />
      </div>

      {/* Referrals Section */}
      <div className="space-y-6 mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-blue-600">Referrals</h3>
          <button
            onClick={addReferral}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Add Referral
          </button>
        </div>

        <TrackerTable 
          items={referrals}
          onChangeHandler={handleReferralChange}
          onDeleteHandler={deleteReferral}
          columns={["Date", "Reason", "Referred Place", "Refer Again/Result"]}
          placeholders={["Enter reason", "Enter place", "Enter result"]}
        />
      </div>
    </div>
  );
};

export default Referal;