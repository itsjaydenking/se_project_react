import "./ItemCard.css";

function ItemCard({ item }) {
  return (
    <div>
      <li className="card" key={item._id}>
        <p className="card__name">{item.name}</p>
        <img className="card__image" src={item.link} alt={item.name} />
      </li>
    </div>
  );
}

export default ItemCard;
