import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { defaultClothingItems, API_KEY } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
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

  // TODO: replace with backend call
  // add _id to new garment
  // sort clothing items alphabetically by name
  const handleAddGarment = (evt, newGarment) => {
    evt.preventDefault();
    //call the fetch function
    //.then()... all the stuff
    //The ID will be included in the response from the backend

    const garmentWithId = {
      ...newGarment,
      _id: Date.now() + Math.random(),
    };
    setClothingItems((prevItems) =>
      [...prevItems, garmentWithId].sort((a, b) => a.name.localeCompare(b.name))
    );
    //.catch()
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
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route path="/profile" element={<p>PROFILE</p>} />
          </Routes>
          <Footer />
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddGarment}
            onCloseModal={closeActiveModal}
            selectedWeather={selectedWeather}
            setSelectedWeather={setSelectedWeather}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
