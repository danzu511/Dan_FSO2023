import weather from "../services/weather";
import { useState, useEffect } from "react";

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY || 'fde9da9d8e3c709b707782f43606808a';
  const [myWeather, setMyWeather] = useState(null);
  const [imageSource, setImageSource] = useState('');
  const [capital, setCapital] = useState('');

  useEffect(() => {
     //check if coordinates for capital exists. United States Minor Outlying Islands caused a crash without this as the JSON didnt have latlng like the others
    if(country.capitalInfo.latlng){
      setCapital(country.capital)
    }
    else{
      setCapital(country.name.common)
    }
      weather.getWeather(api_key, country).then(weatherObject => {
        setMyWeather(weatherObject);
        setImageSource(`https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`)
      })
  }, [api_key, country]);
  const languages = Object.entries(country.languages);


  if (!myWeather) {
    return (
    <div className="country-page">
    <h1>{country.name.common}</h1>
    <p>Capital: {country.capital}</p>
    <p>Area: {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {languages.map(([code, name]) => (
        <li key={code}>
          {name} ({code})
        </li>
      ))}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
    <h2>No weather data</h2>
  </div>
  )
  }
  
  return (
    <div className="country-page">
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(([code, name]) => (
          <li key={code}>
            {name} ({code})
          </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {capital}</h2>
      <p>Temperature: {myWeather.main.temp} degrees Celsius</p>
      <img src={imageSource} alt={myWeather.weather[0].description}/>
      <p>Wind: {myWeather.wind.speed} m/s</p>
    </div>
  );
};

export default Country;
