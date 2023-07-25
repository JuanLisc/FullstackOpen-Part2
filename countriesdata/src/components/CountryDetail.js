import { useState, useEffect} from 'react';
import weatherService from '../services/weather';

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState(null);

  const capital = country.capital[0];
  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const lat = country.capitalInfo.latlng[0];
    const lon = country.capitalInfo.latlng[1];

    weatherService
      .getWeather(lat, lon, API_KEY)
      .then(weather => setWeather(weather))
  }, []);

  const flag = country.flags.png;
  const languages = [];
    for (let language in country.languages) {
      languages.push(country.languages[language]);
    }

  if (!weather) return null;
  
  const icon = weather.weather[0].icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map(language => 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img alt='Flag' src={flag} />
      <h4>Weather in {capital}</h4>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={weatherIconUrl} width='80' />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
}

export default CountryDetail;