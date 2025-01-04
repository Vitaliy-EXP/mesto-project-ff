import { config } from './config'

//Обработчик результата
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//получаем карточки с сервера
 export const getInitialCards = () => {
    return fetch(`${config.baseUrl}cards`, {
      headers: config.headers
    })
      .then(handleResponse)
} 

//получаем имя
export const getUserData = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
    .then(handleResponse)
}

//Редактирование профиля
export const editProfile = (userName, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: about
    })
  })
    .then(handleResponse)
};

//Добавление карточки на сервер
export const addCard = (cardName, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: link
    })
  })
    .then(handleResponse)
};

//Запрос на сервер для добавления или удаления лайка
export const toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
};

//Удаляем карточку с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    }
  })
    .then(handleResponse)
};

//Обновление аватара
export function editAvatarServer(avatarLink) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(handleResponse)
}