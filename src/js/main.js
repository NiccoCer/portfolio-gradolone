import '../scss/style.scss';
import { content } from './content.js';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- RENDER CONTENT ---
const app = document.querySelector('#app');

app.innerHTML = `
  <header class="header">
    <nav class="header__nav">
        <ul>
            ${content.nav ? content.nav.map(link => `<li><a href="${link.link}">${link.label}</a></li>`).join('') : ''}
        </ul>
    </nav>
  </header>

  <main>
    <section id="hero" class="hero">
      <div class="hero__background">
        <img src="${content.hero.image}" alt="Hero Image">
      </div>
      <div class="hero__content">
        <h1 class="hero__title">${content.hero.title}</h1>
        <p class="hero__subtitle">${content.hero.subtitle}</p>
        <div class="scroll-indicator">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10L12 15L17 10" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
      </div>
    </section>

    <section id="about" class="about container">
        <div class="about__inner">
            <div class="about__image">
                <img src="${content.about.image}" alt="Profile Photo">
            </div>
            <div class="about__content">
                <h2 class="section-title">${content.about.title}</h2>
                <p class="about__text">${content.about.description}</p>
                <div id="contact" class="about__contact">
                    <a href="mailto:${content.about.email}" class="btn-link">${content.about.email}</a>
                    <p>${content.about.phone}</p>
                </div>
            </div>
        </div>
    </section>

    <section id="gallery" class="container">
      <div class="gallery">
        <div class="gallery__grid">
          ${content.gallery.map(item => `
            <article class="gallery__item">
              <div class="gallery__image-wrapper">
                  <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="gallery__info">
                <h3>${item.title}</h3>
                <p>${item.category}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>

    <footer class="footer">
        <a href="#hero" class="button"><img src="/images/logo.png" alt="Logo FG"></a>
        <nav class="footer__nav">
        <ul>
            ${content.nav ? content.nav.map(link => `<li><a href="${link.link}">${link.label}</a></li>`).join('') : ''}
        </ul>
        </nav>
      <p>${content.footer.text}</p>
    </footer>
    
    <!-- Lightbox Modal -->
    <div id="lightbox" class="lightbox">
        <button class="lightbox__prev">&lt;</button>
        <div class="lightbox__content">
            <button class="lightbox__close">&times;</button>
            <img src="" alt="Enlarged Photo">
        </div>
        <button class="lightbox__next">&gt;</button>
    </div>
  </main>
`;

// --- ANIMATIONS & INTERACTION ---

// Initialize Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

console.log('Portfolio initialized');

// Hero Animation
const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.5 } })

tl.to('.hero__content', { opacity: 1, duration: 1 })
  .to('.hero__title', { y: 0, opacity: 1 }, 0.2)
  .to('.hero__subtitle', { y: 0, opacity: 1 }, 0.4)
  .to('.scroll-indicator', { opacity: 0.7, y: 0, duration: 1 }, 1)
  .from('.hero__background img', { scale: 1.2, duration: 2, ease: 'power2.out' }, 0)


// About Animation
gsap.from('.about__inner', {
  scrollTrigger: {
    trigger: '.about',
    start: 'top 80%',
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});


// Gallery Animation
gsap.utils.toArray('.gallery__item').forEach((item, i) => {
  gsap.from(item, {
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      end: 'top 50%',
      scrub: 1,
    },
    y: 100,
    opacity: 0,
    duration: 1
  })
})

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Anchor Links Smooth Scroll (compatible with Lenis)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElem = document.querySelector(targetId);

    if (targetElem) {
      lenis.scrollTo(targetElem, { offset: -80 }); // Offset for header
    }
  });
});

// --- LIGHTBOX LOGIC ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox__close');
const prevBtn = lightbox.querySelector('.lightbox__prev');
const nextBtn = lightbox.querySelector('.lightbox__next');

let currentIndex = 0;
const allImages = Array.from(document.querySelectorAll('.hero__background img, .gallery__image-wrapper img'));

const openLightbox = (index) => {
  currentIndex = index;
  lightboxImg.src = allImages[currentIndex].src;
  lightbox.classList.add('active');
  lenis.stop();
};

const closeLightbox = () => {
  lightbox.classList.remove('active');
  setTimeout(() => {
    lightboxImg.src = '';
  }, 300);
  lenis.start();
};

const showNext = (e) => {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex + 1) % allImages.length;
  lightboxImg.src = allImages[currentIndex].src;
}

const showPrev = (e) => {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
  lightboxImg.src = allImages[currentIndex].src;
}

allImages.forEach((img, index) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    openLightbox(index);
  });
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
