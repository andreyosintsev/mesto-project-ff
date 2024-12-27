import { popups } from '../elements.js';
import { clearValidation } from '../validation.js';

function openModal(popupElement) {
    if (!popupElement) {
        console.warn('Не передан элемент попапа');
        return;
    }

    const formElement = popupElement.querySelector('.popup__form');
    if (formElement) {
      console.log(formElement);
      clearValidation(formElement, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_inactive',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
    }
    
    popupElement.classList.add('popup_is-opened');

    const popupCloseButton = popupElement.querySelector('.popup__close');    
    
    popupCloseButton.addEventListener('click', () => closeModal(popupElement));
    document.addEventListener('keydown', closeModalByEsc);
}

function closeModal(popupElement) {  
    if (!popupElement) {
        console.warn('Не передан элемент попапа');
        return;
    }
    
    popupElement.classList.remove('popup_is-opened');
    const formElement = popupElement.querySelector('.popup__form');
    if (formElement) {
      formElement.reset();
    }
    
    const popupCloseButton = popupElement.querySelector('.popup__close');
    
    popupCloseButton.removeEventListener('click', () => closeModal(popupElement));
    document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(e) {
    if (e.key === 'Escape') {
        popups.forEach(popup => closeModal(popup));
    }
}

export { openModal, closeModal };