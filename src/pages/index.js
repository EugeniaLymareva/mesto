import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { editButton, addButton, updateAvatar, formConfigObject } from '../utils/constants.js'
import './index.css'
import PopupWithButton from '../components/PopupWithButton.js'

async function main() {
  const userInfo = new UserInfo({
    userNameSelector: '.profile__name',
    userOccupationSelector: '.profile__occupation',
    userAvatarSelector: '.profile__avatar'
  })

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '58dc64d4-5ef1-41cd-ad6e-ba4955aa834b',
      'Content-Type': 'application/json'
    }
  })

  const userInfoRes = await api.getUserInfo()
  userInfo.setUserInfo(userInfoRes)
  userInfo.setUserAvatar(userInfoRes)

  const imagePopup = new PopupWithImage('.popup-image', '.popup__image', '.popup__image-description')
  imagePopup.setEventListeners()

  const initialCards = await api.getInitialCards()

  const popupDelete = new PopupWithButton({
    popupSelector:'#popup-delete',
    handleButtonClick: (card) => {
      api.deleteCard(card.getCardId())
        .then(() => {
          card.removeCard()
          popupDelete.clearCardToRemove()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
  popupDelete.setEventListeners()

  const section = new Section({
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card({
        cardData,
        cardTemplateSelector: '#elements-template',
        handleCardClick: (data) => {
          imagePopup.open(data)
        },
        userId: userInfoRes._id,
        handleCardDelete: (card) => {
          popupDelete.setCardToRemove(card)
          popupDelete.open()
        },
        handleCardLike: (cardId) => {
          if(!card.isButtonLiked()) {
            api.likeCard(cardId)
              .then((res) => {
                card.setCardLike(res.likes.length)
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            api.dislikeCard(cardId)
              .then((res) => {
                card.setCardDislike(res.likes.length)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })

      const cardElement = card.generateCard()

      section.addItem(cardElement)
    }
    },
    '.elements__grid'
  )
  section.initRenderer()

  const popupNewAvatar = new PopupWithForm({
    popupSelector: '#update-avatar',
    handleFormSubmit: (userData) => {
      api.updateAvatar(userData)
        .then((userData) => {
          userInfo.setUserAvatar(userData)
          popupNewAvatar.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupNewAvatar.renderLoading(false)
        })
    }
  })
  popupNewAvatar.setEventListeners()

  const popupUserInfo = new PopupWithForm({
    popupSelector: '#popup-edit',
    handleFormSubmit: (userData) => {
      api.updateUserInfo(userData)
        .then(() => {
          userInfo.setUserInfo(userData)
          popupUserInfo.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          popupUserInfo.renderLoading(false)
        })
    }
  })
  popupUserInfo.setEventListeners()

  const addCardPopup = new PopupWithForm({
    popupSelector: '#popup-add',
    handleFormSubmit: (cardData) => {
      api.addNewCard(cardData)
        .then((res) => {
          section.renderer(res)
          addCardPopup.close()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          addCardPopup.renderLoading(false)
        })
    }
  })
  addCardPopup.setEventListeners()

  const editFormValidator = new FormValidator(formConfigObject, popupUserInfo.getPopupForm())
  editFormValidator.enableValidation()

  const addFormValidator = new FormValidator(formConfigObject, addCardPopup.getPopupForm())
  addFormValidator.enableValidation()

  const avatarFormValidator = new FormValidator(formConfigObject, popupNewAvatar.getPopupForm())
  avatarFormValidator.enableValidation()

  updateAvatar.addEventListener('click', () => {
    avatarFormValidator.removeFormInputsValidation()
    avatarFormValidator.toggleButtonState()
    popupNewAvatar.open()
  })

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
}

main()



