/* Small notebook touches, all optional: the page works the same without this file.
   1. sketches draw themselves in pen strokes when they scroll into view
   2. a photo lightbox for galleries and journal polaroids
   3. on long project pages: an "on this sheet" index and a pencil-line reading progress bar */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. sketches that draw themselves ---------- */
  // hide every stroke up front (so nothing flashes before it draws), then animate on scroll
  function prime(svg) {
    svg._strokes = [];
    svg.querySelectorAll('g path, g line, g rect, g circle, g polygon, g polyline, g ellipse').forEach(function (el) {
      var len = 0;
      try { len = el.getTotalLength(); } catch (e) { len = 0; }
      if (!len || !isFinite(len)) return;
      el.style.strokeDasharray = len + ' ' + len;
      el.style.strokeDashoffset = len;
      svg._strokes.push([el, len]);
    });
    svg._texts = svg.querySelectorAll('text');
    svg._texts.forEach(function (t) { t.style.opacity = 0; });
  }
  function drawOn(svg) {
    var strokes = svg._strokes || [], texts = svg._texts || [];
    var n = strokes.length, total = Math.min(1600, 500 + n * 22);
    svg.getBoundingClientRect();                                       // commit the hidden start state
    strokes.forEach(function (pair, i) {
      var el = pair[0], len = pair[1];
      el.style.transition = 'stroke-dashoffset ' + Math.round(Math.min(900, 250 + len * 1.4)) + 'ms ease-out ' + Math.round(i / Math.max(1, n) * total * 0.7) + 'ms';
      el.style.strokeDashoffset = 0;
    });
    texts.forEach(function (t, i) {
      t.style.transition = 'opacity 450ms ease ' + Math.round(total * 0.45 + i * 35) + 'ms';
      t.style.opacity = 1;
    });
    // tidy up afterwards so nothing lingers for printing or resizing
    setTimeout(function () {
      strokes.forEach(function (pair) { var el = pair[0]; el.style.transition = el.style.strokeDasharray = el.style.strokeDashoffset = ''; });
      texts.forEach(function (t) { t.style.transition = t.style.opacity = ''; });
    }, total + 1300);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    var sketches = document.querySelectorAll('.sketch-svg');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); drawOn(e.target); } });
    }, { threshold: 0.25 });
    sketches.forEach(function (s) { prime(s); io.observe(s); });
    window.addEventListener('beforeprint', function () { sketches.forEach(drawOn); });
  }

  /* ---------- 2. lightbox ---------- */
  var sel = '.gallery .plate img, .daylog .polaroid img, .photo-spread .polaroid img, .diary-body p > img, .process-strip .plate img';
  var pics = Array.prototype.slice.call(document.querySelectorAll(sel));
  if (pics.length && window.HTMLDialogElement) {
    var dlg = document.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.setAttribute('aria-label', 'Photo viewer');
    dlg.innerHTML =
      '<figure class="lb-frame"><img alt=""><figcaption></figcaption></figure>' +
      '<button type="button" class="lb-btn lb-prev" aria-label="Previous photo">‹</button>' +
      '<button type="button" class="lb-btn lb-next" aria-label="Next photo">›</button>' +
      '<button type="button" class="lb-close" aria-label="Close">close ✕</button>' +
      '<p class="lb-count" aria-live="polite"></p>';
    document.body.appendChild(dlg);
    var img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption'), count = dlg.querySelector('.lb-count');
    var cur = 0;
    function captionFor(el) {
      var fig = el.closest('figure');
      var fc = fig && fig.querySelector('figcaption');
      if (fc) return fc.textContent.trim();
      var next = el.nextElementSibling;
      if (next && next.classList.contains('polaroid-cap')) return next.textContent.trim();
      return el.alt || '';
    }
    function show(i) {
      cur = (i + pics.length) % pics.length;
      var p = pics[cur];
      img.src = p.currentSrc || p.src;
      img.alt = p.alt || '';
      cap.textContent = captionFor(p);
      count.textContent = (cur + 1) + ' / ' + pics.length;
      dlg.classList.toggle('single', pics.length < 2);
    }
    pics.forEach(function (p, i) {
      p.classList.add('zoomable');
      p.setAttribute('tabindex', '0');
      p.setAttribute('role', 'button');
      p.setAttribute('aria-label', 'Open photo: ' + (captionFor(p) || 'photo'));
      function open(ev) { ev.preventDefault(); show(i); dlg.showModal(); }
      p.addEventListener('click', open);
      p.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') open(ev); });
    });
    dlg.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
    dlg.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
    dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (ev) { if (ev.target === dlg) dlg.close(); });   // click the backdrop
    dlg.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowRight') show(cur + 1);
      if (ev.key === 'ArrowLeft') show(cur - 1);
    });
    var x0 = null;
    dlg.addEventListener('pointerdown', function (ev) { x0 = ev.clientX; });
    dlg.addEventListener('pointerup', function (ev) {
      if (x0 === null) return; var dx = ev.clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    });
    dlg.addEventListener('close', function () { var p = pics[cur]; if (p) p.focus({ preventScroll: true }); });
  }

  /* ---------- 3. "on this sheet" + reading progress (project pages) ---------- */
  var article = document.querySelector('.project-head') && document.querySelector('main article');
  if (article) {
    var heads = Array.prototype.slice.call(article.querySelectorAll('.prose h2[id], section > h2[id]'));
    if (heads.length >= 3) {
      var nav = document.createElement('nav');
      nav.className = 'sheet-index';
      nav.setAttribute('aria-label', 'On this sheet');
      var html = '<p class="sheet-index-title">on this sheet</p><ol>';
      heads.forEach(function (h) {
        html += '<li><a href="#' + h.id + '">' + h.textContent.replace(/^\d+\.\s*/, '') + '</a></li>';
      });
      nav.innerHTML = html + '</ol>';
      document.body.appendChild(nav);
      var links = nav.querySelectorAll('a');
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = heads.indexOf(e.target);
          links.forEach(function (a, k) { a.classList.toggle('is-here', k === i); });
        });
      }, { rootMargin: '-15% 0px -70% 0px' });
      heads.forEach(function (h) { spy.observe(h); });
      // only show it once the title block has scrolled away
      var head = document.querySelector('.project-head');
      new IntersectionObserver(function (es) { nav.classList.toggle('is-shown', !es[0].isIntersecting); }).observe(head);
    }

    var bar = document.createElement('div');
    bar.className = 'read-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      ticking = false;
      var r = article.getBoundingClientRect(), h = r.height - window.innerHeight;
      var t = h > 0 ? Math.min(1, Math.max(0, -r.top / h)) : 1;
      bar.style.transform = 'scaleX(' + t.toFixed(4) + ')';
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
