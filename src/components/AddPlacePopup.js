import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState('');
  const [cardUrl, setCardUrl] = React.useState('');

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardUrl(e) {
    setCardUrl(e.target.value);
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardName,
      link: cardUrl,
    })

    e.target[1].value = '';
    e.target[2].value = '';
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} title="Новое место" btnTitle="Создать" name="add-card" children={
      <fieldset className="edit-form__fieldset">
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_card-name" onChange={handleChangeCardName} id="card-name-input" type="text" name="cardName" placeholder="Название" />
          <span className="edit-form__input-error card-name-input-error"></span>
        </label>
        <label className="edit-form__label">
          <input className="edit-form__item edit-form__item_el_card-src" onChange={handleChangeCardUrl} id="card-src-input" type="url" name="cardSrc" placeholder="Ссылка на картинку" />
          <span className="edit-form__input-error card-src-input-error"></span>
        </label>
      </fieldset>
    } />
  )
}

export default AddPlacePopup;