/* ============================================================
   HAMBURGER MENU
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navWrapper = document.getElementById('nav-wrapper');
const navLinksEl = document.getElementById('nav-links');

const openMenu = () => {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    navWrapper.classList.add('open');
    document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    navWrapper.classList.remove('open');
    document.body.style.overflow = '';
};

hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close when a nav link is clicked
navLinksEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) closeMenu();
});
/* ============================================================
   PROJECT POPUP
   ============================================================ */
const projectCards = document.querySelectorAll('.project-card');
const projectCard = document.getElementById('project-card');
const projectCardTitle = document.getElementById('project-card-title');
const projectCardCategory = document.getElementById('project-card-category');
const popupChallenge = document.getElementById('popup-challenge');
const popupApproach = document.getElementById('popup-approach');
const popupOutcome = document.getElementById('popup-outcome');
const projectCardTech = document.getElementById('project-card-tech');
const projectCardGithub = document.getElementById('project-card-github');
const projectCardCaseStudy = document.getElementById('project-card-casestudy');
const projectCardClose = document.getElementById('project-card-close');
let lastFocusedProjectCard = null;

projectCard.setAttribute('inert', '');

const openProjectCard = (card) => {
    lastFocusedProjectCard = card;

    const title = card.dataset.projectTitle || card.querySelector('h4')?.textContent || 'Project';
    const category = card.dataset.projectCategory || '';
    const challenge = card.dataset.projectChallenge || '';
    const approach = card.dataset.projectApproach || '';
    const outcome = card.dataset.projectOutcome || '';
    const tech = card.dataset.projectTech || '';
    const github = card.dataset.projectGithub;
    const figma = card.dataset.projectFigma;
    const caseStudyUrl = card.dataset.projectUrl;
    const externalLink = github || figma || '';

    projectCardTitle.textContent = title;
    projectCardCategory.textContent = category;

    popupChallenge.textContent = challenge;
    popupApproach.textContent = approach;
    popupOutcome.textContent = outcome;

    if (tech) {
        projectCardTech.innerHTML = tech.split('·').map(t =>
            `<span class="tech-tag">${t.trim()}</span>`
        ).join('');
        projectCardTech.style.display = 'flex';
    } else {
        projectCardTech.innerHTML = '';
        projectCardTech.style.display = 'none';
    }

    projectCardGithub.href = externalLink || '#';
    projectCardGithub.textContent = github ? 'View on GitHub →' : 'View prototype →';
    projectCardGithub.style.display = externalLink ? 'inline-block' : 'none';

    // Show "Read case study" link for UX projects
    projectCardCaseStudy.href = caseStudyUrl || '#';
    projectCardCaseStudy.style.display = caseStudyUrl ? 'inline-block' : 'none';

    projectCard.removeAttribute('inert');
    projectCard.setAttribute('aria-hidden', 'false');
    document.body.classList.add('card-open');
    projectCardClose.focus();
};

const closeProjectCard = () => {
    if (projectCard.contains(document.activeElement)) {
        if (lastFocusedProjectCard) {
            lastFocusedProjectCard.focus();
        } else {
            document.activeElement.blur();
        }
    }
    projectCard.setAttribute('aria-hidden', 'true');
    projectCard.setAttribute('inert', '');
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
    if (event.target.dataset.closeCard === 'true') closeProjectCard();
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectCard.getAttribute('aria-hidden') === 'false') {
        closeProjectCard();
    }
});

/* ============================================================
   SKILL CAROUSELS — infinite auto-scroll + manual scroll
   ============================================================ */
function initSkillCarousels() {
    document.querySelectorAll('.skill-auto-track').forEach((track) => {
        const wrapper = track.parentElement;
        const originalCount = track.children.length;
        const originalItems = Array.from(track.children);
        const isMobile = window.innerWidth <= 768;
        const isUxTrack = track.classList.contains('skill-ux-track');
        if (isUxTrack && !isMobile) return;

        while (track.scrollWidth < window.innerWidth * 3) {
            originalItems.forEach((item) => {
                const clone = item.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
        }

        const itemWidth = track.scrollWidth / track.children.length;
        const loopWidth = itemWidth * originalCount;

        let speed = 0.6;
        let autoScroll = true;
        let pauseTimer;

        const resumeAuto = () => { autoScroll = true; };
        const pauseAuto = () => {
            autoScroll = false;
            clearTimeout(pauseTimer);
            pauseTimer = setTimeout(resumeAuto, 500);
        };

        wrapper.addEventListener('wheel', (e) => {
            if (e.deltaX !== 0 || e.shiftKey) pauseAuto();
        }, { passive: true });

        wrapper.addEventListener('pointerdown', pauseAuto, { passive: true });

        function tick() {
            if (autoScroll) wrapper.scrollLeft += speed;
            if (wrapper.scrollLeft >= loopWidth) wrapper.scrollLeft -= loopWidth;
            requestAnimationFrame(tick);
        }
        tick();
    });
}

window.addEventListener('load', initSkillCarousels);
/* ============================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================================ */
const animateSections = document.querySelectorAll('.animate-section');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

animateSections.forEach((section) => observer.observe(section));

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
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
};

const clearFieldError = (input, errorElement) => {
    errorElement.textContent = '';
    input.removeAttribute('aria-invalid');
    input.classList.remove('input-error');
};

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
        if (input === nameInput && nameInput.value.trim().length >= 2) clearFieldError(nameInput, nameError);
        if (input === emailInput && emailPattern.test(emailInput.value.trim())) clearFieldError(emailInput, emailError);
        if (input === messageInput && messageInput.value.trim().length >= 10) clearFieldError(messageInput, messageError);
    });
});


/* ============================================================
   ACTIVE NAV HIGHLIGHTING
   ============================================================ */
const sections = document.querySelectorAll('section[id], div[id="skills"]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

sections.forEach((section) => navObserver.observe(section));
/* ============================================================
   WEATHER WIDGET
   ============================================================ */
const GetWeather = () => {
    const apiKey = "7ba610c77d6c5b2e5bf6327a444554cc";
    const city = "Ängelholm";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;
    const weatherElement = document.getElementById("Ängelholm-Weather");

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then((data) => {
            const temp = data.main.temp;
            const location = data.name;
            const { description, icon } = data.weather[0];
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            weatherElement.innerHTML = `
                <img src="${iconUrl}" alt="${description}" class="weather-icon">
                <span class="weather-text">
                    <span>${location}: ${temp.toFixed(1)}°C</span>
                    <span class="weather-description">, ${description}</span>
                </span>
            `;
        })
        .catch(() => {});
};

GetWeather();