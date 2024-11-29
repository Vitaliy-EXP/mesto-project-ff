// Создание карточки
export function createCard(cardData, cardTemplate, deleteCallback, likeCallback, imageCallback) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const likeButton = cardItem.querySelector('.card__like-button');
  const deleteButton = cardItem.querySelector('.card__delete-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Удаление карточки
  deleteButton.addEventListener('click', () => deleteCallback(cardItem));

  // Лайк карточки
  likeButton.addEventListener('click', () => likeCallback(cardItem));

  // Модальное окно с картинкой
  cardImage.addEventListener('click', () => imageCallback(cardItem));

  return cardItem;
}

// Удаление карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// Лайк
export function likeCard(cardItem) {
  cardItem.querySelector('.card__like-button').classList.toggle('card__like-button_is-active');
}
