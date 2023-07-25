import axios from 'axios';
const baseUrl = 'https://api.openweathermap.org/data/2.5/';

const getWeather = (lat, lon, api_key) => {
  const request = axios.get(`${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => response.data)
};

export default { getWeather };