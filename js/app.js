/* Interacción de la presentación: navegación por secciones, galerías, precios, mapa y videos. */
(function () {
  const D = window.SACMA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const usd = (n, dec = 2) => 'USD ' + n.toLocaleString('es-AR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- navegación ---------- */
  const slides = $$('.slide');
  const rail = $('#rail');
  slides.forEach((s, i) => {
    const a = document.createElement('a');
    a.href = '#' + s.id;
    a.innerHTML = `<span>${s.dataset.label}</span><i></i>`;
    a.setAttribute('aria-label', s.dataset.label);
    rail.appendChild(a);
  });
  const railLinks = $$('a', rail);
  let current = 0;
  const pad = (n) => String(n).padStart(2, '0');

  function setCurrent(i) {
    current = i;
    railLinks.forEach((a, k) => a.classList.toggle('on', k === i));
    $('#top-n').textContent = pad(i + 1);
    $('#top-t').textContent = slides[i].dataset.label;
    $('#count').textContent = `${i + 1} / ${slides.length}`;
    document.body.classList.toggle('on-dark', slides[i].classList.contains('hero'));
    const p = $('#presenter');
    p.innerHTML = `<b>${esc(slides[i].dataset.who || '')}</b>${esc(slides[i].dataset.nota || '')}`;
    if (slides[i].id === 'mapa') initMap();
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setCurrent(slides.indexOf(e.target));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  slides.forEach((s) => io.observe(s));

  function go(delta) {
    const i = Math.max(0, Math.min(slides.length - 1, current + delta));
    slides[i].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
  $('#prev').onclick = () => go(-1);
  $('#next').onclick = () => go(1);
  $$('[data-go="next"]').forEach((b) => (b.onclick = () => go(1)));

  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!$('#lightbox').hidden) { if (e.key === 'Escape') closeLightbox(); return; }
    if (!$('#modal').hidden) { if (e.key === 'Escape') closeModal(); return; }
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
    else if (e.key === 'Home') { e.preventDefault(); slides[0].scrollIntoView(); }
    else if (e.key === 'End') { e.preventDefault(); slides[slides.length - 1].scrollIntoView(); }
    else if (e.key.toLowerCase() === 'p') { const p = $('#presenter'); p.hidden = !p.hidden; }
  });

  /* ---------- videos: miniatura propia, el reproductor se carga al tocar ---------- */
  function mountYT(el) {
    const id = el.dataset.yt;
    el.style.backgroundImage = `url(img/video/${id}.jpg)`;
    el.innerHTML = `<span class="play"></span><span class="yt-t"><b>Video</b>${esc(el.dataset.title)}<br><em>${esc(el.dataset.canal || '')} · YouTube</em></span>`;
    el.setAttribute('role', 'button');
    el.tabIndex = 0;
    const play = () => {
      if (location.protocol === 'file:') { window.open('https://www.youtube.com/watch?v=' + id, '_blank'); return; }
      el.classList.add('playing');
      el.insertAdjacentHTML('beforeend', `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1" title="${esc(el.dataset.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`);
    };
    el.addEventListener('click', () => !el.classList.contains('playing') && play());
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !el.classList.contains('playing')) play(); });
  }
  $$('.yt').forEach(mountYT);

  /* ---------- visor de fotos ---------- */
  const lb = $('#lightbox');
  function openLightbox(src, cap) {
    $('img', lb).src = src; $('p', lb).textContent = cap || ''; lb.hidden = false;
  }
  function closeLightbox() { lb.hidden = true; }
  lb.addEventListener('click', closeLightbox);
  document.addEventListener('click', (e) => {
    const z = e.target.closest('[data-zoom]');
    if (!z) return;
    const img = $('img', z);
    const cap = z.querySelector('figcaption');
    openLightbox(img.src, cap ? cap.firstChild.textContent + (cap.childNodes[1] ? cap.childNodes[1].textContent : '') : img.alt);
  });

  /* ---------- hotel ---------- */
  const cats = Object.keys(D.hotel);
  const tabs = $('#hotel-tabs');
  function showHotel(cat, k = 0) {
    $$('button', tabs).forEach((b) => b.classList.toggle('on', b.dataset.c === cat));
    const list = D.hotel[cat];
    $('#hotel-thumbs').innerHTML = list.map(([src, cap], i) => `<button data-i="${i}" class="${i === k ? 'on' : ''}" aria-label="${esc(cap)}"><img src="img/${src}" alt="" loading="lazy"></button>`).join('');
    setMain(list[k]);
    $$('#hotel-thumbs button').forEach((b) => (b.onclick = () => {
      $$('#hotel-thumbs button').forEach((x) => x.classList.toggle('on', x === b));
      setMain(list[+b.dataset.i]);
    }));
  }
  function setMain([src, cap]) {
    const m = $('#hotel-main');
    m.style.opacity = 0;
    setTimeout(() => { m.src = 'img/' + src; m.alt = cap; $('#hotel-cap').innerHTML = `${esc(cap)}<em>Foto: RIU Hotels &amp; Resorts</em>`; m.style.opacity = 1; }, 120);
  }
  tabs.innerHTML = cats.map((c) => `<button role="tab" data-c="${esc(c)}">${esc(c)}</button>`).join('');
  $$('button', tabs).forEach((b) => (b.onclick = () => showHotel(b.dataset.c)));
  showHotel(cats[0]);

  /* ---------- tarifas ---------- */
  const B = D.bases;
  const order = ['dbl', 'sgl', 'tpl'];
  $('#prices').innerHTML = order.map((k) => {
    const b = B[k];
    const [ent, dec] = b.precio.toFixed(2).split('.');
    return `<article class="price ${k === 'dbl' ? 'main' : ''}">
      ${k === 'dbl' ? '<span class="ribbon">Mayor volumen</span>' : ''}
      <h3>${b.nombre}<i>${b.corto}</i></h3>
      <div class="amt"><small>USD</small>${(+ent).toLocaleString('es-AR')}<sup>,${dec}</sup></div>
      <div class="per">por pasajero · ${b.habitaciones}</div>
      <dl>
        <div><dt>Neto a SACMA</dt><dd>${usd(b.neto)}</dd></div>
        <div><dt>Comisión de la agencia</dt><dd class="com">${usd(b.comision)}</dd></div>
        <div><dt>Impuestos incluidos</dt><dd>${usd(b.impuestos)}</dd></div>
      </dl>
    </article>`;
  }).join('');
  $('#sup-sgl').textContent = usd(B.sgl.precio - B.dbl.precio) + ' por pasajero';

  /* ---------- costos ---------- */
  const costSeg = $('#cost-base');
  costSeg.innerHTML = order.map((k) => `<button data-b="${k}">${B[k].nombre}</button>`).join('');
  function showCost(k) {
    $$('button', costSeg).forEach((b) => b.classList.toggle('on', b.dataset.b === k));
    const b = B[k];
    const C = D.conceptos;
    const keys = Object.keys(b.costos);
    $('#cost-bar').innerHTML = keys.map((c) => {
      const v = b.costos[c];
      const pct = (v / b.costoTotal) * 100;
      return `<div style="flex-grow:${v};background:${C[c].c}" title="${esc(C[c].n)}: ${usd(v)}">${pct > 12 ? `<span>${C[c].n.split(' ')[0]} ${Math.round(pct)}%</span>` : ''}</div>`;
    }).join('');
    const fijos = b.costos.aereo + b.costos.traslados;
    const vars = b.costoTotal - fijos;
    $('#cost-table').innerHTML = `<tr><th>Concepto por pasajero</th><th>USD</th></tr>` +
      keys.map((c) => `<tr><td><i style="background:${C[c].c}"></i>${esc(C[c].n)}<span class="kind">${C[c].tipo}</span></td><td>${usd(b.costos[c])}</td></tr>`).join('') +
      `<tr><td>Costos fijos <span class="kind">aéreo + traslados</span></td><td>${usd(fijos)}</td></tr>` +
      `<tr><td>Costos variables</td><td>${usd(vars)}</td></tr>` +
      `<tr class="sum"><td>Costo total por pasajero</td><td>${usd(b.costoTotal)}</td></tr>`;
    const dots = Array.from({ length: D.grupo.pax }, (_, i) => `<i class="${i < b.pe ? 'be' : 'pro'}"></i>`).join('');
    $('#formula').innerHTML = `
      <div class="step"><span><span class="op">Costo total</span>Fijos + variables</span><b>${usd(b.costoTotal)}</b></div>
      <div class="step"><span><span class="op">÷ 0,80</span>Margen de utilidad del 20 %, comisionable</span><b>${usd(b.conGanancia)}</b></div>
      <div class="step"><span><span class="op">+ Impuestos</span>Transporte 10,5 % · aéreos · hotel 21 %</span><b>${usd(b.impuestos)}</b></div>
      <div class="step total"><span><span class="op">=</span>Precio de venta al pasajero</span><b>${usd(b.precio)}</b></div>
      <div class="pe"><b>${b.pe}</b><p>pasajeros es el <strong>punto de equilibrio</strong>. El grupo de ${D.grupo.pax} lo supera en ${D.grupo.pax - b.pe} pasajeros.</p></div>
      <div class="pe-dots" aria-hidden="true">${dots}</div>`;
  }
  $$('button', costSeg).forEach((b) => (b.onclick = () => showCost(b.dataset.b)));
  showCost('dbl');

  /* ---------- excursiones ---------- */
  $('#exc-list').innerHTML = D.incluidas.map((x) => `
    <button class="exc-card" data-x="${x.id}">
      <img src="img/${x.img}" alt="" loading="lazy">
      ${x.estrella ? '<span class="star">★ Propuesta estrella</span>' : ''}
      <span class="incl">Incluida</span>
      <span class="in">
        <span class="d">${esc(x.dia)}</span>
        <h3>${esc(x.titulo)}</h3>
        <p>${esc(x.lugar)}</p>
        <span class="more">Ver detalle, fotos y video</span>
      </span>
    </button>`).join('');
  $$('.exc-card').forEach((b) => (b.onclick = () => openExc(b.dataset.x)));

  $('#opc-list').innerHTML = D.opcionales.map((o) => `
    <article class="opc-card">
      <div class="ph" data-zoom><img src="img/${o.img}" alt="${esc(o.titulo)}" loading="lazy"><span class="no">No incluida</span></div>
      <div class="tx"><span class="dt">${esc(o.dato)}</span><h3>${esc(o.titulo)}</h3><p>${esc(o.txt)}</p><span class="q">Se cotiza por separado</span></div>
    </article>`).join('');

  const modal = $('#modal');
  let lastFocus = null;
  function openExc(id) {
    const x = D.incluidas.find((e) => e.id === id);
    lastFocus = document.activeElement;
    $('#m-body').innerHTML = `
      <div class="m-hero"><img src="img/${x.img}" alt=""><div class="in"><span class="d">${esc(x.dia)} · ${esc(x.horario)}</span><h3 id="m-title">${esc(x.titulo)}</h3></div></div>
      <div class="m-grid">
        <div>
          <p>${esc(x.resumen)}</p>
          <div class="m-strip" style="grid-template-columns:repeat(${x.fotos.length === 4 ? 2 : 3},1fr)">${x.fotos.slice(0, 6).map(([s, c]) => `<button data-src="img/${s}" data-cap="${esc(c)}"><img src="img/${s}" alt="${esc(c)}" loading="lazy"></button>`).join('')}</div>
          <div class="yt" data-yt="${x.video.id}" data-title="${esc(x.video.t)}" data-canal="${esc(x.video.canal)}"></div>
        </div>
        <div>
          <h3 class="mini">Horarios</h3>
          <ol class="m-tl">${x.timeline.map(([h, t]) => `<li><b>${h}</b>${esc(t)}</li>`).join('')}</ol>
          <div class="m-cols" style="${x.noIncluye ? '' : 'grid-template-columns:1fr'}">
            <div><h3 class="mini">Incluye</h3><ul class="checks">${x.incluye.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>
            ${x.noIncluye ? `<div><h3 class="mini">No incluye</h3><ul class="checks x">${x.noIncluye.map((i) => `<li>${esc(i)}</li>`).join('')}</ul></div>` : ''}
          </div>
          ${x.nota ? `<p class="fine">${esc(x.nota)}</p>` : ''}
        </div>
      </div>`;
    mountYT($('#m-body .yt'));
    $$('#m-body .m-strip button').forEach((b) => (b.onclick = () => openLightbox(b.dataset.src, b.dataset.cap)));
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.m-x', modal).focus();
  }
  function closeModal() {
    modal.hidden = true;
    $('#m-body').innerHTML = '';
    document.body.style.overflow = '';
    lastFocus && lastFocus.focus();
  }
  $$('[data-close]', modal).forEach((b) => (b.onclick = closeModal));

  /* ---------- itinerario ---------- */
  const daysEl = $('#days');
  daysEl.innerHTML = D.itinerario.map((d, i) => `<button class="day ${d.tipo}" role="tab" data-i="${i}"><b>${d.d}</b><small>${d.f}</small><span>${esc(d.t)}</span></button>`).join('');
  const dayImg = { vuelo: 'vuelo/cabina-economy-737max.jpg', libre: 'hotel/pool-riu-ventura.jpg' };
  function showDay(i) {
    $$('.day').forEach((b, k) => b.classList.toggle('on', k === i));
    const d = D.itinerario[i];
    const exc = d.ref && D.incluidas.find((e) => e.id === d.ref);
    const img = exc ? exc.img : (i === 0 ? 'otros/aeropuerto-cun.jpg' : dayImg[d.tipo]);
    const lbl = d.tipo === 'inc' ? 'Excursión incluida' : d.tipo === 'vuelo' ? 'Vuelo y traslado' : 'Día libre · All Inclusive';
    $('#day-detail').innerHTML = `
      <div>
        <span class="lbl">${d.d} · ${d.f} · ${lbl}</span>
        <h3>${esc(d.t)}</h3>
        <ol>${d.items.map(([h, t]) => `<li><b>${h}</b>${esc(t)}</li>`).join('')}</ol>
        ${exc ? `<button class="link-btn" data-x="${exc.id}">Ver la excursión</button>` : ''}
        <p class="fine">Alojamiento en el Hotel Riu Ventura${i === 6 ? ' hasta el check-out' : ''}. Horarios estimativos, sujetos a los operadores y al clima.</p>
      </div>
      <div class="ph"><img src="img/${img}" alt=""></div>`;
    const lb2 = $('#day-detail .link-btn');
    if (lb2) lb2.onclick = () => openExc(lb2.dataset.x);
  }
  $$('.day').forEach((b) => (b.onclick = () => showDay(+b.dataset.i)));
  showDay(0);

  /* ---------- liquidación y calculadora ---------- */
  $('#liq-body').innerHTML = order.map((k) => {
    const b = B[k];
    return `<tr><td><b>${b.nombre}</b><small>${b.corto}</small></td><td class="p">${usd(b.precio)}</td><td>${usd(b.neto)}</td><td class="c">${usd(b.comision)}</td><td class="i">${usd(b.impuestos)}</td></tr>`;
  }).join('');
  const qty = { dbl: 2, sgl: 0, tpl: 0 };
  $('#calc-in').innerHTML = order.map((k) => `<div class="calc-row"><span>${B[k].nombre}</span><div class="stepper"><button data-k="${k}" data-d="-1" aria-label="Restar pasajero en ${B[k].nombre}">−</button><output id="q-${k}">0</output><button data-k="${k}" data-d="1" aria-label="Sumar pasajero en ${B[k].nombre}">+</button></div></div>`).join('');
  function calc() {
    let v = 0, n = 0, c = 0;
    order.forEach((k) => {
      $('#q-' + k).textContent = qty[k];
      v += qty[k] * B[k].precio; n += qty[k] * B[k].neto; c += qty[k] * B[k].comision;
    });
    $('#c-venta').textContent = usd(v);
    $('#c-neto').textContent = usd(n);
    $('#c-com').textContent = usd(c);
  }
  $$('#calc-in button').forEach((b) => (b.onclick = () => {
    const k = b.dataset.k;
    qty[k] = Math.max(0, Math.min(26, qty[k] + +b.dataset.d));
    calc();
  }));
  calc();

  /* ---------- mapa ---------- */
  let map = null, layers = {};
  function initMap() {
    if (map) return;
    const el = $('#map');
    if (!window.L) { el.innerHTML = '<div class="map-fallback"><img src="img/otros/mapa-excursiones.png" alt="Mapa de excursiones incluidas y opcionales"></div>'; return; }
    map = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 17, attribution: 'Imágenes &copy; Esri, Maxar, Earthstar Geographics',
    }).addTo(map);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 17 }).addTo(map);
    let tileErr = 0;
    tiles.on('tileerror', () => {
      if (++tileErr === 6) el.insertAdjacentHTML('beforeend', '<div style="position:absolute;inset:0;z-index:999;background:#fff" class="map-fallback"><img src="img/otros/mapa-excursiones.png" alt="Mapa de excursiones incluidas y opcionales"></div>');
    });
    let nInc = 0, nOpc = 0;
    D.puntos.forEach((p) => {
      const label = p.k === 'inc' ? ++nInc : p.k === 'opc' ? ++nOpc : p.n.startsWith('Hotel') ? 'H' : '✈';
      p.label = label;
      const icon = L.divIcon({ className: '', html: `<div class="pin ${p.k}"><span>${label}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
      const m = L.marker(p.ll, { icon, title: p.n }).bindPopup(`<b>${esc(p.n)}</b>${esc(p.d)}`);
      (layers[p.k] = layers[p.k] || L.layerGroup()).addLayer(m);
      p.marker = m;
    });
    layers.base.addTo(map);
    setFilter('inc');
    setTimeout(() => map.invalidateSize(), 200);
  }
  function setFilter(f) {
    $$('#map-filter button').forEach((b) => b.classList.toggle('on', b.dataset.f === f));
    if (!map) return;
    ['inc', 'opc'].forEach((k) => {
      const on = f === 'all' || f === k;
      on ? layers[k].addTo(map) : map.removeLayer(layers[k]);
    });
    const vis = D.puntos.filter((p) => p.k === 'base' || f === 'all' || p.k === f);
    map.fitBounds(L.latLngBounds(vis.map((p) => p.ll)), { padding: [40, 40] });
    $('#map-list').innerHTML = vis.map((p, i) => `<li><button data-i="${D.puntos.indexOf(p)}"><span class="pin ${p.k}" style="width:22px;height:22px;border-width:2px;flex:none"><span style="font-size:.7rem">${p.label}</span></span><span>${esc(p.n)}<small>${esc(p.d)}</small></span></button></li>`).join('');
    $$('#map-list button').forEach((b) => (b.onclick = () => {
      const p = D.puntos[+b.dataset.i];
      map.setView(p.ll, Math.max(map.getZoom(), 11));
      p.marker.openPopup();
    }));
  }
  $$('#map-filter button').forEach((b) => (b.onclick = () => setFilter(b.dataset.f)));

  setCurrent(0);
  /* Al recargar con #seccion en la dirección, volver directo ahí (sin animación). */
  const start = location.hash && document.getElementById(location.hash.slice(1));
  if (start) { document.documentElement.style.scrollBehavior = 'auto'; start.scrollIntoView(); requestAnimationFrame(() => (document.documentElement.style.scrollBehavior = '')); }
})();
