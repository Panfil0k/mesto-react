import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
    
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Редактировать профиль" btnTitle={isLoading? 'Сохранение...' : 'Сохранить'} name="edit-profile">
      <fieldset className="edit-form__fieldset">
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_name" id="profile-name-input" type="text" name="name" placeholder="Имя" value={name || ''} onChange={handleChangeName}/>
          <span className="edit-form__input-error profile-name-input-error"></span>
        </label>
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_job" id="profile-job-input" type="text" name="job" placeholder="О себе" value={description || ''} onChange={handleChangeDescription}/>
          <span className="edit-form__input-error profile-job-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;