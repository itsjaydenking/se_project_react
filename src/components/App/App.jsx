import { useState, useEffect } from "react";

import "./App.css";
import { defaultClothingItems, API_KEY } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "clear",
    isDayTime: true,
    coordinates: { lat: 41.9038, lon: 12.452 },
  });

  console.log(weatherData);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddGarment = (newGarment) => {
    setClothingItems((prevItems) => [...prevItems, newGarment]);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          getWeather(coords, API_KEY)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error);
        },
        () => {
          // fallback: use a default location if user denies or error occurs
          const fallbackCoords = {
            latitude: weatherData.coordinates.lat,
            longitude: weatherData.coordinates.lon,
          };
          getWeather(fallbackCoords, API_KEY)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
            })
            .catch(console.error);
        }
      );
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main
            weatherData={weatherData}
            handleCardClick={handleCardClick}
            defaultClothingItems={clothingItems}
          />

          <ModalWithForm
            buttonText="Add Garment"
            isOpen={activeModal === "add-garment"}
            title="New Garment"
            closeActiveModal={closeActiveModal}
            onAddGarment={handleAddGarment}
          >
            <label className="modal__label" htmlFor="name">
              Name{" "}
            </label>
            <input
              className="modal__input"
              type="text"
              id="name"
              name="name"
              placeholder="Enter garment name"
              required
            />
            <label className="modal__label" htmlFor="imageUrl">
              Image{" "}
            </label>
            <input
              className="modal__input"
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter image URL"
              required
            />
            <fieldset className="modal__radio-buttons">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              {["hot", "warm", "cold"].map((type) => (
                <label
                  key={type}
                  htmlFor={type}
                  className={`modal__label modal__label_type_radio${
                    selectedWeather === type ? " selected" : ""
                  }`}
                >
                  <input
                    id={type}
                    type="radio"
                    className="modal__radio-input modal__input_type_radio"
                    name="weather"
                    value={type}
                    checked={selectedWeather === type}
                    onChange={() =>
                      setSelectedWeather(selectedWeather === type ? "" : type)
                    }
                  />{" "}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </fieldset>
          </ModalWithForm>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
          />
          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
