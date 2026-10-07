/* =====================================================================
   LA IGUANA CAFÉ · EXPERIENCIA (animaciones e interacciones)
   ---------------------------------------------------------------------
   Usa GSAP + ScrollTrigger y Lenis (instalados con npm). Si el sistema
   pide "reducir movimiento", la web funciona igual, simplemente sin
   efectos. No hace falta tocar este archivo para
   cambiar contenidos: eso está en data.js.
   ===================================================================== */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CARTA } from "./data.js";
import { ruta } from "./utils.js";

export function iniciarExperiencia() {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ratonFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const G = gsap;
  const ST = ScrollTrigger;
  const conGsap = !reduce;
  const sesion = {
    get(k) {
      try {
        return sessionStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        sessionStorage.setItem(k, v);
      } catch {
        /* sin almacenamiento */
      }
    }
  };
  if (conGsap) G.registerPlugin(ST);

  /* ---------- 1. Scroll suave ---------- */
  let lenis = null;
  if (conGsap) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on("scroll", ST.update);
    G.ticker.add((t) => lenis.raf(t * 1000));
    G.ticker.lagSmoothing(0);
    // Enlaces internos con ancla: desplazamiento suave teniendo en cuenta la cabecera
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute("href").length < 2) return;
      const destino = document.querySelector(a.getAttribute("href"));
      if (!destino) return;
      e.preventDefault();
      lenis.scrollTo(destino, { offset: -90 });
    });
    // Parar el scroll suave cuando el visor de fotos está abierto
    const lb = $(".lightbox");
    if (lb)
      new MutationObserver(() => (lb.classList.contains("is-open") ? lenis.stop() : lenis.start())).observe(lb, {
        attributes: true,
        attributeFilter: ["class"]
      });
  }

  /* ---------- 2. Intro: el neón se enciende ---------- */
  const intro = $("#intro");
  let heroListo = false;
  function arrancarHero() {
    heroListo = true;
    document.dispatchEvent(new Event("iguana:listo"));
  }
  function cuandoListo(fn) {
    if (heroListo) fn();
    else document.addEventListener("iguana:listo", fn, { once: true });
  }
  if (intro) {
    if (reduce || !conGsap || sesion.get("iguana-intro")) {
      intro.remove();
      arrancarHero();
    } else {
      sesion.set("iguana-intro", "1");
      lenis && lenis.stop();
      const cols = document.createElement("div");
      cols.className = "arranque__damero";
      cols.innerHTML = "<span></span>".repeat(12);
      intro.appendChild(cols);
      requestAnimationFrame(() => intro.classList.add("is-on"));
      let cerrado = false;
      const cerrar = () => {
        if (cerrado) return;
        cerrado = true;
        intro.classList.add("is-out");
        G.to($$(".arranque__damero span", intro), {
          scaleY: 0,
          transformOrigin: "50% 0%",
          duration: 0.7,
          ease: "power3.inOut",
          stagger: { each: 0.04, from: "center" },
          onComplete: () => {
            intro.remove();
            lenis && lenis.start();
          }
        });
        setTimeout(arrancarHero, 250);
        // Salvaguarda: si la animación no llega a terminar, la intro se quita igualmente
        setTimeout(() => {
          if (intro.isConnected) {
            intro.remove();
            lenis && lenis.start();
          }
        }, 2500);
      };
      setTimeout(cerrar, 1900);
      intro.addEventListener("click", cerrar);
      window.addEventListener("keydown", cerrar, { once: true });
    }
  } else {
    arrancarHero();
  }

  /* ---------- 3. Barra de progreso y cabecera que se esconde ---------- */
  const barra = document.createElement("div");
  barra.className = "progreso";
  barra.setAttribute("aria-hidden", "true");
  document.body.appendChild(barra);
  const header = $("#cabecera");
  let ultimoY = window.scrollY;
  function alHacerScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (header) {
      const menuAbierto = $("#menu-principal")?.classList.contains("is-open");
      if (!menuAbierto && y > ultimoY + 6 && y > 500) header.classList.add("is-hidden");
      else if (y < ultimoY - 6 || y < 200) header.classList.remove("is-hidden");
    }
    ultimoY = y;
  }
  window.addEventListener("scroll", alHacerScroll, { passive: true });
  alHacerScroll();

  /* ---------- 4. Cursor de neón ---------- */
  if (ratonFino && !reduce) {
    const c = document.createElement("div");
    c.className = "cursor";
    c.setAttribute("aria-hidden", "true");
    c.innerHTML = '<span class="cursor__txt"></span>';
    const d = document.createElement("div");
    d.className = "cursor-dot";
    d.setAttribute("aria-hidden", "true");
    document.body.append(c, d);
    const txt = $(".cursor__txt", c);
    let mx = -100,
      my = -100,
      cx = mx,
      cy = my;
    window.addEventListener(
      "pointermove",
      (e) => {
        mx = e.clientX;
        my = e.clientY;
        d.style.transform = `translate(${mx}px, ${my}px)`;
        document.documentElement.classList.add("has-cursor");
      },
      { passive: true }
    );
    document.addEventListener("pointerleave", () => document.documentElement.classList.remove("has-cursor"));
    (function bucle() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      c.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(bucle);
    })();
    document.addEventListener("pointerover", (e) => {
      const t = e.target;
      const campo = t.closest("input, textarea, select, iframe");
      const conTexto = t.closest("[data-cursor], [data-lightbox], .anillo__item");
      const enlace = t.closest("a, button, label, summary, .chip");
      c.classList.toggle("is-hidden", !!campo);
      c.classList.toggle("is-label", !!conTexto);
      c.classList.toggle("is-link", !conTexto && !!enlace);
      txt.textContent = conTexto ? conTexto.dataset.cursor || (conTexto.matches(".anillo__item") ? "Ver" : "Ver") : "";
    });
  }

  /* ---------- 5. Botones magnéticos ---------- */
  if (ratonFino && !reduce) {
    $$(".btn").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.32;
        b.style.transform = `translate(${x}px, ${y}px)`;
      });
      b.addEventListener("pointerleave", () => {
        b.style.transform = "";
      });
    });
  }

  /* ---------- 6. Tarjetas con inclinación 3D y brillo ---------- */
  function activarTilt(root = document) {
    if (!ratonFino || reduce) return;
    $$("[data-tilt3d], .card, .valor, .ticket, .op-infantil, .opinion, .acceso, .tour360", root).forEach((el) => {
      if (el.dataset.tiltOn) return;
      el.dataset.tiltOn = "1";
      el.setAttribute("data-tilt3d", "");
      if (!$(":scope > .brillo", el)) {
        const g = document.createElement("span");
        g.className = "brillo";
        el.appendChild(g);
      }
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width,
          py = (e.clientY - r.top) / r.height;
        el.classList.add("is-tilting");
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) scale(1.02)`;
        el.style.setProperty("--gx", px * 100 + "%");
        el.style.setProperty("--gy", py * 100 + "%");
      });
      el.addEventListener("pointerleave", () => {
        el.classList.remove("is-tilting");
        el.style.transform = "";
      });
    });
  }
  activarTilt();
  // La carta y otros bloques se pintan con JS: volver a activar cuando cambian
  ["#estrellas-app", "#desayunos-app", "#infantil-app", "#opiniones-app"].forEach((s) => {
    const n = $(s);
    if (n) new MutationObserver(() => activarTilt(n)).observe(n, { childList: true });
  });

  /* ---------- 7. Títulos que aparecen letra a letra ---------- */
  function partirTitulo(el) {
    if (el.dataset.splitHecho || el.children.length) return null;
    const texto = el.textContent.trim();
    el.dataset.splitHecho = "1";
    el.setAttribute("aria-label", texto);
    el.innerHTML = texto
      .split(/\s+/)
      .map(
        (p) =>
          `<span class="split-palabra" aria-hidden="true">${Array.from(p)
            .map((l) => `<span class="split-letra">${l}</span>`)
            .join("")}</span>`
      )
      .join(" ");
    return $$(".split-letra", el);
  }
  if (conGsap) {
    $$("[data-split], .page-hero h1, .section-head .titulo").forEach((el) => {
      const letras = partirTitulo(el);
      if (!letras) return;
      G.from(letras, {
        yPercent: 115,
        rotate: 10,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.7)",
        stagger: 0.022,
        scrollTrigger: { trigger: el, start: "top 98%", once: true }
      });
    });
  }

  /* ---------- 8. Contadores ---------- */
  function contar(el) {
    const fin = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || "0", 10);
    const fmt = (v) => v.toFixed(dec).replace(".", ",");
    if (!conGsap) {
      el.textContent = fmt(fin);
      return;
    }
    const o = { v: 0 };
    G.to(o, {
      v: fin,
      duration: 1.8,
      ease: "power2.out",
      onUpdate: () => (el.textContent = fmt(o.v)),
      scrollTrigger: { trigger: el, start: "top 90%", once: true }
    });
  }
  $$("[data-count]").forEach(contar);

  /* ---------- 9. Parallax genérico (data-speed) ---------- */
  if (conGsap) {
    $$("[data-speed]").forEach((el) => {
      const v = parseFloat(el.dataset.speed);
      G.fromTo(
        el,
        { y: () => v * window.innerHeight },
        {
          y: () => -v * window.innerHeight,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true }
        }
      );
    });
  }

  /* ---------- 10. HERO DE CINE ---------- */
  const cine = $("#cine");
  if (cine) {
    const video = $("#cine-video");
    const btn = $("#cine-pausa");
    const ahorro = navigator.connection && navigator.connection.saveData;
    const pintarBoton = () => {
      const pausado = video.paused;
      btn.setAttribute("aria-pressed", String(pausado));
      btn.querySelector("span").textContent = pausado ? "Reproducir vídeo" : "Pausar vídeo";
      btn.querySelector("svg").innerHTML = pausado
        ? '<path d="M7 4v16l13-8z"/>'
        : '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
    };
    let pausadoPorUsuario = false;
    if (video) {
      if (reduce || ahorro) {
        video.removeAttribute("autoplay");
        video.pause();
        pausadoPorUsuario = true;
      }
      video.addEventListener("play", pintarBoton);
      video.addEventListener("pause", pintarBoton);
      btn.addEventListener("click", () => {
        if (video.paused) {
          pausadoPorUsuario = false;
          video.play().catch(() => {});
        } else {
          pausadoPorUsuario = true;
          video.pause();
        }
      });
      // Ahorra batería: el vídeo solo se reproduce cuando se ve
      let heroVisible = true;
      const intentarPlay = () => {
        if (heroVisible && !pausadoPorUsuario && !document.hidden) video.play().catch(() => {});
      };
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(([en]) => {
          heroVisible = en.isIntersecting;
          if (heroVisible) intentarPlay();
          else video.pause();
        }).observe(cine);
      }
      // Si la página se abrió en segundo plano, el navegador no reproduce el vídeo: reintentarlo al volver
      document.addEventListener("visibilitychange", intentarPlay);
      window.addEventListener("pointerdown", intentarPlay, { once: true });
      window.addEventListener("scroll", intentarPlay, { once: true, passive: true });
      pintarBoton();
    }

    if (conGsap) {
      const lineas = $$(".cine__titulo .linea", cine);
      G.set(lineas, { opacity: 0, yPercent: 60, rotateX: -75, transformOrigin: "50% 100%" });
      G.set([".cine__kicker", ".cine__sub", ".cine .btn-group", ".cine__estado"], { opacity: 0, y: 30 });
      G.set(".cine__regla", { scaleX: 0 });
      G.set(".cine__capa", { opacity: 0, scale: 0.6 });
      cuandoListo(() => {
        const tl = G.timeline({ defaults: { ease: "expo.out" } });
        tl.to(".cine__estado", { opacity: 1, y: 0, duration: 0.8 })
          .to(".cine__kicker", { opacity: 1, y: 0, duration: 0.8 }, "<0.1")
          .to(lineas, { opacity: 1, yPercent: 0, rotateX: 0, duration: 1.4, stagger: 0.18 }, "<0.1")
          .to(".cine__regla", { scaleX: 1, duration: 1, ease: "power3.inOut" }, "<0.4")
          .to(".cine__sub", { opacity: 1, y: 0, duration: 1 }, "<0.2")
          .to(".cine .btn-group", { opacity: 1, y: 0, duration: 1 }, "<0.15")
          .to(".cine__capa", { opacity: 1, scale: 1, duration: 1.2, ease: "back.out(1.6)", stagger: 0.15 }, "<");
      });

      // Al hacer scroll: el vídeo se acerca y el texto se aleja
      G.to(video, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: cine, start: "top top", end: "bottom top", scrub: true }
      });
      G.to("#cine-contenido", {
        yPercent: 25,
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: { trigger: cine, start: "30% top", end: "bottom top", scrub: true }
      });

      // Al mover el ratón: el título y las capas se mueven en 3D
      if (ratonFino) {
        const titulo = $(".cine__titulo", cine);
        const capas = $$("[data-depth]", cine);
        const qx = G.quickTo(titulo, "rotationY", { duration: 0.8, ease: "power3" });
        const qy = G.quickTo(titulo, "rotationX", { duration: 0.8, ease: "power3" });
        const qv = G.quickTo(video, "x", { duration: 1.2, ease: "power3" });
        const capasQ = capas.map((c) => ({
          c,
          d: parseFloat(c.dataset.depth),
          x: G.quickTo(c, "x", { duration: 1, ease: "power3" }),
          y: G.quickTo(c, "y", { duration: 1, ease: "power3" })
        }));
        cine.addEventListener("pointermove", (e) => {
          const x = e.clientX / window.innerWidth - 0.5,
            y = e.clientY / window.innerHeight - 0.5;
          qx(x * 16);
          qy(-y * 12);
          qv(-x * 30);
          capasQ.forEach((k) => {
            k.x(x * 70 * k.d);
            k.y(y * 50 * k.d);
          });
        });
        cine.addEventListener("pointerleave", () => {
          qx(0);
          qy(0);
          qv(0);
          capasQ.forEach((k) => {
            k.x(0);
            k.y(0);
          });
        });
      }
    }
  }

  /* ---------- 11. "Entra en La Iguana": recorrido al hacer scroll ---------- */
  const entra = $("#entra");
  if (entra) {
    if (!conGsap) {
      entra.classList.add("is-estatico");
    } else {
      const capas = $$(".entra__capa", entra);
      const pasos = $$(".entra__paso", entra);
      const barras = $$(".entra__barra b", entra);
      G.set(capas.slice(1), { clipPath: "circle(0% at 72% 50%)" });
      G.set(pasos.slice(1), { opacity: 0, y: 60 });
      const tl = G.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: entra,
          start: "top top",
          end: () => "+=" + window.innerHeight * 2.2,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2
        }
      });
      tl.fromTo($("img", capas[0]), { scale: 1.05 }, { scale: 1.2, duration: 1 }, 0).to(
        barras[0],
        { scaleX: 1, duration: 1 },
        0
      );
      for (let i = 1; i < capas.length; i++) {
        const t = i;
        tl.to(capas[i], { clipPath: "circle(150% at 72% 50%)", duration: 1, ease: "power2.inOut" }, t - 0.15)
          .fromTo($("img", capas[i]), { scale: 1.35 }, { scale: 1.05, duration: 1.2, ease: "power2.out" }, t - 0.15)
          .to(pasos[i - 1], { opacity: 0, y: -50, duration: 0.3 }, t - 0.15)
          .to(pasos[i], { opacity: 1, y: 0, duration: 0.35 }, t + 0.05)
          .to(barras[i], { scaleX: 1, duration: 1 }, t);
      }
    }
  }

  /* ---------- 12. Carrusel 3D de platos ---------- */
  const anillo = $("#anillo");
  if (anillo) {
    const buscar = (cat, nombre) =>
      (CARTA.find((c) => c.id === cat) || { platos: [] }).platos.find((p) => p.nombre === nombre) || {};
    const precio = (p) =>
      p === null || p === undefined ? "" : typeof p === "number" ? p.toFixed(2).replace(".", ",") + " €" : p + " €";
    const lista = [
      { cat: "hamburguesas", n: "La Iguana", f: "assets/img/platos/hambu-iguana.jpg" },
      { cat: "hamburguesas", n: "La Ibérica", f: "assets/img/platos/hambu-iberica.jpg" },
      { cat: "pizzas", n: "Carnívora", f: "assets/img/platos/pizzas.jpg" },
      { cat: "pasta", n: "Pasta fresca", f: "assets/img/platos/pasta.jpg", p: "desde 7,50 €" },
      { cat: "ensaladas", n: "Poke Bowl de pollo", f: "assets/img/platos/ensaladas.jpg" },
      { cat: "un-poco-de-todo", n: "Fajitas", f: "assets/img/platos/un-poco-de-todo.jpg" },
      { cat: "hamburguesas", n: "Mister Chicken", f: "assets/img/platos/hambu-chicken.jpg" },
      { cat: "postres", n: "Tarta Iguana", f: "assets/img/platos/postre-zanah.jpg" },
      { cat: "postres", n: "Brownie", f: "assets/img/platos/postre-brownie.jpg" },
      { cat: "postres", n: "Tortitas", f: "assets/img/platos/postre-tortitas.jpg" }
    ];
    anillo.innerHTML = lista
      .map((l) => {
        const p = buscar(l.cat, l.n);
        return `<a class="anillo__item" role="listitem" href="carta.html#${l.cat}" data-cursor="Ver" draggable="false">
        <img src="${ruta(l.f)}" alt="${l.n}, La Iguana Café" width="440" height="506" decoding="async" draggable="false">
        <div><h3>${l.n}</h3><span>${l.p || precio(p.price)}</span></div></a>`;
      })
      .join("");
    const items = $$(".anillo__item", anillo);
    const n = items.length,
      paso = 360 / n;
    let inercia = 0;
    const vel = reduce ? 0 : 0.06;
    let radio = 0,
      angulo = 0,
      arrastrando = false,
      encima = false,
      movido = 0;
    function colocar() {
      const w = items[0].offsetWidth || 220;
      radio = Math.round((w / 2 / Math.tan(Math.PI / n)) * 1.12);
      items.forEach((it, i) => {
        it.style.transform = `rotateY(${i * paso}deg) translateZ(${radio}px)`;
      });
    }
    function pintar() {
      anillo.style.transform = `translateZ(${-radio}px) rotateX(-6deg) rotateY(${angulo}deg)`;
    }
    colocar();
    pintar();
    window.addEventListener("resize", () => {
      colocar();
      pintar();
    });
    (function girar() {
      if (!arrastrando && !encima) angulo -= vel;
      if (!arrastrando && Math.abs(inercia) > 0.01) {
        angulo += inercia;
        inercia *= 0.94;
      }
      pintar();
      requestAnimationFrame(girar);
    })();
    const wrap = $("#anillo-wrap");
    let ultimoX = 0;
    wrap.addEventListener("pointerdown", (e) => {
      arrastrando = true;
      movido = 0;
      ultimoX = e.clientX;
      inercia = 0;
    });
    window.addEventListener("pointermove", (e) => {
      if (!arrastrando) return;
      const dx = e.clientX - ultimoX;
      ultimoX = e.clientX;
      movido += Math.abs(dx);
      angulo += dx * 0.25;
      inercia = dx * 0.25;
    });
    window.addEventListener("pointerup", () => {
      arrastrando = false;
    });
    wrap.addEventListener(
      "click",
      (e) => {
        if (movido > 6) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
    wrap.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") encima = true;
    });
    wrap.addEventListener("pointerleave", () => {
      encima = false;
    });
    const irA = (delta) => {
      const fin = Math.round((angulo + delta) / paso) * paso;
      if (G)
        G.to(
          { a: angulo },
          {
            a: fin,
            duration: 0.8,
            ease: "power3.out",
            onUpdate() {
              angulo = this.targets()[0].a;
            }
          }
        );
      else angulo = fin;
    };
    $("#anillo-prev")?.addEventListener("click", () => irA(paso));
    $("#anillo-next")?.addEventListener("click", () => irA(-paso));
    // Con teclado: al enfocar un plato, se gira hasta ponerlo delante
    items.forEach((it, i) =>
      it.addEventListener("focus", () => {
        angulo = -i * paso;
      })
    );
    // El scroll también hace girar la vitrina
    if (conGsap)
      ST.create({
        trigger: wrap,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (s) => {
          inercia += s.getVelocity() * -0.00025;
        }
      });
  }

  /* ---------- 13. Un día en La Iguana: de la mañana a la noche ---------- */
  const dia = $("#dia");
  if (dia) {
    const paneles = $$(".dia__panel", dia);
    const puntos = $$(".dia__nav i", dia);
    const usarHorizontal = conGsap && window.innerWidth >= 900;
    if (!usarHorizontal) {
      dia.classList.add("is-vertical");
    } else {
      const pista = $("#dia-pista");
      const colores = paneles.map((p) => p.dataset.color);
      const mezcla = G.utils.interpolate(colores);
      const recorrido = () => pista.scrollWidth - window.innerWidth;
      const tween = G.to(pista, {
        x: () => -recorrido(),
        ease: "none",
        scrollTrigger: {
          trigger: dia,
          start: "top top",
          end: () => "+=" + recorrido(),
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (s) => {
            dia.style.backgroundColor = mezcla(s.progress);
            const idx = Math.round(s.progress * (paneles.length - 1));
            puntos.forEach((p, i) => p.classList.toggle("is-on", i === idx));
          }
        }
      });
      paneles.forEach((p) => {
        const foto = $(".dia__foto", p);
        const hora = $(".dia__hora", p);
        G.from(foto, {
          rotate: 10,
          scale: 0.8,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 90%", end: "left 30%", scrub: true }
        });
        G.from(hora, {
          xPercent: 40,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 95%", end: "left 45%", scrub: true }
        });
      });
    }
  }

  /* ---------- 14. Transiciones entre páginas (damero) ---------- */
  if (conGsap) {
    const capa = document.createElement("div");
    capa.className = "transicion";
    capa.setAttribute("aria-hidden", "true");
    capa.innerHTML = "<span></span>".repeat(40);
    document.body.appendChild(capa);
    const celdas = $$("span", capa);
    if (sesion.get("iguana-transicion")) {
      sesion.set("iguana-transicion", "");
      G.set(celdas, { scale: 1.02 });
      G.to(celdas, {
        scale: 0,
        duration: 0.55,
        ease: "power3.inOut",
        stagger: { each: 0.012, from: "random" },
        delay: 0.05
      });
    }
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (
        a.target === "_blank" ||
        a.hasAttribute("download") ||
        /^(tel:|mailto:|https?:|#)/.test(href) ||
        !/\.html(#.*)?$/.test(href)
      )
        return;
      const actual = location.pathname.split("/").pop() || "index.html";
      if (href.split("#")[0] === actual) return;
      e.preventDefault();
      sesion.set("iguana-transicion", "1");
      G.to(celdas, {
        scale: 1.02,
        duration: 0.45,
        ease: "power3.inOut",
        stagger: { each: 0.01, from: "random" },
        onComplete: () => {
          location.href = href;
        }
      });
    });
    // Al volver con el botón "atrás" (caché del navegador), quitar la capa
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) G.set(celdas, { scale: 0 });
    });
  }

  /* ---------- 15. Recalcular al cargar imágenes y fuentes ---------- */
  if (conGsap) {
    // Las secciones fijadas se calculan primero y el resto después, en orden de página
    ST.sort();
    ST.refresh();
    window.addEventListener("load", () => {
      ST.refresh();
      setTimeout(() => ST.refresh(), 1200);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ST.refresh());
  }
}
