import "./Sidebar.css";
import avatar from "../../assets/images/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={avatar} alt="User Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Username</p>
      </div>
      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__btn"
          onClick={() => console.log("Change Profile Data clicked")}
        >
          Change Profile Data
        </button>
        <button
          type="button"
          className="sidebar__btn sidebar__btn_logout"
          onClick={() => console.log("Log Out clicked")}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
