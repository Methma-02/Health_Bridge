import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./App.css"; // Import the CSS file

const API_URL = "http://localhost:5000"; // Update this if backend URL changes

const SymptomTracker = () => {
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState({});
  const [newSymptom, setNewSymptom] = useState("");
  const [intensity, setIntensity] = useState(3); // Default intensity level

  const today = dayjs().format("YYYY-MM-DD");
  const selectedDate = dayjs(date).format("YYYY-MM-DD");
  const isFutureDate = dayjs(selectedDate).isAfter(today);

  // Fetch symptoms from backend
  const fetchSymptoms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, please log in.");
      return;
    }

    const response = await fetch(`${API_URL}/symptoms`, {
      headers: { Authorization: token },
    });

    const data = await response.json();
    console.log("Decrypted Symptoms:", data);
  };

  // Save symptom to backend
  const handleAddSymptom = async () => {
    if (!newSymptom.trim() || isFutureDate) return;
    const timestamp = dayjs().format("HH:mm:ss");

    const symptomData = {
      date: selectedDate,
      symptom: newSymptom,
      time: timestamp,
      intensity,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve JWT
      if (!token) {
        console.log("No authentication token found");
        return;
      }

      const response = await fetch(`${API_URL}/symptoms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(symptomData),
      });

      if (!response.ok) throw new Error("Failed to save symptom");

      setSymptoms((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), symptomData],
      }));

      setNewSymptom("");
      setIntensity(3);
    } catch (error) {
      console.error("Error saving symptom:", error);
    }
  };

  // Highlight calendar dates with symptoms
  const getTileClassName = ({ date }) => {
    const dateKey = dayjs(date).format("YYYY-MM-DD");
    return symptoms[dateKey] ? "highlighted-date" : "";
  };

  useEffect(() => {
    fetchSymptoms();
  }, []);

  return (
    <div className="symptom-tracker-container">
      <h2 className="header-text">Pregnancy Symptom Tracker</h2>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={getTileClassName}
        />
      </div>

      {/* Symptoms List */}
      <div className="symptoms-list">
        <h3 className="date-title">Symptoms on {dayjs(date).format("MMM D, YYYY")}</h3>
        <ul className="symptom-items">
          {(symptoms[selectedDate] || []).map((entry, index) => (
            <li key={index} className={`symptom-item intensity-${entry.intensity}`}>
              {entry.time} - {entry.symptom} (Intensity: {entry.intensity}/5)
            </li>
          ))}
        </ul>
      </div>

      {/* Add Symptom Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Describe symptom..."
          value={newSymptom}
          onChange={(e) => setNewSymptom(e.target.value)}
          className="input-field"
        />

        {/* Intensity Level Bar */}
        <div className="intensity-container">
          <label className="intensity-label">Intensity: {intensity}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="intensity-slider"
          />
          <div className="intensity-levels">
            <span>😃 1</span>
            <span>🙂 2</span>
            <span>😐 3</span>
            <span>😟 4</span>
            <span>😢 5</span>
          </div>
        </div>

        <button onClick={handleAddSymptom} className="add-button" disabled={isFutureDate}>
          {isFutureDate ? "Can't Add Future Symptoms" : "Add"}
        </button>
      </div>

      {/* All Symptoms List */}
      <div className="all-symptoms-container">
        <h3 className="all-symptoms-title">All Recorded Symptoms</h3>
        <ul className="all-symptoms-list">
          {Object.keys(symptoms).length === 0 ? (
            <p className="no-symptoms-text">No symptoms recorded yet.</p>
          ) : (
            Object.entries(symptoms).map(([dateKey, symptomsArray]) => (
              <li key={dateKey} className="symptoms-group">
                <h4 className="symptoms-group-date">{dayjs(dateKey).format("MMM D, YYYY")}</h4>
                <ul>
                  {symptomsArray.map((entry, index) => (
                    <li key={index} className={`symptom-item intensity-${entry.intensity}`}>
                      {entry.time} - {entry.symptom} (Intensity: {entry.intensity}/5)
                    </li>
                  ))}
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default SymptomTracker;