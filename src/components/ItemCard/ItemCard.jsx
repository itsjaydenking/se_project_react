import "./ItemCard.css";
import { defaultClothingItems } from "../../utils/constants.js";

function ItemCard() {
  return (
    <section className="item-cards">
      <p className="item-cards__text">
        Today is 75&deg;F / You may want to wear:
      </p>
      <ul className="item-cards__list">
        {defaultClothingItems.map((item) => (
          <li className="item-cards__item" key={item._id}>
            <p className="item-cards__name">{item.name}</p>
            <img
              className="item-cards__image"
              src={item.link}
              alt={item.name}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ItemCard;
