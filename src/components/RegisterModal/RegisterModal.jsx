import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      closeActiveModal={onClose}
      handleSubmit={handleSubmit}
      footer={
        <div className="modal__alt">
          <span className="modal__alt-text">or</span>
          <button
            type="button"
            className="modal__alt-button"
            onClick={onSwitchToLogin}
          >
            Log In
          </button>
        </div>
      }
    >
      <label className="modal__label" htmlFor="signup-email">
        Email
      </label>
      <input
        className="modal__input"
        id="signup-email"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="signup-password">
        Password
      </label>
      <input
        className="modal__input"
        id="signup-password"
        name="password"
        type="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="signup-name">
        Name
      </label>
      <input
        className="modal__input"
        id="signup-name"
        name="name"
        type="text"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="signup-avatar">
        Avatar URL
      </label>
      <input
        className="modal__input"
        id="signup-avatar"
        name="avatar"
        type="url"
        placeholder="Avatar URL"
        required
        value={values.avatar}
        onChange={handleChange}
      />
    </ModalWithForm>
  );
};

export default RegisterModal;
