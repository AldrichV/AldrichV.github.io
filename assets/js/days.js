/* Themed journal days: reveal the transition cards as they scroll into view. */
(function () {
  var art = document.querySelector('.day');
  if (!art || !('IntersectionObserver' in window)) return;
  art.classList.add('js-days');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } });
  }, { threshold: 0.3 });
  art.querySelectorAll('.day-card, .day-end').forEach(function (el) { io.observe(el); });
  window.addEventListener('beforeprint', function () { art.querySelectorAll('.day-card, .day-end').forEach(function (el) { el.classList.add('seen'); }); });
})();
