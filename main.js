/**
 * DATELA BI S.A.S. - Main JavaScript
 * Incluye: Navegación, Acordeón, Animaciones, Formulario e Idiomas (ES/EN)
 */

// 1. DICCIONARIO DE TRADUCCIONES COMPLETO
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
    'about.desc': 'Somos un grupo de expertos en analítica, tecnologías, procesos y asesores en naturaleza de negocios que nos permite brindarle servicios para capitalizar eficiente y eficazmente sus datos.',
    'acc.title1': 'Propósito',
    'acc.body1': 'Impulsar organizaciones más inteligentes mediante el uso estratégico de los datos, transformando la información en conocimiento que genere mejores decisiones, eficiencia y crecimiento sostenible.',
    'acc.title2': 'Misión',
    'acc.body2': 'En Datela BI desarrollamos soluciones de inteligencia de negocios, analítica empresarial, inteligencia artificial y gestión de datos, que permiten a las organizaciones transformar grandes volúmenes de información en conocimiento estratégico.',
    'acc.title3': 'Visión',
    'acc.body3': 'Para el año 2030, Datela BI será reconocida como una empresa líder en América Latina en soluciones de analítica avanzada, inteligencia de negocios e inteligencia artificial.',
    'acc.title4': 'Valores',
    'acc.title5': 'Propuesta de valor',
    'acc.body5': 'En Datela BI ayudamos a las organizaciones a convertir datos en decisiones inteligentes, integrando herramientas de inteligencia de negocios, analítica avanzada e inteligencia artificial.',
    'acc.title6': 'Enfoque estratégico',
    'services.label': 'Lo que hacemos',
    'services.title': 'Servicios',
    'team.label': 'Nuestro talento',
    'team.title': 'Equipo',
    'team.role': 'CEO & Fundador',
    'contact.label': 'Ponte en contacto',
    'contact.title': 'Contáctenos',
    'contact.form-title': 'Envíanos tu consulta',
    'contact.name': 'Nombre completo',
    'contact.email': 'Correo electrónico',
    'contact.subject': 'Asunto',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar'
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
    'about.desc': 'We are a group of experts in analytics, technologies, processes, and business advisors that allows us to provide services to efficiently and effectively capitalize on your data.',
    'acc.title1': 'Purpose',
    'acc.body1': 'Drive smarter organizations through the strategic use of data, transforming information into knowledge that generates better decisions, efficiency, and sustainable growth.',
    'acc.title2': 'Mission',
    'acc.body2': 'At Datela BI we develop business intelligence, business analytics, artificial intelligence, and data management solutions that allow organizations to transform large volumes of information into strategic knowledge.',
    'acc.title3': 'Vision',
    'acc.body3': 'By the year 2030, Datela BI will be recognized as a leading company in Latin America in advanced analytics, business intelligence, and artificial intelligence solutions.',
    'acc.title4': 'Values',
    'acc.title5': 'Value Proposition',
    'acc.body5': 'At Datela BI we help organizations turn data into intelligent decisions, integrating business intelligence tools, advanced analytics, and artificial intelligence.',
    'acc.title6': 'Strategic Focus',
    'services.label': 'What we do',
    'services.title': 'Services',
    'team.label': 'Our Talent',
    'team.title': 'Team',
    'team.role': 'CEO & Founder',
    'contact.label': 'Get in Touch',
    'contact.title': 'Contact Us',
    'contact.form-title': 'Send us your inquiry',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send'
  }
};

// 2. FUNCIÓN PARA CAMBIAR IDIOMA
function initLanguage() {
  const langBtns = document.querySelectorAll('.lang-btn');
  
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
          el.textContent = translations[lang][key];
        }
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

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('navbar__links--active');
    });
  }
}

// 4. ACORDEÓN INTERACTIVO
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

// 5. ANIMACIONES AL HACER SCROLL
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// 6. FORMULARIO DE CONTACTO
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const notice = document.getElementById('formNotice');
    notice.style.color = '#00A4E4';
    notice.textContent = '✓ ¡Mensaje enviado!';
    form.reset();
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
