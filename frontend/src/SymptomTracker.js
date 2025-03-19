import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./App.css";

const SymptomTracker = () => {
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState({});
  const [newSymptom, setNewSymptom] = useState("");
  const [intensity, setIntensity] = useState(3);
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Get JWT from localStorage

  const today = dayjs().format("YYYY-MM-DD");
  const selectedDate = dayjs(date).format("YYYY-MM-DD");
  const isFutureDate = dayjs(selectedDate).isAfter(today);

  const handleAddSymptom = async () => {
    if (!newSymptom.trim() || isFutureDate) return;

    const timestamp = dayjs().format("HH:mm:ss");

    const newSymptomEntry = {
      symptom: newSymptom,
      time: timestamp,
      intensity,
    };

    const updatedSymptoms = {
      ...symptoms,
      [selectedDate]: [...(symptoms[selectedDate] || []), newSymptomEntry],
    };

    setSymptoms(updatedSymptoms);
    setNewSymptom("");
    setIntensity(3);

    // Send Data to Backend
    try {
      const response = await fetch("http://localhost:5000/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: selectedDate,
          symptoms: updatedSymptoms[selectedDate],
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.msg);
      alert("✅ Symptom added successfully!");
    } catch (error) {
      console.error("Error adding symptom:", error);
      alert("❌ Failed to add symptom.");
    }
  };

  return (
    <div className="symptom-tracker-container">
      <h2 className="header-text">Pregnancy Symptom Tracker</h2>

      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          className="calendar"
          tileClassName={({ date }) =>
            symptoms[dayjs(date).format("YYYY-MM-DD")] ? "highlighted-date" : ""
          }
        />
      </div>

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

      <div className="input-section">
        <input
          type="text"
          placeholder="Describe symptom..."
          value={newSymptom}
          onChange={(e) => setNewSymptom(e.target.value)}
          className="input-field"
        />

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
    </div>
  );
};

export default SymptomTracker;
