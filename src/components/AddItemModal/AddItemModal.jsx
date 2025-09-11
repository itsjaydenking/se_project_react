import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  selectedWeather,
  setSelectedWeather,
}) => {
  return (
    <ModalWithForm
      buttonText="Add Garment"
      isOpen={isOpen}
      title="New Garment"
      closeActiveModal={onCloseModal}
      onAddGarment={onAddItem}
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
  );
};

export default AddItemModal;
