class Api {
  constructor(baseUrl, token) {
    this._baseUrl = baseUrl;
    this._token = token
  }

  _returnRes(res) { 
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  getCardsAndUserInfo() {
    return Promise.all([
      this._getUserInfo(),
      this._getCards()
    ])
}

  setUserInfo(dataUser) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.job
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  setUserAvatar(dataUser) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: dataUser.avatarSrc
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  generateCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.cardName,
        link: data.cardSrc
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  setLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(this._returnRes)
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-49', '3723867b-28da-4cb2-8322-b6fad88ad8e4');

export default api;

