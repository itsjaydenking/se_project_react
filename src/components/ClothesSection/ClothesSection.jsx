import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems = [],
  handleCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">
          Your Items ({clothingItems.length})
        </p>
        <button className="clothes-section__add-btn" onClick={handleAddClick}>
          + Add Item
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems
          .slice() // avoid mutating original
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
