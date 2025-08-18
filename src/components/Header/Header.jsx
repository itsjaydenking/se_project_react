import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import "./Header.css";

function Header() {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__content header-left">
        <img src={logo} alt="" />
        <p>{currentDate} | City, Country</p>
      </div>
      <div className="header__content header-right">
        <button>+ Add Clothes</button>
        <p>Username Nameduser</p>
      </div>
      <img src={avatar} alt="" style={{ width: 40, height: 40 }} />
    </header>
  );
}

export default Header;
