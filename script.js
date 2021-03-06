'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn-close-modal');
const btnOpenModal = document.querySelectorAll('.btn-show-modal');

const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');
const nav = document.querySelector('.nav');

const header = document.querySelector('.header');
const message = document.createElement('div');

const btnScrollTo = document.querySelector('.btn-scroll-to');
const sectionOne = document.querySelector('#scroll-into');
const allSections = document.querySelectorAll('.section');

const tabs = document.querySelectorAll('.operations-tab');
const tabsContainer = document.querySelector('.operations-tab-container');
const tabsContent = document.querySelectorAll('.operations-content');

const slide = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider-btn-left');
const btnRight = document.querySelector('.slider-btn-right');

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


mobileMenu.addEventListener('click', () => {
   navMenu.classList.add('show-menu')
})

mobileClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
})

navLinks.addEventListener('click' , (e) => {
    e.preventDefault();
    if(e.target.classList.contains('nav-link')){
        navMenu.classList.remove('show-menu')
    }
})

// ===============================================================

message.classList.add('cookie-massage');

message.innerHTML = 'We use cookies to improved functionality and analytics. <button class="btn btn-close-cookie">Got it!</button>';

header.append(message);

document.querySelector('.btn-close-cookie').addEventListener('click', ()=> message.remove());
message.style.backgroundColor = '#37383d'


// =========================================================

btnScrollTo.addEventListener('click', () => {
  sectionOne.scrollIntoView({behavior : "smooth" })
})

// ==========================================================

navLinks.addEventListener('click', e => {
    e.preventDefault();

    if(e.target.classList.contains('nav-link')){
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({behavior : 'smooth'});
    }
})

// =============================================================

tabsContainer.addEventListener('click',function(e) {
    const clicked = e.target.closest('.operations-tab');

    console.log(clicked);

    if(!clicked) return;

    tabs.forEach(t => t.classList.remove('operations-tab-active'))
    tabsContent.forEach(c => c.classList.remove('operations-content-active'))
    
    clicked.classList.add('operations-tab-active');  
    document.querySelector(`.operations-content-${clicked.dataset.tab}`).classList.add('operations-content-active');
});

// =========================================================

const handelHover = function (e){
    if(e.target.classList.contains('nav-link')){
        const link = e.target;
        const siblings = e.target.closest('.nav').querySelectorAll('.nav-link');
        const logo = e.target.closest('.nav').querySelector('img');
    
        siblings.forEach(el => {
            if(el !== link){
                el.style.opacity =this;
            }   
        })
        logo.style.opacity =this;
    
        }
}


nav.addEventListener('mouseover',  handelHover.bind(0.5));

nav.addEventListener('mouseout', handelHover.bind(1));

// // ==========================================================

// const initialChords = sectionOne.getBoundingClientRect();

// window.addEventListener('scroll', () => {

// if(window.scrollY > initialChords.top) nav.classList.add('sticky');
// else nav.classList.remove('sticky');

// })

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function(entries){
    const [entry] = entries;
    console.log(entry);

    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');

};

const headerObserver = new IntersectionObserver(
    stickyNav , {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`
    });

    headerObserver.observe(header);
// ================================================================

const revealSection = function(entries, observer){
    const [entry] = entries;

    if(!entry.isIntersecting) return;
    
    entry.target.classList.remove('section-hidden')
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(
    revealSection,{
        root: null,
        threshold: 0.15,
    });

allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section-hidden');
})    

// ===========================================================

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries ,observer){
   const [entry] = entries;

   if(!entry.isIntersecting) return;

   entry.target.src = entry.target.dataset.src

   entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
   })

   observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,
    {
    root: null,
    threshold: 0,
    rootMargin: '-200px'
    }) 

    
imgTargets.forEach(img => imgObserver.observe(img));    

// ===========================================================




const maxSlide = slide.length;
let curSlide = 0;


slide.forEach((s , i) => {
    s.style.transform = `translateX(${100 * i}%)`;
})



const goToSlide = function(sld){
    slide.forEach((s , i) => {
        s.style.transform = `translateX(${100 * (i - sld)}%)`;
    })
}

goToSlide(0);

const nextSlide = function(){
    
    if(curSlide === maxSlide - 1){
     curSlide = 0
    } else{
    curSlide++;
    }
 
    goToSlide(curSlide)
    activeDot(curSlide)
 }

 const prevSlide =  function(){
    
    if(curSlide === 0){
     curSlide = maxSlide - 1;
    } else{
    curSlide--;
    }
 
    goToSlide(curSlide)
    activeDot(curSlide)
 }

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)


// =================================================


document.addEventListener('keydown' , (e)=> {
    console.log(e)
    if(e.key === 'ArrowLeft') prevSlide();
     e.key === 'ArrowRight' && nextSlide();
})

const dotContainer = document.querySelector('.dots');

const createDots = function(){
    slide.forEach(function( _ , i){
     dotContainer.insertAdjacentHTML('beforeend',
     `<button class="dots-dot" data-slide="${i}"></button>`
     )
    })
}

createDots()

const activeDot = function(slide){
    document.querySelectorAll('.dots-dot').forEach(dot => dot.classList.remove('dots-dot-active'));

    document.querySelector(`.dots-dot[data-slide="${slide}"]`).classList.add('dots-dot-active');
}
activeDot(0);

dotContainer.addEventListener('click' , (e) => {
 if(e.target.classList.contains('dots-dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide)
    activeDot(slide)
 }
})



























// ==============================================

// const randomInt = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => `${randomInt(255 , 0)}, ${randomInt(255 , 0)},${randomInt(255 , 0)}`;
// console.log(randomColor());

// document.querySelector('.nav-link').addEventListener('click', () => {
//     document.body.style.backgroundColor = 'Green';
   
// })
