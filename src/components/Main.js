import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setUserAvatar(res.avatar);
      setUserName(res.name);
      setUserDescription(res.about);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })

    api.getCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
  }, [])

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Фото пользователя" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
          <p className="profile__job">{userDescription}</p>  
        </div>
        <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places">
        {cards.map((card) => <Card card={card} key={card._id} onCardClick={onCardClick}/>)}
      </section>
    </main>
  )
  
}

export default Main;