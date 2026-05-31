/**
 * Datela BI S.A.S. — main.js
 * Lógica interactiva con soporte bilingüe (ES/EN), validación avanzada y reCAPTCHA
 * Versión 3.0
 */

'use strict';

/* ============================================================
   DICCIONARIO MULTILINGÜE
============================================================ */
const translations = {
  es: {
    // Navbar
    'nav.quienes': '¿Quiénes Somos?',
    'nav.servicios': 'Servicios',
    'nav.equipo': 'Equipo',
    'nav.contacto': 'Contáctenos',
    
    // Hero
    'hero.badge': 'Business Intelligence & Analytics',
    'hero.title': 'Transforma tus datos en decisiones estratégicas',
    'hero.subtitle': 'En Datela BI ayudamos a las empresas a convertir datos en decisiones inteligentes.',
    'hero.btn1': 'Más información',
    'hero.btn2': 'Conocer la empresa',
    'hero.stat1': '+[N]',
    'hero.stat1-label': 'Proyectos entregados',
    'hero.stat2': '23+',
    'hero.stat2-label': 'Años de experiencia',
    'hero.stat3': '+[N]',
    'hero.stat3-label': 'Clientes satisfechos',
    
    // Quiénes Somos
    'about.label': 'La empresa',
    'about.title': '¿Quiénes Somos?',
    'about.desc': 'Somos una consultora especializada en transformación digital, inteligencia de negocios y analítica de datos.',
    
    // Servicios
    'services.label': 'Lo que hacemos',
    'services.title': 'Servicios',
    
    // Equipo
    'team.label': 'Nuestro talento',
    'team.title': 'Equipo',
    'team.ceo': 'Ing. Roque Maldonado Insignares',
    'team.role': 'CEO & Fundador',
    
    // Contacto
    'contact.label': 'Ponte en contacto',
    'contact.title': 'Contáctenos',
    'contact.form-title': 'Envíanos tu consulta',
    'contact.name': 'Nombre completo',
    'contact.email': 'Correo electrónico',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar',
    'contact.phone': 'Teléfono',
    'contact.address': 'Ubicación',
    'contact.privacy': 'Al enviar este formulario, aceptas nuestra',
    'contact.privacy-link': 'Política de Privacidad',
    
    // Footer
    'footer.tagline': 'Transformamos datos en decisiones inteligentes',
    'footer.about': 'Acerca de',
    'footer.services': 'Servicios',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Uso',
    'footer.copyright': '© 2024 Datela BI S.A.S. Todos los derechos reservados.',
  },
  en: {
    // Navbar
    'nav.quienes': 'About Us',
    'nav.servicios': 'Services',
    'nav.equipo': 'Team',
    'nav.contacto': 'Contact',
    
    // Hero
    'hero.badge': 'Business Intelligence & Analytics',
    'hero.title': 'Transform your data into strategic decisions',
    'hero.subtitle': 'At Datela BI we help companies convert data into intelligent decisions.',
    'hero.btn1': 'Learn More',
    'hero.btn2': 'Know the Company',
    'hero.stat1': '+[N]',
    'hero.stat1-label': 'Projects Delivered',
    'hero.stat2': '23+',
    'hero.stat2-label': 'Years of Experience',
    'hero.stat3': '+[N]',
    'hero.stat3-label': 'Satisfied Clients',
    
    // Quiénes Somos
    'about.label': 'The Company',
    'about.title': 'About Us',
    'about.desc': 'We are a consulting firm specialized in digital transformation, business intelligence and data analytics.',
    
    // Servicios
    'services.label': 'What We Do',
    'services.title': 'Services',
    
    // Equipo
    'team.label': 'Our Talent',
    'team.title': 'Team',
    'team.ceo': 'Eng. Roque Maldonado Insignares',
    'team.role': 'CEO & Founder',
    
    // Contacto
    'contact.label': 'Get in Touch',
    'contact.title': 'Contact Us',
    'contact.form-title': 'Send us your inquiry',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'contact.phone': 'Phone',
    'contact.address': 'Location',
    'contact.privacy': 'By sending this form, you accept our',
    'contact.privacy-link': 'Privacy Policy',
    
    // Footer
    'footer.tagline': 'We transform data into intelligent decisions',
    'footer.about': 'About',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.copyright': '© 2024 Datela BI S.A.S. All rights reserved.',
  }
};

/* ============================================================
   SISTEMA DE IDIOMAS
============================================================ */
let currentLang = localStorage.getItem('datela-lang') || 'es';

const setLanguage = (lang) => {
  currentLang = lang;
  localStorage.setItem('datela-lang', lang);
  updatePageLanguage();
};

const t = (key) => {
  return translations[currentLang][key] || translations['es'][key] || key;
};

const updatePageLanguage = () => {
  // Actualizar navbar
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // Actualizar atributos placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Actualizar botones de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === currentLang);
  });
};

/* ============================================================
   UTILIDADES
============================================================ */

const $ = (selector, ctx = document) => ctx.querySelector(selector);
const $$ = (selector, ctx = document) => ctx.querySelectorAll(selector);

const onReady = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

