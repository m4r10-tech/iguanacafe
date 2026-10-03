/* =====================================================================
   LA IGUANA CAFÉ · FUNCIONAMIENTO DE LA WEB
   ---------------------------------------------------------------------
   Este archivo pinta las partes comunes (cabecera, pie, botones) y da vida
   a la web. Los DATOS (teléfono, horario, carta…) están en data.js:
   normalmente no hace falta tocar este archivo.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pagina = document.body.dataset.page || "";

  // Guardado seguro en el navegador (puede fallar en modo privado)
  const almacen = {
    get(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };

  // Escapa texto para meterlo en HTML sin riesgos
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 12.9 -> "12,90 €" · "13 / 7,50" -> "13 / 7,50 €" · null -> "Consultar precio"
  function precio(p) {
    if (p === null || p === undefined || p === "") return null;
    if (typeof p === "number") return p.toFixed(2).replace(".", ",") + " €";
    return p + " €";
  }
  const hhmm = (t) => t.replace(/^0/, "");

  /* ---------- Iconos SVG (inline, sin librerías) ---------- */
  const ICON = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.5c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.2h2.8V22h3.4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.2 5.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM21.9 7.1c-.1-1.6-.4-3-1.6-4.2S17.6 1.3 16 1.2C14.3 1.1 9.7 1.1 8 1.2 6.4 1.3 5 1.6 3.8 2.8S2.2 5.5 2.1 7.1c-.1 1.7-.1 6.3 0 8 .1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.7.1 6.3.1 8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.7.1-6.3.2-8zM19.7 17a3.3 3.3 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4A3.3 3.3 0 0 1 4.3 17c-.5-1.3-.4-4.3-.4-5.9s-.1-4.6.4-5.9A3.3 3.3 0 0 1 6.1 3.4c1.3-.5 4.3-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.9s.1 4.6-.4 5.9z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.8 2.5h3.2l-7 8 8.2 11h-6.4l-5-6.6-5.8 6.6H1.8l7.5-8.6L1.4 2.5H8l4.6 6 5.2-6zm-1.1 17h1.8L7.4 4.3H5.5l11.2 15.2z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.1 4.9A9.9 9.9 0 0 0 3.5 16.8L2 22l5.4-1.4a9.9 9.9 0 0 0 4.7 1.2 9.9 9.9 0 0 0 7-16.9zm-7 15.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.1.8.8-3.1-.2-.3a8.2 8.2 0 1 1 7 3.9zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
    mapa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>',
    google: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3zM12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22zM6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9L6.4 14zM12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5L6.4 10C7.2 7.8 9.4 6 12 6z"/></svg>',
    arriba: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.6 4.6 15l1.4 1.4 6-6 6 6 1.4-1.4z"/></svg>',
    izq: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.4 4.6 8 12l7.4 7.4 1.4-1.4-6-6 6-6z"/></svg>',
    der: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.6 4.6 7.2 6l6 6-6 6 1.4 1.4L16 12z"/></svg>',
    pausa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z"/></svg>',
    buscar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 14 15.5l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>',
    imprimir: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 8H5a3 3 0 0 0-3 3v6h4v4h12v-4h4v-6a3 3 0 0 0-3-3zm-3 11H8v-5h8v5zm3-7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM18 3H6v4h12V3z"/></svg>'
  };
  window.IGUANA_ICON = ICON;

  /* ---------- Navegación ---------- */
  const NAV = [
    { id: "la-iguana", texto: "Quiénes somos", href: "la-iguana.html" },
    { id: "carta", texto: "Carta", href: "carta.html" },
    { id: "desayunos", texto: "Desayunos", href: "desayunos.html" },
    { id: "menu-diario", texto: "Menú diario", href: "menu-diario.html" },
    { id: "menu-infantil", texto: "Menú infantil", href: "menu-infantil.html" },
    { id: "celebraciones", texto: "Celebraciones", href: "celebraciones.html" },
    { id: "contacto", texto: "Dónde estamos", href: "contacto.html" }
  ];

  const ext = 'target="_blank" rel="noopener noreferrer"';
  function redesHTML(clase) {
    return `
      <a class="${clase}" href="${REDES.instagram}" ${ext} aria-label="Instagram de La Iguana Café (abre en pestaña nueva)">${ICON.instagram}<span class="red__txt">Instagram</span></a>
      <a class="${clase}" href="${REDES.facebook}" ${ext} aria-label="Facebook de La Iguana Café (abre en pestaña nueva)">${ICON.facebook}<span class="red__txt">Facebook</span></a>
      <a class="${clase}" href="${REDES.x}" ${ext} aria-label="X (Twitter) de La Iguana Café (abre en pestaña nueva)">${ICON.x}<span class="red__txt">X</span></a>`;
  }

  /* ---------- Cabecera ---------- */
  function pintarCabecera() {
    const cont = $("#site-header");
    if (!cont) return;
    const links = NAV.map((n) =>
      `<li><a class="nav__link" href="${n.href}"${n.id === pagina ? ' aria-current="page"' : ""}>${n.texto}</a></li>`).join("");
    cont.outerHTML = `
      <a class="skip-link" href="#contenido">Saltar al contenido</a>
      <div class="topbar">
        <div class="container">
          <div class="topbar__info">
            <span class="estado" data-estado aria-live="polite">Comprobando horario…</span>
            <a href="tel:${NEGOCIO.telefonoLink}" class="topbar__tel">📞 ${NEGOCIO.telefono}</a>
            <span class="topbar__dir">📍 ${NEGOCIO.direccion.calle.split(",")[0]} · ${NEGOCIO.direccion.ciudad}</span>
          </div>
          <div class="topbar__redes">${redesHTML("topbar__red").replace(/<span class="red__txt">[^<]*<\/span>/g, "")}</div>
        </div>
      </div>
      <header class="site-header" id="cabecera">
        <div class="container">
          <a class="brand" href="index.html" aria-label="La Iguana Café, ir al inicio">
            <img src="assets/img/marca/logo.png" alt="La Iguana Café" width="340" height="174">
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">
            <span class="nav-toggle__bars"></span>
          </button>
          <nav class="nav" id="menu-principal" aria-label="Menú principal">
            <ul class="nav__list">${links}</ul>
            <a class="btn btn--sm nav__cta" href="tel:${NEGOCIO.telefonoLink}">${ICON.phone} Llamar</a>
          </nav>
        </div>
      </header>`;

    const toggle = $(".nav-toggle");
    const nav = $("#menu-principal");
    const cerrar = () => { nav.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Abrir menú"); };
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { cerrar(); toggle.focus(); } });
    $$(".nav__link", nav).forEach((a) => a.addEventListener("click", cerrar));

    const header = $("#cabecera");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Pie de página ---------- */
  function pintarPie() {
    const cont = $("#site-footer");
    if (!cont) return;
    const d = NEGOCIO.direccion;
    cont.outerHTML = `
      <footer class="site-footer">
        <div class="damero damero--fino" aria-hidden="true"></div>
        <img class="footer__iguana" src="assets/img/marca/iguana-tumbada.png" alt="" width="350" height="167" loading="lazy">
        <div class="container">
          <div class="footer__main">
            <div>
              <img class="footer__logo" src="assets/img/marca/logo.png" alt="La Iguana Café" width="340" height="174" loading="lazy">
              <p>Restaurante familiar inspirado en los diners americanos de los años 50. Pasta fresca hecha aquí, pizzas artesanales y hamburguesas naturales.</p>
              <div class="footer__redes">${redesHTML("").replace(/<span class="red__txt">[^<]*<\/span>/g, "")}
                <a href="${REDES.whatsapp}" ${ext} aria-label="WhatsApp (abre en pestaña nueva)">${ICON.whatsapp}</a>
              </div>
            </div>
            <div>
              <h2>Visítanos</h2>
              <address style="font-style:normal">
                ${d.calle}<br>${d.zona}<br>${d.cp} ${d.ciudad}<br>
                <a href="tel:${NEGOCIO.telefonoLink}">📞 ${NEGOCIO.telefono}</a><br>
                <a href="${REDES.mapas}" ${ext}>📍 Cómo llegar</a>
              </address>
            </div>
            <div>
              <h2>Horario</h2>
              <div class="footer-horario">
                <span>L–V: 9:30–16:00</span>
                <span>S y D: 13:30–16:00</span>
                <span>X y J noche: 20:30–${hhmm(CIERRE_NOCHE_X_J)}</span>
                <span>V y S noche: 20:30–23:30</span>
                <span>D noche: 20:30–23:00</span>
              </div>
              <p class="estado" data-estado style="margin-top:12px">…</p>
            </div>
            <div>
              <h2>La web</h2>
              <ul>
                <li><a href="index.html">Inicio</a></li>
                ${NAV.map((n) => `<li><a href="${n.href}">${n.texto}</a></li>`).join("")}
                <li><a href="politica-de-cookies.html">Política de cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container footer__bottom">
          <span>© ${new Date().getFullYear()} La Iguana Café · Toledo</span>
          <span>Prototipo de rediseño · <a href="comparativa.html">¿Por qué una web nueva?</a></span>
        </div>
      </footer>`;
  }

  /* ---------- Botones flotantes, volver arriba, cookies ---------- */
  function pintarFlotantes() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="flotantes" aria-label="Contacto rápido">
        <a class="btn" href="tel:${NEGOCIO.telefonoLink}">${ICON.phone} Llamar</a>
        <!-- ⚠️ Confirmar número de WhatsApp en data.js -->
        <a class="btn btn--whatsapp" href="${REDES.whatsapp}" ${ext}>${ICON.whatsapp} WhatsApp</a>
      </div>
      <button class="arriba" type="button" aria-label="Volver arriba">${ICON.arriba}</button>
      <div class="cookies" role="dialog" aria-live="polite" aria-labelledby="cookies-titulo">
        <h2 id="cookies-titulo">🍪 ¿Unas cookies con el café?</h2>
        <p>Usamos cookies técnicas para que la web funcione y, si aceptas, de análisis para mejorarla. <a href="politica-de-cookies.html">Más información</a>.</p>
        <div class="btn-group">
          <button class="btn btn--sm btn--verde" type="button" data-cookies="aceptar">Aceptar</button>
          <button class="btn btn--sm btn--outline" type="button" data-cookies="rechazar">Rechazar</button>
        </div>
      </div>
      <div class="lightbox" role="dialog" aria-modal="true" aria-label="Visor de fotos">
        <button class="lightbox__btn lightbox__cerrar" type="button" aria-label="Cerrar">${ICON.cerrar}</button>
        <button class="lightbox__btn lightbox__prev" type="button" aria-label="Foto anterior">${ICON.izq}</button>
        <img alt="">
        <button class="lightbox__btn lightbox__next" type="button" aria-label="Foto siguiente">${ICON.der}</button>
        <p class="lightbox__cap"></p>
      </div>`;
    while (wrap.firstElementChild) document.body.appendChild(wrap.firstElementChild);

    // Volver arriba
    const arriba = $(".arriba");
    window.addEventListener("scroll", () => arriba.classList.toggle("is-visible", window.scrollY > 600), { passive: true });
    arriba.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    // Cookies: recuerda la elección
    const banner = $(".cookies");
    if (!almacen.get("iguana-cookies")) setTimeout(() => banner.classList.add("is-visible"), 900);
    $$("[data-cookies]", banner).forEach((b) => b.addEventListener("click", () => {
      almacen.set("iguana-cookies", b.dataset.cookies);
      banner.classList.remove("is-visible");
    }));
  }

  /* ---------- Rellenar datos y enlaces en cualquier página ----------
     <a data-link="facebook">  -> pone el href de REDES.facebook
     <span data-dato="telefono"> -> escribe el teléfono */
  function rellenarDatos() {
    $$("[data-link]").forEach((a) => {
      const k = a.dataset.link;
      if (k === "tel") a.href = "tel:" + NEGOCIO.telefonoLink;
      else if (REDES[k]) {
        a.href = REDES[k];
        if (/^https?:/.test(REDES[k])) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      }
    });
    $$("[data-dato]").forEach((el) => {
      const k = el.dataset.dato;
      const d = NEGOCIO.direccion;
      const valores = {
        telefono: NEGOCIO.telefono,
        direccion: `${d.calle}, ${d.cp} ${d.ciudad}`,
        "menu-precio": precio(MENU_DIARIO.precio),
        "infantil-precio": precio(MENU_INFANTIL.precio),
        "nota-horario": NOTA_HORARIO
      };
      if (valores[k]) el.textContent = valores[k];
    });
    $$("[data-icon]").forEach((el) => { if (ICON[el.dataset.icon]) el.insertAdjacentHTML("afterbegin", ICON[el.dataset.icon]); });
    $$("[data-redes]").forEach((el) => { el.innerHTML = redesHTML(el.dataset.redes || "red"); });
    $$("[data-mapa]").forEach((el) => {
      el.innerHTML = `<iframe src="${REDES.mapaEmbed}" title="Mapa de Google con la ubicación de La Iguana Café en Toledo" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
    });
  }

  /* ---------- Horario: ¿abierto ahora? (hora de Madrid) ---------- */
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const aMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

  function ahoraMadrid() {
    try {
      const partes = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Madrid", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
      const get = (t) => partes.find((p) => p.type === t).value;
      const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
      return { dia, min: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
    } catch (e) {
      const d = new Date();
      return { dia: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function estadoHorario() {
    const { dia, min } = ahoraMadrid();
    const hoy = HORARIO[dia] || [];
    for (const [a, c] of hoy) {
      if (min >= aMin(a) && min < aMin(c)) return { abierto: true, texto: `Abierto ahora · cierra a las ${hhmm(c)}` };
    }
    // Próxima apertura (hoy más tarde o días siguientes)
    for (let i = 0; i < 7; i++) {
      const d = (dia + i) % 7;
      for (const [a] of HORARIO[d] || []) {
        if (i === 0 && aMin(a) <= min) continue;
        const cuando = i === 0 ? "hoy" : i === 1 ? "mañana" : `el ${DIAS[d]}`;
        return { abierto: false, texto: `Cerrado · abre ${cuando} a las ${hhmm(a)}` };
      }
    }
    return { abierto: false, texto: "Cerrado" };
  }

  function pintarEstado() {
    const e = estadoHorario();
    $$("[data-estado]").forEach((el) => {
      el.textContent = e.texto;
      el.classList.toggle("is-open", e.abierto);
      el.classList.toggle("is-closed", !e.abierto);
    });
  }

  function pintarTablasHorario() {
    const orden = [1, 2, 3, 4, 5, 6, 0];
    const hoy = ahoraMadrid().dia;
    $$("[data-horario-tabla]").forEach((tabla) => {
      tabla.innerHTML = `<caption class="sr-only">Horario de apertura semanal</caption><tbody>${orden.map((d) => {
        const turnos = HORARIO[d] || [];
        const nombre = DIAS[d][0].toUpperCase() + DIAS[d].slice(1);
        const txt = turnos.length ? turnos.map(([a, c]) => `${hhmm(a)} – ${hhmm(c)}`).join("<br>") : '<span class="cerrado">Cerrado</span>';
        const nocheCerrada = turnos.length === 1 && (d === 1 || d === 2) ? '<br><span class="cerrado">Noche cerrado*</span>' : "";
        return `<tr${d === hoy ? ' class="is-today"' : ""}><th scope="row">${nombre}</th><td>${txt}${nocheCerrada}</td></tr>`;
      }).join("")}</tbody>`;
    });
  }

  /* ---------- Carrusel del hero ---------- */
  function carrusel() {
    $$("[data-carousel]").forEach((root) => {
      const slides = $$(".carousel__slide", root);
      if (slides.length < 2) return;
      const dotsWrap = root.dataset.dots ? $(root.dataset.dots) : null;
      const btnPausa = $("[data-carousel-pausa]", root);
      let i = 0, timer = null, pausado = reduceMotion;

      const dots = slides.map((_, n) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = "carousel__dot"; b.setAttribute("aria-label", `Ver foto ${n + 1}`);
        b.addEventListener("click", () => { ir(n); reiniciar(); });
        dotsWrap && dotsWrap.appendChild(b);
        return b;
      });
      function ir(n) {
        slides[i].classList.remove("is-active"); slides[i].setAttribute("aria-hidden", "true");
        i = (n + slides.length) % slides.length;
        slides[i].classList.add("is-active"); slides[i].removeAttribute("aria-hidden");
        dots.forEach((d, k) => d.setAttribute("aria-current", k === i ? "true" : "false"));
      }
      function reiniciar() { clearInterval(timer); if (!pausado) timer = setInterval(() => ir(i + 1), 4500); }
      function pintarBoton() {
        if (!btnPausa) return;
        btnPausa.innerHTML = pausado ? ICON.play : ICON.pausa;
        btnPausa.setAttribute("aria-label", pausado ? "Reanudar carrusel" : "Pausar carrusel");
      }
      $("[data-carousel-prev]", root)?.addEventListener("click", () => { ir(i - 1); reiniciar(); });
      $("[data-carousel-next]", root)?.addEventListener("click", () => { ir(i + 1); reiniciar(); });
      btnPausa?.addEventListener("click", () => { pausado = !pausado; pintarBoton(); reiniciar(); });
      root.addEventListener("mouseenter", () => clearInterval(timer));
      root.addEventListener("mouseleave", reiniciar);
      root.addEventListener("focusin", () => clearInterval(timer));
      root.addEventListener("focusout", reiniciar);
      slides.forEach((s, k) => k && s.setAttribute("aria-hidden", "true"));
      ir(0); pintarBoton(); reiniciar();
    });
  }

  /* ---------- Lightbox (visor de fotos) ---------- */
  function lightbox() {
    const lb = $(".lightbox");
    if (!lb) return;
    const img = $("img", lb), cap = $(".lightbox__cap", lb);
    let grupo = [], idx = 0, ultimoFoco = null;
    function mostrar(n) {
      idx = (n + grupo.length) % grupo.length;
      const el = grupo[idx];
      img.src = el.dataset.full || $("img", el)?.src || el.src;
      img.alt = $("img", el)?.alt || el.alt || "";
      cap.textContent = el.dataset.caption || img.alt;
      $(".lightbox__prev", lb).hidden = $(".lightbox__next", lb).hidden = grupo.length < 2;
    }
    function abrir(el) {
      const g = el.dataset.lightbox;
      grupo = $$(`[data-lightbox="${g}"]`);
      ultimoFoco = document.activeElement;
      mostrar(grupo.indexOf(el));
      lb.classList.add("is-open");
      document.body.style.overflow = "hidden";
      $(".lightbox__cerrar", lb).focus();
    }
    function cerrar() { lb.classList.remove("is-open"); document.body.style.overflow = ""; ultimoFoco && ultimoFoco.focus(); }
    document.addEventListener("click", (e) => {
      const el = e.target.closest("[data-lightbox]");
      if (el) { e.preventDefault(); abrir(el); }
    });
    $(".lightbox__cerrar", lb).addEventListener("click", cerrar);
    $(".lightbox__prev", lb).addEventListener("click", () => mostrar(idx - 1));
    $(".lightbox__next", lb).addEventListener("click", () => mostrar(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) cerrar(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowLeft") mostrar(idx - 1);
      if (e.key === "ArrowRight") mostrar(idx + 1);
      if (e.key === "Tab") { // mantener el foco dentro del visor
        const f = $$("button:not([hidden])", lb);
        const primero = f[0], ultimo = f[f.length - 1];
        if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
        else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
      }
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function reveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach((e) => e.classList.add("is-visible")); return; }
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Tarjetas con efecto 3D sutil ---------- */
  function tilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    $$("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(0)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Scroll horizontal con botones ---------- */
  function viaje() {
    $$("[data-viaje]").forEach((wrap) => {
      const pista = $(".viaje", wrap);
      $("[data-viaje-prev]", wrap)?.addEventListener("click", () => pista.scrollBy({ left: -pista.clientWidth * 0.8, behavior: "smooth" }));
      $("[data-viaje-next]", wrap)?.addEventListener("click", () => pista.scrollBy({ left: pista.clientWidth * 0.8, behavior: "smooth" }));
    });
  }

  /* ---------- CARTA ---------- */
  function carta() {
    const app = $("#carta-app");
    if (!app) return;
    const tabs = $("#cat-tabs");
    const filtrosActivos = new Set();
    let texto = "";

    tabs.innerHTML = CARTA.map((c) => `
      <a class="cat-tab" href="#${c.id}" data-cat="${c.id}">
        <img class="ico-normal" src="assets/img/iconos/${c.icono}.png" alt="" width="40" height="40">
        <img class="ico-hover" src="assets/img/iconos/${c.icono}-hover.png" alt="" width="40" height="40">
        ${esc(c.nombre)}
      </a>`).join("");

    $("#carta-avisos").innerHTML = AVISOS_CARTA.map((a) => `<p class="aviso">${esc(a)}</p>`).join("");

    const ETIQ = { vegano: "🌱 Vegano", vegetariano: "🥕 Vegetariano", singluten: "🌾 Sin gluten", picante: "🌶️ Picante", novedad: "★ Novedad" };

    function platoHTML(p, cat) {
      const pr = precio(p.price);
      const foto = p.foto ? `<img class="plato__foto" src="${p.foto}" alt="${esc(p.nombre)} de La Iguana Café" width="84" height="84" loading="lazy" data-lightbox="carta" data-caption="${esc(p.nombre)}">` : "";
      return `
        <article class="plato${p.salsa ? " plato--salsa" : ""}">
          ${foto}
          <div class="plato__body">
            <div class="plato__top">
              <h3>${esc(p.nombre)}</h3>
              ${pr ? `<span class="plato__precio">${esc(pr)}</span>` : '<span class="plato__precio plato__precio--consultar">Consultar precio</span>'}
            </div>
            <p>${esc(p.desc)}</p>
            ${p.tags && p.tags.length ? `<div class="plato__tags">${p.tags.map((t) => `<span class="tag tag--${t}">${ETIQ[t] || t}</span>`).join("")}</div>` : ""}
          </div>
        </article>`;
    }

    function pintar() {
      const q = texto.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
      let total = 0;
      const html = CARTA.map((c) => {
        const platos = c.platos.filter((p) => {
          const t = (p.nombre + " " + p.desc).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
          const okTexto = !q || t.includes(q);
          // Las ensaladas y hamburguesas pueden ser sin gluten bajo petición
          const tags = new Set(p.tags || []);
          if (c.id === "ensaladas" || c.id === "hamburguesas") tags.add("singluten");
          const okFiltro = [...filtrosActivos].every((f) => f === "vegano" ? tags.has("vegano") : f === "vegetariano" ? (tags.has("vegetariano") || tags.has("vegano")) : tags.has(f));
          return okTexto && okFiltro;
        });
        total += platos.length;
        if (!platos.length) return "";
        return `
          <section class="cat-section" id="${c.id}" aria-labelledby="t-${c.id}">
            <div class="cat-head">
              <div class="cat-head__txt">
                <h2 id="t-${c.id}"><img src="assets/img/iconos/${c.icono}-hover.png" alt="" width="48" height="48">${esc(c.nombre)}</h2>
                <p>${esc(c.intro)}</p>
                ${c.nota ? `<p class="cat-head__nota">${esc(c.nota)}</p>` : ""}
              </div>
              ${c.foto ? `<div class="cat-head__img"><img src="${c.foto}" alt="${esc(c.nombre)} de La Iguana Café" loading="lazy" width="670" height="400"></div>` : ""}
            </div>
            <div class="platos">${platos.map((p) => platoHTML(p, c)).join("")}</div>
          </section>`;
      }).join("");
      app.innerHTML = total ? html : `
        <div class="sin-resultados">
          <img src="assets/img/marca/iguana-tumbada.png" alt="" width="350" height="167">
          <p><strong>¡Vaya! La iguana no encuentra ese plato.</strong><br>Prueba con otra palabra o quita algún filtro.</p>
        </div>`;
      $("#carta-contador").textContent = `${total} ${total === 1 ? "plato" : "platos"}`;
      observarSecciones();
    }

    // Pestaña activa según la sección visible
    let io;
    function observarSecciones() {
      if (io) io.disconnect();
      if (!("IntersectionObserver" in window)) return;
      io = new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          if (en.isIntersecting) {
            $$(".cat-tab", tabs).forEach((t) => t.classList.toggle("is-active", t.dataset.cat === en.target.id));
            const activo = $(".cat-tab.is-active", tabs);
            if (activo) tabs.scrollTo({ left: activo.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      $$(".cat-section", app).forEach((s) => io.observe(s));
    }

    $("#carta-buscar").addEventListener("input", (e) => { texto = e.target.value; pintar(); });
    $$("[data-filtro]").forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.filtro;
      const on = b.getAttribute("aria-pressed") !== "true";
      b.setAttribute("aria-pressed", String(on));
      on ? filtrosActivos.add(f) : filtrosActivos.delete(f);
      pintar();
    }));
    $("#carta-imprimir").addEventListener("click", () => window.print());
    pintar();

    // Datos estructurados de la carta para Google (Schema.org Menu)
    const ld = {
      "@context": "https://schema.org", "@type": "Menu", name: "Carta de La Iguana Café", inLanguage: "es",
      hasMenuSection: CARTA.map((c) => ({
        "@type": "MenuSection", name: c.nombre, description: c.intro,
        hasMenuItem: c.platos.map((p) => {
          const item = { "@type": "MenuItem", name: p.nombre, description: p.desc };
          if (typeof p.price === "number") item.offers = { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "EUR" };
          if ((p.tags || []).includes("vegano")) item.suitableForDiet = "https://schema.org/VeganDiet";
          else if ((p.tags || []).includes("singluten")) item.suitableForDiet = "https://schema.org/GlutenFreeDiet";
          return item;
        })
      }))
    };
    const s = document.createElement("script");
    s.type = "application/ld+json"; s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  }

  /* ---------- Platos estrella (inicio) ---------- */
  function estrellas() {
    const cont = $("#estrellas-app");
    if (!cont) return;
    const buscar = (cat, nombre) => (CARTA.find((c) => c.id === cat) || { platos: [] }).platos.find((p) => p.nombre === nombre) || {};
    const lista = [
      { cat: "hamburguesas", nombre: "La Iguana", foto: "assets/img/platos/hambu-iguana.jpg" },
      { cat: "hamburguesas", nombre: "La Ibérica", foto: "assets/img/platos/hambu-iberica.jpg" },
      { cat: "ensaladas", nombre: "Poke Bowl de pollo", foto: "assets/img/platos/ensaladas.jpg" },
      { cat: "postres", nombre: "Tarta Iguana", foto: "assets/img/platos/postre-zanah.jpg" }
    ];
    cont.innerHTML = lista.map((l, i) => {
      const p = buscar(l.cat, l.nombre);
      const pr = precio(p.price);
      return `
        <article class="card reveal reveal-delay-${i % 4}" data-tilt>
          <div class="card__img">
            ${pr ? `<span class="precio-burbuja">${esc(pr)}</span>` : ""}
            <!-- REEMPLAZAR por foto real actualizada si se desea -->
            <img src="${l.foto}" alt="${esc(l.nombre)}, plato estrella de La Iguana Café" width="440" height="506" loading="lazy">
          </div>
          <div class="card__body">
            <h3>${esc(l.nombre)}</h3>
            <p>${esc(p.desc || "")}</p>
            <a class="card__link" href="carta.html#${l.cat}">Ver en la carta →</a>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- Desayunos ---------- */
  function desayunos() {
    const cont = $("#desayunos-app");
    if (!cont) return;
    cont.innerHTML = DESAYUNOS.map((d, i) => `
      <article class="ticket reveal reveal-delay-${i % 3}${d.destacado ? " ticket--destacado" : ""}">
        ${d.destacado ? '<span class="tag tag--novedad ticket__badge">★ El favorito</span>' : ""}
        <span class="ticket__emoji" aria-hidden="true">${d.emoji}</span>
        <h3>${esc(d.nombre)}</h3>
        <p>${esc(d.desc)}</p>
        <div class="ticket__precio">${esc(precio(d.price))}</div>
      </article>`).join("");
    const s = $("#sueltos-app");
    if (s) s.innerHTML = DESAYUNOS_SUELTOS.map((d) => `<span class="suelto">${esc(d.nombre)}<b>${esc(precio(d.price))}</b></span>`).join("");
    const n = $("#nota-pulgas");
    if (n) n.textContent = NOTA_PULGAS;
  }

  /* ---------- Menú diario ---------- */
  function menuDiario() {
    const cont = $("#menu-diario-app");
    if (!cont) return;
    const m = MENU_DIARIO;
    cont.innerHTML = `
      <div class="pizarra reveal">
        <h2>Menú del día</h2>
        <p class="pizarra__semana">${esc(m.semana)}</p>
        <p class="text-center" style="margin-top:-12px"><strong>${esc(m.instrucciones)}</strong></p>
        <div class="pizarra__cols">
          <div>
            <h3>Principales <small>(elige 1)</small></h3>
            <ul>${m.principales.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>Acompañamientos <small>(elige 2)</small></h3>
            <ul>${m.acompanamientos.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          </div>
        </div>
        <div class="pizarra__pie">
          <div class="pizarra__precio" aria-label="Precio del menú: ${esc(precio(m.precio))}"><div><b>${String(m.precio).replace(".", ",")}</b><small>EUROS</small></div></div>
          <p class="pizarra__incluye">El precio incluye: <strong>${esc(m.incluye)}</strong>.<br>Laborables de 13:30 a 16:00 h.</p>
        </div>
      </div>`;
  }

  /* ---------- Menú infantil ---------- */
  function infantil() {
    const cont = $("#infantil-app");
    if (!cont) return;
    cont.innerHTML = MENU_INFANTIL.opciones.map((o, i) => `
      <article class="op-infantil reveal reveal-delay-${i % 3}">
        <span aria-hidden="true">${o.emoji}</span>
        <h3>${esc(o.nombre)}</h3>
        <p>${esc(o.extra)}</p>
      </article>`).join("");
  }

  /* ---------- Opiniones ---------- */
  function opiniones() {
    const cont = $("#opiniones-app");
    if (!cont) return;
    cont.innerHTML = OPINIONES.map((o, i) => `
      <blockquote class="opinion reveal reveal-delay-${i}">
        <div class="estrellas" aria-label="${o.estrellas} de 5 estrellas">${"★".repeat(o.estrellas)}</div>
        <p>${esc(o.texto)}</p>
        <footer>— ${esc(o.autor)} <span class="marca-ejemplo">EJEMPLO</span></footer>
      </blockquote>`).join("");
  }

  /* ---------- Formularios simulados (no envían nada) ---------- */
  function formularios() {
    $$("form[data-demo]").forEach((form) => {
      const ok = document.getElementById(form.dataset.demo);
      // No permitir fechas pasadas
      const hoy = new Date(); hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
      $$('input[type="date"]', form).forEach((i) => { i.min = hoy.toISOString().slice(0, 10); });

      function validarCampo(campo) {
        const field = campo.closest(".field");
        const err = $(".field__error", field);
        let msg = "";
        const v = campo.value.trim();
        if (campo.required && !v) msg = "Este campo es obligatorio.";
        else if (campo.type === "tel" && v && !/^(\+?34)?[\s-]?[6789](\s?-?\d){8}$/.test(v)) msg = "Escribe un teléfono válido (9 cifras).";
        else if (campo.type === "number" && v && (Number(v) < Number(campo.min || 0) || (campo.max && Number(v) > Number(campo.max)))) msg = `Indica un número entre ${campo.min} y ${campo.max}.`;
        else if (campo.type === "date" && v && v < campo.min) msg = "La fecha no puede ser anterior a hoy.";
        field.classList.toggle("has-error", !!msg);
        campo.setAttribute("aria-invalid", msg ? "true" : "false");
        if (err) err.textContent = msg;
        return !msg;
      }
      $$("input, select, textarea", form).forEach((c) => c.addEventListener("blur", () => validarCampo(c)));

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const campos = $$("input, select, textarea", form);
        const validos = campos.map(validarCampo);
        const primero = campos[validos.indexOf(false)];
        if (primero) { primero.focus(); return; }
        // Resumen para enviarlo por WhatsApp si el cliente quiere
        const datos = campos.filter((c) => c.value.trim()).map((c) => `${$(`label[for="${c.id}"]`, form)?.textContent.replace(/\(.*\)/, "").trim() || c.name}: ${c.value.trim()}`);
        const titulo = form.dataset.titulo || "Solicitud";
        const wa = $("[data-wa-resumen]", ok);
        if (wa) wa.href = `https://wa.me/${REDES.whatsappNumero}?text=${encodeURIComponent(`Hola, La Iguana Café 👋\n${titulo}:\n${datos.join("\n")}`)}`;
        form.hidden = true;
        ok.classList.add("is-visible");
        ok.setAttribute("tabindex", "-1");
        ok.focus();
      });
      $("[data-form-reset]", ok)?.addEventListener("click", () => {
        form.reset(); form.hidden = false; ok.classList.remove("is-visible");
        $$(".has-error", form).forEach((f) => f.classList.remove("has-error"));
        $("input", form)?.focus();
      });
    });
  }

  /* ---------- Arranque ---------- */
  pintarCabecera();
  pintarPie();
  pintarFlotantes();
  rellenarDatos();
  pintarEstado();
  setInterval(pintarEstado, 60000);
  pintarTablasHorario();
  carta();
  estrellas();
  desayunos();
  menuDiario();
  infantil();
  opiniones();
  carrusel();
  lightbox();
  formularios();
  viaje();
  reveal();
  tilt();
})();
