import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main() {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is ## &deg; F / You may want to wear:
        </p>
      </section>
      <ItemCard />
    </main>
  );
}

export default Main;
