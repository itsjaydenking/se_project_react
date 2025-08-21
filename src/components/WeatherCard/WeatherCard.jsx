import "./WeatherCard.css";
import cloudyDay from "../../assets/images/weatherCards/cloudy-day.svg";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;F</p>
      <img className="weather-card__image" src={cloudyDay} alt="" />
    </section>
  );
}

export default WeatherCard;
