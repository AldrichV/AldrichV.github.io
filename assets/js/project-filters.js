(function () {
  var bar = document.querySelector('.index-tabs');
  if (!bar) return;
  bar.hidden = false;
  var btns = Array.prototype.slice.call(bar.querySelectorAll('button'));
  var items = document.querySelectorAll('[data-themes]');
  var empty = document.querySelector('.filter-empty');
  var moreHead = document.querySelector('.sub-head');
  var status = document.querySelector('.tab-status');
  var reports = document.getElementById('reports');
  var names = {}; btns.forEach(function (b) { names[b.dataset.filter] = b.firstChild.textContent; });

  function apply(f, push) {
    if (!names[f]) f = 'all';
    var shown = 0, moreShown = 0;
    btns.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.filter === f); });
    items.forEach(function (el) {
      var on = f === 'all' || el.dataset.themes.split(' ').indexOf(f) !== -1;
      el.hidden = !on;
      el.classList.toggle('just-filed', on && f !== 'all');
      if (on) { shown++; if (el.classList.contains('card')) moreShown++; }
    });
    if (moreHead) moreHead.hidden = moreShown === 0;
    document.querySelectorAll('[data-group]').forEach(function (g) { g.hidden = !g.querySelector('[data-themes]:not([hidden])'); });
    if (empty) empty.hidden = shown !== 0;
    if (reports) reports.hidden = f !== 'all';
    status.textContent = f === 'all' ? '' : shown + (shown === 1 ? ' project' : ' projects') + ' filed under ' + names[f].toLowerCase();
    // the tab lives in the address bar, so a filtered list can be shared or bookmarked
    if (push) {
      var url = location.pathname + (f === 'all' ? '' : '?area=' + f);
      history.replaceState(null, '', url);
    }
  }
  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (btn) apply(btn.dataset.filter, true);
  });
  // arrow keys move along the tabs
  bar.addEventListener('keydown', function (e) {
    var i = btns.indexOf(document.activeElement);
    if (i < 0 || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    var j = (i + (e.key === 'ArrowRight' ? 1 : -1) + btns.length) % btns.length;
    btns[j].focus(); e.preventDefault();
  });
  // "filed under" tags on each row switch tabs in place instead of reloading
  document.addEventListener('click', function (e) {
    var a = e.target.closest('.filed-under a');
    if (!a) return;
    e.preventDefault();
    apply(a.dataset.area, true);
    bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  var q = new URLSearchParams(location.search).get('area');
  if (q) apply(q, false);
})();
