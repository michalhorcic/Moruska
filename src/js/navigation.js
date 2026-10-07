(() => {
    const nav = document.querySelector('[data-navigation]');
    if (!nav) return;
    const toggle = nav.querySelector('.nav-toggle');
    const panel = nav.querySelector('.nav-panel');
    const mobile = window.matchMedia('(max-width: 1200px)');
    const setOpen = (open, returnFocus = false) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? 'Zavřít' : 'Menu';
        panel.hidden = mobile.matches && !open;
        if (returnFocus) toggle.focus();
    };
    const measure = () => {
        // Measure only the compact bar: an expanded menu must not offset anchors.
        const height = mobile.matches
            ? toggle.getBoundingClientRect().bottom - nav.getBoundingClientRect().top + 12
            : nav.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
    };
    const reset = () => {
        toggle.hidden = !mobile.matches;
        setOpen(false);
        measure();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false, true);
        }
    });
    panel.addEventListener('click', (event) => {
        if (mobile.matches && event.target.closest('a')) setOpen(false, true);
    });
    nav.addEventListener('focusout', (event) => {
        if (mobile.matches && !nav.contains(event.relatedTarget)) setOpen(false);
    });
    mobile.addEventListener('change', reset);
    window.addEventListener('resize', measure);
    reset();
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(nav);
})();
