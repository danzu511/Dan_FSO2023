import Country from './Country'
const CountryList = ({ countries, searchInput, handleButtonClick, specificSearch }) => {
    
    if(specificSearch){
      return(<Country country={specificSearch}/>)
    }
  
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    if (filteredCountries.length > 10){
        return(<p>Please be more specific with search!</p>)
    }
    else if (filteredCountries.length === 1){
        return(<Country country={filteredCountries[0]}/>)
    }
    else if (filteredCountries.length === 0) {
        return(<p>No matching search results!</p>)
    }
    return (
  <ul>
    {filteredCountries.map(country => (
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleButtonClick(country)}>Info</button>
      </li>
    ))}
  </ul>
    );
  };
  
  export default CountryList;