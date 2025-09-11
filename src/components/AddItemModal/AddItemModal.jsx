import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  selectedWeather,
  setSelectedWeather,
}) => {
  const defaultValues = {
    name: "",
    link: "",
    weather: selectedWeather || "",
  };

  const { values, handleChange, setValues } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(evt, values);
    setValues(defaultValues);
    onCloseModal();
  }

  const handleRadioChange = (evt) => {
    handleChange(evt);
    setSelectedWeather(evt.target.value);
  };

  return (
    <ModalWithForm
      buttonText="Add Garment"
      isOpen={isOpen}
      title="New Garment"
      closeActiveModal={onCloseModal}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="clothing-name">
        Name{" "}
      </label>
      <input
        className="modal__input modal__input_type_clothing-name"
        type="text"
        id="clothing-name"
        name="name"
        placeholder="Enter garment name"
        required
        minLength="1"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />
      <span className="modal__error" id="clothing-name-error"></span>
      <label className="modal__label" htmlFor="clothing-link">
        Image{" "}
      </label>
      <input
        className="modal__input modal__input_type_clothing-link"
        type="url"
        id="clothing-link"
        name="link"
        placeholder="Enter image URL"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span className="modal__error" id="clothing-link-error"></span>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className={`modal__label modal__label_type_radio${
              values.weather === type ? " selected" : ""
            }`}
          >
            <input
              id={type}
              type="radio"
              className="modal__radio-input modal__input_type_radio"
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleRadioChange}
            />{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
