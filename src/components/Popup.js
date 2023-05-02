export default class Popup {
  constructor(popupSelector) {
    this._popUp = document.querySelector(popupSelector)
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popUp.classList.add('popup_opened')
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popUp.classList.remove('popup_opened')
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened')
      if (popupOpened) {
        this.close(popupOpened)
      }
    }
  }

  setEventListeners() {
    const closeButton = this._popUp.querySelector('.popup__close')
    closeButton.addEventListener('click', () => {
      this.close()
    })
    this._popUp.addEventListener('click', (evt) => {
      const clickTarget = evt.target
      if (clickTarget.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }
}
