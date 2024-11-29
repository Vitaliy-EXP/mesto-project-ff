// Открытие модального окна
export function openModal(modalElement) {
  modalElement.classList.add('popup__is-animated');
  setTimeout(() => {
    modalElement.classList.add('popup__is-opened');
  }, 0);
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOverlayClose);
}

// Закрытие модального окна
export function closeModal(modalElement) {
  modalElement.classList.remove('popup__is-opened');
  modalElement.addEventListener('transitionend', () => {
    modalElement.classList.remove('popup__is-animated');
  }, { once: true });
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOverlayClose);
}

// Закрытие по Esc
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Закрытие по клику на оверлей
function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup__is-opened')) {
    closeModal(evt.target);
  }
}
