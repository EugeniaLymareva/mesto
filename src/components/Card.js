export default class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick
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

    this._setEventListeners();

    return this._element
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('element__group_active')
  }

  _handleCardDelete() {
    this._element.remove()
    this._element = null
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike()
    })

    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete()
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


