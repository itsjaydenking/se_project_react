import { useContext, useMemo } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems = [],
  handleCardClick,
  handleAddClick,
  onCardLike,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const myItems = useMemo(() => {
    if (!currentUser?._id) return [];
    return clothingItems.filter((item) => {
      const ownerId =
        typeof item.owner === "object" ? item.owner._id : item.owner;
      return ownerId === currentUser._id;
    });
  }, [clothingItems, currentUser]);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items ({myItems.length})</p>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={handleAddClick}
        >
          + Add Item
        </button>
      </div>

      <ul className="clothes-section__list">
        {myItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
