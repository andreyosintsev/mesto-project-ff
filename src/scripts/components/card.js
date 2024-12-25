import { cardTemplate } from "../elements";
import { openModal } from "./modal";
import { popupImage } from "../elements";

//Функция создания карточки

function createCard(cardData, cardDeleteHandler, cardLikeHandler, cardShowHandler) {
    if (!cardData) {
        console.error('Не переданы данные для карточки');
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
        console.error('Хэндлер удаления карточки не передан');
    }

    if (!cardLikeHandler) {
        console.error('Хэндлер лайкания карточки не передан');
    }

    if (!cardShowHandler) {
        console.error('Хэндлер просмотра карточки не передан');
    }

    const buttonDelete = newCardElement.querySelector('.card__delete-button');
    if (buttonDelete) {
        buttonDelete.addEventListener('click', () => deleteCard(newCardElement));
    }

    const buttonLike = newCardElement.querySelector('.card__like-button');
    if (buttonLike) {
        buttonLike.addEventListener('click', () => likeCard(newCardElement));
    }

    const image = newCardElement.querySelector('.card__image');
    if (image) {
        image.addEventListener('click', () => showCard(newCardElement));
    }

    return newCardElement;
}

//Функция удаления карточки

function deleteCard(cardElement) {
    if (!cardElement) {
        console.error('Не передана карточка для удаления');
        return;
    }

    cardElement.remove();
};

//@todo: функция лайка карточки
function likeCard(cardElement) {
    if (!cardElement) {
        console.error('Не передана карточка для лайка');
        return;
    }

    const heart = cardElement.querySelector('.card__like-button');
    heart.classList.toggle('card__like-button_is-active');
};

function showCard(cardElement) {
    if (!cardElement) {
        console.error('Не передана карточка для отображения');
        return;
    }

    const popup = document.querySelector('.popup_type_image');
    const popupImage = popup.querySelector('.popup__image');
    const cardImage = cardElement.querySelector('.card__image');
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    openModal(popup);
};

export {
    createCard,
    deleteCard,
    likeCard,
    showCard
}