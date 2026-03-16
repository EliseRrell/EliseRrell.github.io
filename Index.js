const projectCards = document.querySelectorAll('.Developer-Projects .project-card');
const projectCard = document.getElementById('project-card');
const projectCardTitle = document.getElementById('project-card-title');
const projectCardDescription = document.getElementById('project-card-description');
const projectCardGithub = document.getElementById('project-card-github');
const projectCardClose = document.getElementById('project-card-close');

const openProjectCard = (card) => {
    const title = card.dataset.projectTitle || 'Project';
    const description = card.dataset.projectDescription || 'No project description added yet.';
    const github = card.dataset.projectGithub || '#';

    projectCardTitle.textContent = title;
    projectCardDescription.textContent = description;
    projectCardGithub.href = github;
    projectCard.setAttribute('aria-hidden', 'false');
    document.body.classList.add('card-open');
};

const closeProjectCard = () => {
    projectCard.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('card-open');
};

projectCards.forEach((card) => {
    card.addEventListener('click', () => openProjectCard(card));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProjectCard(card);
        }
    });
});
projectCardClose.addEventListener('click', closeProjectCard);
projectCard.addEventListener('click', (event) => {
    if (event.target.dataset.closeCard === 'true') {
        closeProjectCard();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectCard.getAttribute('aria-hidden') === 'false') {
        closeProjectCard();
    }
});

const contactForm = document.getElementById('contact-form-fields');
const nameInput = document.getElementById('name-of-contact');
const emailInput = document.getElementById('contact-email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');
const formStatus = document.getElementById('form-status');
const nextUrlInput = document.getElementById('next-url');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

nextUrlInput.value = new URL('confirmation.html', window.location.href).href;

const setFieldError = (input, errorElement, message) => {
    errorElement.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('input-error');
}
const clearFieldError = (input, errorElement) => {
    errorElement.textContent = '';
    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
}

const validateForm = () => {
    let isValid = true;

    formStatus.textContent = '';

    clearFieldError(nameInput, nameError);
    clearFieldError(emailInput, emailError);
    clearFieldError(messageInput, messageError);

    if (nameInput.value.trim().length < 2) {
        setFieldError(nameInput, nameError, 'Please enter your name (at least 2 characters).');
        isValid = false;
    }

    if (!emailPattern.test(emailInput.value.trim())) {
        setFieldError(emailInput, emailError, 'Please enter a valid email address.');
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        setFieldError(messageInput, messageError, 'Please write a message with at least 10 characters.');
        isValid = false;
    }

    return isValid;
};

contactForm.addEventListener('submit', (event) => {
    if (!validateForm()) {
        event.preventDefault();
        formStatus.textContent = 'Please correct the highlighted fields and try again.';
        return;
    }

    const popupWindow = window.open('', 'confirmationWindow', 'width=620,height=720');
    if (!popupWindow) {
        contactForm.setAttribute('target', '_blank');
    } else {
        contactForm.setAttribute('target', 'confirmationWindow');
    }
});

[nameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener('input', () => {
        formStatus.textContent = '';

        if (input === nameInput && nameInput.value.trim().length >= 2) {
            clearFieldError(nameInput, nameError);
        }

        if (input === emailInput && emailPattern.test(emailInput.value.trim())) {
            clearFieldError(emailInput, emailError);
        }

        if (input === messageInput && messageInput.value.trim().length >= 10) {
            clearFieldError(messageInput, messageError);
        }
    });
});

const GetWeather = () => {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
    const apiKey = "7ba610c77d6c5b2e5bf6327a444554cc";
    const city = "Ängelholm";
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=sv`;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network error");
            }
            return response.json();
        })
        .then((data) => {
            const temperature = data.main.temp;
            const location = data.name;
            document.getElementById("Ängelholm-Weather").innerHTML = `Temp in ${location} is ${temperature}°C.`;
        })
        .catch((error) => {
            console.error("Could not fetch weather", error);
        });
}

GetWeather();
