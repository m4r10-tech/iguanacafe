# La Iguana Café · Nueva web

Rediseño de la web de **La Iguana Café** (Toledo): diner americano de los años 50, con la identidad de siempre (logo, iguana, damero, verde y crema) y una experiencia moderna: vídeo de fondo, scroll cinematográfico, vitrina 3D y animaciones, preparada para móvil y para Google.

**Tecnología:** [Vite](https://vite.dev/) · JavaScript (módulos ES) · CSS · [GSAP](https://gsap.com/) + ScrollTrigger · [Lenis](https://lenis.darkroom.engineering/) · ESLint · Prettier · GitHub Actions + GitHub Pages.

## Puesta en marcha

Requisitos: [Node.js](https://nodejs.org/) 20.19 o superior (recomendado 22, ver `.nvmrc`).

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # servidor de desarrollo → http://localhost:5173
```

El navegador se abre solo y se actualiza al instante al guardar cualquier archivo. En la terminal aparece también una dirección `http://192.168.x.x:5173` para verla **en el móvil** conectado a la misma wifi.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga instantánea |
| `npm run build` | Genera la versión optimizada para publicar en `dist/` |
| `npm run preview` | Sirve `dist/` para revisarla antes de publicar |
| `npm run lint` / `lint:fix` | Revisa el JavaScript con ESLint (y corrige lo automático) |
| `npm run format` / `format:check` | Formatea el código con Prettier |
| `npm run check` | Lint + build: lo mismo que comprueba GitHub antes de publicar |

## Estructura

```
├── index.html, carta.html, …      Páginas (una por sección; Vite las compila todas)
├── src/
│   ├── js/
│   │   ├── app.js                 Punto de entrada (lo carga cada página)
│   │   ├── data.js                ⭐ DATOS: teléfono, horario, carta, menú del día…
│   │   ├── main.js                Cabecera, pie, carta, formularios, horario en vivo…
│   │   ├── experiencia.js         Animaciones: intro, vídeo, scroll, 3D, cursor…
│   │   └── utils.js               Utilidades (rutas de imágenes)
│   └── css/
│       ├── styles.css             Estilos base y componentes
│       └── experiencia.css        Estilos de la capa de animaciones
├── public/                        Se publica tal cual: imágenes, vídeo, robots.txt, sitemap.xml
│   └── assets/img, assets/video
├── vite.config.js                 Configuración de Vite (multipágina)
├── eslint.config.js, .prettierrc.json, .editorconfig
└── .github/workflows/deploy.yml   Publicación automática en GitHub Pages
```

## Cómo editar el contenido (sin saber programar)

Casi todo se cambia en **`src/js/data.js`**:

- `NEGOCIO`: teléfono y dirección.
- `REDES`: Instagram, Facebook, X, WhatsApp, Google Maps y reseñas.
- `HORARIO`: horario de apertura (también alimenta el aviso «Abierto ahora»).
- `CARTA`: platos, descripciones, precios y etiquetas (vegano, sin gluten…).
- `DESAYUNOS`, `MENU_INFANTIL`, `OPINIONES`.
- `MENU_DIARIO`: **se cambia cada semana** (fechas, principales, acompañamientos y precio).

Las fotos van en `public/assets/img/` y se referencian como `assets/img/…`.

## La experiencia

- **Intro**: el cartel de neón se enciende (solo la primera visita de cada sesión; se salta con un clic o una tecla).
- **Hero de cine**: vídeo de fondo del local (`public/assets/video/recorrido.mp4` / `.webm`), con el titular de neón en 3D que sigue al ratón.
- **«Entra en La Iguana»**: al hacer scroll se cruza la puerta y se recorre el local (fachada → entrada → reservados → neón).
- **Vitrina 3D** de platos estrella: se arrastra, gira sola y responde al scroll.
- **«Un día en La Iguana»**: scroll horizontal que va de la mañana (desayunos) a la noche de neón.
- **Detalles**: cursor de neón, botones magnéticos, tarjetas que se inclinan en 3D con brillo, títulos que aparecen letra a letra, contadores, parallax, transiciones de página con damero y scroll suave.
- Todo esto vive en `src/js/experiencia.js` y `src/css/experiencia.css`, y usa GSAP y Lenis (instalados con npm). Si el sistema tiene activado «reducir movimiento», la web funciona igual pero sin efectos.

## Páginas

| Página | Archivo |
|---|---|
| Inicio | `index.html` |
| Quiénes somos y galería | `la-iguana.html` |
| Carta (buscador, filtros e impresión) | `carta.html` |
| Desayunos | `desayunos.html` |
| Menú diario | `menu-diario.html` |
| Menú infantil | `menu-infantil.html` |
| Cumpleaños y fiestas | `celebraciones.html` |
| Dónde estamos, pedidos y reservas | `contacto.html` |
| Política de cookies | `politica-de-cookies.html` |
| Error 404 | `404.html` |
| **Web actual vs. nueva web** (para la reunión con el dueño) | `comparativa.html` |

## Publicación (GitHub Pages)

La publicación es automática con **GitHub Actions**: cada `git push` a `main` revisa el código, compila la web y la publica.

**Solo hay que activarlo una vez:** en GitHub → *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.

La web queda en `https://<usuario>.github.io/iguanacafe/`. Para usar un dominio propio (p. ej. `iguanacafe.es`), añádelo en *Settings → Pages → Custom domain* y cambia `BASE_PATH` a `/` en `.github/workflows/deploy.yml`.

También se puede publicar `dist/` en Netlify o Cloudflare Pages (comando de build: `npm run build`; carpeta de salida: `dist`).

## Pendiente de confirmar con el dueño

- [ ] **Usuario de Instagram** (`INSTAGRAM_URL` en `data.js`; ahora apunta a instagram.com).
- [ ] **Número de WhatsApp** (el 925 62 03 72 es un fijo; ¿hay un móvil con WhatsApp?).
- [ ] **Cierre de miércoles y jueves por la noche**: 22:45 o 23:00 (`CIERRE_NOCHE_X_J`).
- [ ] **Precio del menú diario** (17 € según la pizarra de la semana del 28/09 al 02/10/2026).
- [ ] Precios de bebidas y cócteles (ahora muestran «Consultar precio»).
- [ ] Enlace directo a las reseñas de Google (`resenasGoogle`).
- [ ] **Opiniones**: las tres que aparecen son de ejemplo; sustituirlas por reseñas reales.
- [ ] ⚠️ **Fotos del interior** (`public/assets/img/interior/`) y **vídeo de fondo** (montado con esas fotos): proceden de fotos de clientes publicadas en reseñas (Restaurant Guru / Google). Sirven para enseñar la propuesta al dueño, pero **antes de publicar la web hay que sustituirlas** por fotos y un vídeo propios del restaurante (bastan 20–30 s grabados con el móvil en horizontal).
- [ ] Fotos nuevas en alta resolución del local y de los platos (las actuales vienen de la web vieja y tienen poca resolución).
- [ ] Tour 360º: hay un hueco comentado en `index.html` y `la-iguana.html` para pegar el `<iframe>`.
- [ ] Línea de tiempo de «Quiénes somos» (es un texto de ejemplo editable).


---
Prototipo de rediseño. Las imágenes y la marca pertenecen a La Iguana Café.
