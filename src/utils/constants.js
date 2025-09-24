export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL(
      "../assets/images/weatherCards/day/sunny-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL(
      "../assets/images/weatherCards/day/cloudy-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL(
      "../assets/images/weatherCards/day/rainy-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "drizzle",
    url: new URL(
      "../assets/images/weatherCards/day/rainy-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL(
      "../assets/images/weatherCards/day/snowy-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL(
      "../assets/images/weatherCards/day/stormy-day.svg",
      import.meta.url
    ).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL(
      "../assets/images/weatherCards/day/foggy-day.svg",
      import.meta.url
    ).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL(
      "../assets/images/weatherCards/night/sunny-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL(
      "../assets/images/weatherCards/night/cloudy-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "drizzle",
    url: new URL(
      "../assets/images/weatherCards/night/rainy-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL(
      "../assets/images/weatherCards/night/rainy-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL(
      "../assets/images/weatherCards/night/snowy-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL(
      "../assets/images/weatherCards/night/stormy-night.svg",
      import.meta.url
    ).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL(
      "../assets/images/weatherCards/night/foggy-night.svg",
      import.meta.url
    ).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL(
      "../assets/images/weatherCards/day/default-day.svg",
      import.meta.url
    ).href,
  },
  night: {
    url: new URL(
      "../assets/images/weatherCards/night/default-night.svg",
      import.meta.url
    ).href,
  },
};

export const API_KEY = "a6c9182ceeabcdfa977e3f019764051f";
