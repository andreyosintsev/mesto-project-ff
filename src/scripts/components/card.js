import { cardTemplate } from "../elements";
import { openModal } from "./modal";
import { popupImage } from "../elements";
import { deleteExistingCard, setLike, unsetLike } from "../api";

//Функция создания карточки

function createCard(cardData, userInfo, cardDeleteHandler, cardLikeHandler, cardShowHandler) {
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
    const cardLike = newCardElement.querySelector('.card__like-button');
    const cardLikes = newCardElement.querySelector('.card__like-counter');

    if (!(cardImage || cardDeleteButton || cardTitle || cardLikes)) {
        console.error('Не удалось найти элементы шаблона карточки'); 
        return;
    }

    newCardElement.dataset.cardId = cardData._id;
    newCardElement.dataset.ownerId = cardData.owner._id;
    cardImage.src = cardData.link ? cardData.link : '';
    cardImage.alt = cardData.name ? cardData.name : '';
    cardTitle.textContent = cardData.name ? cardData.name : 'Не найдено';
    cardLikes.textContent = cardData.likes.length;

    if (cardData._id == '677149e79c61f40fbee1b98e') {
      console.log('createCard cardData: ', cardData);
    }
   
    if (cardData.likes.filter(like => like._id === userInfo._id).length > 0) {
      cardLike.classList.add('card__like-button_is-active');
    } else {
      cardLike.classList.remove('card__like-button_is-active');
    }

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
    if (buttonDelete && cardData.owner._id == userInfo._id  ) {
        buttonDelete.addEventListener('click', () => deleteCard(newCardElement));
    } else {
        buttonDelete.style.display = 'none';
    }

    const buttonLike = newCardElement.querySelector('.card__like-button');
    if (buttonLike) {
        buttonLike.addEventListener('click', () => likeCard(newCardElement, userInfo));
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

    deleteExistingCard(cardElement.dataset.cardId)
    .then(() => cardElement.remove());    
}

//@todo: функция лайка карточки
function likeCard(cardElement, userInfo) {
    if (!cardElement) {
        console.error('Не передана карточка для лайка');
        return;
    }

    const cardLikes = cardElement.querySelector('.card__like-counter');
    const cardLike = cardElement.querySelector('.card__like-button');

    if (cardLike.classList.contains('card__like-button_is-active')) {
      unsetLike(cardElement.dataset.cardId)
      .then(cardData => {
        if (cardData.likes.filter(like => like._id === userInfo._id).length > 0) {
          cardLike.classList.add('card__like-button_is-active');
        } else {
          cardLike.classList.remove('card__like-button_is-active');
        }
        cardLikes.textContent = cardData.likes.length;
      });
    } else {
      setLike(cardElement.dataset.cardId)
      .then(cardData => {
        console.log('cardData: ', cardData);
        console.log('ownerId: ', cardElement.dataset.ownerId);
        if (cardData.likes.filter(like => like._id === userInfo._id).length > 0) {
          cardLike.classList.add('card__like-button_is-active');
        } else {
          cardLike.classList.remove('card__like-button_is-active');
        }
        cardLikes.textContent = cardData.likes.length;
      });
    }
}

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
}

export {
    createCard,
    deleteCard,
    likeCard,
    showCard
};