import Popup from './Popup.js'

export default class PopupWithButton extends Popup {
  constructor({ popupSelector, handleButtonClick}) {
    super(popupSelector)
    this._handleButtonClick = handleButtonClick
    this._button = this._popUp.querySelector('.popup__submit-button')
    this._card = undefined
  }

  clearCardToRemove() {
    this._card = undefined
  }

  setCardToRemove(card) {
    this._card = card
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this._handleButtonClick(this._card)
      this.close()
    })
    super.setEventListeners()
  }
}
