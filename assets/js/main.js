async function loadComponent(targetId, path) {
  const target = document.getElementById(targetId);
  if (!target) return;
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    target.innerHTML = '<div class="component-error">Unable to load this section. Run this site through a local web server.</div>';
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Component paths are relative to the page location.
  const isSubpage = window.location.pathname.includes('/pages/');
  const prefix = isSubpage ? '../' : '';
  await Promise.all([
    loadComponent('site-header', `${prefix}components/header.html`),
    loadComponent('site-navbar', `${prefix}components/navbar.html`),
    loadComponent('site-footer', `${prefix}components/footer.html`)
  ]);

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
    });
  }

  document.querySelectorAll('.dropdown-toggle').forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      button.nextElementSibling?.classList.toggle('is-open', !expanded);
    });
  });

  const year = document.getElementById('current-year');
  if (year) year.textContent = new Date().getFullYear();

  const searchForm = document.getElementById('site-search');
  const searchInput = document.getElementById('search-input');
  const message = document.getElementById('search-message');
  const cards = [...document.querySelectorAll('.category-card')];
  const emptyState = document.getElementById('empty-state');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', event => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        cards.forEach(card => card.hidden = false);
        if (emptyState) emptyState.hidden = true;
        if (message) message.textContent = 'Explore local places and useful information.';
        return;
      }
      let matches = 0;
      cards.forEach(card => {
        const text = `${card.textContent} ${card.dataset.search || ''}`.toLowerCase();
        const match = text.includes(query);
        card.hidden = !match;
        if (match) matches++;
      });
      if (emptyState) emptyState.hidden = matches !== 0;
      if (message) message.textContent = `${matches} ${matches === 1 ? 'category' : 'categories'} found.`;
      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    searchInput.addEventListener('input', () => {
      if (!searchInput.value.trim()) {
        cards.forEach(card => card.hidden = false);
        if (emptyState) emptyState.hidden = true;
        if (message) message.textContent = 'Explore local places and useful information.';
      }
    });
  }
});
