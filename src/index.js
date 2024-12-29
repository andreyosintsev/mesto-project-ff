import { createCard, deleteCard, likeCard, showCard } from './scripts/components/card.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { enableValidation } from './scripts/validation.js';
import { getInitialCards, getUserInfo, editUserInfo, addNewCard } from './scripts/api.js';

import {
    cardsContainer,
    popupNew,
    popupEdit,
    popups,
    buttonAdd,
    buttonEdit
} from './scripts/elements.js';

import './pages/index.css';

document.addEventListener('DOMContentLoaded', () => {
    let userInfo = [];
    
    // функция вставки карточки на страницу
    function renderCard(card, cardsContainer, method) {
        cardsContainer[method](card);//функционал вставки элемента карточки на страницу
    }

    function buttonClickHandler(e) {
        if (e.target.classList.contains('profile__add-button')) {

          document.forms['new-place'].elements['place-name'].value = '';
          document.forms['new-place'].elements['link'].value = '';

          openModal(popupNew);
        }
        if (e.target.classList.contains('profile__edit-button')) {
          
          document.forms['edit-profile'].elements.name.value = userInfo.name;
          document.forms['edit-profile'].elements.description.value = userInfo.about;

          openModal(popupEdit);
        }
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();
        const name = editNameInput.value;
        const description = editJobInput.value;

        editUserInfo(name, description)
        .then(data => {
          userInfo = JSON.parse(JSON.stringify(data));
          setUserInfo(userInfo);
        });

        closeModal(popupEdit);
    }

    function handleNewPlaceFormSubmit(e) {
        e.preventDefault();
        const name = newPlaceNameInput.value;
        const link = newPlaceUrlInput.value;

        addNewCard(name, link)
        .then(card => {
          const newCard = createCard(card, userInfo, deleteCard, likeCard, showCard);
          renderCard(newCard, cardsContainer, 'prepend');
        });

        formNewPlace.reset(); 
        
        closeModal(popupNew);
    }

    function setUserInfo(userInfo) {
      // "name": "Jacques Cousteau",
      // "about": "Sailor, researcher",
      // "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
      // "_id": "e20537ed11237f86bbb20ccb",
      // "cohort": "cohort0"

      const profileImageElement = document.querySelector('.profile__image');
      const profileTitleElement = document.querySelector('.profile__title');
      const profileDescriptionElement = document.querySelector('.profile__description');

      profileImageElement.style.backgroundImage = `url(${userInfo.avatar})`;
      profileTitleElement.textContent = userInfo.name;
      profileDescriptionElement.textContent = userInfo.about; 
    }

    Promise.all([getInitialCards(), getUserInfo()])
    .then(([initialCards, user]) => {
      userInfo = user;
      initialCards.forEach(initialCard => {
        const card = createCard(initialCard, userInfo, deleteCard, likeCard, showCard);
        renderCard(card, cardsContainer, 'append');
      });

      setUserInfo(userInfo);
    });

    buttonAdd.addEventListener('click', buttonClickHandler);
    buttonEdit.addEventListener('click', buttonClickHandler);

    const formEdit = document.querySelector('form[name="edit-profile"]');
    const editNameInput = formEdit.querySelector('.popup__input_type_name');
    const editJobInput = formEdit.querySelector('.popup__input_type_description');
    formEdit.addEventListener('submit', handleEditFormSubmit);

    const formNewPlace = document.querySelector('form[name="new-place"]');
    const newPlaceNameInput = formNewPlace.querySelector('.popup__input_type_card-name');
    const newPlaceUrlInput = formNewPlace.querySelector('.popup__input_type_url');
    formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup')) {
                closeModal(popup);
            }            
        });
    });

    enableValidation({
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible'
    });
});