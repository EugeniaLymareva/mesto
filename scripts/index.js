/** @type {HTMLElement} */
const body = document.querySelector('.body');
const editButton = body.querySelector('.profile__edit-button');
const addButton = body.querySelector('.profile__add-button');
const profileName = body.querySelector('.profile__name');
const profileOccupation = body.querySelector('.profile__occupation');

// popup edit elements
const popupEdit = body.querySelector('#popup-edit');
const editForm = popupEdit.querySelector('form[name="edit-form"]');
const nameInput = editForm.querySelector('input[name="name"]');
const jobInput = editForm.querySelector('input[name="job"]');

// popup add elements
const popupAdd = body.querySelector('#popup-add');
const addForm = popupAdd.querySelector('form[name="add-form"]');
const сaptionInput = addForm.querySelector('input[name="сaption"]');
const linkPictureInput = addForm.querySelector('input[name="link-picture"]');

// popup image elements
const popupImage = body.querySelector('.popup-image');
const popupImg = popupImage.querySelector('.popup-image__img');
const popupImageTitle = popupImage.querySelector('.popup-image__title');

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

  openPopup(popupEdit);
});

addButton.addEventListener('click', function() {
  openPopup(popupAdd);
});

const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach(function(closeButton) {
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup))
})

function editFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;

  closePopup(popupEdit);
}

editForm.addEventListener('submit', editFormSubmit);

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
];

const elementsGrid = body.querySelector('.elements__grid');
const elementsTemplate = body.querySelector('#elements-template').content;

function createCard(name, link) {
  const card = elementsTemplate.querySelector('.element').cloneNode(true);
  const likeButton = card.querySelector('.element__group');
  const trashButton = card.querySelector('.element__trash');

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });

  trashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  const img = card.querySelector('.element__mask-group');
  img.src = link;
  img.alt = `фото ${name}`;
  card.querySelector('.element__title').textContent = name;

  img.addEventListener('click', function (evt) {
    popupImg.src = link;
    popupImg.alt = img.alt;
    popupImageTitle.textContent = name;

    openPopup(popupImage);
  });

  return card
};

function addCard(card) {
  elementsGrid.prepend(card);
};

initialCards.forEach(function (element) {
  addCard(createCard(element.name, element.link));
});

function addFormSubmit(evt) {
  evt.preventDefault();

  addCard(createCard(сaptionInput.value, linkPictureInput.value));
  closePopup(popupAdd);
  
  evt.target.reset();
}

addForm.addEventListener('submit', addFormSubmit);

