(function () {
  var fig = document.getElementById('stair3d');
  if (!fig) return;
  var viewer = ModelViewer(fig, init);
  var note = viewer.note, fail = viewer.fail;

  function init() {
    viewer.button.hidden = true;
    var THREE = window.THREE;
    // ---- Geometry (inches), from shop drawings SD-01/02 ----
    var R = 6.875, RUN = 11.125, NT = 11, TC = 1.3, SLOPE = R / RUN, TH = Math.atan(SLOPE);
    var TOPZ = NT * RUN, DECK = (NT + 1) * R, ST_UP = 2, ST_DV = 12 / Math.cos(TH);
    var Tln = function (z) { return SLOPE * z + R + ST_UP; }, Bln = function (z) { return Tln(z) - ST_DV; }, Nos = function (z) { return SLOPE * z + R; };
    var BD = 5.5, GAP = 0.375, TD = 2 * BD + GAP, LT = 0.25, LL = 2, BW = 1.5, BT = 0.1875, CLAD = 0.5625, PL = 0.1875, PLH = 5.3125, W = 44, SPC = 12;
    var S = { lift: 0, treads: true, risers: true, glass: true, near: true };

    var canvas = fig.querySelector('canvas');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    var scene = new THREE.Scene(); scene.background = new THREE.Color(0xf1f4f5);
    var camera = new THREE.PerspectiveCamera(38, 1, 1, 3000);
    var controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = false; controls.enableZoom = false; controls.addEventListener('change', render);
    // the page keeps scrolling until the model is clicked; then the wheel zooms until the pointer leaves
    canvas.addEventListener('pointerdown', function () { controls.enableZoom = true; fig.classList.add('is-active'); });
    canvas.addEventListener('pointerleave', function () { controls.enableZoom = false; fig.classList.remove('is-active'); });
    scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8478, 0.75));
    var sun = new THREE.DirectionalLight(0xffffff, 0.85);
    sun.position.set(140, 220, -80); sun.castShadow = true; sun.shadow.mapSize.set(4096, 4096); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02;
    Object.assign(sun.shadow.camera, { left: -110, right: 110, top: 120, bottom: -110, near: 50, far: 500 });
    sun.target.position.set(0, 30, 50); scene.add(sun, sun.target);

    var M = {
      steel: new THREE.MeshStandardMaterial({ color: 0x8d969c, metalness: 0.55, roughness: 0.45 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x4b5257, metalness: 0.6, roughness: 0.4 }),
      sup: new THREE.MeshStandardMaterial({ color: 0x4a5057, metalness: 0.7, roughness: 0.35 }),
      conc: new THREE.MeshStandardMaterial({ color: 0xc4c2bc, roughness: 0.95 }),
      deck: new THREE.MeshStandardMaterial({ color: 0xa5a39d, roughness: 0.9 }),
      glass: new THREE.MeshPhysicalMaterial({ color: 0xbfe2dc, transparent: true, opacity: 0.26, roughness: 0.05, side: THREE.DoubleSide, depthWrite: false }),
      board: [0x8a5a3c, 0x80533a, 0x93613f].map(function (c) { return new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }); }),
      riser: new THREE.MeshStandardMaterial({ color: 0x45403c, roughness: 0.85 })
    };
    var root = new THREE.Group(); scene.add(root);
    var G = {};
    ['ctx', 'str', 'sup', 'treads', 'risers', 'guardL', 'guardR', 'glassL', 'glassR', 'railL', 'railR'].forEach(function (k) { G[k] = new THREE.Group(); root.add(G[k]); });

    function add(m, g) { m.castShadow = m.receiveShadow = true; g.add(m); return m; }
    function box(x0, x1, y0, y1, z0, z1, mat, g) {
      var a = Math.min(x0, x1), b = Math.max(x0, x1);
      var m = new THREE.Mesh(new THREE.BoxGeometry(b - a, y1 - y0, z1 - z0), mat);
      m.position.set((a + b) / 2, (y0 + y1) / 2, (z0 + z1) / 2); return add(m, g);
    }
    function prism(pts, x0, t, mat, g) {
      var sh = new THREE.Shape(); pts.forEach(function (p, i) { if (i) sh.lineTo(p[0], p[1]); else sh.moveTo(p[0], p[1]); });
      var geo = new THREE.ExtrudeGeometry(sh, { depth: t, bevelEnabled: false });
      geo.rotateY(-Math.PI / 2); geo.translate(x0 + t, 0, 0);
      return add(new THREE.Mesh(geo, mat), g);
    }
    function strip(z0, z1, f, lo, hi, x0, t, mat, g) { return prism([[z0, f(z0) + lo], [z1, f(z1) + lo], [z1, f(z1) + hi], [z0, f(z0) + hi]], x0, t, mat, g); }

    var h = W / 2, hh = h - 0.125;
    // bearers spaced evenly, no more than 12" apart
    var xa = -hh + LL / 2, xb = hh - LL / 2, n = Math.ceil((xb - xa) / SPC - 1e-9), sp = (xb - xa) / n, xs = [];
    for (var k = 1; k < n; k++) xs.push(xa + k * sp);

    // context: walk, pier, deck
    box(-h - 30, h + 30, -4, 0, -70, 14, M.conc, G.ctx);
    box(-h - 30, h + 30, DECK - 6, DECK, TOPZ + 0.75, TOPZ + 72, M.deck, G.ctx);

    // MC12 stringers
    var zf = -4, web = [[zf, 0], [-Bln(0) / SLOPE, 0], [TOPZ, Bln(TOPZ)], [TOPZ, Tln(TOPZ)], [zf, Tln(zf)]];
    [-1, 1].forEach(function (s) {
      prism(web, s < 0 ? -h - 0.25 : h, 0.25, M.steel, G.str);
      var fx = s < 0 ? -h - 2.25 : h;
      strip(zf, TOPZ, Tln, -0.4, 0, fx, 2.25, M.steel, G.str);
      var zb = -(Bln(0) + 0.4) / SLOPE; strip(zb, TOPZ, Bln, 0, 0.4, fx, 2.25, M.steel, G.str);
    });

    // tread frames TF-1 + Trex boards
    for (var i = 1; i <= NT; i++) {
      var yt = R * i - TC, zfr = (i - 1) * RUN + CLAD, zbk = i * RUN, a0 = zfr + PL;
      box(-hh, hh, yt - PLH, yt, zfr, zfr + PL, M.sup, G.sup);
      box(-hh, hh, yt - LT, yt, a0, a0 + LL, M.sup, G.sup); box(-hh, hh, yt - LL, yt - LT, a0, a0 + LT, M.sup, G.sup);
      box(-hh, hh, yt - LT, yt, zbk - LL, zbk, M.sup, G.sup); box(-hh, hh, yt - LL, yt - LT, zbk - LT, zbk, M.sup, G.sup);
      [-1, 1].forEach(function (s) { box(s * hh, s * (hh - LL), yt - LT, yt, a0 + LL, zbk - LL, M.sup, G.sup); box(s * hh, s * (hh - LT), yt - LL, yt - LT, a0 + LL, zbk - LL, M.sup, G.sup); });
      xs.forEach(function (x) { box(x - BW / 2, x + BW / 2, yt - BT, yt, a0 + LL, zbk - LL, M.sup, G.sup); box(x - BW / 2, x - BW / 2 + BT, yt - BW, yt - BT, a0 + LL, zbk - LL, M.sup, G.sup); });

      var ytop = R * i, zf0 = zbk - TD, RO = 0.25, arc = [];
      for (var q = 0; q < 9; q++) { var ang = Math.PI / 2 + q * Math.PI / 16; arc.push([zf0 + RO + RO * Math.cos(ang), ytop - RO + RO * Math.sin(ang)]); }
      prism([[zf0, ytop - TC], [zf0 + BD, ytop - TC], [zf0 + BD, ytop]].concat(arc), -h + 0.1875, W - 0.375, M.board[i % 3], G.treads);
      box(-h + 0.1875, h - 0.1875, ytop - TC, ytop, zbk - BD, zbk, M.board[(i + 1) % 3], G.treads);
    }
    box(-hh, hh, R * NT + 0.25, DECK - 6, TOPZ + CLAD, TOPZ + CLAD + PL, M.sup, G.sup);
    for (var j = 1; j <= NT + 1; j++) {
      var z = (j - 1) * RUN, yb = R * (j - 1) + 0.125, ytr = j <= NT ? R * j - TC : DECK;
      box(-h + 0.1875, h - 0.1875, yb, ytr, z, z + CLAD, M.riser, G.risers);
    }

    // guards (42-1/2"), glass, handrails (36")
    var posts = [2, 41, 80, 119], G42 = function (z) { return Nos(z) + 42.5; };
    [-1, 1].forEach(function (s) {
      var gg = s < 0 ? G.guardL : G.guardR, gl = s < 0 ? G.glassL : G.glassR, rl = s < 0 ? G.railL : G.railR, xc = s * (h + 1.125);
      posts.forEach(function (z) { box(xc - 1, xc + 1, Tln(z), G42(z) - 2.5, z - 1, z + 1, M.dark, gg); });
      strip(posts[0] - 1, posts[3] + 1, G42, -2.5, 0, xc - 1, 2, M.dark, gg);
      strip(posts[0] + 1, posts[3] - 1, Tln, 0, 1.875, xc - 0.75, 1.5, M.dark, gg);
      for (var k2 = 0; k2 < 3; k2++) {
        var a = posts[k2] + 1.6, b = posts[k2 + 1] - 1.6, lo = function (z) { return Tln(z) + 2.5; }, hi = function (z) { return G42(z) - 3.1; };
        prism([[a, lo(a)], [b, lo(b)], [b, hi(b)], [a, hi(a)]], xc - 0.25, 0.5, M.glass, gl).castShadow = false;
      }
      var hx = s * (h + 0.125 - 2.25 - 0.83), H36 = function (z) { return Nos(z) + 36; };
      var pts = [[-RUN - 12, H36(-RUN)], [-RUN, H36(-RUN)], [TOPZ, H36(TOPZ)], [TOPZ + 12, H36(TOPZ)]];
      for (var p = 0; p < 3; p++) {
        var za = pts[p][0], ya = pts[p][1], zb2 = pts[p + 1][0], yb2 = pts[p + 1][1], L = Math.hypot(zb2 - za, yb2 - ya);
        var cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.83, 0.83, L + 0.01, 20), M.dark);
        cyl.rotation.x = Math.PI / 2 - Math.atan2(yb2 - ya, zb2 - za); cyl.position.set(hx, (ya + yb2) / 2, (za + zb2) / 2); add(cyl, rl);
      }
      posts.forEach(function (z) { box(Math.min(hx, s * (h + 0.125)), Math.max(hx, s * (h + 0.125)), H36(z) - 1.6, H36(z) - 1.2, z - 0.3, z + 0.3, M.dark, rl); });
    });

    function update() {
      G.treads.visible = S.treads; G.risers.visible = S.risers;
      G.treads.position.y = G.risers.position.y = S.lift;
      G.glassL.visible = S.glass; G.glassR.visible = S.glass && S.near; G.guardR.visible = S.near; G.railR.visible = S.near;
      render();
    }

    var TGT = new THREE.Vector3(0, 40, 58);
    var VIEWS = { iso: [165, 125, -70], side: [250, 48, 58], front: [10, 55, -180], under: [34, 6, 110] };
    var view = 'iso';
    function setView(id) {
      view = id;
      var asp = isFinite(camera.aspect) && camera.aspect > 0.2 ? camera.aspect : 1.6;
      var v = VIEWS[id], f = 1.12 * Math.min(2.5, Math.max(1, 1.5 / asp));
      camera.position.set(TGT.x + (v[0] - TGT.x) * f, TGT.y + (v[1] - TGT.y) * f, TGT.z + (v[2] - TGT.z) * f);
      controls.target.copy(id === 'under' ? new THREE.Vector3(0, 40, 30) : TGT); controls.update(); render();
    }
    var queued = false;
    var broken = false, framed = false;
    var raf = 0, tmo = 0;
    function draw() {
      cancelAnimationFrame(raf); clearTimeout(tmo); queued = false; if (broken) return;
      try { fit(); renderer.render(scene, camera); } catch (e) { broken = true; fail(e); }
    }
    // keep the drawing buffer matched to the canvas's on-screen size and the screen's pixel density
    // (checked every frame, so browser zoom, late layout or a missed resize can't leave it blurry)
    function quality() { return Math.min(2.5, Math.max(1.5, window.devicePixelRatio || 1)); }
    function fit() {
      var w = canvas.clientWidth, hgt = canvas.clientHeight;
      if (w < 2 || hgt < 2) return false;
      var pr = quality();
      if (canvas.width !== Math.floor(w * pr) || canvas.height !== Math.floor(hgt * pr)) {
        renderer.setPixelRatio(pr); renderer.setSize(w, hgt, false);
        camera.aspect = w / hgt; camera.updateProjectionMatrix();
        if (!framed) { framed = true; setView(view); }
        note('size ' + w + '×' + hgt + ' @' + pr + ' → ' + canvas.width + '×' + canvas.height);
      }
      return true;
    }
    function render() { if (queued) return; queued = true; raf = requestAnimationFrame(draw); tmo = setTimeout(draw, 150); }
    function resize() { render(); }                       // draw() re-fits the buffer before every frame
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); note('context lost'); }, false);
    canvas.addEventListener('webglcontextrestored', function () { note('context restored'); render(); }, false);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) render(); });
    window.addEventListener('load', resize); window.addEventListener('resize', resize);

    fig.querySelectorAll('[data-view]').forEach(function (b) { b.addEventListener('click', function () { setView(b.dataset.view); }); });
    fig.querySelectorAll('[data-k]').forEach(function (el) {
      el.addEventListener('input', function () {
        var k3 = el.dataset.k;
        if (el.type === 'range') { S[k3] = +el.value; el.nextElementSibling.textContent = el.value + '"'; }
        else S[k3] = el.checked;
        update();
      });
    });
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas.parentElement); else window.addEventListener('resize', resize);
    fig.classList.add('is-live');
    var gl = renderer.getContext(); note('webgl ' + (gl && gl.getParameter(gl.VERSION)));
    update();
    setTimeout(resize, 300); setTimeout(resize, 1500);
  }
})();
