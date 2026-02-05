import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/images/logo.svg";
import hamburgerIcon from "../../assets/images/hamburger.svg";
import closeIcon from "../../assets/images/close-icon.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
}) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();
  const isProfile = location.pathname.startsWith("/profile");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpened(false);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const firstLetter = (currentUser?.name?.trim()?.[0] || "U").toUpperCase();
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <header className={`header${isProfile ? " header_profile" : ""}`}>
      <div className="header__content">
        <Link
          to="/"
          className="header__logo-link"
          aria-label="Go to home"
          onClick={closeMobileMenu}
        >
          <img className="header__logo" src={logo} alt="WTWR logo" />
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
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
        onClick={toggleMobileMenu}
      >
        <img src={isMobileMenuOpened ? closeIcon : hamburgerIcon} alt="" />
      </button>

      <nav
        className={`header__user-container${
          isMobileMenuOpened ? " header__user-container_mobile-open" : ""
        }`}
      >
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              type="button"
              className="header__clothes-btn"
              onClick={() => {
                handleAddClick();
                closeMobileMenu();
              }}
            >
              + Add Clothes
            </button>

            <Link
              to="/profile"
              className="header__user-content-link"
              onClick={closeMobileMenu}
              aria-label="Go to profile"
            >
              <div className="header__user-content">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>

                {hasAvatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="User avatar"
                    className="header__user-avatar"
                  />
                ) : (
                  <div
                    className="header__avatar-placeholder"
                    aria-hidden="true"
                  >
                    {firstLetter}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__auth">
            <button
              type="button"
              className="header__auth-btn"
              onClick={() => {
                onRegisterClick();
                closeMobileMenu();
              }}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={() => {
                onLoginClick();
                closeMobileMenu();
              }}
            >
              Log In
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
