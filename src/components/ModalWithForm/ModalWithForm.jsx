import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close-icon.svg";

function ModalWithForm({
  title,
  buttonText,
  isOpen,
  closeActiveModal,
  handleSubmit,
  children,
  footer,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <button
          type="button"
          className="modal__close"
          onClick={closeActiveModal}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {footer}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
