import { toggleLike } from './api';
import { hadnleCheckError, handleCheckError } from '../index';
// Создание карточки
export function createCard(cardData, cardTemplate, deleteCallback, likeCallback, imageCallback, userId) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardNumberOfLikes.textContent = cardData.likes.length;
  cardItem.dataset.id = cardData._id;

  // Показываем кнопку удаления только на своих карточках
  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
     deleteButton.addEventListener('click', () => deleteCallback(cardItem, cardData._id));
  } else {
    deleteButton.style.display = 'none';
  }

  // Лайк карточки
  likeButton.addEventListener('click', () => {
    likeCallback(cardItem, cardData._id, userId);
  });

  // Модальное окно с картинкой
  cardImage.addEventListener('click', () => imageCallback(cardItem));
  return cardItem;
}

// Удаление карточки
export function deleteCardTemplate(cardItem) {
  cardItem.remove();
}

// Лайк
export function likeCard(cardItem, cardId, userId) {
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');

  // Проверяем, есть ли лайк от текущего пользователя
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  toggleLike(cardId, isLiked)
    .then(updatedCard => {
      // Обновляем количество лайков
      cardNumberOfLikes.textContent = updatedCard.likes.length;

      // Проверяем лайк после ответа от сервера
      const isStillLiked = updatedCard.likes.some(user => user._id === userId);

      // Обновляем состояние кнопки
      likeButton.classList.toggle('card__like-button_is-active', isStillLiked);
    })
    .catch(handleCheckError);
}
