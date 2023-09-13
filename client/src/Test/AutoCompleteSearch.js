import React, { useState } from 'react';
import './AutoCompleteSearch.css';  // Import the CSS file

const AutoCompleteSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const predefinedOptions = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Filter predefinedOptions based on the input value
    const filteredSuggestions = predefinedOptions.filter(
      option => option.toLowerCase().includes(value.toLowerCase())
    );
    
    setSuggestions(filteredSuggestions);
  };

  const handleSubmit = () => {
    // Handle the form submission here
    console.log(`Submitted value: ${inputValue}`);
    setSuggestions([]);  // Clear the suggestions
  };
  
  return (
    <div>
      <div className="input-container">
        <input 
          type="text" 
          value={inputValue}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => {setInputValue(suggestion); setSuggestions([]);}}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutoCompleteSearch;
