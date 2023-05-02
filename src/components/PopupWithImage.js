import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupImageSelector, popupImageTitleSelector) {
    super(popupSelector)
    this._popupImg = this._popUp.querySelector(popupImageSelector)
    this._popupImageTitle = this._popUp.querySelector(popupImageTitleSelector)
  }

  open(data) {
    const { name, link } = data

    this._popupImg.src = link
    this._popupImg.alt = `фото ${name}`
    this._popupImageTitle.textContent = name

    super.open()
  }
}
