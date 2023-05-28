export default class Card {
  constructor(options) {
    const { cardData, cardTemplateSelector, handleCardClick, userId, handleCardDelete, handleCardLike } = options
    this._name = cardData.name
    this._link = cardData.link
    this._likes = cardData.likes
    this._ownerId = cardData.owner._id
    this._cardId = cardData._id

    this._userId = userId
    this._cardTemplateSelector = cardTemplateSelector

    this._handleCardClick = handleCardClick
    this._handleCardDelete = handleCardDelete
    this._handleCardLike = handleCardLike
  }

  getCardId() {
    return this._cardId
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.element__mask-group')
    this._cardImage.src = this._link
    this._cardImage.alt = `фото ${this._name}`

    this._element.querySelector('.element__title').textContent = this._name

    this._likeButton = this._element.querySelector('.element__group')
    this._trashButton = this._element.querySelector('.element__trash')

    if(!(this._ownerId === this._userId)) {
      this._trashButton.remove()
    }
    const userLike = this._likes.find((like) => like._id === this._userId)
    if(userLike) {
      this.setCardLike()
    }

    this._likeCounter(this._likes.length)

    this._setEventListeners();

    return this._element
  }

  setCardLike(count) {
    this._likeButton.classList.add('element__group_active')
    this._likeCounter(count)
  }

  setCardDislike(count) {
    this._likeButton.classList.remove('element__group_active')
    this._likeCounter(count)
  }

  isButtonLiked() {
    return this._likeButton.classList.contains('element__group_active')
  }

  _likeCounter(count) {
    this._element.querySelector('.element__like-counter').textContent = count
  }

  removeCard() {
    this._element.remove()
    this._element = null
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._cardId)
    })

    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete(this)
    })

    this._cardImage.addEventListener('click', () => {
      const data = {
        name: this._name,
        link: this._link
      }
      this._handleCardClick(data)
    })

    return this._element
  }
}


