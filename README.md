# La Iguana Café · Prototipo de nueva web

Rediseño de la web de **La Iguana Café** (Toledo): diner americano de los años 50, con las mismas iguanas, el neón, el damero y los colores de la web actual, preparado para móvil, Google y redes sociales.

Es una web estática (HTML, CSS y JavaScript sin frameworks ni npm): se abre con doble clic y se puede subir tal cual a cualquier alojamiento gratuito.

## Páginas

| Página | Archivo |
|---|---|
| Inicio | `index.html` |
| Quiénes somos y galería | `la-iguana.html` |
| Carta (buscador, filtros e impresión) | `carta.html` |
| Desayunos | `desayunos.html` |
| Menú diario (pizarra) | `menu-diario.html` |
| Menú infantil | `menu-infantil.html` |
| Cumpleaños y fiestas (formulario de demostración) | `celebraciones.html` |
| Dónde estamos, pedidos y reservas | `contacto.html` |
| Política de cookies | `politica-de-cookies.html` |
| Página de error 404 | `404.html` |
| **Web actual vs. nueva web** (para la reunión con el dueño) | `comparativa.html` |

## Cómo verla en local

- **Opción rápida:** doble clic en `index.html`.
- **Opción recomendada** (el mapa y todo lo demás funcionan igual que publicada):
  ```bash
  python3 -m http.server 8000
  ```
  y abre <http://localhost:8000>.

## Cómo editar el contenido (sin saber programar)

Todo lo que cambia está en **`assets/js/data.js`**:

- `NEGOCIO`: teléfono y dirección.
- `REDES`: Instagram, Facebook, X, WhatsApp, Google Maps y reseñas.
- `HORARIO`: horario de apertura, que también alimenta el indicador «Abierto ahora».
- `CARTA`: platos, descripciones, precios y etiquetas (vegano, sin gluten…).
- `DESAYUNOS`: carta de desayunos.
- `MENU_DIARIO`: **se cambia cada semana** (fechas, principales, acompañamientos y precio).
- `MENU_INFANTIL` y `OPINIONES`.

## Pendiente de confirmar con el dueño

- [ ] **Usuario de Instagram** (`INSTAGRAM_URL` en `data.js`; ahora apunta a instagram.com).
- [ ] **Número de WhatsApp** (el 925 62 03 72 es un fijo; ¿hay un móvil con WhatsApp?).
- [ ] **Cierre de miércoles y jueves por la noche**: 22:45 o 23:00 (`CIERRE_NOCHE_X_J`).
- [ ] **Precio del menú diario** (17 € según la pizarra de la semana del 28/09 al 02/10/2026).
- [ ] Precios de bebidas y cócteles (ahora muestran «Consultar precio»).
- [ ] Enlace directo a las reseñas de Google (`resenasGoogle`).
- [ ] **Opiniones**: las tres que aparecen son de ejemplo; sustituirlas por reseñas reales.
- [ ] Fotos nuevas en alta resolución del local y de los platos (las actuales vienen de la web vieja y tienen poca resolución).
- [ ] Tour 360º: hay un hueco comentado en `index.html` y `la-iguana.html` para pegar el `<iframe>`.
- [ ] Línea de tiempo de «Quiénes somos» (es un texto de ejemplo editable).

## Publicar gratis

- **Netlify / Cloudflare Pages:** arrastra la carpeta a <https://app.netlify.com/drop> o crea un proyecto en Cloudflare Pages conectado al repositorio (sin comando de compilación y con la raíz `/` como carpeta de salida).
- **GitHub Pages:** en el repositorio, *Settings → Pages → Deploy from a branch → `main` / root*. La web quedará en `https://USUARIO.github.io/iguanacafe/`.

---
Prototipo de rediseño. Las imágenes y la marca pertenecen a La Iguana Café.
