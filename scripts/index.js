import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'

const formConfigObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active',
}

/** @type {HTMLElement} */
const body = document.querySelector('.body')
const editButton = body.querySelector('.profile__edit-button')
const addButton = body.querySelector('.profile__add-button')
const profileName = body.querySelector('.profile__name')
const profileOccupation = body.querySelector('.profile__occupation')


// popup edit elements
const popupEdit = body.querySelector('#popup-edit')
const editForm = popupEdit.querySelector('form[name="edit-form"]')
const editFormValidator = new FormValidator(formConfigObject, editForm)
editFormValidator.enableValidation()

const nameInput = editForm.querySelector('input[name="name"]')
const jobInput = editForm.querySelector('input[name="job"]')

// popup add elements
const popupAdd = body.querySelector('#popup-add')
const addForm = popupAdd.querySelector('form[name="add-form"]')
const addFormValidator = new FormValidator(formConfigObject, addForm)
addFormValidator.enableValidation()

const сaptionInput = addForm.querySelector('input[name="сaption"]')
const linkPictureInput = addForm.querySelector('input[name="link-picture"]')

const popUps = body.querySelectorAll('.popup')

export function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc)
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc)
  popup.classList.remove('popup_opened')
}

function closePopupEsc(evt) {
  if(evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    if (popupOpened) {
      closePopup(popupOpened)
    }
  }
}

function closePopupOverlay(evt) {
  const popUp = evt.target
  if (popUp.classList.contains('popup_opened')) {
    closePopup(popUp)
  }
}

popUps.forEach((popUp) => {
  popUp.addEventListener('click', closePopupOverlay)
})

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent
  jobInput.value = profileOccupation.textContent

  editFormValidator.removeFormInputsValidation()

  editFormValidator.toggleButtonState()

  openPopup(popupEdit)
})

addButton.addEventListener('click', function() {
  addFormValidator.removeFormInputsValidation()

  addFormValidator.toggleButtonState()

  openPopup(popupAdd)
})

const closeButtons = document.querySelectorAll('.popup__close')

closeButtons.forEach(function(closeButton) {
  const popup = closeButton.closest('.popup')
  closeButton.addEventListener('click', () => closePopup(popup))
})

function editFormSubmit(evt) {
  evt.preventDefault()

  const nameValue = nameInput.value
  const jobValue = jobInput.value
  profileName.textContent = nameValue
  profileOccupation.textContent = jobValue

  closePopup(popupEdit)
}

editForm.addEventListener('submit', editFormSubmit)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

function createCard(data) {
  const card = new Card(data, '#elements-template')

  return card.generateCard()
};

function addCard(cardElement) {
  document.querySelector('.elements__grid').prepend(cardElement)
}

initialCards.forEach(function (data) {
  addCard(createCard(data))
})


function addFormSubmit(evt) {
  evt.preventDefault()
  const data = {
    name: сaptionInput.value,
    link: linkPictureInput.value
  }
  addCard(createCard(data))


  closePopup(popupAdd)

  evt.target.reset()
}

addForm.addEventListener('submit', addFormSubmit)


