/**
 * DATELA BI S.A.S. - Versión Integrada (Original + Idiomas)
 */

// --- 1. DICCIONARIO DE TRADUCCIONES ---
const translations = {
  es: {
    'nav.quienes': '¿Quiénes Somos?',
    'nav.servicios': 'Servicios',
    'nav.equipo': 'Equipo',
    'nav.contacto': 'Contáctenos',
    'hero.title': 'Transforma tus datos en decisiones estratégicas',
    'hero.subtitle': 'En Datela BI ayudamos a las empresas a convertir datos en decisiones inteligentes.',
    'hero.stat2-label': 'Años de experiencia',
    'about.label': 'La empresa',
    'about.title': '¿Quiénes Somos?',
    'acc.title1': 'Propósito',
    'acc.title2': 'Misión',
    'acc.title3': 'Visión',
    'services.title': 'Servicios',
    'team.role': 'CEO & Fundador'
  },
  en: {
    'nav.quienes': 'About Us',
    'nav.servicios': 'Services',
    'nav.equipo': 'Team',
    'nav.contacto': 'Contact Us',
    'hero.title': 'Transform your data into strategic decisions',
    'hero.subtitle': 'At Datela BI we help companies turn data into intelligent decisions.',
    'hero.stat2-label': 'Years of experience',
    'about.label': 'The Company',
    'about.title': 'About Us',
    'acc.title1': 'Purpose',
    'acc.title2': 'Mission',
    'acc.title3': 'Vision',
    'services.title': 'Services',
    'team.role': 'CEO & Founder'
  }
};

// --- 2. LÓGICA DE IDIOMAS ---
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
      });
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('datela-lang', lang);
    });
  });
  const savedLang = localStorage.getItem('datela-lang') || 'es';
  const activeBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
  if (activeBtn) activeBtn.click();
}

// --- 3. TU CÓDIGO ORIGINAL (Menú, Acordeón, Animaciones) ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('navbar--scrolled');
    else navbar.classList.remove('navbar--scrolled');
  });
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('navbar__links--active');
    });
  }
}

function initAccordion() {
  const triggers = document.querySelectorAll('.accordion__trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !isExpanded);
      panel.hidden = isExpanded;
      trigger.querySelector('i').className = isExpanded ? 'ph ph-plus' : 'ph ph-x';
    });
  });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initNavbar();
  initAccordion();
  initAnimations();
});

