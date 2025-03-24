import React, { useState, useEffect } from "react";
import { useFormContext } from '../../contexts/FormContext';
import Header from "../../HeaderFooter/Header";
import Footer from "../../HeaderFooter/Footer";

const Refferal = () => {
  const { formData, setFormData } = useFormContext();

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
      const response = await fetch('http://localhost:3000/api/pregnancy-form1', {
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
    <>
    <Header/>
      <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">
          Referral Information
        </h1>

        {/* Add Referral Button */}
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
          onClick={() => setIsAdding(true)}
        >
          <span className="text-xl">+</span>
          <span>Add New Referral</span>
        </button>

        {/* Add Referral Form */}
        {isAdding && (
          <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mt-4 shadow">
            <textarea
              className="w-full p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
              placeholder="Write your referral details here..."
              value={newReferral}
              onChange={(e) => setNewReferral(e.target.value)}
            />
            <div className="flex space-x-4 mt-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleAddReferral}
              >
                Save Referral
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Referrals */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mt-6 shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Upcoming Referrals</h2>
          <div className="space-y-2">
            {upcomingReferrals.length > 0 ? (
              upcomingReferrals.map((ref, index) => (
                <div
                  key={index}
                  className="border p-2 rounded bg-green-50"
                >
                  <p className="text-sm text-blue-700">{ref.text}</p>
                  <small className="text-xs text-gray-500">Date: {ref.date}</small>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No upcoming referrals.</p>
            )}
          </div>
        </div>

        {/* Past Referrals */}
        <div className="bg-white border-l-4 border-blue-500 p-4 rounded-lg mt-6 shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Past Referrals</h2>
          <div className="space-y-2">
            {pastReferrals.length > 0 ? (
              pastReferrals.map((ref, index) => (
                <div
                  key={index}
                  className="border p-2 rounded bg-gray-100"
                >
                  <p className="text-sm text-blue-700">{ref.text}</p>
                  <small className="text-xs text-gray-500">Date: {ref.date}</small>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No past referrals.</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Refferal;