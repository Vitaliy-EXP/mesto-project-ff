import '../pages/index.css';
import { initialCards } from './cards';

// @todo: Темплейт карточки
export const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
export function createCard(cardData, deleteCallback) {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Удаление карточки
  const deleteButton = cardItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCallback(cardItem));

  return cardItem;
}

// @todo: Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// @todo: Вывести карточки на страницу
export function renderCards(cards) {
  cards.forEach((cardData) => {
    const cardItem = createCard(cardData, deleteCard);
    placesList.appendChild(cardItem);
  });
}

renderCards(initialCards);
