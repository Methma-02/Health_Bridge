import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "./App.css";

const SymptomTracker = () => {
  const [date, setDate] = useState(new Date());
  const [symptoms, setSymptoms] = useState({});
  const [newSymptom, setNewSymptom] = useState("");
  const [intensity, setIntensity] = useState(3); // Default intensity level
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get token from wherever your friend's authentication system stores it
  // This could be localStorage, sessionStorage, a context, etc.
  const getToken = () => localStorage.getItem("token") || "";

  const today = dayjs().format("YYYY-MM-DD");
  const selectedDate = dayjs(date).format("YYYY-MM-DD");
  const isFutureDate = dayjs(selectedDate).isAfter(today);

  // API URL - update this to your backend URL
  const API_URL = "http://localhost:5000";

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        // If there's no token, you might want to handle this differently
        // depending on how your authentication system works
        setError("No authentication token found");
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`${API_URL}/symptoms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch symptoms");
      }
      
      const data = await response.json();
      
      // Convert from API format to component format
      const formattedSymptoms = {};
      data.forEach((item) => {
        formattedSymptoms[item.date] = item.symptoms;
      });
      
      setSymptoms(formattedSymptoms);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSymptom = async () => {
    if (!newSymptom.trim() || isFutureDate) return;
    const timestamp = dayjs().format("HH:mm:ss");
    
    // Create new symptom entry
    const newEntry = { symptom: newSymptom, time: timestamp, intensity };
    
    // Update local state first for immediate feedback
    const updatedSymptoms = {
      ...symptoms,
      [selectedDate]: [
        ...(symptoms[selectedDate] || []),
        newEntry,
      ],
    };
    
    setSymptoms(updatedSymptoms);
    setNewSymptom("");
    setIntensity(3);
    
    // Send to backend
    try {
      const token = getToken();
      if (!token) {
        setError("No authentication token found");
        return;
      }
      
      const response = await fetch(`${API_URL}/symptoms`, {
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
      
      if (!response.ok) {
        throw new Error("Failed to save symptom");
      }
      
      // Refresh symptoms after successfully adding
      fetchSymptoms();
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteSymptom = async (symptomId) => {
    try {
      const token = getToken();
      if (!token) {
        setError("No authentication token found");
        return;
      }
      
      const response = await fetch(`${API_URL}/symptoms/${symptomId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete symptom");
      }
      
      // Refresh symptoms after successfully deleting
      fetchSymptoms();
    } catch (error) {
      setError(error.message);
    }
  };

  const getTileClassName = ({ date, view }) => {
    const dateKey = dayjs(date).format("YYYY-MM-DD");
    return symptoms[dateKey] ? "highlighted-date" : "";
  };

  return (
    <div className="symptom-tracker-container">
      <h2 className="header-text">PREGNANCY SYMPTOM TRACKER</h2>

      {isLoading && <p className="loading-text">Loading symptoms...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          className="calendar"
          tileClassName={getTileClassName}
        />
      </div>

      {/* Symptoms List */}
      <div className="symptoms-list">
        <h3 className="date-title">
          Symptoms on {dayjs(date).format("MMM D, YYYY")}
        </h3>
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

        <button 
          onClick={handleAddSymptom} 
          className="add-button" 
          disabled={isFutureDate || isLoading}
        >
          {isFutureDate ? "Can't Add Future Symptoms" : isLoading ? "Adding..." : "Add"}
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