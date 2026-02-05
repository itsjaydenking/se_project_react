import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onSwitchToRegister,
  loginError,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      closeActiveModal={onClose}
      handleSubmit={handleSubmit}
      footer={
        <div className="modal__alt">
          <span className="modal__alt-text">or</span>
          <button
            type="button"
            className="modal__alt-button"
            onClick={onSwitchToRegister}
          >
            Sign Up
          </button>
        </div>
      }
    >
      <label className="modal__label" htmlFor="signin-email">
        Email
      </label>
      <input
        className="modal__input"
        id="signin-email"
        name="email"
        type="email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="signin-password">
        Password
      </label>
      <input
        className="modal__input"
        id="signin-password"
        name="password"
        type="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
      />

      {loginError ? (
        <p className="modal__error-text">Email or password incorrect</p>
      ) : null}
    </ModalWithForm>
  );
};

export default LoginModal;
