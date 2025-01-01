import { toggleLike, deleteCardFromServer } from './api';

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
   // Сохраняем лайки в data-likes
  cardItem.dataset.likes = JSON.stringify(cardData.likes);
  cardItem.dataset.id = cardData._id;

  // Показываем кнопку удаления только на своих карточках
  if (cardData.owner._id === userId) {
    deleteButton.style.display = 'block';
  } else {
    deleteButton.style.display = 'none';
  }

  // Удаление карточки
  deleteButton.addEventListener('click', () => deleteCallback(cardItem, cardData._id));
 
  // Лайк карточки
  likeButton.addEventListener('click', () => {
    const currentLikes = JSON.parse(cardItem.dataset.likes);
    likeCallback(cardItem, cardData._id, currentLikes, userId);
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
export function likeCard(cardItem, cardId, likes, userId) {
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardNumberOfLikes = cardItem.querySelector('.card__number-of-likes');

  // Проверяем, есть ли лайк от текущего пользователя
  const isLiked = likes.some(user => user._id === userId);

  toggleLike(cardId, isLiked)
    .then(updatedCard => {
      // Обновляем количество лайков
      cardNumberOfLikes.textContent = updatedCard.likes.length;

      // Проверяем лайк после ответа от сервера
      const isStillLiked = updatedCard.likes.some(user => user._id === userId);

      // Обновляем состояние кнопки
      if (isStillLiked) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }

      // Обновляем массив лайков в DOM
      cardItem.dataset.likes = JSON.stringify(updatedCard.likes);
    })
    .catch(err => {
      console.error('Ошибка в likeCard:', err);
    });
}
