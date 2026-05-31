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
    'about.desc': 'Somos un grupo de expertos en analítica, tecnologías, procesos y asesores en naturaleza de negocios.',
    'acc.title1': 'Propósito', 'acc.body1': 'Impulsar organizaciones más inteligentes...',
    'acc.title2': 'Misión', 'acc.body2': 'En Datela BI desarrollamos soluciones de inteligencia de negocios...',
    'acc.title3': 'Visión', 'acc.body3': 'Para el año 2030, Datela BI será reconocida como una empresa líder...',
    'contact.label': 'Hablemos',
    'contact.title': 'Contáctenos',
    'contact.name_placeholder': 'Tu nombre',
    'contact.email_placeholder': 'tu@correo.com',
    'contact.subject_placeholder': '¿En qué podemos ayudarte?',
    'contact.message_placeholder': 'Cuéntanos sobre tu proyecto...',
    'contact.submit_button': 'Enviar mensaje',
    'footer.copyright': '© 2026 Datela BI S.A.S. Todos los derechos reservados.'
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
    'about.desc': 'We are a group of experts in analytics, technologies, processes, and business advisors.',
    'acc.title1': 'Purpose', 'acc.body1': 'Drive smarter organizations...',
    'acc.title2': 'Mission', 'acc.body2': 'At Datela BI we develop business intelligence solutions...',
    'acc.title3': 'Vision', 'acc.body3': 'By the year 2030, Datela BI will be recognized as a leading company...',
    'contact.label': 'Let\'s Talk',
    'contact.title': 'Contact Us',
    'contact.name_placeholder': 'Your name',
    'contact.email_placeholder': 'your@email.com',
    'contact.subject_placeholder': 'How can we help you?',
    'contact.message_placeholder': 'Tell us about your project...',
    'contact.submit_button': 'Send Message',
    'footer.copyright': '© 2026 Datela BI S.A.S. All rights reserved.'
  }
};
/**
 * Datela BI S.A.S. — main.js
 * Lógica interactiva de la landing page con validación avanzada y reCAPTCHA
 * Versión 2.0
 */

'use strict';

/* ============================================================
   1. UTILIDADES
============================================================ */

/**
 * Selector abreviado
 * @param {string} selector
 * @param {Element|Document} [ctx=document]
 * @returns {Element|null}
 */
const $ = (selector, ctx = document) => ctx.querySelector(selector);

/**
 * Selector múltiple abreviado
 * @param {string} selector
 * @param {Element|Document} [ctx=document]
 * @returns {NodeList}
 */
const $$ = (selector, ctx = document) => ctx.querySelectorAll(selector);

/**
 * Ejecuta un callback cuando el DOM está listo
 * @param {Function} fn
 */
const onReady = (fn) => {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

/* ============================================================
   2. NAVBAR — Scroll + Hamburger
============================================================ */

const initNavbar = () => {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');

  if (!navbar) return;

  // Scroll: agrega clase "scrolled" al bajar
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // estado inicial

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      // Prevenir scroll del body cuando el menú está abierto
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    $$('.nav-link', navLinks).forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navbar.contains(e.target)
      ) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
};

/* ============================================================
   3. ACORDEÓN — Quiénes Somos
============================================================ */

const initAccordion = () => {
  const accordion = $('#accordion');
  if (!accordion) return;

  const items = $$('.accordion__item', accordion);

  items.forEach((item) => {
    const trigger = $('.accordion__trigger', item);
    const panel   = $('.accordion__panel', item);

    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Cerrar todos los demás (comportamiento de acordeón exclusivo)
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          closeAccordionItem(otherItem);
        }
      });

      // Toggle el actual
      if (isOpen) {
        closeAccordionItem(item);
      } else {
        openAccordionItem(item);
      }
    });

    // Soporte de teclado
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        trigger.click();
      }
    });
  });
};

/**
 * Abre un ítem del acordeón con animación
 * @param {Element} item
 */
