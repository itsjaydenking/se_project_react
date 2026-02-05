import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import { API_KEY } from "../../utils/constants.js";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";

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

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    getItems()
      .then((data) => setClothingItems(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Failed to load items:", err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    checkToken(jwt)
      .then((user) => {
        setToken(jwt);
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token check failed:", err);
        localStorage.removeItem("jwt");
        setToken("");
        setIsLoggedIn(false);
        setCurrentUser({ _id: "", name: "", avatar: "" });
      });
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
    setLoginError(false);
  };

  const openLoginModal = () => {
    setLoginError(false);
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setLoginError(false);
    setActiveModal("register");
  };

  const openEditProfileModal = () => {
    if (!isLoggedIn) return openLoginModal();
    setActiveModal("edit-profile");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) return openLoginModal();
    setActiveModal("add-garment");
  };

  const openConfirmationModal = (card) => {
    if (!isLoggedIn) return openLoginModal();
    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleAddGarment = (formValues) => {
    if (!isLoggedIn || !token) return openLoginModal();

    addItem(formValues, token)
      .then((created) => {
        setClothingItems((prev) => [created, ...prev]);
        setActiveModal("");
      })
      .catch((err) => console.error("Add item failed:", err));
  };

  const handleCardDelete = () => {
    if (!isLoggedIn || !token) return openLoginModal();
    if (!cardToDelete) return;

    const id = cardToDelete._id;
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => (i._id ?? i.id) !== id));
        setCardToDelete(null);
        setActiveModal("");
      })
      .catch((err) => console.error("Delete failed:", err));
  };

  const handleLogin = ({ email, password }) => {
    setLoginError(false);

    return signin({ email, password })
      .then((res) => {
        if (!res?.token) return Promise.reject("No token returned");
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);

        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Signin failed:", err);
        setLoginError(true);
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return signup({ name, avatar, email, password })
      .then(() => {
        closeActiveModal();
        return handleLogin({ email, password });
      })
      .catch((err) => console.error("Signup failed:", err));
  };

  const handleUpdateUser = ({ name, avatar }) => {
    if (!token) return;

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => console.error("Update user failed:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser({ _id: "", name: "", avatar: "" });
    setActiveModal("");
  };

  const handleCardLike = (item) => {
    if (!isLoggedIn || !token || !currentUser?._id) return openLoginModal();

    const id = item._id;

    const likes = Array.isArray(item.likes) ? item.likes : [];
    const isLiked = likes.some((likeId) => {
      const normalized = typeof likeId === "object" ? likeId?._id : likeId;
      return normalized === currentUser._id;
    });

    const request = isLiked ? removeCardLike : addCardLike;

    request(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === id ? updatedCard : c)),
        );
      })
      .catch((err) => console.error("Like request failed:", err));
  };

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        getWeather(coords, API_KEY)
          .then((data) => setWeatherData(filterWeatherData(data)))
          .catch(console.error);
      },
      () => {
        const fallbackCoords = {
          latitude: weatherData.coordinates.lat,
          longitude: weatherData.coordinates.lon,
        };
        getWeather(fallbackCoords, API_KEY)
          .then((data) => setWeatherData(filterWeatherData(data)))
          .catch(console.error);
      },
    );
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={openLoginModal}
              onRegisterClick={openRegisterModal}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      onEditProfile={openEditProfileModal}
                      onLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegister}
              onSwitchToLogin={() => setActiveModal("login")}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onSwitchToRegister={() => setActiveModal("register")}
              loginError={loginError}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
