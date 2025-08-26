import { useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
// import ItemModal from "../ItemModal/ItemModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");

  const handleAddClick = () => {
    setActiveModal("modal_opened");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} />

        <ModalWithForm
          buttonText="Add Garment"
          title="New Garment"
          activeModal={activeModal}
          handleCloseClick={handleCloseClick}
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
            <legend className="modal__legend">Select the weather type</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                className="modal__radio-input modal__input_type_radio"
              />{" "}
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                className="modal__radio-input modal__input_type_radio"
              />{" "}
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                className="modal__radio-input modal__input_type_radio"
              />{" "}
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        {/* <ItemModal />  */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
