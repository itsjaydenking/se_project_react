import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { API_KEY } from "../../utils/constants.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";
import { getItems, addItem, deleteItem } from "../../utils/api";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    getItems()
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setClothingItems(
          [...items].sort((a, b) => (a.name || "").localeCompare(b.name || ""))
        );
      })
      .catch((err) => {
        console.error("Failed to load items:", err);
      });
  }, []);

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

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleCardDelete = () => {
    if (!cardToDelete) return;
    const id = cardToDelete._id;
    deleteItem(id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => (item._id ?? item.id) !== id)
        );
        setCardToDelete(null);
        setActiveModal("");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
  };

  const handleAddGarment = (evt, formValues) => {
    evt.preventDefault();
    addItem(formValues)
      .then((created) =>
        setClothingItems((prev) =>
          [...prev, created].sort((a, b) =>
            (a.name || "").localeCompare(b.name || "")
          )
        )
      )
      .catch(console.error);
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
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
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
            onOpenDelete={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            card={cardToDelete}
            onCancel={closeActiveModal}
            onConfirm={handleCardDelete}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
