import React, { useState } from "react";
import './Refferal.css'; 
const Refferal = () => {
  const [newReferral, setNewReferral] = useState("");
  const [referrals, setReferrals] = useState([
    { text: "Referral to cardiologist on 2025-01-30", date: "2025-01-30", type: "upcoming" },
    { text: "Referral to endocrinologist on 2024-12-15", date: "2024-12-15", type: "past" }
  ]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddReferral = () => {
    if (newReferral.trim() !== "") {
      const date = prompt("Enter the date for this referral (YYYY-MM-DD):");
      if (date) {
        const today = new Date().toISOString().split("T")[0];
        const type = date >= today ? "upcoming" : "past";
        setReferrals((prev) => [...prev, { text: newReferral, date, type }]);
        setNewReferral("");
        setIsAdding(false);
      } else {
        alert("Referral date is required.");
      }
    } else {
      alert("Referral text cannot be empty.");
    }
  };

  const upcomingReferrals = referrals.filter((ref) => ref.type === "upcoming");
  const pastReferrals = referrals.filter((ref) => ref.type === "past");

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Referral Information</h1>
      

      {/* Add Referral Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
        onClick={() => setIsAdding(true)}
      >
        <span className="text-xl">+</span>
        <span>Add New Referral</span>
      </button>

      {/* Add Referral Form */}
      {isAdding && (
        <div className="border p-4 rounded mt-4">
          <textarea
            className="border p-2 w-full"
            placeholder="Write your referral details here..."
            value={newReferral}
            onChange={(e) => setNewReferral(e.target.value)}
          />
          <div className="flex space-x-4 mt-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleAddReferral}
            >
              Save Referral
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upcoming Referrals */}
      <div>
        <h2 className="text-lg font-semibold mt-4">Upcoming Referrals</h2>
        <div className="space-y-2">
          {upcomingReferrals.length > 0 ? (
            upcomingReferrals.map((ref, index) => (
              <div
                key={index}
                className="border p-2 rounded bg-green-50"
              >
                <p>{ref.text}</p>
                <small className="text-gray-500">Date: {ref.date}</small>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming referrals.</p>
          )}
        </div>
      </div>

      {/* Past Referrals */}
      <div>
        <h2 className="text-lg font-semibold mt-4">Past Referrals</h2>
        <div className="space-y-2">
          {pastReferrals.length > 0 ? (
            pastReferrals.map((ref, index) => (
              <div
                key={index}
                className="border p-2 rounded bg-gray-100"
              >
                <p>{ref.text}</p>
                <small className="text-gray-500">Date: {ref.date}</small>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No past referrals.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Refferal;
