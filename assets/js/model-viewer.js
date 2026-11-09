/* Shared lazy loading for the three project viewers. Geometry and controls stay
   in each viewer; dependencies are loaded once, only when a model is nearby. */
(function () {
  var scripts = {};
  var base = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/';
  var sources = {
    OrbitControls: base + 'controls/OrbitControls.js',
    STLLoader: base + 'loaders/STLLoader.js',
    GLTFLoader: base + 'loaders/GLTFLoader.js'
  };

  function loadScript(src) {
    if (!scripts[src]) scripts[src] = new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = function () { reject(new Error('could not load ' + src)); };
      document.head.appendChild(script);
    });
    return scripts[src];
  }

  window.ModelViewer = function (fig, init, loaders) {
    var button = fig.querySelector('.model3d-start');
    var started = false, observer;
    function note(message) {
      if (!/debug/.test(location.hash)) return;
      var output = fig.querySelector('.model3d-debug');
      if (!output) {
        output = document.createElement('pre');
        output.className = 'model3d-debug';
        fig.appendChild(output);
      }
      output.textContent += message + '\n';
    }
    function fail(error) {
      fig.querySelector('.model3d-err').hidden = false;
      button.hidden = true;
      console.error('[' + fig.id + ']', error);
      note('error: ' + (error.message || error.type || error));
    }
    function start() {
      if (started) return;
      started = true;
      if (observer) observer.disconnect();
      button.textContent = 'loading…';
      var three = window.THREE ? Promise.resolve() : loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
      three.then(function () {
        return Promise.all(['OrbitControls'].concat(loaders || []).map(function (name) {
          return window.THREE[name] ? null : loadScript(sources[name]);
        }));
      }).then(function () {
        note('three ' + window.THREE.REVISION);
        init();
      }).catch(fail);
    }
    button.addEventListener('click', start);
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) start();
      }, { rootMargin: '200px' });
      observer.observe(fig);
    }
    return { note: note, fail: fail, button: button };
  };
})();
