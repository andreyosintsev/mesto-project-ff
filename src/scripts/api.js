const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'a99e0a38-88bc-4c7b-aa71-5dc9dec36f0a',
    'Content-Type': 'application/json'
  }
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const getInitialCards = () => {
    try {
      return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
      })
      .then(checkResponse)
      .then(data => { return data; })
      .catch(error => { throw new Error(error); });
    } catch(error) {
      console.error(`Ошибка в getInitialCards: ${error}`);
    }
};

const getUserInfo = () => {
  try {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
    .then(checkResponse)
    .then(data => { return data; })
    .catch(error => { throw new Error(error); });
  } catch(error) {
    console.error(`Ошибка в getUserInfo: ${error}`);
  }
};

const editUserInfo = (name, about) => {
  try {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(checkResponse)
    .then(data => { return data; })
    .catch(error => { throw new Error(error); });
  } catch(error) {
    console.error(`Ошибка в editUserInfo: ${error}`);
  }
};

const addNewCard = (name, link) => {
  try {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(checkResponse)
    .then(data => { return data; })
    .catch(error => { throw new Error(error); });
  } catch(error) {
    console.error(`Ошибка в getInitialCards: ${error}`);
  }
};

export {
  getInitialCards,
  getUserInfo,
  editUserInfo,
  addNewCard
};