/* ============================================================
   NAVBAR — Scroll + Hamburger
============================================================ */

const initNavbar = () => {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');

  if (!navbar) return;

  // Scroll: agrega clase "scrolled" al bajar
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Hamburger: toggle menú
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un link
    $$('.nav-link', navLinks).forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
};

/* ============================================================
   SELECTOR DE IDIOMA
============================================================ */

const initLanguageSwitcher = () => {
  const langButtons = $$('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
};

/* ============================================================
   ACORDEÓN — ¿Quiénes Somos?
============================================================ */

const initAccordion = () => {
  const accordion = $('#accordion');
  if (!accordion) return;

  const items = $$('.accordion__item', accordion);
  const buttons = $$('.accordion__trigger', accordion);

  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isOpen = !panel.hidden;

      // Cerrar todos los demás
      buttons.forEach((otherBtn, otherIndex) => {
        if (otherIndex !== index) {
          const otherPanel = otherBtn.nextElementSibling;
          otherPanel.hidden = true;
          otherBtn.setAttribute('aria-expanded', 'false');
          const icon = otherBtn.querySelector('.accordion__icon i');
          if (icon) icon.className = 'ph ph-plus';
        }
      });

      // Toggle el actual
      panel.hidden = isOpen;
      btn.setAttribute('aria-expanded', !isOpen);
      const icon = btn.querySelector('.accordion__icon i');
      if (icon) {
        icon.className = isOpen ? 'ph ph-plus' : 'ph ph-x';
      }
    });
  });
};

/* ============================================================
   ANIMACIONES ON SCROLL
============================================================ */

const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.animate-on-scroll').forEach(el => observer.observe(el));
};

/* ============================================================
   SCROLL INDICATOR (Hero)
============================================================ */

const initScrollIndicator = () => {
  const indicator = $('.hero__scroll');
  if (!indicator) return;

  const animate = () => {
    indicator.style.opacity = Math.sin(Date.now() / 500) * 0.5 + 0.5;
  };

  setInterval(animate, 50);
};

/* ============================================================
   VALIDACIÓN DE FORMULARIO
============================================================ */

const initContactForm = () => {
  const form = $('#contactForm');
  if (!form) return;

  const nameInput = $('#name');
  const emailInput = $('#email');
  const subjectInput = $('#subject');
  const messageInput = $('#message');
  const notice = $('#formNotice');

  // Validación en tiempo real
  const validateField = (field, rules) => {
    const value = field.value.trim();
    const errorEl = field.nextElementSibling;

    if (rules.minLength && value.length < rules.minLength) {
      if (errorEl) errorEl.textContent = `Mínimo ${rules.minLength} caracteres`;
      field.classList.add('error');
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      if (errorEl) errorEl.textContent = `Máximo ${rules.maxLength} caracteres`;
      field.classList.add('error');
      return false;
    }

    if (rules.email && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      if (errorEl) errorEl.textContent = 'Correo inválido';
      field.classList.add('error');
      return false;
    }

    if (errorEl) errorEl.textContent = '';
    field.classList.remove('error');
    return true;
  };

  nameInput?.addEventListener('blur', () => validateField(nameInput, { minLength: 3 }));
  emailInput?.addEventListener('blur', () => validateField(emailInput, { email: true }));
  subjectInput?.addEventListener('blur', () => validateField(subjectInput, { minLength: 5, maxLength: 100 }));
  messageInput?.addEventListener('blur', () => validateField(messageInput, { minLength: 10, maxLength: 2000 }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, { minLength: 3 });
    const isEmailValid = validateField(emailInput, { email: true });
    const isSubjectValid = validateField(subjectInput, { minLength: 5, maxLength: 100 });
    const isMessageValid = validateField(messageInput, { minLength: 10, maxLength: 2000 });

    const recaptchaResponse = grecaptcha?.getResponse?.();
    const isRecaptchaValid = !!recaptchaResponse;

    if (!isRecaptchaValid) {
      notice.style.color = '#FF6B6B';
      notice.textContent = '✗ Por favor, completa el reCAPTCHA';
      return;
    }

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      notice.style.color = '#00A4E4';
      notice.textContent = '✓ ¡Mensaje enviado! Nos contactaremos pronto.';
      form.reset();
      grecaptcha?.reset?.();
    } else {
      notice.style.color = '#FF6B6B';
      notice.textContent = '✗ Por favor, completa todos los campos correctamente.';
    }
  });
};

/* ============================================================
   LIGHTBOX PARA IMÁGENES DE SERVICIOS
============================================================ */

window.ampliarImagen = (ruta) => {
  const visor = document.getElementById('visor-imagen');
  const img = document.getElementById('img-ampliada');
  if (visor && img) {
    img.src = ruta;
    visor.style.display = 'flex';
  }
};

/* ============================================================
   INICIALIZACIÓN
============================================================ */

onReady(() => {
  // Establecer idioma inicial
  updatePageLanguage();

  // Inicializar componentes
  initLanguageSwitcher();
  initNavbar();
  initAccordion();
  initScrollAnimations();
  initScrollIndicator();
  initContactForm();
});
