import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/images/close-icon.svg";

function DeleteConfirmationModal({ isOpen, card, onCancel, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button className="modal__close" type="button" onClick={onCancel}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="confirm__title">
          Are you sure you want to delete this item? <br /> "{card?.name}"
        </h2>
        <p className="confirm__text">This action is irreversible.</p>
        <div className="confirm__actions">
          <button
            type="button"
            className="confirm__btn confirm__btn_delete"
            onClick={onConfirm}
            disabled={!card}
          >
            Yes, delete
          </button>
          <button
            type="button"
            className="confirm__btn confirm__btn_cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
