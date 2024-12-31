import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card';
import { openModal, closeModal } from './components/modal';
import { validationConfig, enableValidation, clearValidation  } from './components/validation';
import { 
  getInitialCards, 
  getProfileName, 
  editProfile, 
  addCard, 
  deleteCardFromServer
} from './components/api';
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
const profileImage = document.querySelector('.profile__image');
const confirmDeleteModal = document.querySelector('.popup_type_confirm-delete');
const confirmDeleteButton = confirmDeleteModal.querySelector('.popup__button_type_confirm');

// Статичные константы
const imageModalImage = imageModal.querySelector('.popup__image');
const imageModalCaption = imageModal.querySelector('.popup__caption');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const descriptionInput = editProfileForm.querySelector('.popup__input_type_description');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const linkInput = addCardForm.querySelector('.popup__input_type_url');
const addCardSubmitButton = addCardForm.querySelector('.popup__button');

// Идентификатор пользователя
const userId = 'df523c1a1c8ff3eff0e52051';

// @todo: Вывести карточки на страницу
function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData, cardTemplate, deleteCard, likeCard, openImageModal, userId);
    placesList.prepend(cardItem);
  });
}


//Получаем промис с карточками и отрисовываем на странице
getInitialCards()
  .then(cards => {
    renderCards(cards);
  })
  .catch(err => {
    console.log(err);
  });

// Получаем данные пользователя и обновляем разметку
getProfileName()
  .then(userData => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch(err => {
    console.error('Ошибка:', err);
  });

// Обработчики для открытия и закрытия модальных окон
editProfileButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});
addCardButton.addEventListener('click', () => {
  placeNameInput.value = '';
  linkInput.value = '';
  addCardSubmitButton.disabled = true;
  addCardSubmitButton.classList.add(validationConfig.inactiveButtonClass);
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    closeModal(modal);
    const form = modal.querySelector('.popup__form');
    if (form) {
      clearValidation(form, validationConfig);
    }
  });
});

// Обработчик события для открытия модального окна с картинками
function openImageModal(cardItem) {
  const imageSrc = cardItem.querySelector('.card__image').src;
  const imageCaption = cardItem.querySelector('.card__title').textContent;
  imageModalImage.src = imageSrc;
  imageModalImage.alt = imageCaption;
  imageModalCaption.textContent = imageCaption;
  openModal(imageModal);
}

// Обработчик события для редактирования профиля
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const userName = nameInput.value;
  const about = descriptionInput.value;

  editProfile(userName, about)
    .then(userData => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(err => {
      console.error('Error:', err);
    });
}


// Обработчик события для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = linkInput.value;

  addCard(name, link)
   .then(newCard => {
      const cardItem = createCard(newCard, cardTemplate, handleDeleteClick, handleLikeClick, openImageModal, userId);
      placesList.prepend(cardItem);
      closeModal(addCardModal);
      addCardForm.reset(); 
      clearValidation(addCardForm, validationConfig);
      addCardSubmitButton.disabled = true;
      addCardSubmitButton.classList.add(validationConfig.inactiveButtonClass); 
    })
    .catch(err => {
      console.log(err);
    });
}

// Обработчик события для лайка карточки
function handleLikeClick(cardItem, cardId) {
  const currentLikes = JSON.parse(cardItem.dataset.likes);
  likeCard(cardItem, cardId, currentLikes, userId);
}

// Обработчик события для удаления карточки
function handleDeleteClick(cardItem, cardId) {
  console.log('Deleting card with ID:', cardId); // Добавим лог для проверки
  openModal(confirmDeleteModal);
  confirmDeleteButton.addEventListener('click', () => {
    deleteCardFromServer(cardId)
      .then(() => {
        deleteCard(cardItem);
        closeModal(confirmDeleteModal);
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, { once: true });
}

// Обработчики событий для форм
editProfileForm.addEventListener('submit', handleEditProfileSubmit);
addCardForm.addEventListener('submit', handleAddCardSubmit);

enableValidation(validationConfig);
getProfileName();