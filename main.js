/**
 * DATELA BI S.A.S. - Main JavaScript
 * Incluye: Navegación, Acordeón, Animaciones, Formulario e Idiomas (ES/EN)
 */

// 1. DICCIONARIO DE TRADUCCIONES
const translations = {
  es: {
    'nav.quienes': '¿Quiénes Somos?',
    'nav.servicios': 'Servicios',
    'nav.equipo': 'Equipo',
    'nav.contacto': 'Contáctenos',
    'hero.badge': 'Business Intelligence & Analytics',
    'hero.title': 'Transforma tus datos en decisiones estratégicas',
    'hero.subtitle': 'En Datela BI ayudamos a las empresas a convertir datos en decisiones inteligentes.',
    'hero.btn1': 'Más información',
    'hero.btn2': 'Conocer la empresa',
    'hero.stat1-label': 'Proyectos entregados',
    'hero.stat2-label': 'Años de experiencia',
    'hero.stat3-label': 'Clientes satisfechos',
    'about.label': 'La empresa',
    'about.title': '¿Quiénes Somos?',
    'services.label': 'Lo que hacemos',
    'services.title': 'Servicios',
    'team.label': 'Nuestro talento',
    'team.title': 'Equipo',
    'team.role': 'CEO & Fundador',
    'contact.label': 'Ponte en contacto',
    'contact.title': 'Contáctenos'
  },
  en: {
    'nav.quienes': 'About Us',
    'nav.servicios': 'Services',
    'nav.equipo': 'Team',
    'nav.contacto': 'Contact Us',
    'hero.badge': 'Business Intelligence & Analytics',
    'hero.title': 'Transform your data into strategic decisions',
    'hero.subtitle': 'At Datela BI we help companies turn data into intelligent decisions.',
    'hero.btn1': 'More Information',
    'hero.btn2': 'About the Company',
    'hero.stat1-label': 'Projects Delivered',
    'hero.stat2-label': 'Years of Experience',
    'hero.stat3-label': 'Satisfied Clients',
    'about.label': 'The Company',
    'about.title': 'About Us',
    'services.label': 'What we do',
    'services.title': 'Services',
    'team.label': 'Our Talent',
    'team.title': 'Team',
    'team.role': 'CEO & Founder',
    'contact.label': 'Get in Touch',
    'contact.title': 'Contact Us'
  }
};

// 2. FUNCIÓN PARA CAMBIAR IDIOMA
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      
      // Actualizar textos con data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
      });

      // Cambiar estado visual de los botones
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Guardar preferencia
      localStorage.setItem('datela-lang', lang);
    });
  });

  // Cargar idioma guardado
  const savedLang = localStorage.getItem('datela-lang') || 'es';
  const activeBtn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
  if (activeBtn) activeBtn.click();
}

// 3. NAVEGACIÓN Y MENÚ MÓVIL
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('navbar__links--active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('navbar__links--active');
    });
  });
}

// 4. ACORDEÓN INTERACTIVO
function initAccordion() {
  const triggers = document.querySelectorAll('.accordion__trigger');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Cerrar otros paneles
      triggers.forEach(otherTrigger => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherPanel = document.getElementById(otherTrigger.getAttribute('aria-controls'));
          otherPanel.hidden = true;
          otherTrigger.querySelector('i').className = 'ph ph-plus';
        }
      });

      // Alternar panel actual
      trigger.setAttribute('aria-expanded', !isExpanded);
      panel.hidden = isExpanded;
      trigger.querySelector('i').className = isExpanded ? 'ph ph-plus' : 'ph ph-x';
    });
  });
}

// 5. ANIMACIONES AL HACER SCROLL
function initAnimations() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// 6. FORMULARIO DE CONTACTO
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const notice = document.getElementById('formNotice');
    const recaptcha = grecaptcha.getResponse();

    if (!recaptcha) {
      document.getElementById('recaptchaError').textContent = 'Por favor, completa el reCAPTCHA';
      return;
    }

    notice.style.color = '#00A4E4';
    notice.textContent = '✓ ¡Mensaje enviado con éxito!';
    form.reset();
    grecaptcha.reset();
  });
}

// INICIALIZAR TODO
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initNavbar();
  initAccordion();
  initAnimations();
  initContactForm();
});
