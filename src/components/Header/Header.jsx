import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import hamburgerIcon from "../../assets/images/hamburger.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import "./Header.css";

/* TODO: Responsive Header */
function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="What to Wear Logo" />
      <p className="header__geo-data">
        {currentDate}, {weatherData.city}
      </p>

      <button
        className="header__menu-btn"
        type="button"
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        <img
          src={isMobileMenuOpened ? closeIcon : hamburgerIcon}
          alt={isMobileMenuOpened ? "Close menu" : "Open menu"}
        />
      </button>

      <nav
        className={`header__user-container${
          isMobileMenuOpened ? " header__user-container_mobile-open" : ""
        }`}
      >
        <button
          type="button"
          onClick={handleAddClick}
          className="header__clothes-btn"
        >
          + Add Clothes
        </button>
        <p className="header__username">Username Nameduser</p>
        <img src={avatar} alt="User Avatar" className="header__user-avatar" />
      </nav>
    </header>
  );
}

export default Header;
