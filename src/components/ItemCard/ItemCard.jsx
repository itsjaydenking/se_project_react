import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import likedIcon from "../../assets/images/liked.svg";
import unlikedIcon from "../../assets/images/unliked.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => onCardClick(item);

  const likes = Array.isArray(item.likes) ? item.likes : [];
  const isLiked = Boolean(
    currentUser?._id &&
    likes.some((likeId) => {
      const normalized = typeof likeId === "object" ? likeId?._id : likeId;
      return normalized === currentUser._id;
    }),
  );

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike(item);
  };

  const likeButtonClassName = `card__like-button ${
    isLoggedIn ? "" : "card__like-button_hidden"
  }`;

  return (
    <li className="card" onClick={handleCardClick}>
      <p className="card__name">{item.name}</p>

      <button
        type="button"
        className={likeButtonClassName}
        aria-label={isLiked ? "Unlike" : "Like"}
        onClick={handleLike}
      >
        <img
          className="card__like-icon"
          src={isLiked ? likedIcon : unlikedIcon}
          alt=""
        />
      </button>

      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
