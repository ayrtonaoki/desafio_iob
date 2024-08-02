import React, { useState } from 'react';
import axios from 'axios';
import CountryDropdown from './CountryDropdown';

const SubmitCountry = ({ currUser }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null); // New state for country data
  const [error, setError] = useState(null); // New state for error

  const handleCountrySubmit = async () => {
    if (selectedCountry) {
      try {
        const response = await axios.get(
          'http://localhost:3000/countries/name', // Adjust the URL as needed
          {
            params: { country: selectedCountry },
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem("token") // Ensure this is correctly formatted
            }
          }
        );
        setCountryData(response.data[0]); // Update state with the first item in the array
        setError(null); // Clear any previous error
      } catch (error) {
        setError('Error submitting country: ' + error.message); // Update state with error message
        setCountryData(null); // Clear country data
      }
    } else {
      alert('Please select a country.');
    }
  };

  if (!currUser) return null;

  return (
    <div>
      <CountryDropdown
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <button onClick={handleCountrySubmit}>Submit Country</button>

      {countryData && (
        <div>
          <h3>Country Details:</h3>
          <p><strong>Name:</strong> {countryData.name.common}</p>
          <p><strong>Official Name:</strong> {countryData.name.official}</p>
          <p><strong>Capital:</strong> {countryData.capital.join(', ')}</p>
          <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {countryData.region}</p>
          <p><strong>Subregion:</strong> {countryData.subregion}</p>
          <p><strong>Languages:</strong> {Object.values(countryData.languages).join(', ')}</p>
          <p><strong>Currencies:</strong> {Object.values(countryData.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ')}</p>
          <p><strong>Flag:</strong> <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} width="100" /></p>
          <p><strong>Coat of Arms:</strong> <img src={countryData.coatOfArms.png} alt={`Coat of Arms of ${countryData.name.common}`} width="100" /></p>
          <p><strong>Google Maps:</strong> <a href={countryData.maps.googleMaps} target="_blank" rel="noopener noreferrer">View on Google Maps</a></p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <pre>{error}</pre> {/* Display error message */}
        </div>
      )}
    </div>
  );
};

export default SubmitCountry;
