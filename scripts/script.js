/** @type {HTMLElement} */
const body = document.querySelector('.body');
const editButton = body.querySelector('.profile__edit-button');
const popup = body.querySelector('.popup');
const popupClose = body.querySelector('.popup__close');
const profileName = body.querySelector('.profile__name');
const profileOccupation = body.querySelector('.profile__occupation');
const formElement = body.querySelector('.popup__form');
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="job"]');
const submitButton = body.querySelector('.popup__submit-button');


editButton.addEventListener('click', function() {
  body.style.overflowY = 'hidden';

  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;

  popup.classList.add('popup_active');
});

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_active');
  body.style.overflow = 'visible';
});



function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileOccupation.textContent = jobValue;
}

formElement.addEventListener('submit', handleFormSubmit);

submitButton.addEventListener('click', function() {
  popup.classList.remove('popup_active');
  body.style.overflow = 'visible';
});
