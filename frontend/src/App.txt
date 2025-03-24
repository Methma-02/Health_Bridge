import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./App.css";

const SymptomTracker = () => {
  const [newSymptom, setNewSymptom] = useState("");
  const [intensity, setIntensity] = useState(3);
  const [symptoms, setSymptoms] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddSymptom = async () => {
    const currentDate = dayjs(); // Get the current date and time
    const selectedDateDayjs = dayjs(selectedDate); // Convert selectedDate to dayjs object

    // Check if the selected date is in the future
    if (selectedDateDayjs.isAfter(currentDate, "day")) {
      alert("❌ You cannot add symptoms for future dates.");
      return; // Exit the function if the date is in the future
    }

    if (!newSymptom.trim()) {
      alert("❌ Please enter a symptom.");
      return; // Exit the function if the symptom input is empty
    }

    const formattedDate = selectedDateDayjs.format("YYYY-MM-DD");
    const timestamp = currentDate.format("HH:mm:ss");

    const newSymptomEntry = {
      symptom: newSymptom,
      time: timestamp,
      intensity,
    };

    const updatedSymptoms = {
      ...symptoms,
      [formattedDate]: [...(symptoms[formattedDate] || []), newSymptomEntry],
    };

    setSymptoms(updatedSymptoms);
    setNewSymptom("");
    setIntensity(3);

    try {
      const response = await fetch("http://localhost:5000/symptoms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          symptoms: updatedSymptoms[formattedDate],
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

  // Function to determine the highlight class based on maximum intensity
  const getHighlightClass = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const symptomsForDate = symptoms[formattedDate];

    if (!symptomsForDate) return null;

    // Find the maximum intensity for the date
    const maxIntensity = Math.max(...symptomsForDate.map((s) => s.intensity));

    if (maxIntensity <= 2) return "intensity-1-2"; // Green
    if (maxIntensity === 3) return "intensity-3"; // Yellow
    return "intensity-4-5"; // Red
  };

  // Function to get color based on intensity
  const getIntensityColor = (intensity) => {
    if (intensity <= 2) return "#d4edda"; // Green for low intensity
    if (intensity === 3) return "#fff3cd"; // Yellow for moderate intensity
    return "#f8d7da"; // Red for high intensity
  };

  // Get symptoms for the selected date
  const formattedSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");
  const symptomsForSelectedDate = symptoms[formattedSelectedDate] || [];

  return (
    <div className="symptom-tracker-container">
      <h2 className="symptom-tracker-title">Symptom Tracker</h2>

      {/* Calendar for Date Selection */}
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          maxDate={new Date()} // Disable future dates
          tileClassName={({ date }) => getHighlightClass(date)} // Dynamic highlight class
        />
      </div>

      {/* Input Fields */}
      <div className="input-container">
        <input
          type="text"
          value={newSymptom}
          onChange={(e) => setNewSymptom(e.target.value)}
          placeholder="Enter symptom"
          className="symptom-input"
        />

        {/* Intensity Bar */}
        <div className="intensity-bar">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              className={`intensity-button ${intensity === level ? "active" : ""}`}
              style={{ backgroundColor: getIntensityColor(level) }}
              onClick={() => setIntensity(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <button onClick={handleAddSymptom} className="add-symptom-button">
          Add Symptom
        </button>
      </div>

      {/* List of Symptoms for Selected Date */}
      <div className="symptoms-list">
        <h3>Symptoms for {dayjs(selectedDate).format("MMMM D, YYYY")}</h3>
        {symptomsForSelectedDate.length > 0 ? (
          <ul>
            {symptomsForSelectedDate.map((entry, index) => (
              <li
                key={index}
                style={{ backgroundColor: getIntensityColor(entry.intensity) }}
              >
                <strong>{entry.symptom}</strong> (Intensity: {entry.intensity}) at {entry.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No symptoms recorded for this date.</p>
        )}
      </div>
    </div>
  );
};

export default SymptomTracker;