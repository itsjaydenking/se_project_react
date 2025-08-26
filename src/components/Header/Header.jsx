import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import "./Header.css";

function Header({ handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="What to Wear Logo" />
      <p className="header__geo-data">{currentDate} | LOCATION</p>
      <button
        type="button"
        onClick={handleAddClick}
        className="header__clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Username Nameduser</p>
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
      </div>
    </header>
  );
}

export default Header;
