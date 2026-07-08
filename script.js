const header = document.querySelector('.site-header');
const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const setCurrentSection = (id) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${id}`;
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
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

if ('IntersectionObserver' in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setCurrentSection(visible.target.id);
    }
  }, {
    rootMargin: '-28% 0px -55% 0px',
    threshold: [0.12, 0.28, 0.5]
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => setCurrentSection(link.getAttribute('href').slice(1)));
});

const hero = document.querySelector('.hero');
if (hero && header && 'IntersectionObserver' in window) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-compact', !entry.isIntersecting);
  }, { threshold: 0.18 });

  headerObserver.observe(hero);
}

const hashTarget = window.location.hash && document.querySelector(window.location.hash);
setCurrentSection(hashTarget?.id || sections[0]?.id);
