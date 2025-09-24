import { handleResponse } from "./api";

export const getWeather = ({ latitude, longitude }, API_KEY) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`
  ).then(handleResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.coordinates = {
    lat: data.coord.lat,
    lon: data.coord.lon,
  };
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.type = getWeatherType(data.main.temp);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDayTime = isDayTime(data.sys.sunrise, data.sys.sunset);

  return result;
};

const isDayTime = (sunrise, sunset) => {
  const now = new Date();
  const sunriseTime = new Date(sunrise * 1000);
  const sunsetTime = new Date(sunset * 1000);
  return now >= sunriseTime && now < sunsetTime;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
