import "./Sidebar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const firstLetter = (currentUser?.name?.trim()?.[0] || "U").toUpperCase();
  const hasAvatar = Boolean(currentUser?.avatar);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {hasAvatar ? (
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder" aria-hidden="true">
            {firstLetter}
          </div>
        )}

        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>

      <div className="sidebar__actions">
        <button type="button" className="sidebar__btn" onClick={onEditProfile}>
          Change Profile Data
        </button>

        <button
          type="button"
          className="sidebar__btn sidebar__btn_logout"
          onClick={onLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
