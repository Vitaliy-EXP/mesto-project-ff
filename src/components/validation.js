// Показать ошибку в спане
function showInputError(input, errorElement, config) {
  input.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
}

// Скрыть ошибку в спане
function hideInputError(input, errorElement, config) {
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

// Проверка валидности поля
function isValid(form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  if (input.validity.valid) {
    hideInputError(input, errorElement, config);
  } else {
    showInputError(input, errorElement, config);
  }
}

// Переключение состояния кнопки
function toggleButtonState(inputs, button, config) {
  const isValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isValid;
  button.classList.toggle(config.inactiveButtonClass, !isValid);
}

// Установка обработчиков событий
function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
  form.addEventListener('input', () => {
    const isFormValid = inputs.every((input) => input.validity.valid);
    submitButton.disabled = !isFormValid;
    submitButton.classList.toggle(config.inactiveButtonClass, !isFormValid);
  });
}

// Включение валидации
export function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}

// Очистка валидации
export function clearValidation(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputs.forEach((input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    hideInputError(input, errorElement, config);
  });

  toggleButtonState(inputs, submitButton, config);
}
