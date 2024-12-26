function enableValidation(validationConfig) {
  // formSelector: '.popup__form',
  // inputSelector: '.popup__input',
  // submitButtonSelector: '.popup__button',
  // inactiveButtonClass: 'popup__button_disabled',
  // inputErrorClass: 'popup__input_type_error',
  // errorClass: 'popup__error_visible'

  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
}

function clearValidation(formElement, validationConfig) {
  console.log('clearValidation');
  
  const errorElements = formElement.querySelectorAll(validationConfig.inputErrorClass);
  console.log(errorElements);
  errorElements.forEach(errorElement => {
    console.log(errorElement);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.value = '';
  });
 

  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);
  submitButton.classList.add(validationConfig.inactiveButtonClass);
}

function isValid(formElement, inputElement, validationConfig) {
  console.log('isValid');
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validity.patternMismatch
        ? inputElement.dataset.error
        : inputElement.validationMessage;
    console.log(errorMessage);
    showInputError(formElement, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  console.log(errorMessage);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.errorClass);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  console.log(inputList);
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

export {
  enableValidation,
  clearValidation
};