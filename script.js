const header = document.querySelector('.site-header');
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setCurrentSection = () => {
  if (!sections.length) return;
  const y = window.scrollY + Math.min(window.innerHeight * 0.42, 380);
  const current = sections.reduce((active, section) => (section.offsetTop <= y ? section : active), sections[0]);

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${current.id}`;
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const setHeaderState = () => {
  header?.classList.toggle('is-compact', window.scrollY > 16);
};

const tabs = Array.from(document.querySelectorAll('[data-tab]'));
const panels = Array.from(document.querySelectorAll('[data-panel]'));

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  });
});

window.addEventListener('scroll', () => {
  setCurrentSection();
  setHeaderState();
}, { passive: true });

window.addEventListener('resize', setCurrentSection);
setCurrentSection();
setHeaderState();
