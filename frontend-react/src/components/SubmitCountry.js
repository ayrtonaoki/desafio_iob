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
        setError('Erro: ' + error.message); // Update state with error message
        setCountryData(null); // Clear country data
      }
    } else {
      alert('Por favor selecione um país.');
    }
  };

  if (!currUser) return null;

  return (
    <div className="container-submit-country">
      <div className="dropdown-container-submit">
        <CountryDropdown
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <button className="submit-button" onClick={handleCountrySubmit}>Buscar</button>
      </div>

      {countryData && (
        <div className="country-details">
          <h3>Informações do País:</h3>
          <p><strong>Nome:</strong> {countryData.name.common}</p>
          <p><strong>Nome Oficial:</strong> {countryData.name.official}</p>
          <p><strong>Capital:</strong> {countryData.capital.join(', ')}</p>
          <p><strong>População:</strong> {countryData.population.toLocaleString()}</p>
          <p><strong>Região:</strong> {countryData.region}</p>
          <p><strong>Continente:</strong> {countryData.subregion}</p>
          <p><strong>Línguas:</strong> {Object.values(countryData.languages).join(', ')}</p>
          <p><strong>Moeda:</strong> {Object.values(countryData.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ')}</p>
          <p><strong>Bandeira:</strong> <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} className="flag" /></p>
          <p><strong>Bandeira de Guerra:</strong> <img src={countryData.coatOfArms.png} alt={`Coat of Arms of ${countryData.name.common}`} className="coat-of-arms" /></p>
          <p><strong>Localização:</strong> <a href={countryData.maps.googleMaps} target="_blank" rel="noopener noreferrer">Veja no Google Maps</a></p>
        </div>
      )}
    </div>
  );
};

export default SubmitCountry;
