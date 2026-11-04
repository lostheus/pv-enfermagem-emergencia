/* Movimento contínuo para a direita. As cópias reutilizam as mesmas imagens. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wrapPosition = (value, cycle) => cycle ? ((value % cycle) + cycle) % cycle - cycle : 0;

  function createCarousel({ trackId, viewportSelector, wrapperSelector, previousSelector, nextSelector, controlsSelector, speed, label }) {
    const track = document.getElementById(trackId);
    if (!track) return;
    const viewport = document.querySelector(viewportSelector);
    const wrapper = document.querySelector(wrapperSelector);
    const originals = Array.from(track.children);
    if (!originals.length) return;

    // Three identical sets allow wrapping at an identical visual position.
    for (let set = 0; set < 2; set++) {
      originals.forEach(slide => {
        const clone = slide.cloneNode(true);
        clone.dataset.carouselClone = 'true';
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
        track.appendChild(clone);
      });
    }
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', label);
    viewport.style.touchAction = 'pan-y';
    track.style.transition = 'none';
    let cycle = 0;
    let position = 0;
    let lastTime = null;
    let frameId = null;
    let visible = false;
    let hovered = false;
    let focused = false;
    let paused = reducedMotion.matches;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startPosition = 0;
    let suppressClickUntil = 0;
    let pointerId = null;

    const controls = document.querySelector(controlsSelector);
    const pauseButton = document.createElement('button');
    pauseButton.type = 'button';
    pauseButton.className = 'carousel-pause';
    controls.replaceChildren(pauseButton);
    function updatePauseButton() {
      pauseButton.textContent = paused ? '▶ Retomar movimento' : 'Ⅱ Pausar movimento';
      pauseButton.setAttribute('aria-label', (paused ? 'Retomar' : 'Pausar') + ' ' + label.toLowerCase());
    }
    function paint() { track.style.transform = `translate3d(${position}px, 0, 0)`; }
    function measure() {
      const oldCycle = cycle;
      cycle = originals.reduce((width, el) => width + el.getBoundingClientRect().width, 0);
      position = oldCycle ? wrapPosition(position / oldCycle * cycle, cycle) : -cycle;
      paint();
    }
    function canMove() {
      return visible && !document.hidden && !paused && !hovered && !focused && !dragging && !document.querySelector('dialog[open]');
    }
    function tick(time) {
      if (lastTime !== null && canMove()) {
        // Cap time after a hidden tab or a slow frame so the strip never leaps.
        position = wrapPosition(position + speed * Math.min(time - lastTime, 50) / 1000, cycle);
        paint();
      }
      lastTime = time;
      frameId = canMove() ? requestAnimationFrame(tick) : null;
      if (!frameId) lastTime = null;
    }
    function refresh() {
      if (canMove() && frameId === null) frameId = requestAnimationFrame(tick);
      else if (!canMove() && frameId !== null) {
        cancelAnimationFrame(frameId); frameId = null; lastTime = null;
      }
    }
    function step(direction) {
      position = wrapPosition(position + direction * originals[0].getBoundingClientRect().width, cycle);
      paint();
    }
    document.querySelector(previousSelector).addEventListener('click', () => step(1));
    document.querySelector(nextSelector).addEventListener('click', () => step(-1));
    pauseButton.addEventListener('click', () => { paused = !paused; updatePauseButton(); refresh(); });
    wrapper.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') { hovered = true; refresh(); } });
    wrapper.addEventListener('pointerleave', () => { hovered = false; refresh(); });
    wrapper.addEventListener('focusin', e => { focused = viewport.contains(e.target); refresh(); });
    wrapper.addEventListener('focusout', e => { focused = viewport.contains(e.relatedTarget); refresh(); });

    viewport.addEventListener('pointerdown', e => {
      if (!e.isPrimary || e.button !== 0) return;
      pointerId = e.pointerId; startX = e.clientX; startY = e.clientY; startPosition = position;
    });
    viewport.addEventListener('pointermove', e => {
      if (pointerId !== e.pointerId) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        dragging = true; viewport.setPointerCapture(e.pointerId); refresh();
      }
      if (dragging) { position = wrapPosition(startPosition + dx, cycle); paint(); }
    });
    function release() {
      if (dragging) suppressClickUntil = performance.now() + 300;
      dragging = false; pointerId = null; refresh();
    }
    viewport.addEventListener('pointerup', release);
    viewport.addEventListener('pointercancel', release);
    viewport.addEventListener('lostpointercapture', release);
    viewport.addEventListener('dragstart', e => e.preventDefault());
    viewport.addEventListener('click', e => {
      if (performance.now() < suppressClickUntil) { e.preventDefault(); e.stopPropagation(); }
    }, true);
    document.addEventListener('visibilitychange', refresh);
    document.querySelectorAll('dialog').forEach(dialog => new MutationObserver(refresh).observe(dialog, { attributes: true, attributeFilter: ['open'] }));
    reducedMotion.addEventListener('change', e => { paused = e.matches; updatePauseButton(); refresh(); });
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; refresh(); }).observe(wrapper);
    new ResizeObserver(measure).observe(viewport);
    updatePauseButton(); measure();
  }

  createCarousel({ trackId: 'mapTrack', viewportSelector: '.carousel-container', wrapperSelector: '.carousel-wrapper', previousSelector: '.carousel-control.prev', nextSelector: '.carousel-control.next', controlsSelector: '.carousel-dots-container', speed: 24, label: 'Carrossel de mapas' });
  createCarousel({ trackId: 'realLifeTrack', viewportSelector: '#realLifeViewport', wrapperSelector: '.real-life-carousel-wrapper', previousSelector: '#realLifePrev', nextSelector: '#realLifeNext', controlsSelector: '#realLifeDots', speed: 24, label: 'Carrossel de fotos de uso' });
})();
