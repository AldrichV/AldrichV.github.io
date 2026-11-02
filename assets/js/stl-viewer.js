/* Notebook-style STL viewer for project pages.
   Config comes from the page's front matter (model3d: parts, up axis, views).
   Loads three.js only when the viewer scrolls near, keeps the drawing buffer matched
   to the on-screen size every frame, and never hijacks page scrolling. */
(function () {
  var fig = document.getElementById('model3d');
  if (!fig) return;
  var cfg = {};
  try { cfg = JSON.parse(fig.getAttribute('data-config') || '{}'); } catch (e) {}
  var startBtn = fig.querySelector('.model3d-start');
  var started = false;
  var DEBUG = /debug/.test(location.hash);
  var BASE = (document.querySelector('link[rel=canonical]') || {}).href ? '' : '';

  function note(msg) {
    if (!DEBUG) return;
    var d = fig.querySelector('.model3d-debug');
    if (!d) { d = document.createElement('pre'); d.className = 'model3d-debug'; fig.appendChild(d); }
    d.textContent += msg + '\n';
  }
  function fail(e) {
    fig.querySelector('.model3d-err').hidden = false; startBtn.hidden = true;
    if (e) { console.error('[model3d]', e); note('error: ' + (e.message || e.type || e)); }
  }
  function loadScript(src) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = function () { rej(new Error('could not load ' + src)); };
      document.head.appendChild(s);
    });
  }
  function start() {
    if (started) return; started = true;
    startBtn.textContent = 'loading…';
    var chain = window.THREE ? Promise.resolve() : loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    chain
      .then(function () { return THREE.OrbitControls ? null : loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js'); })
      .then(function () { return THREE.STLLoader ? null : loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/STLLoader.js'); })
      .then(function () {
        var needsGltf = (cfg.parts || []).some(function (p) { return /\.(glb|gltf)$/i.test(p.src); });
        return needsGltf && !THREE.GLTFLoader ? loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js') : null;
      })
      .then(function () { note('three ' + THREE.REVISION); try { init(); } catch (e) { fail(e); } })
      .catch(fail);
  }
  startBtn.addEventListener('click', start);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { o.disconnect(); start(); } }, { rootMargin: '200px' }).observe(fig);
  }

  function init() {
    var canvas = fig.querySelector('canvas');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    var scene = new THREE.Scene(); scene.background = new THREE.Color(0xf1f4f5).convertSRGBToLinear();
    var camera = new THREE.PerspectiveCamera(36, 1, 0.5, 5000);
    var controls = new THREE.OrbitControls(camera, canvas);
    controls.enableZoom = false; controls.addEventListener('change', render);
    canvas.addEventListener('pointerdown', function () { controls.enableZoom = true; });
    canvas.addEventListener('pointerleave', function () { controls.enableZoom = false; });

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8478, 0.6));
    var sun = new THREE.DirectionalLight(0xffffff, 0.7); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0005;
    scene.add(sun, sun.target);
    var fill = new THREE.DirectionalLight(0xffffff, 0.2); scene.add(fill);

    var model = new THREE.Group(); scene.add(model);
    // CAD files are usually Z-up; the site's models say which axis is up
    if ((cfg.up || 'y') === 'z') model.rotation.x = -Math.PI / 2;
    var loader = new THREE.STLLoader();
    var parts = cfg.parts || [], meshes = [], left = parts.length;
    if (!left) { fail(new Error('no parts listed')); return; }

    parts.forEach(function (p, i) {
      if (/\.(glb|gltf)$/i.test(p.src)) {
        // glTF/GLB (e.g. SolidWorks "Extended Reality" export) keeps its own colours and parts
        new THREE.GLTFLoader().load(p.src, function (g) {
          var obj = g.scene;
          if (p.scale) obj.scale.setScalar(p.scale);
          obj.traverse(function (o) { if (o.isMesh) { o.castShadow = o.receiveShadow = true; [].concat(o.material).forEach(function (mm) { if (mm && mm.metalness > 0.35) { mm.metalness = 0.35; mm.roughness = Math.max(mm.roughness, 0.35); } }); if (p.color) o.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(p.color).convertSRGBToLinear(), roughness: 0.6 }); } });
          model.add(obj); meshes[i] = obj;
          if (--left === 0) ready();
        }, undefined, function (e) { fail(e || new Error('could not load ' + p.src)); });
        return;
      }
      loader.load(p.src, function (geo) {
        geo.computeVertexNormals();
        var mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(p.color || '#c9c6bf').convertSRGBToLinear(), roughness: p.rough != null ? p.rough : 0.6, metalness: p.metal || 0.05, flatShading: !!p.flat });
        var mesh = new THREE.Mesh(geo, mat); mesh.castShadow = mesh.receiveShadow = true;
        model.add(mesh); meshes[i] = mesh;
        if (--left === 0) ready();
      }, undefined, function (e) { fail(e || new Error('could not load ' + p.src)); });
    });

    var center = new THREE.Vector3(), radius = 1, ground, units = [];
    function ready() {
      startBtn.hidden = true;
      model.updateMatrixWorld(true);
      var box = new THREE.Box3().setFromObject(model), size = new THREE.Vector3();
      box.getCenter(center); box.getSize(size); radius = size.length() / 2;
      // sit the model on a ground plane at its lowest point, centred on the origin
      model.position.sub(new THREE.Vector3(center.x, box.min.y, center.z));
      model.updateMatrixWorld(true);
      box.setFromObject(model); box.getCenter(center);
      ground = new THREE.Mesh(new THREE.CircleGeometry(radius * 2.2, 64), new THREE.ShadowMaterial({ opacity: 0.18 }));
      ground.rotation.x = -Math.PI / 2; ground.position.y = 0; ground.receiveShadow = true; scene.add(ground);
      sun.shadow.normalBias = radius * 0.002;
      sun.position.set(radius * 1.2, radius * 2.4, radius * 1.6); sun.target.position.copy(center);
      fill.position.set(-radius * 1.5, radius, -radius);
      var sc = sun.shadow.camera; sc.left = sc.bottom = -radius * 1.5; sc.right = sc.top = radius * 1.5; sc.near = radius * 0.5; sc.far = radius * 6; sc.updateProjectionMatrix();
      // explode units: whole STL parts, or named nodes inside a GLB assembly (front matter `groups`)
      var mc = new THREE.Box3().setFromObject(model).getCenter(new THREE.Vector3());
      function toLocal(obj, v) {
        if (!obj.parent) return v;
        var q = new THREE.Quaternion(), sc = new THREE.Vector3(); obj.parent.getWorldQuaternion(q); obj.parent.getWorldScale(sc);
        return v.applyQuaternion(q.invert()).divide(sc);
      }
      if (cfg.groups) {
        var clean = THREE.PropertyBinding && THREE.PropertyBinding.sanitizeNodeName ? THREE.PropertyBinding.sanitizeNodeName : function (n) { return n; };
        cfg.groups.forEach(function (g, gi) {
          [].concat(g.match).forEach(function (n) {
            var node = model.getObjectByName(clean(n)) || model.getObjectByName(n);
            if (!node) { note('missing node ' + n); return; }
            var w = g.explode ? new THREE.Vector3().fromArray(g.explode) : new THREE.Box3().setFromObject(node).getCenter(new THREE.Vector3()).sub(mc).normalize();
            units.push({ obj: node, group: gi, home: node.position.clone(), dir: toLocal(node, w), spread: g.spread || 1 });
          });
        });
      } else {
        meshes.forEach(function (m, i) {
          var w = parts[i].explode ? new THREE.Vector3().fromArray(parts[i].explode) : new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3()).sub(mc);
          if (!parts[i].explode) { if (w.lengthSq() < 1e-6) w.set(0, 1, 0); w.normalize(); }
          units.push({ obj: m, part: i, home: m.position.clone(), dir: toLocal(m, w), spread: parts[i].spread || 1 });
        });
      }
      fig.classList.add('is-live');
      note('parts ' + meshes.length + ', units ' + units.length + ', radius ' + radius.toFixed(3));
      render();
    }

    var VIEWS = cfg.views || { iso: [1, 0.75, 1.1], side: [1.6, 0.25, 0], front: [0, 0.3, 1.6], top: [0.01, 1.7, 0.01] };
    var view = 'iso', framed = false;
    function setView(id) {
      view = id;
      var v = VIEWS[id] || VIEWS.iso, asp = camera.aspect > 0.2 && isFinite(camera.aspect) ? camera.aspect : 1.6;
      var dist = radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.72 * Math.min(2.5, Math.max(1, 1.5 / asp));
      var dir = new THREE.Vector3(v[0], v[1], v[2]).normalize();
      camera.position.copy(center).addScaledVector(dir, dist);
      camera.near = dist / 50; camera.far = dist * 20; camera.updateProjectionMatrix();
      controls.target.copy(center); controls.update(); render();
    }
    function quality() { return Math.min(2.5, Math.max(1.5, window.devicePixelRatio || 1)); }
    function fit() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (w < 2 || h < 2) return false;
      var pr = quality();
      if (canvas.width !== Math.floor(w * pr) || canvas.height !== Math.floor(h * pr)) {
        renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        note('size ' + w + '×' + h + ' @' + pr);
      }
      if (!framed && meshes.length === parts.length && fig.classList.contains('is-live')) { framed = true; setView(view); }
      return true;
    }
    var queued = false, broken = false, raf = 0, tmo = 0;
    function draw() {
      cancelAnimationFrame(raf); clearTimeout(tmo); queued = false; if (broken) return;
      try { fit(); renderer.render(scene, camera); } catch (e) { broken = true; fail(e); }
    }
    // animation frames can be paused (background tabs, some embedded views); a timer backs them up
    function render() { if (queued) return; queued = true; raf = requestAnimationFrame(draw); tmo = setTimeout(draw, 150); }

    fig.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { setView(b.dataset.view); }); });
    var ex = fig.querySelector('[data-k=explode]');
    if (ex) ex.addEventListener('input', function () {
      var t = +ex.value; ex.nextElementSibling.textContent = Math.round(t * 100) + '%';
      var amt = t * radius * (cfg.explode || 0.6);
      units.forEach(function (u) { u.obj.position.copy(u.home).addScaledVector(u.dir, amt * u.spread); });
      render();
    });
    fig.querySelectorAll('[data-part]').forEach(function (el) {
      el.addEventListener('change', function () { el.dataset.part.split(',').forEach(function (k) { var m = meshes[+k]; if (m) m.visible = el.checked; }); render(); });
    });
    fig.querySelectorAll('[data-group]').forEach(function (el) {
      el.addEventListener('change', function () { units.forEach(function (u) { if (u.group === +el.dataset.group) u.obj.visible = el.checked; }); render(); });
    });
    if ('ResizeObserver' in window) new ResizeObserver(render).observe(canvas.parentElement);
    window.addEventListener('resize', render); window.addEventListener('load', render);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) render(); });
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); }, false);
    canvas.addEventListener('webglcontextrestored', render, false);
    render();
  }
})();
