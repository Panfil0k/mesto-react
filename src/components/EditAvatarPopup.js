import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current,
    });

    avatarRef.current.value = '';
  } 

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Обновить аватар" btnTitle="Сохранить" name="edit-avatar" children={
      <fieldset className="edit-form__fieldset">
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_avatar-src" id="avatar-src-input" type="url" name="avatarSrc" placeholder="Ссылка на картинку" ref={avatarRef}/>
          <span className="edit-form__input-error avatar-src-input-error"></span>
        </label>
      </fieldset>
    } />
  )
}

export default EditAvatarPopup;