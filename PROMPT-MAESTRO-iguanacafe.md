# PROMPT MAESTRO — Rediseño frontend de La Iguana Café

> Copia todo lo que hay dentro del bloque de abajo y pégalo en una conversación nueva de Claude. Cuando termine, pide los ajustes que quieras (ver "Prompts de ajuste" al final).

```
Actúa como diseñador/a y desarrollador/a frontend senior. Quiero que construyas el prototipo completo de la nueva web de "La Iguana Café", un restaurante de Toledo, para enseñárselo a su dueño y convencerle de cambiar de web. Solo FRONTEND (sin backend ni base de datos): todo lo que parezca dinámico (formularios, reservas) debe estar simulado con JavaScript.

═══════════════ 1. OBJETIVO Y RESTRICCIONES ═══════════════
- Entregable: sitio estático multipágina listo para abrir con doble clic en index.html Y para subir tal cual a un hosting gratuito (Netlify, Cloudflare Pages o GitHub Pages). Nada de build steps, nada de npm: HTML + CSS + JS vanilla, sin frameworks.
- Estructura de carpetas:
  /index.html, /la-iguana.html, /carta.html, /desayunos.html, /menu-diario.html, /menu-infantil.html, /celebraciones.html, /contacto.html, /politica-de-cookies.html, /404.html
  /assets/css/styles.css  /assets/js/main.js  /assets/js/data.js  /assets/img/ (placeholders)
- Todas las rutas relativas (que funcionen desde file:// y desde un subdominio gratuito).
- Mobile-first, responsive de 320px a 1440px, SIN scroll horizontal.
- Accesible (WCAG AA): contraste, alt en imágenes, foco visible, navegación por teclado, aria-labels, respeta prefers-reduced-motion.
- Rápido: imágenes con loading="lazy", sin librerías pesadas. Se permiten solo Google Fonts y, si hace falta, una CDN de iconos (cdnjs).
- SEO: <title> y meta description únicos por página, Open Graph, lang="es", HTML semántico, y JSON-LD Schema.org tipo "Restaurant" con dirección, teléfono, horario (openingHoursSpecification), servesCuisine, priceRange.
- Imágenes: NO uses el logo ni las fotos originales. Usa placeholders (https://images.unsplash.com con fotos de hamburguesas, pizza, pasta, postres, desayuno, interior de diner) con alt descriptivo, y deja un comentario HTML "<!-- REEMPLAZAR por foto real -->". La mascota (iguana) represéntala con un SVG sencillo original de tu invención y un logotipo en texto "La Iguana Café" (sin copiar el logo real).
- Comentarios en el código en español, código limpio y fácil de editar por alguien no experto (los datos de la carta, horarios y menú del día en js/data.js).

═══════════════ 2. IDENTIDAD VISUAL ═══════════════
Concepto: diner americano años 50, familiar y divertido, pero moderno, limpio y legible (la web actual es recargada, con texto de 12px y no es responsive).
Paleta (variables CSS en :root):
  --crema: #FEE5B6; --verde-oliva: #718211; --verde-oscuro: #1E4D3A; --turquesa: #00979F; --fucsia: #D9038B; --blanco: #FFFFFF; --texto: #2B2B2B
Tipografías: "Rock Salt" (Google Fonts) SOLO para titulares/acentos grandes; texto en una sans legible (Poppins o Inter), mínimo 16px, interlineado 1.6.
Motivos: cenefa/franja verde oliva y blanco, damero (checkerboard) verde oscuro/blanco como separador y en cabeceras de la carta, tarjetas con esquinas muy redondeadas, botones tipo "cartel de diner", detalles de nube/alas en rosa suave en las tarjetas de acceso. Fondo crema con textura sutil (patrón CSS/SVG muy discreto de garabatos de comida).
Animaciones: aparición suave al hacer scroll (IntersectionObserver), hover en tarjetas, carrusel del hero con autoplay pausable.
Modo oscuro: no necesario.

═══════════════ 3. COMPONENTES GLOBALES (en todas las páginas) ═══════════════
1) Header sticky con logo + menú: Quiénes somos · Carta · Desayunos · Menú diario · Menú infantil · Celebraciones · Dónde estamos. Hamburguesa accesible en móvil. Resalta la página activa.
2) Botón flotante "Llamar" (enlace tel:+34925620372) visible solo en móvil, y botón secundario "WhatsApp" (enlace https://wa.me/34925620372 como placeholder, marcado con comentario para confirmar el número).
3) Indicador "Abierto ahora / Cerrado · abre a las HH:MM" calculado con JS según el horario real y la hora de Madrid (Europe/Madrid). Mostrar en header o hero.
4) Footer: logo, dirección, teléfono, horario resumido, enlaces de navegación, iconos de redes sociales, enlace a política de cookies y pequeña línea "Prototipo de rediseño".
5) REDES SOCIALES (iconos SVG inline, accesibles, abren en pestaña nueva con rel="noopener noreferrer", en header, footer y página de contacto):
   - Facebook: https://www.facebook.com/LaIguanaCafe
   - Twitter/X: https://twitter.com/iguanacafe
   - Instagram: https://www.instagram.com/ (PLACEHOLDER — dejar la constante INSTAGRAM_URL en data.js con comentario "confirmar usuario real con el dueño")
   - Google Maps (cómo llegar): https://www.google.com/maps/search/?api=1&query=Av.+Boladiez+Toledo+45007+La+Iguana+Caf%C3%A9
   - Reseñas de Google: placeholder en data.js.
   Define todos estos enlaces UNA sola vez en data.js y reutilízalos desde JS en todas las páginas.
6) Banner de cookies moderno (Aceptar / Rechazar / Más información → politica-de-cookies.html) que recuerda la elección con localStorage (con try/catch).
7) Botón "volver arriba".
8) Enlace "Vista 360º": sustituir el antiguo tour en Flash por una sección "Visita el local" con galería de fotos y un hueco comentado para incrustar en el futuro un Google Street View / tour 360 real.

═══════════════ 4. DATOS DEL NEGOCIO ═══════════════
Nombre: La Iguana Café (diner familiar de inspiración americana años 50)
Dirección: Av. Boladiez esquina C/ Río Estenilla (Av. Río Boladiez s/n), Polígono Industrial, 45007 Toledo — junto al nuevo hospital y a un minuto del C.C. Luz del Tajo.
Teléfono (reservas, pedidos y recogida): 925 62 03 72
Horario:
  - Lunes a viernes: 9:30–16:00
  - Sábado y domingo: 13:30–16:00
  - Miércoles y jueves noche: 20:30–23:00 (la web actual dice 22:45 en Contacto; deja una constante fácil de cambiar)
  - Viernes y sábado noche: 20:30–23:30
  - Domingo noche: 20:30–23:00
  - Lunes y martes NO abren por la tarde-noche, salvo festivos y vísperas de festivo.
Servicios: menú diario laborables 13:30–16:00, desayunos L–V, pedidos para recoger, celebraciones de cumpleaños y fiestas, opciones sin gluten y veganas.

═══════════════ 5. CONTENIDO POR PÁGINA ═══════════════

--- INICIO (index.html) ---
Hero a pantalla completa con carrusel de 4–5 fotos (placeholders) y titular "WELCOME TO LA IGUANA" (Rock Salt). Subtítulo: "Restaurante familiar inspirado en los diners americanos de los años 50. Pasta fresca hecha aquí, pizzas artesanales y hamburguesas naturales." Botones: "Ver carta", "Llamar 925 62 03 72", "Cómo llegar".
Texto de presentación: "Somos un restaurante familiar inspirado en los diners americanos de los años 50, nuestra comida es artesana y de la máxima calidad, elaboramos a diario la mejor pasta fresca, pizzas y deliciosas hamburguesas. Te esperamos todos los días de la semana. De lunes a viernes menús diarios y desayunos para todos los estómagos y todos los públicos."
Tarjetas de acceso rápido (con icono): Carta · Menú diario · Desayunos · Nuestros platos · Menú infantil · Celebraciones.
Bloque "Fresco y natural": 4 tarjetas — Hamburguesas naturales, Pizzas artesanales, Pasta fresca hecha en el local ("ningún otro sitio toledano ofrece pasta elaborada en el mismo restaurante"), Postres caseros.
Bloque "Platos estrella" con 4 platos (La Iguana, Ibérica, Poke Bowl, Tarta Iguana).
Bloque horario con "abierto ahora" + dirección + mapa (iframe de Google Maps con loading="lazy") + botones Cómo llegar / Llamar.
Banda con redes sociales: "Síguenos en Instagram, Facebook y X".
Cita final: "Te esperamos todos los días de la semana".

--- QUIÉNES SOMOS (la-iguana.html) ---
"Restaurante familiar y desenfadado en Toledo, muy cercano al Centro Comercial Luz del Tajo (a tan solo un minuto), especialidad en hamburguesas naturales, pasta fresca, pizzería artesanal y postres caseros, en un ambiente inspirado en un original diner americano. Te esperamos todos los días de la semana. De lunes a viernes menús diarios y desayunos para todos los estómagos y todos los públicos."
Sección "Producto": "Uno de los elementos que nos identifica es la calidad de todos los ingredientes que utilizamos: nuestras hamburguesas naturales hechas con las mejores carnes, la harina italiana de nuestras pizzas, o los menús diarios hechos con productos frescos."
Sección "Cómo lo hacemos": "La elaboración casera está presente en la mayoría de los productos que ofrecemos: postres caseros, pasta fresca hecha en La Iguana Café y hamburguesas preparadas y especiadas en nuestra cocina para que tengan ese sabor original que las diferencia."
Galería de fotos del local + línea de tiempo/valores (placeholders editables).

--- CARTA (carta.html) ---
Barra de pestañas/filtros sticky por categoría + buscador de texto + filtros de etiqueta (Vegano, Sin gluten, Picante) + botón "Imprimir carta" con CSS @media print limpio. Cada plato = tarjeta con nombre, descripción, etiquetas y precio (campo "price" vacío en data.js, mostrar "Consultar precio" si no hay; dejar preparado para rellenar).
Avisos visibles: "Todas nuestras hamburguesas pueden ser sin gluten por 1 € más. Consulta a nuestros camareros/as." · "Todas nuestras ensaladas pueden ser sin gluten." · "De lunes a jueves no servimos pizzas en horario de comidas." · Tarta cremosa de queso apta para celíacos.

HAMBURGUESAS (guarnición a elegir: patatas fritas o asadas al horno · ensalada mediterránea con lechuga, cherry y cebolla crujiente · ensalada americana, la tradicional de col. Ingredientes extra: huevo, bacon, cebolla caramelizada o queso manchego/cabra, +1 € cada uno):
- El Gran Lebowski: pechuga de pollo marinado estilo Kentucky con empanado crujiente, queso crema con kimchi, lechuga y tomate.
- Django Burger: ternera, doble queso ahumado, bacon, salsa chipotle, pepinillo y tomate semiseco en aceite.
- AC/DC Burguer: carne de 1ª calidad de angus negro americano, queso emmental (tomate y pepinillo agridulce aparte).
- La Iguana: ternera de 1ª calidad, cebolla a la plancha, lechuga, queso cheddar y tomate.
- Mister Chicken: suave hamburguesa de pechuga de pollo, lechuga, tomate y guacamole.
- Ibérica: doble de carne de cerdo ibérico 100% cubierta de doble queso, mermelada de bacon, salsa Jack Daniel's, toque crujiente de jamón serrano, en pan brioche. (Novedad)
- Vegana: Beyond burger, lechuga y tomate (mozzarella opcional). [vegano]
- El Bocata: 180 g de carrillera de cerdo, alioli de menta, crujiente de jamón, lima, aguacate y chips de yuca.

PIZZAS (artesanales, finas y crujientes; tamaño individual o grande; las grandes se pueden combinar mitad y mitad; ingredientes extra disponibles):
- Vegana: salsa de tomate, tomate natural, aceituna vegana, pimiento verde, cebolla, champiñón y "queso" vegano. [vegano]
- Juanito: tomate, mozzarella, pollo, champiñón y cebolla.
- Ramones: tomate, mozzarella, roquefort, parmesano y queso manchego. (confirmar con el dueño: coincide con Cuatro Quesos)
- Cuatro Quesos: tomate, mozzarella, roquefort, parmesano y queso manchego.
- Barbacoa: tomate, mozzarella, carne picada y salsa barbacoa.
- Carbonara (auténtica): bacón, huevo, parmesano y pimienta (sin salsa de tomate).
- Julia: tomate, mozzarella, bacón, cebolla caramelizada y queso de cabra.
- Deliziosa: tomate, mozzarella, jamón cocido.
- Luca: bacón, jamón, huevo.
- Diego: atún, queso gorgonzola, tomate y mozzarella.

PASTA FRESCA ("Pasta fresca artesana elaborada a mano… al huevo, hecha con cariño en La Iguana"):
- Pasta fresca: spaghetti, tagliatelle.
- Pasta fresca rellena: ravioli de boletus; saquitos de pasta rellenos de queso y pera.
- Lasañas: Melenzane (berenjena, tomate, albahaca y parmesano) [vegetariano]; Boloñesa (carne de cerdo y ternera, cebolla, apio, tomate y zanahoria).
- Salsas: Tomate (natural frito) · Boloñesa (tomate, verduras y carne picada) · Carbonara (nata, huevo, parmesano, bacón y pimienta) · 4 Quesos · Setas (setas, trufa y mascarpone) · Marinera (almejas, gambas, chipirón y ajo/tomate).

UN POCO DE TODO (las marcadas se sirven entera o media ración):
- Fingers de queso (entera/media): tiras de queso gouda empanado.
- Costillas de ternera asadas (entera/media): a la parrilla con salsa barbacoa o miel mostaza.
- Fajitas: de pollo, queso cheddar, verduras frescas y almendras, con toque picante si quieres. [picante opcional]
- Nachos (entera/media): con guacamole, gratinados con cheddar y mozzarella, y pico de gallo.
- Fingers de pollo (entera/media): tiras de pollo empanado con alioli de miel.
- Entrecot: ternera de primera, al gusto.
- Verduras asadas al horno: calabacín, berenjena, pimiento verde y rojo, puerro y champiñón. [vegano]
- Ración de patatas fritas: con queso gratinado y bacon.
- Combo Iguana: fingers de queso, fingers de pollo, aros y nachos.
- Tacos mexicanos: de pollo especiado y deshilachado, pico de gallo y guacamole.

ENSALADAS ("Ligeras y sabrosas, para tomar como acompañamiento o como plato principal"):
- Poke Bowl (pollo): arroz, pollo marinado, edamame, mango, guacamole, rabanitos, maíz, salsa agridulce y sésamo.
- Poke Bowl (salmón): quinoa, guacamole, maíz, cebolla encurtida, wakame, salmón, salsa oriental y sésamo.
- César: mezclum de lechuga, pollo, picatostes, parmesano, tomate cherry y salsa César.
- Adriática: burrata, canónigos, jamón crujiente, tomate, almendra picada y vinagreta de tomate.
- Kiss: burrata, pesto rojo, aceite de albahaca, tomate, rúcula y aceituna negra.

POSTRES CASEROS:
- Brownie de chocolate y nueces con helado de vainilla (opción sin gluten, pregunta al personal).
- Helado / batido: vainilla y cookies · yogur y frutas del bosque · chocolate.
- Tarta Iguana: incomparable tarta de zanahoria.
- Tarta cremosa de queso: apta para celíacos.
- Tortitas: fresa, chocolate o caramelo, y nata si quieres.
- Torrija casera: caramelizada con helado de leche merengada.

BEBIDAS: Refrescos (Coca-Cola, Fanta, Nestea) · Cervezas · Vino blanco y tinto · Sangría · "Y sobre todo nuestros deliciosos cócteles": Mojito, Caipirinha, Pisco Sur, Copas, Copas especiales, Gin Tonic.

--- DESAYUNOS (desayunos.html) --- (lunes a viernes, desde las 9:30)
Tabla/tarjetas con estos precios:
- Desayuno Tostada — café o infusión + tostada (tomate o aceite) — 3,00 €
- Desayuno Dulce — café o infusión + tortita casera con sirope o nata, o croissant, o napolitana de chocolate — 3,60 €
- Desayuno Mixto — café + sándwich, pulga, pincho de tortilla o tostada (lomo, bacon, jamón, tortilla, pollo, vegetal, salmón o atún) — 4,50 €
- Desayuno Salado — refresco o caña + sándwich, pulga, pincho o tostada de lomo, bacon, jamón, tortilla, pollo, vegetal, salmón o atún — 5,50 €
- Desayuno Iguana — huevos revueltos + bacón + zumo natural + café — 7,50 €
- Café 1,60 € · ColaCao 1,90 € · Refresco 2,80 € · Zumo natural 3,00 €
Nota destacada: "Incluye gratis uno de estos ingredientes en cualquiera de nuestras Pulgas: queso, tomate o cebolla caramelizada. Segundo ingrediente: +0,50 €."

--- MENÚ DIARIO (menu-diario.html) ---
"Los días laborables en horario de comidas, de 13:30 a 16:00 h, ofrecemos nuestro menú diario." Diseño de "pizarra/ticket de diner" con: fechas de la semana (ej. "Menú del 28 de septiembre al 2 de octubre"), primeros, segundos, postre/café, precio del menú (7,40 € según la carta actual, marcar "confirmar"), todo leído desde data.js para que se actualice cambiando solo ese bloque cada semana. Incluye datos de ejemplo claramente marcados como "ejemplo". Botón "Reservar mesa / Llamar".

--- MENÚ INFANTIL (menu-infantil.html) ---
Diseño muy visual y colorido con la mascota:
1. Hamburguesa Baby Iguana + patatas + bebida
2. Hamburguesa de pollo + patatas + bebida
3. Fingers de pollo + patatas + bebida
4. Spaghetti con tomate + bebida
Enlace a Celebraciones.

--- CELEBRACIONES (celebraciones.html) ---
Título "Cumpleaños y fiestas". Texto: "Puedes celebrar el cumpleaños de tus peques en La Iguana Café, te preparamos una merienda a la medida de tu presupuesto y tus gustos." Subsección "Reservas de local". Galería (placeholders) y formulario SIMULADO de solicitud (nombre, teléfono, fecha, nº de niños, nº de adultos, tipo de celebración, comentarios) con validación JS y mensaje de éxito "¡Gracias! Te llamaremos al número indicado" (sin enviar nada). Aviso visible en pequeño: "Demo: el formulario no envía datos".

--- DÓNDE ESTAMOS / CONTACTO (contacto.html) ---
Sección "Pedidos a recoger": llama al 925 62 03 72 (botón grande tel:). Tabla de horario completo que resalta el día de hoy. Dirección completa. Google Maps embebido. Botones: Cómo llegar (enlace a Google Maps), WhatsApp, Instagram, Facebook, X. Formulario simulado de reserva de mesa / pedido para recoger (nombre, teléfono, fecha, hora, nº personas, comentarios) con validación. Nota: "Lunes y martes cerramos por la tarde, excepto festivos y vísperas de fiesta".

--- POLÍTICA DE COOKIES (politica-de-cookies.html) ---
Secciones: qué son las cookies; tipos (propias, de terceros, técnicas, de análisis); para qué las usamos (servicios personalizados, analizar el funcionamiento, reconocer al usuario, localizar incidencias, medir el uso); cómo desactivarlas (configuración del navegador; si se desactivan las técnicas, la calidad del servicio puede verse afectada); enlaces a la ayuda de Chrome, Firefox, Safari y Edge. Redáctalo de forma clara y moderna.

--- 404 (404.html) --- Mensaje divertido con la iguana y botón "Volver al inicio".

═══════════════ 6. FORMA DE TRABAJAR ═══════════════
1. Antes de escribir código, devuélveme en 10 líneas el plan (estructura de archivos y decisiones de diseño) y espera mi "adelante".
2. Después genera TODOS los archivos completos, uno por uno, sin recortar ni usar "..." ni "resto igual". Cada archivo en su propio bloque de código con su ruta como título.
3. Al final dame: (a) árbol de carpetas, (b) cómo abrirlo en local (doble clic en index.html), (c) cómo subirlo gratis a Netlify/Cloudflare Pages/GitHub Pages arrastrando la carpeta, (d) lista de placeholders que hay que reemplazar (fotos, logo, usuario de Instagram, número de WhatsApp, precios, menú del día).
4. Haz una autoauditoría final: enlaces rotos, scroll horizontal en móvil, contraste, alt de imágenes, que las redes y el teléfono funcionen en todas las páginas.
```

---

## Prompts de ajuste (para usar después)

- **Si la respuesta se corta:** `Continúa exactamente desde el último archivo que te quedó incompleto, sin repetir los anteriores.`
- **Más "wow" para la reunión:** `Sube el nivel visual de la home: hero más cinematográfico, microanimaciones, tarjetas de plato con efecto 3D sutil y una sección "Haz un viaje por la Iguana Café" con scroll horizontal de fotos.`
- **Personalizar con datos reales:** `Sustituye los placeholders por estos datos reales: Instagram @______, WhatsApp ______, precios [pegar carta]. Devuélveme solo los archivos modificados.`
- **Comparativa antes/después:** `Crea una página comparativa.html con "web actual vs. nueva web": móvil, velocidad, SEO local, carta legible por Google, reservas, y siguientes pasos.`
