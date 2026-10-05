(() => {
  const dialog = document.querySelector('.gallery-dialog');
  const links = [...document.querySelectorAll('[data-gallery-image]')];
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('.gallery-full-image');
  const caption = dialog.querySelector('figcaption');
  const counter = dialog.querySelector('.gallery-counter');
  let current = 0;
  let previousOverflow;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    caption.textContent = link.closest('figure').querySelector('figcaption').lastChild.textContent.trim();
    counter.textContent = `${current + 1} / ${links.length}`;
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(index);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  dialog.querySelector('.gallery-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-gallery-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-gallery-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    links[current].focus({ preventScroll: true });
  });
})();
