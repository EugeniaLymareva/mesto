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
const popupCloseEdit = popupEdit.querySelector('#popup-close-edit');

// popup add elements
const popupAdd = body.querySelector('#popup-add');
const addForm = popupAdd.querySelector('form[name="add-form"]');
const сaptionInput = addForm.querySelector('input[name="сaption"]');
const linkPictureInput = addForm.querySelector('input[name="link-picture"]');
const popupCloseAdd = popupAdd.querySelector('#popup-close-add');

// popup image elements
const popupImage = body.querySelector('.popup-image');
const popupImg = popupImage.querySelector('.popup-image__img');
const popupImageTitle = popupImage.querySelector('.popup-image__title');
const popupCloseImage = popupImage.querySelector('#popup-close-image');

function popupToggle(popup) {
  popup.classList.toggle('popup_opened');
}

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

  popupToggle(popupEdit);
});

addButton.addEventListener('click', function() {
  popupToggle(popupAdd);
});

popupCloseEdit.addEventListener('click', function() {
  popupToggle(popupEdit);
});

popupCloseAdd.addEventListener('click', function() {
  popupToggle(popupAdd);
});

popupCloseImage.addEventListener('click', function() {
  popupToggle(popupImage);
});

function editFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;

  popupToggle(popupEdit);
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

function addElement(name, link) {
  const elementTemplate = elementsTemplate.querySelector('.element').cloneNode(true);
  const likeButton = elementTemplate.querySelector('.element__group');
  const trashButton = elementTemplate.querySelector('.element__trash');

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });

  trashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  const img = elementTemplate.querySelector('.element__mask-group');
  img.src = link;
  img.alt = `фото ${name}`;
  elementTemplate.querySelector('.element__title').textContent = name;

  img.addEventListener('click', function (evt) {
    popupImg.src = link;
    popupImg.alt = img.alt;
    popupImageTitle.textContent = name;

    popupToggle(popupImage);

  });

  elementsGrid.prepend(elementTemplate);
};


 initialCards.forEach(function (element) {
  addElement(element.name, element.link);
});


function addFormSubmit(evt) {
  evt.preventDefault();

  const сaptionValue = сaptionInput.value;
  const linkPictureValue = linkPictureInput.value;

  addElement(сaptionValue, linkPictureValue);

  popupToggle(popupAdd);
  сaptionInput.value = '';
  linkPictureInput.value = '';
}

addForm.addEventListener('submit', addFormSubmit);

