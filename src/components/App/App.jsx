import { useState, useEffect } from "react";

import "./App.css";
import { API_KEY } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "City",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedWeather, setSelectedWeather] = useState("");

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
            latitude: 36.169941,
            longitude: -115.139832,
          }; // Las Vegas, NV
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
    <div className="page">
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
        />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />

        <ModalWithForm
          buttonText="Add Garment"
          title="New Garment"
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
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
            <legend className="modal__legend">Select the weather type:</legend>
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
  );
}

export default App;
