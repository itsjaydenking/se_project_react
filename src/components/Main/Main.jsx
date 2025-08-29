import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__title">
          Today is {Math.floor(weatherData.temp.F)}&deg;F / You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
