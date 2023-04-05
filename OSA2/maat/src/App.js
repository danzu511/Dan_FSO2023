import { useState, useEffect } from 'react';
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import countries from './services/countries';
import React from 'react';

function App() {
  const [newSearch, setNewSearch] = useState('')
  const [specificSearch, setSpecificSearch] = useState('')
  const [countriesList, setCountriesList] = useState([])

  
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    setSpecificSearch("")
  }
  useEffect(() => {
    countries.getAll().then(data => {
      setCountriesList(data)
    })
  }, [])

  const handleButtonClick = (country) => {
    console.log(country)
    setSpecificSearch(country)
  }

  return (
    <div>
      <h1>Search for a country</h1>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <CountryList searchInput={newSearch}
      countries={countriesList} 
      handleButtonClick={handleButtonClick}
      specificSearch={specificSearch}/>
    </div>
  );
}

export default App;