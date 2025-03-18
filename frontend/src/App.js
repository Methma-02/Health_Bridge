import React, { useState, useEffect } from "react";
import "./PopupSearch.css"; // Import CSS for styling

const PopupSearch = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Show pop-up after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      // Simulate search results (Replace this with actual search logic)
      const results = [
        `Result 1 for "${searchQuery}"`,
        `Result 2 for "${searchQuery}"`,
        `Result 3 for "${searchQuery}"`,
      ];
      setSearchResults(results);
    }
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn" onClick={handleSearch}>
              🔍
            </button>
          </div>
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div key={index} className="search-item">
                  {result}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default PopupSearch;
