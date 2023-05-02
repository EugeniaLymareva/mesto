import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { editButton, addButton, formConfigObject, initialCards } from '../utils/constants.js'
import './index.css'

const imagePopup = new PopupWithImage('.popup-image', '.popup__image', '.popup__image-description')
imagePopup.setEventListeners()

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(
      item,
      '#elements-template',
      (data) => {
        imagePopup.open(data)
      }
    )

    const cardElement = card.generateCard()

    section.addItem(cardElement)
  }
 },
 '.elements__grid'
)
section.initRenderer()

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__occupation',
})

const popupUserInfo = new PopupWithForm({
  popupSelector: '#popup-edit',
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues)
  }
})
popupUserInfo.setEventListeners()

const addCardPopup = new PopupWithForm({
  popupSelector: '#popup-add',
  handleFormSubmit: (inputValues) => {
    const item = {
      name: inputValues['сaption'],
      link: inputValues['link-picture'],
    }
    section.renderer(item)
  }
})
addCardPopup.setEventListeners()

const editFormValidator = new FormValidator(formConfigObject, popupUserInfo.getPopupForm())
editFormValidator.enableValidation()

const addFormValidator = new FormValidator(formConfigObject, addCardPopup.getPopupForm())
addFormValidator.enableValidation()

editButton.addEventListener('click', () => {
  editFormValidator.removeFormInputsValidation()
  editFormValidator.toggleButtonState()
  popupUserInfo.setInputValues(userInfo.getUserInfo())
  popupUserInfo.open()
})

addButton.addEventListener('click', () => {
  addFormValidator.removeFormInputsValidation()
  addFormValidator.toggleButtonState()
  addCardPopup.open()
})



