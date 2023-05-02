import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handlePopupOpen, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._handlePopupOpen = handlePopupOpen
    this._popUpForm = this._popUp.querySelector('.popup__form')
    this._inputList = this._popUpForm.querySelectorAll('.popup__item')
  }

  getPopupForm() {
    return this._popUpForm
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues
  }

  setEventListeners() {
    this._popUpForm.addEventListener('submit', (evt) => {
      evt.preventDefault()

      this._handleFormSubmit(this._getInputValues())

      this.close()

      evt.target.reset()
    })

    super.setEventListeners()
  }

  setInputValues(userInfoObj) {
    this._inputList.forEach((input) => {
      input.value = userInfoObj[input.name]
    })
  }

  open() {
    if (this._handlePopupOpen) {
      this._handlePopupOpen()
    }

    super.open()
  }

  close() {
    this._popUpForm.reset()
    super.close()
  }
}
