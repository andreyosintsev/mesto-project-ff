import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard } from './scripts/card.js';
import { cardsContainer, cardTemplate } from './scripts/elements.js';

import './pages/index.css';

document.addEventListener('DOMContentLoaded', () => {
    
    // @todo: функция вставки карточки на страницу
    function renderCard(card, cardsContainer) {
        cardsContainer.append(card);//функционал вставки элемента карточки на страницу
    };

    // @todo: Вывести карточки на страницу, используем цикл forEach
    initialCards.forEach(initialCard => {
        const card = createCard(initialCard, cardTemplate, deleteCard);
        renderCard(card, cardsContainer);
    });
})