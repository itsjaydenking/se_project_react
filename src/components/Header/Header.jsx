import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import hamburgerIcon from "../../assets/images/hamburger.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const handleNavigateCloseMenu = (path) => {
    navigate(path);
    setIsMobileMenuOpened(false);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__content">
        <Link
          to="/"
          className="header__logo-link"
          aria-label="Go to home"
          onClick={() => setIsMobileMenuOpened(false)}
        >
          <img className="header__logo" src={logo} alt="What to Wear Logo" />
        </Link>
        <p className="header__geo-data">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <button
        className={`header__menu-btn${
          isMobileMenuOpened ? " header__menu-btn_mobile-open" : ""
        }`}
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
        <ToggleSwitch />
        <button
          type="button"
          onClick={() => {
            handleAddClick();
            setIsMobileMenuOpened(false);
          }}
          className="header__clothes-btn"
        >
          + Add Clothes
        </button>

        <button
          type="button"
          className="header__user-content-btn"
          onClick={() => handleNavigateCloseMenu("/profile")}
          aria-label="Go to profile"
        >
          <div className="header__user-content">
            <p className="header__username">Username Nameduser</p>
            <img
              src={avatar}
              alt="User Avatar"
              className="header__user-avatar"
            />
          </div>
        </button>
      </nav>
    </header>
  );
}

export default Header;
