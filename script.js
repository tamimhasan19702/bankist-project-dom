'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnOpenModal = document.querySelectorAll('.btn-show-modal');

// ====================================================

const openModal = function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnOpenModal.length; i++)
    btnOpenModal[i].addEventListener('click',openModal);

    btnCloseModal.addEventListener('click',closeModal);
    overlay.addEventListener('click' , closeModal);

    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && !modal.classList.contains('hidden'))
      closeModal()
    })

// ===============================================================

const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
   navMenu.classList.add('show-menu')
})

mobileClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})

// ===============================================================

const header = document.querySelector('.header');
const message = document.createElement('div');
message.classList.add('cookie-massage');

message.innerHTML = 'We use cookies to improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>';

header.append(message);

document.querySelector('.btn-close-cookie').addEventListener('click', ()=> message.remove());
message.style.backgroundColor = '#37383d'
message.style.width = '120%'

// =========================================================

const btnScrollTo = document.querySelector('.btn-scroll-to');
const sectionOne = document.querySelector('#scroll-into');

btnScrollTo.addEventListener('click', () => {
  sectionOne.scrollIntoView({behavior : "smooth" })
})