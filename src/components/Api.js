export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    if(!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`)
    }
    return response.json()
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async updateUserInfo(userData) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async addNewCard(cardData) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(cardData)
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async likeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async dislikeCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }

  async updateAvatar(userData) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify(userData)
    })
    if(!response.ok) {
      return Promise.reject((`Ошибка: ${res.status}`))
    }
    return response.json()
  }
}
