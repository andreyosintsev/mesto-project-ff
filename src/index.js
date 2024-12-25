import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard, showCard } from './scripts/components/card.js';
import { openModal, closeModal } from './scripts/components/modal.js';
import { enableValidation } from './scripts/validation.js';

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
    
    // функция вставки карточки на страницу
    function renderCard(card, cardsContainer, method) {
        cardsContainer[method](card);//функционал вставки элемента карточки на страницу
    }

    function buttonClickHandler(e) {
        if (e.target.classList.contains('profile__add-button')) {
            openModal(popupNew);
        }
        if (e.target.classList.contains('profile__edit-button')) {
            const profileTitle = document.querySelector('.profile__title');
            const profileDescription = document.querySelector('.profile__description');
            document.forms['edit-profile'].elements.name.value = profileTitle.textContent;
            document.forms['edit-profile'].elements.description.value = profileDescription.textContent;
            openModal(popupEdit);
        }
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();
        const name = editNameInput.value;
        const job = editJobInput.value;
        const profileTitle = document.querySelector('.profile__title');
        const profileDescription = document.querySelector('.profile__description');
        profileTitle.textContent = name;
        profileDescription.textContent = job;        

        closeModal(popupEdit);
    }

    function handleNewPlaceFormSubmit(e) {
        e.preventDefault();
        const name = newPlaceNameInput.value;
        const link = newPlaceUrlInput.value;

        const newCard = createCard({
            name,
            link
        }, deleteCard, likeCard, showCard);

        renderCard(newCard, cardsContainer, 'prepend');
        formNewPlace.reset(); 

        closeModal(popupNew);
    }

    // Вывести карточки на страницу, используем цикл forEach
    initialCards.forEach(initialCard => {
        const card = createCard(initialCard, deleteCard, likeCard, showCard);
        renderCard(card, cardsContainer, 'append');
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

    enableValidation();
});