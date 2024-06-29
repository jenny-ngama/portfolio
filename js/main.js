const menu = document.querySelector('.menu');

menu.addEventListener('click', menuDisplay);

function menuDisplay() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('nav-active');
}