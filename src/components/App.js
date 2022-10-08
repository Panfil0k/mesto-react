import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

  useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(res);
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
    setSelectedCard(null);
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardClick(e) {
    setSelectedCard(e);
  }

  function handleUpdateUser(e) {
    setIsLoading(true);
    api.setUserInfo(e)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(e) {
    setIsLoading(true);
    api.setUserAvatar(e.avatar.value)
    .then((res) => { 
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(!isLiked) {
      api.setLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    } else {
      api.deleteLikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter(item => item._id != card._id))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  function handleAddPlaceSubmit(e) {
    setIsLoading(true);
    api.generateCard(e)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header />
          <Main 
            cards={cards} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike} 
            onCardDelete={handleCardDelete}
          />
          <Footer />
        </div>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} /> 
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />
        <PopupWithForm title="Вы уверены?" name="confirm" />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
