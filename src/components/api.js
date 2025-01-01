const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29/',
  headers: {
    authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
    'Content-Type': 'application/json'
  }
}

//получаем карточки с сервера
 export const getInitialCards = () => {
    return fetch(`${config.baseUrl}cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); 
  });
} 

//получаем имя
export const getProfileName = () => {
  return fetch(`${config.baseUrl}users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
}

//Редактирование профиля
export const editProfile = (userName, about) => {
  return fetch(`${config.baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

//Добавление карточки на сервер
export const addCard = (cardName, link) => {
  return fetch(`${config.baseUrl}cards`, {
    method: 'POST',
    headers: {
      authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

//запроса на сервер для добавления или удаления лайка
export const toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

//Удаляем карточку с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
};

//Обновление афатара
export function editAvatarServer(avatarLink) {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: '0c569154-55a4-446a-bbb8-333eae7b1425',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    });
}