import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const SymptomTracker = () => {
  const [newSymptom, setNewSymptom] = useState("");
  const [intensity, setIntensity] = useState(3);
  const [symptoms, setSymptoms] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleAddSymptom = async () => {
    if (!newSymptom.trim()) return;

    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const timestamp = dayjs().format("HH:mm:ss");

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

  return (
    <div>
      <h2>Symptom Tracker</h2>

      {/* Calendar for Date Selection */}
      <Calendar onChange={setSelectedDate} value={selectedDate} />

      <input
        type="text"
        value={newSymptom}
        onChange={(e) => setNewSymptom(e.target.value)}
        placeholder="Enter symptom"
      />
      <input
        type="number"
        value={intensity}
        min="1"
        max="10"
        onChange={(e) => setIntensity(parseInt(e.target.value))}
      />
      <button onClick={handleAddSymptom}>Add Symptom</button>
    </div>
  );
};

export default SymptomTracker;
