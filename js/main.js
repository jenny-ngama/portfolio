const header = document.querySelector('.header');

menuDisplay();
statutDiplay();
slideProjects();
sendMessage();

// OUVRIR ET FERMER LA NAVIGATION
function menuDisplay() {
    const menu = document.querySelector('.menu');

    menu.addEventListener('click', () => {
        const main = document.querySelector('.main')
        header.classList.toggle('active');
        header.classList.contains('active') ? main.style.paddingTop = '71px' : main.style.paddingTop = '0px'
        
        if(header.classList.contains('active')) {
          document.body.style.height = '100vh';
          document.body.style.overflow = 'hidden';
        } else {
            document.body.style.height = 'auto';
            document.body.style.overflow = 'auto';
        }
    });
}

// NAVIGUER VERS L'ANCRE ET FERMER LA NAVIGATION
const links = document.querySelectorAll('.links li');
links.forEach(link => {
  link.addEventListener('click', () => {
    if(header.classList.contains('active')) {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
      header.classList.remove('active');
    } 
  })
});

// CHANGER LE TYPE D'INFORMATION DU STATUT DEV OU FIN
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

//  DEFILLEMENT DES PROJETS REALISES
function slideProjects() {
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
      carousel.style.animationName = 'display-temoignages';
      playPauseButton.textContent = 'Stop';
    } else {
      playPauseButton.classList.add('desactive')
      carousel.style.animationName = 'none'
      playPauseButton.textContent = 'Play';
    }
  }
}

// ENVOYER LE MESSAGE
function sendMessage() {
  const form = document.querySelector('#contact');
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const message = document.querySelector('#message');

  name.addEventListener('input', () => document.querySelector('#name + .errorInput') && document.querySelector('#name + .errorInput').remove()
  )
  email.addEventListener('input', () => document.querySelector('#email + .errorInput') && document.querySelector('#email + .errorInput').remove()
  )
  message.addEventListener('input', () => document.querySelector('#message + .errorInput') && document.querySelector('#message +.errorInput').remove()
  )

  form.addEventListener('submit', async(event) => {
    event.preventDefault();
    let isValid = true;

    if (name.value.trim() === '') {
      errorInput(name, "Veuillez saisir votre nom")
      isValid = false;
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
      errorInput(email, 'Veuillez saisir une adresse email valide')
      isValid = false;
    }

    if (message.value.trim() === '') {
      errorInput(message, 'Veuillez saisir votre message')
      isValid = false;
    }

    if(isValid) {
      try {
        displayMessage(form, 'load', 'Loading...', 'block')
  
        const data = {
          name: name.value.trim(),
          email: email.value.trim(),
          message: message.value.trim()
        }
  
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
  
        const response = await fetch('url', requestOptions);
  
        if (response.status === 200) {
          displayMessage(form, 'success', 'Votre message a été envoyé avec succès', 'block');
          name.value = '';
          email.value = '';
          message.value = '';
        } else {
            const message = await response.json();
            return displayMessage(form, 'error', 'Votre message n\'a pas été envoyé suite à une erreur du serveur', 'block')
        }
  
      } catch (error) {
          console.error(error);
          displayMessage(form, 'error', 'Erreur lors de l\'envoi de votre message, veuillez réessayer', 'block')
      }
    }

  })
}

// INFO ERREUR SAISIE
function errorInput(element, message) {
  const p = document.createElement('p');
  p.textContent = message;
  p.style.fontSize = '14px'
  p.style.color = 'red';
  p.classList.add('errorInput');
  element.insertAdjacentElement("afterEnd", p)
}

// MESSAGE INFO
function displayMessage(form, statusElement, message, display) {
    const dispalyAll = document.querySelectorAll('.displayMessage');
    dispalyAll?.forEach(element => element.style.display = 'none');

    const div = document.createElement('div');
    const close = document.createElement('div');
    const bar1 = document.createElement('div');
    const bar2 = document.createElement('div');
    const p = document.createElement('p');

    p.textContent = message;
    p.style.display = display;
    p.style.textAlign = 'center';
    div.style.color = statusElement === 'load' && '#0dcaf0' || statusElement === 'success' && "white" || statusElement === 'error' && 'white';
   
    bar1.style.transform = "rotate(45deg)";
    bar1.style.width = "3px";
    bar1.style.height = "18px";
    bar1.style.backgroundColor = "white";
    bar1.style.position = 'absolute';
    bar2.style.transform = "rotate(-45deg)";
    bar2.style.width = "3px";
    bar2.style.height = "18px";
    bar2.style.backgroundColor = "white";
    bar2.style.position = 'absolute';
    close.appendChild(bar1);
    close.appendChild(bar2);
    close.style.position = 'relative';
    close.style.cursor = 'pointer';
    close.style.marginLeft = 'auto';
    close.style.marginRight = '20px';
    close.style.backgroundColor = 'white';

    div.appendChild(close);
    div.appendChild(p);
    div.style.position = 'absolute';
    div.style.top = '50%'
    div.style.left = '50%'
    div.style.width = "50%"
    div.style.transform = 'translate(-50%, -50%)';
    div.style.padding = '15px';
    div.style.paddingTop = '6px';
    div.style.borderRadius = '15px'
    div.style.display = 'flex';
    div.style.flexDirection = 'column'
    div.style.justifyContent = 'space-between';
    div.style.alignItems = 'center';
    div.style.gap = '20px';
    div.classList.add('displayMessage');
    div.style.backgroundColor = statusElement === 'load' && '#0dcaf0' || statusElement === 'success' && "#198754" || statusElement === 'error' && '#dc3545';

    form.appendChild(div);
    form.style.position = 'relative';

    close.addEventListener('click', () => {
        div.style.display = 'none';
    })
    document.body.addEventListener('click', () => {
      div.style.display = 'none';
    })
}