(()=>{"use strict";function e(e,t,n,r,o){var c=t.querySelector(".places__item").cloneNode(!0),p=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),d=c.querySelector(".card__delete-button");return p.src=e.link,p.alt=e.name,u.textContent=e.name,d.addEventListener("click",(function(){return n(c)})),i.addEventListener("click",(function(){return r(c)})),p.addEventListener("click",(function(){return o(c)})),c}function t(e){e.remove()}function n(e){e.querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup__is-animated"),setTimeout((function(){e.classList.add("popup__is-opened")}),0),document.addEventListener("keydown",c),document.addEventListener("click",p)}function o(e){e.classList.remove("popup__is-opened"),e.addEventListener("transitionend",(function(){e.classList.remove("popup__is-animated")}),{once:!0}),document.removeEventListener("keydown",c),document.removeEventListener("click",p)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup__is-opened");t&&o(t)}}function p(e){e.target.classList.contains("popup__is-opened")&&o(e.target)}var u=document.querySelector("#card-template").content,i=document.querySelector(".places__list"),d=document.querySelector(".profile__edit-button"),a=document.querySelector(".profile__add-button"),s=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_image"),m=document.querySelectorAll(".popup__close"),y=document.querySelector('.popup__form[name="edit-profile"]'),v=document.querySelector('.popup__form[name="new-place"]'),f=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=_.querySelector(".popup__image"),S=_.querySelector(".popup__caption"),L=y.querySelector(".popup__input_type_name"),E=y.querySelector(".popup__input_type_description"),g=v.querySelector(".popup__input_type_place-name"),h=v.querySelector(".popup__input_type_link");function b(e){var t=e.querySelector(".card__image").src,n=e.querySelector(".card__title").textContent;q.src=t,q.alt=n,S.textContent=n,r(_)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,u,t,n,b);i.prepend(o)})),d.addEventListener("click",(function(){return r(s)})),a.addEventListener("click",(function(){return r(l)})),m.forEach((function(e){e.addEventListener("click",(function(){o(e.closest(".popup"))}))})),y.addEventListener("submit",(function(e){e.preventDefault(),f.textContent=L.value,k.textContent=E.value,o(s)})),v.addEventListener("submit",(function(r){r.preventDefault();var c=e({name:g.value,link:h.value},u,t,n,b);i.prepend(c),o(l)}))})();