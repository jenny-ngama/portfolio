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