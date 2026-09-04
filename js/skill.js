// Click (or Enter/Space) toggles a persistent "selected" state on a skill card.
// Selecting one card releases any previously selected card.
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#skills .card');

  function toggleSelect(card) {
    const alreadySelected = card.classList.contains('is-selected');
    cards.forEach(c => {
      c.classList.remove('is-selected');
      c.setAttribute('aria-pressed', 'false');
    });
    if (!alreadySelected) {
      card.classList.add('is-selected');
      card.setAttribute('aria-pressed', 'true');
    }
  }

  cards.forEach(card => {
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    card.addEventListener('click', () => toggleSelect(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleSelect(card);
      }
    });
  });
});