const openAccordionItem = (item) => {
  const trigger = $('.accordion__trigger', item);
  const panel   = $('.accordion__panel', item);
  const body    = $('.accordion__body', item);

  if (!trigger || !panel || !body) return;

  item.classList.add('is-open');
  trigger.setAttribute('aria-expanded', 'true');
  panel.removeAttribute('hidden');

  // Animación de altura
  const targetHeight = body.scrollHeight + 'px';
  panel.style.maxHeight = '0';
  // Forzar reflow
  panel.getBoundingClientRect();
  panel.style.maxHeight = targetHeight;
};

/**
 * Cierra un ítem del acordeón con animación
 * @param {Element} item
 */
const closeAccordionItem = (item) => {
  const trigger = $('.accordion__trigger', item);
  const panel   = $('.accordion__panel', item);

  if (!trigger || !panel) return;

  item.classList.remove('is-open');
  trigger.setAttribute('aria-expanded', 'false');
  panel.style.maxHeight = '0';

  // Ocultar después de la transición
  panel.addEventListener(
    'transitionend',
    () => {
      if (!item.classList.contains('is-open')) {
        panel.setAttribute('hidden', '');
        panel.style.maxHeight = '';
      }
    },
    { once: true }
  );
};

/* ============================================================
   4. SCROLL ANIMATIONS — Intersection Observer
============================================================ */

const initScrollAnimations = () => {
  const elements = $$('.animate-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
};

/* ============================================================
   5. BACK TO TOP
============================================================ */

const initBackToTop = () => {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/* ============================================================
   6. SELECTOR DE IDIOMA
============================================================ */

const initLangSwitcher = () => {
  const switcher = $('#langSwitcher');
  if (!switcher) return;

  const buttons = $$('.lang-btn', switcher);

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remover estado activo de todos
      buttons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });

      // Activar el seleccionado
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const lang = btn.dataset.lang;
      document.documentElement.setAttribute('lang', lang);

      // Aquí se puede integrar una librería i18n en el futuro
      console.info(`[Datela BI] Idioma seleccionado: ${lang.toUpperCase()}`);
    });
  });
};

/* ============================================================
   7. FORMULARIO DE CONTACTO CON RECAPTCHA AVANZADO
============================================================ */

