document.addEventListener('DOMContentLoaded', () => {
    
    // @todo: Темплейт карточки

    const cardTemplateSelector = '#card-template';
    const cardsContainerSelector = '.places__list';

    const getCardTemplate = (cardTemplateSelector) => {
        if (!cardTemplateSelector) {
            console.log('Не указан селектор шаблона карточки');
            return;
        }

        return document.querySelector(cardTemplateSelector);
    }

    // @todo: DOM узлы

    // @todo: Функция создания карточки

    const createCard = (cardTemplateSelector, cardData, cardDeleteHandler) => {

        if (!cardTemplateSelector) {
            console.error('Не передан элемент шаблона карточки');
            return;
        }

        if (!cardData) {
            console.error('Не переданы данные для карточки');
            return;
        }

        cardTemplateElement = getCardTemplate(cardTemplateSelector);

        if (!cardTemplateElement) {
            console.error('Не удалось получить шаблон карточки');
            return;
        }
        
        const cardElement = cardTemplateElement.content.querySelector('.card');
        if (!cardElement) {
            console.error('Не удалось найти шаблон карточки');
            return;
        }

        const newCardElement = cardElement.cloneNode(true);

        const cardImage = newCardElement.querySelector('.card__image');
        const cardDeleteButton = newCardElement.querySelector('.card__delete-button');
        const cardTitle = newCardElement.querySelector('.card__title');

        if (!(cardImage || cardDeleteButton || cardTitle)) {
            console.error('Не удалось найти элементы шаблона карточки'); 
            return;
        }

        cardImage.src = cardData.link ? cardData.link : '';
        cardImage.alt = cardData.name ? cardData.name : '';
        cardTitle.textContent = cardData.name ? cardData.name : 'Не найдено';

        if (!cardDeleteHandler) {
            console.log('Хэндлер удаления карточки не передан');
        } else {
            newCardElement.addEventListener('click', () => deleteCard(newCardElement));
        }

        return newCardElement;
    }

    // @todo: Функция удаления карточки

    const deleteCard = (cardElement) => {
        if (!cardElement) {
            console.log('Не передана карточка для удаления');
            return;
        }

        cardElement.remove();
    }; 

    // @todo: Вывести карточки на страницу

    const createCards = (cardTemplateSelector, cardData, cardsContainerSelector, deleteCardHandler) => {
        if (!cardTemplateSelector) {
            console.error('Не передан селектор шаблона карт');
            return
        }

        if (!cardData) {
            console.error('Не переданы данные для карт');
            return
        }

        if (!cardsContainerSelector) {
            console.error('Не передан селектор контейнера для карт');
            return
        }

        const cardsContainerElement = document.querySelector(cardsContainerSelector);
        if (!cardsContainerElement) {
            console.error('Не удалось получить контейнер для карт');
            return
        }

        cardData.forEach(card => {
            const cardElement = createCard(cardTemplateSelector, card, deleteCardHandler);
            if (cardElement) {
                cardsContainerElement.append(cardElement);
            } else {
                console.error('Не удалось создать карточку');
                return;
            }
        })
    }

    createCards(cardTemplateSelector, initialCards, cardsContainerSelector, deleteCard);
})