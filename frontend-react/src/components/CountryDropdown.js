import React, { useState } from 'react';

const CountryDropdown = ({ selectedCountry, setSelectedCountry }) => {
  const countries = [
    'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada',
    'Chile', 'China', 'Colombia', 'Czech Republic', 'Denmark', 'Egypt',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'India',
    'Indonesia', 'Iran', 'Ireland', 'Israel', 'Italy', 'Japan',
    'Malaysia', 'Mexico', 'Netherlands', 'Nigeria', 'Norway', 'Pakistan',
    'Peru', 'Poland', 'Portugal', 'Romania', 'Russia', 'Saudi Arabia',
    'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden',
    'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'Ukraine',
    'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam'
  ];

  return (
    <div className="dropdown-container">
      <label htmlFor="country" className="dropdown-label">Selecione um país:</label>
      <select
        id="country"
        name="country"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="dropdown-select"
      >
        <option value="">--Selecione um país--</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
