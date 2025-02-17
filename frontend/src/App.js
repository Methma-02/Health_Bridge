import React from "react";
import SymptomTracker from "./SymptomTracker";
import "./App.css"; // Optional styling

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center mt-6">
        Pregnancy Symptom Tracker
      </h1>
      <SymptomTracker />
    </div>
  );
}

export default App;
