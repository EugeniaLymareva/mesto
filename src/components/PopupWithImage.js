import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    document.addEventListener('keydown', this._handleEscClose)

    const { name, link } = data
    const popupImg = this._popUp.querySelector('.popup__image')
    const popupImageTitle = this._popUp.querySelector('.popup__image-description')

    popupImg.src = link
    popupImg.alt = `фото ${name}`
    popupImageTitle.textContent = name

    super.open()
  }
}
