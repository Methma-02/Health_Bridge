import React, { useState, useEffect } from "react";
import "./PopupSearch.css"; // Import CSS for styling
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupSearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show pop-up after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      console.log(`Searching for Registration ID: ${searchQuery}`); // Log the search query
      try {
        const response = await axios.get(
          `http://localhost:5000/search/${searchQuery}`
        );
        setSearchResults(response.data); // Store user object if found
        setErrorMessage(""); // Clear any previous error
      } catch (error) {
        setSearchResults(null); // Clear results if user not found
        setErrorMessage("User not found or an error occurred."); // Set error message
      }
    }
  };
  

  const handleResultClick = () => {
    if (searchResults) {
      navigate(`/user/${searchResults._id}`); // Navigate to user details page
    }
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter Registration Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {searchResults ? (
            <div className="search-results">
              <div className="search-item" onClick={handleResultClick}>
                {searchResults.registrationId} - {searchResults.email}
              </div>
            </div>
          ) : (
            searchQuery && !errorMessage && <p>No results found.</p>
          )}
        </div>
      </div>
    )
  );
};

export default PopupSearch;
