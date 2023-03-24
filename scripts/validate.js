const formConfigObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
}


//показывает элемент ошибки
const showInputError = (formElement, inputElement, formConfigObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(formConfigObject.inputErrorClass)
  errorElement.classList.add(formConfigObject.errorClass)
  errorElement.textContent = inputElement.validationMessage
}

//скрывает элемент ошибки
const hideInputError = (formElement, inputElement, formConfigObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(formConfigObject.inputErrorClass)
  errorElement.classList.remove(formConfigObject.errorClass)
  errorElement.textContent = ''
}

//проверяет валидность поля, внутри вызывает showInputError или hideInputError
const checkInputValidity = (formElement, inputElement, formConfigObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, formConfigObject)
  } else {
    hideInputError(formElement, inputElement, formConfigObject)
  }
}

//проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
})
}

//меняет состояние кнопки
const toggleButtonState = (inputList, buttonElement, formConfigObject) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(formConfigObject.inactiveButtonClass)
      buttonElement.setAttribute("disabled", "disabled")
  } else {
      buttonElement.classList.remove(formConfigObject.inactiveButtonClass)
      buttonElement.removeAttribute("disabled", "disabled")
  }
}

const setButtondisabled = (submitButton) => {
  submitButton.setAttribute("disabled", "disabled")
  submitButton.classList.add(formConfigObject.inactiveButtonClass)
}

const removeFormInputsValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfigObject.inputSelector))
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formConfigObject)
  })
}

//добавляет слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement, formConfigObject) => {
  const inputList = Array.from(formElement.querySelectorAll(formConfigObject.inputSelector))
  const buttonElement = formElement.querySelector(formConfigObject.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, formConfigObject)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, formConfigObject)
      toggleButtonState(inputList, buttonElement, formConfigObject)
    })
  })
}

const enableValidation = (formConfigObject) => {

  const formList = Array.from(document.querySelectorAll(formConfigObject.formSelector))

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt) {
        evt.preventDefault()
    });
    setEventListeners(formElement, formConfigObject)
  })
}

enableValidation(formConfigObject)












































