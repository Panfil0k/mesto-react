import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  function handleEditAvatarClick(e) {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(e) {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(e) {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups(e) {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  function handleCardClick(e) {
    setSelectedCard([e.link, e.name]);
  }

  return (
    <div className='page'>
      <div className="page__container">
        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" btnTitle="Сохранить" name="edit-avatar" children={
        <fieldset className="edit-form__fieldset">
          <label className="edit-form__label">
            <input className="edit-form__item edit-form__item_el_avatar-src" id="avatar-src-input" type="url" name="avatarSrc" placeholder="Ссылка на картинку" />
            <span className="edit-form__input-error avatar-src-input-error"></span>
          </label>
        </fieldset>
      } />
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" btnTitle="Сохранить" name="edit-profile" children={
        <fieldset className="edit-form__fieldset">
          <label className="edit-form__label">
            <input className="edit-form__item edit-form__item_el_name" id="profile-name-input" type="text" name="name" placeholder="Имя" />
            <span className="edit-form__input-error profile-name-input-error"></span>
          </label>
          <label className="edit-form__label">
            <input className="edit-form__item edit-form__item_el_job" id="profile-job-input" type="text" name="job" placeholder="О себе" />
            <span className="edit-form__input-error profile-job-input-error"></span>
          </label>
        </fieldset>
      } />
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" btnTitle="Создать" name="add-card" children={
        <fieldset className="edit-form__fieldset">
          <label className="edit-form__label">
            <input className="edit-form__item edit-form__item_el_card-name" id="card-name-input" type="text" name="cardName" placeholder="Название" />
            <span className="edit-form__input-error card-name-input-error"></span>
          </label>
          <label className="edit-form__label">
            <input className="edit-form__item edit-form__item_el_card-src" id="card-src-input" type="url" name="cardSrc" placeholder="Ссылка на картинку" />
            <span className="edit-form__input-error card-src-input-error"></span>
          </label>
        </fieldset>
      } />
      <PopupWithForm title="Вы уверены?" name="confirm" />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
