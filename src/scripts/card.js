// @todo: Функция создания карточки

const createCard = (cardData, cardTemplate, cardDeleteHandler) => {
    if (!cardData) {
        console.error('Не переданы данные для карточки');
        return;
    }

    if (!cardTemplate) {
        console.error('Не передан шаблон карточки');
        return;
    }

    const cardElement = cardTemplate.content.querySelector('.card');
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

export {
    createCard,
    deleteCard
}