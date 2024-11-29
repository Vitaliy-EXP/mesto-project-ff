import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const addCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const closeButtons = document.querySelectorAll('.popup__close');
const editProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// @todo: Вывести карточки на страницу
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData, cardTemplate, deleteCard, likeCard, openImageModal);
    placesList.prepend(cardItem);
  });
}

renderCards(initialCards);

// Обработчики для открытия и закрытия модальных окон
editProfileButton.addEventListener('click', () => openModal(editProfileModal));
addCardButton.addEventListener('click', () => openModal(addCardModal));
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
  });
});

// Обработчики событий для форм
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

// Обработчик события для открытия модального окна с картинками
function openImageModal(cardItem) {
  const imageSrc = cardItem.querySelector('.card__image').src;
  const imageCaption = cardItem.querySelector('.card__title').textContent;
  imageModal.querySelector('.popup__image').src = imageSrc;
  imageModal.querySelector('.popup__caption').textContent = imageCaption;
  openModal(imageModal);
}

// Обработчик события для редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const nameInput = editProfileForm.querySelector('.popup__input_type_name');
  const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

// Обработчик события для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(addCardForm);
  const newCard = {
    name: formData.get('place-name'),
    link: formData.get('link')
  };
  const cardItem = createCard(newCard, cardTemplate, deleteCard, likeCard, openImageModal);
  placesList.prepend(cardItem);
  closeModal(addCardModal);
  addCardForm.reset();
}
