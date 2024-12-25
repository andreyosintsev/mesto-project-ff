import { popups } from '../elements.js';

function openModal(popupElement) {
    if (!popupElement) {
        return;
    }

    popupElement.classList.add('popup_is-opened');

    const popupCloseButton = popupElement.querySelector('.popup__close');
    
    
    popupCloseButton.addEventListener('click', () => closeModal(popupElement));
    document.addEventListener('keydown', closeModalByEsc)
}

function closeModal(popupElement) {
    if (!popupElement) {
        return;
    }
    
    popupElement.classList.remove('popup_is-opened');
    
    const popupCloseButton = popupElement.querySelector('.popup__close');
    
    popupCloseButton.removeEventListener('click', () => closeModal(popupElement));
    document.removeEventListener('keydown', closeModalByEsc);
}

function closeModalByEsc(e) {
    if (e.key === 'Escape') {
        popups.forEach(popup => closeModal(popup));
    }
}

export { openModal, closeModal }