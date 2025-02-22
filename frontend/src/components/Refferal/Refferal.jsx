import React, { useState, useEffect } from "react";
import { useFormContext } from '../../contexts/FormContext';
import './Refferal.css';

const Refferal = () => {
  const { formData, setFormData } = useFormContext();

  useEffect(() => {
                console.log(formData);
      }, [formData]); 

  const [newReferral, setNewReferral] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddReferral = () => {
    if (newReferral.trim() !== "") {
      const date = prompt("Enter the date for this referral (YYYY-MM-DD):");
      if (date) {
        const today = new Date().toISOString().split("T")[0];
        const type = date >= today ? "upcoming" : "past";
        const updatedReferrals = [...formData.referrals, { text: newReferral, date, type }];
        setFormData((prev) => ({ ...prev, referrals: updatedReferrals }));
        setNewReferral("");
        setIsAdding(false);
      } else {
        alert("Referral date is required.");
      }
    } else {
      alert("Referral text cannot be empty.");
    }
  };

  const upcomingReferrals = formData.referrals.filter((ref) => ref.type === "upcoming");
  const pastReferrals = formData.referrals.filter((ref) => ref.type === "past");

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

      {/* Submit Button */}
      <div className="mt-6">
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      
    </div>
  );
};

export default Refferal;