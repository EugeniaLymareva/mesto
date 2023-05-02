import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import { editButton, addButton, formConfigObject, initialCards } from '../utils/constants.js'
import './index.css'

const imagePopup = new PopupWithImage('.popup-image')
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
  handlePopupOpen: () => {
    const userInfoObj = userInfo.getUserInfo()
    popupUserInfo.setInputValues(userInfoObj)
  },
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues)
  }
})
popupUserInfo.setEventListeners()

const addCardPopup = new PopupWithForm({
  popupSelector: '#popup-add',
  handleFormSubmit: (inputValues) => {
    const item = {
      name: inputValues['caption'],
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
  userInfo.getUserInfo()

  editFormValidator.removeFormInputsValidation()

  editFormValidator.toggleButtonState()

  popupUserInfo.open()
})

addButton.addEventListener('click', () => {
  addFormValidator.removeFormInputsValidation()

  addFormValidator.toggleButtonState()

  addCardPopup.open()
})



