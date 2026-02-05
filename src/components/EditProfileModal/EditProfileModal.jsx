import { useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, onUpdateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name || "",
        avatar: currentUser?.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      closeActiveModal={onClose}
      handleSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="edit-name">
        Name
      </label>
      <input
        className="modal__input"
        id="edit-name"
        name="name"
        type="text"
        placeholder="Name"
        required
        minLength="2"
        maxLength="30"
        value={values.name}
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="edit-avatar">
        Avatar URL
      </label>
      <input
        className="modal__input"
        id="edit-avatar"
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

export default EditProfileModal;
