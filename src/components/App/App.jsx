import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
// import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
// import ItemModal from "../ItemModal/ItemModal.jsx";

function App() {
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main />
        <Footer />
        {/* <ModalWithForm /> */}
        {/* <ItemModal />  */}
      </div>
    </div>
  );
}

export default App;
