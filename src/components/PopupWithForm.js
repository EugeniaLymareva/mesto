import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._popUpForm = this._popUp.querySelector('.popup__form')
    this._inputList = this._popUpForm.querySelectorAll('.popup__item')
    this._submitBbutton = this._popUpForm.querySelector('.popup__submit-button')
  }

  getPopupForm() {
    return this._popUpForm
  }

  _getInputValues() {
    this._inputValues = {}
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value
    })

    return this._inputValues
  }

  renderLoading(text) {
    this._submitBbutton.value = text
  }
  
  setEventListeners() {
    this._popUpForm.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this.renderLoading('Сохранить...')
      this._handleFormSubmit(this._getInputValues())
    })

    super.setEventListeners()
  }

  setInputValues(object) {
    this._inputList.forEach((input) => {
      input.value = object[input.name]
    })
  }

  close() {
    this._popUpForm.reset()
    super.close()
  }
}
