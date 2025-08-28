import closeButton from "../../assets/images/close-icon.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  closeActiveModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={closeButton} alt="Close" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button className="modal__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
