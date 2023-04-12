export class FormValidator {
  constructor(config, form) {
    this._config = config
    this._form = form
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector)
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.classList.add(this._config.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._config.inputErrorClass)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ''
  }

  //проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  //меняет состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass)
      this._submitButton.setAttribute("disabled", "disabled")
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass)
      this._submitButton.removeAttribute("disabled", "disabled")
    }
  }

  //добавляет слушатель событий всем полям ввода внутри формы
  _setEventListeners() {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(evt.target)
        this._toggleButtonState()
      })
    })

  }

  //включает валидацию формы
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  removeFormInputsValidation() {
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector))
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }
}
