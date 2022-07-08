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