const initContactForm = () => {
  const form       = $('#contactForm');
  const notice     = $('#formNotice');
  const submitBtn  = $('#submitBtn');

  if (!form || !notice || !submitBtn) return;

  // Validadores de campo
  const validators = {
    name: (value) => {
      if (!value.trim()) return 'El nombre es requerido';
      if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'El nombre solo puede contener letras';
      return null;
    },
    email: (value) => {
      if (!value.trim()) return 'El correo es requerido';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Por favor, ingresa un correo válido';
      return null;
    },
    subject: (value) => {
      if (!value.trim()) return 'El asunto es requerido';
      if (value.trim().length < 5) return 'El asunto debe tener al menos 5 caracteres';
      if (value.trim().length > 100) return 'El asunto no puede exceder 100 caracteres';
      return null;
    },
    message: (value) => {
      if (!value.trim()) return 'El mensaje es requerido';
      if (value.trim().length < 10) return 'El mensaje debe tener al menos 10 caracteres';
      if (value.trim().length > 2000) return 'El mensaje no puede exceder 2000 caracteres';
      return null;
    }
  };

  // Validar campo individual
  const validateField = (fieldName) => {
    const field = $(`#${fieldName}`, form);
    const errorEl = $(`#${fieldName}Error`, form);
    if (!field || !errorEl) return true;

    const error = validators[fieldName]?.(field.value);
    
    if (error) {
      field.classList.add('field--error');
      errorEl.textContent = error;
      return false;
    } else {
      field.classList.remove('field--error');
      errorEl.textContent = '';
      return true;
    }
  };

  // Validar reCAPTCHA
  const validateRecaptcha = () => {
    const recaptchaError = $('#recaptchaError', form);
    const recaptchaResponse = typeof grecaptcha !== 'undefined' ? grecaptcha.getResponse() : null;
    
    if (!recaptchaResponse) {
      if (recaptchaError) recaptchaError.textContent = 'Por favor, completa el reCAPTCHA';
      return false;
    } else {
      if (recaptchaError) recaptchaError.textContent = '';
      return true;
    }
  };

  // Validación en tiempo real
  $$('input[required], textarea[required]', form).forEach((field) => {
    field.addEventListener('blur', () => {
      const fieldName = field.id;
      if (fieldName) validateField(fieldName);
    });

    field.addEventListener('input', () => {
      const errorEl = $(`#${field.id}Error`, form);
      if (errorEl && errorEl.textContent) {
        validateField(field.id);
      }
    });
  });

  // Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    $$('.form__error', form).forEach((el) => el.textContent = '');
    $$('.field--error', form).forEach((el) => el.classList.remove('field--error'));

    // Validar todos los campos
    const isNameValid = validateField('name');
    const isEmailValid = validateField('email');
    const isSubjectValid = validateField('subject');
    const isMessageValid = validateField('message');
    const isRecaptchaValid = validateRecaptcha();

    if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid || !isRecaptchaValid) {
      notice.textContent = 'Por favor, corrige los errores en el formulario.';
      notice.style.color = '#FF6B6B';
      return;
    }

    // Deshabilitar botón
    submitBtn.disabled = true;
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="ph ph-spinner" aria-hidden="true" style="animation: spin 1s linear infinite;"></i> Enviando...';

    try {
      // Aquí iría la llamada a tu API backend
      // Ejemplo:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: $('#name', form).value,
      //     email: $('#email', form).value,
      //     subject: $('#subject', form).value,
      //     message: $('#message', form).value,
      //     recaptchaToken: grecaptcha.getResponse()
      //   })
      // });
      // if (!response.ok) throw new Error('Error en la respuesta del servidor');

      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1500));

      notice.textContent = '✓ ¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.';
      notice.style.color = 'var(--color-cyan)';
      form.reset();
      
      if (typeof grecaptcha !== 'undefined') {
        grecaptcha.reset();
      }

      // Limpiar mensaje después de 6 segundos
      setTimeout(() => {
        notice.textContent = '';
      }, 6000);

    } catch (error) {
      console.error('Error al enviar formulario:', error);
      notice.textContent = '✗ Error al enviar el mensaje. Por favor, intenta de nuevo.';
      notice.style.color = '#FF6B6B';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHTML;
    }
  });
};

/* ============================================================
   8. AÑO DINÁMICO EN FOOTER
============================================================ */

const initFooterYear = () => {
  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

/* ============================================================
   9. SMOOTH SCROLL PARA ANCLAS INTERNAS
============================================================ */

const initSmoothScroll = () => {
  $$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = $(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height'),
        10
      ) || 72;

      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
};

/* ============================================================
   10. ACTIVE NAV LINK — Highlight al hacer scroll
============================================================ */

const initActiveNavLink = () => {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const navbarHeight = parseInt(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--navbar-height'),
    10
  ) || 72;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: `-${navbarHeight}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
};

/* ============================================================
   11. ANIMACIÓN DE SPINNER
============================================================ */

const initSpinnerAnimation = () => {
  if (!document.querySelector('style[data-spinner]')) {
    const style = document.createElement('style');
    style.setAttribute('data-spinner', '');
    style.textContent = `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
};

/* ============================================================
   12. INICIALIZACIÓN PRINCIPAL
============================================================ */

onReady(() => {
  initNavbar();
  initAccordion();
  initScrollAnimations();
  initBackToTop();
  initLangSwitcher(  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      // Cambiar textos
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = translations[lang][key];
          } else {
            el.textContent = translations[lang][key];
          }
        }
      });
      // Cambiar estado visual de botones
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      localStorage.setItem('selectedLanguage', lang);
    });
  });

  // Cargar idioma guardado al iniciar
  const savedLang = localStorage.getItem('selectedLanguage') || 'es';
  document.querySelector(`.lang-btn[data-lang="${savedLang}"]`)?.click();
);
  initContactForm();
  initFooterYear();
  initSmoothScroll();
  initActiveNavLink();
  initSpinnerAnimation();

  console.info('%c Datela BI S.A.S. — Landing Page v2.0 (con reCAPTCHA) ', 'background:#0B2046;color:#00A4E4;font-weight:bold;padding:4px 8px;border-radius:4px;');
});
