import "./ItemModal.css";
import closeButton from "../../assets/images/close-icon.svg";

function ItemModal({ activeModal, card, closeActiveModal, onOpenDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        >
          <img src={closeButton} alt="Close" />
        </button>
        <img
          className="modal__image"
          src={card.link || card.imageUrl || card.image || ""}
          alt={card.name}
        />
        <div className="modal__footer">
          <div className="modal__footer-top">
            <h2 className="modal__caption">{card.name}</h2>
            {onOpenDelete && (
              <button
                type="button"
                className="modal__delete-btn"
                onClick={() => onOpenDelete(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
