// Карточки

const cardTemplate =    document.querySelector('#card-template');
const cardElement =     cardTemplate.querySelector('.card');
const cardsContainer =  document.querySelector('.places__list');

// Модальные окна

const popupEdit = document.querySelector('.popup_type_edit');
const popupNew = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

// Элементы на странице

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

export {
    cardTemplate,
    cardElement,
    cardsContainer,

    popupEdit,
    popupNew,
    popupImage,
    popups,

    buttonAdd,
    buttonEdit
}