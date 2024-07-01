menuDisplay();
statutDiplay();

function menuDisplay() {
    const menu = document.querySelector('.menu');

    menu.addEventListener('click', () => {
        const header = document.querySelector('.header');
        const main = document.querySelector('.main')
        header.classList.toggle('active');
        header.classList.contains('active') ? main.style.paddingTop = '71px' : main.style.paddingTop = '0px'
        
    });
}

function statutDiplay() {
    const statutDev = document.querySelector('.title-dev');
    const statutFin = document.querySelector('.title-fin');
    const contentFin = document.querySelector('.fin');
    const contentDev = document.querySelector('.dev');

    statutDev.addEventListener('click', () => {
        if(!statutDev.classList.contains('title-active')) {
            statutDev.classList.add('title-active')
            contentDev.style.display = 'block'
            contentFin.style.display = 'none'
            statutFin.classList.remove('title-active')
        }
    })

    statutFin.addEventListener('click', () => {
        if(!statutFin.classList.contains('title-active')) {
            statutFin.classList.add('title-active')
            contentDev.style.display = 'none'
            contentFin.style.display = 'block'
            statutDev.classList.remove('title-active')
        }
    })
}


const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const playPauseButton = document.querySelector('.play-pause-button');

let currentSlide = 1;
const slides = document.querySelectorAll('.temoignage');
const slideWidth = slides[0].offsetWidth;

carousel.style.transform = `translateX(-${(currentSlide - 1) * slideWidth}px)`;

prevButton.addEventListener('click', () => {
  goToSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentSlide + 1);
});

playPauseButton.addEventListener('click', () => {
  togglePlayPause();
});

function goToSlide(newSlide) {
  if (newSlide < 1) {
    newSlide = slides.length;
  } else if (newSlide > slides.length) {
    newSlide = 1;
  }

  carousel.style.animation = 'none';
  carousel.style.transform = `translateX(-${(newSlide - 1) * slideWidth}px)`;
  currentSlide = newSlide;
}

function togglePlayPause() {
  if (playPauseButton.classList.contains('desactive')) {
    playPauseButton.classList.remove('desactive')
    carousel.style.animation = 'auto';
    playPauseButton.textContent = 'Stop';
  } else {
    playPauseButton.classList.add('desactive')
    carousel.style.animation = 'none'
    playPauseButton.textContent = 'Play';
  }
}
