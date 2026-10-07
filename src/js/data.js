/* =====================================================================
   LA IGUANA CAFÉ · DATOS DE LA WEB
   ---------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE TOCAR PARA ACTUALIZAR:
   teléfono, redes, horarios, carta, desayunos y menú del día.

   Reglas sencillas para editar sin romper nada:
   - Los textos van siempre entre comillas "así".
   - Cada elemento de una lista termina en coma ,
   - Los precios se escriben con punto: 12.9  (la web los muestra como 12,90 €)
   - Si un plato no tiene precio, deja price: null y saldrá "Consultar precio".
   ===================================================================== */

/* ---------- 1. DATOS DEL NEGOCIO ---------- */
export const NEGOCIO = {
  nombre: "La Iguana Café",
  eslogan: "Diner americano de los años 50 en Toledo",
  telefono: "925 62 03 72", // Tal y como se muestra
  telefonoLink: "+34925620372", // Para el enlace tel: (sin espacios)
  email: "", // Si hay email de contacto, ponlo aquí
  direccion: {
    calle: "Av. Río Boladiez s/n, esquina C/ Río Estenilla",
    zona: "Polígono Industrial · junto al nuevo hospital",
    cp: "45007",
    ciudad: "Toledo",
    referencia: "A un minuto del C.C. Luz del Tajo"
  },
  web: "https://www.iguanacafe.es"
};

/* ---------- 2. REDES SOCIALES Y ENLACES ----------
   Se definen UNA sola vez aquí y la web los usa en todas las páginas. */
export const INSTAGRAM_URL = "https://www.instagram.com/"; // ⚠️ PLACEHOLDER: confirmar usuario real con el dueño (ej. https://www.instagram.com/laiguanacafe/)

export const REDES = {
  instagram: INSTAGRAM_URL,
  facebook: "https://www.facebook.com/LaIguanaCafe",
  x: "https://twitter.com/iguanacafe",
  // ⚠️ PLACEHOLDER: confirmar que el número tiene WhatsApp (el 925 es fijo; quizá haya un móvil)
  whatsapp: "https://wa.me/34925620372",
  whatsappNumero: "34925620372",
  mapas: "https://www.google.com/maps/search/?api=1&query=La+Iguana+Caf%C3%A9+Av.+Boladiez+45007+Toledo",
  mapaEmbed: "https://www.google.com/maps?q=La+Iguana+Caf%C3%A9,+Av.+Boladiez,+45007+Toledo&output=embed",
  // ⚠️ PLACEHOLDER: enlace de "Escribir reseña" de Google Business Profile del restaurante
  resenasGoogle: "https://www.google.com/maps/search/?api=1&query=La+Iguana+Caf%C3%A9+Toledo"
};

/* ---------- 3. HORARIO ----------
   Días: 0 = domingo, 1 = lunes, 2 = martes, 3 = miércoles, 4 = jueves, 5 = viernes, 6 = sábado
   Cada día puede tener varios turnos ["HH:MM", "HH:MM"]. */
export const CIERRE_NOCHE_X_J = "23:00"; // ⚠️ La web actual dice 22:45 en Contacto y 23:00 en Inicio. Cambiar aquí si hace falta.

export const HORARIO = {
  1: [["09:30", "16:00"]], // Lunes
  2: [["09:30", "16:00"]], // Martes
  3: [
    ["09:30", "16:00"],
    ["20:30", CIERRE_NOCHE_X_J]
  ], // Miércoles
  4: [
    ["09:30", "16:00"],
    ["20:30", CIERRE_NOCHE_X_J]
  ], // Jueves
  5: [
    ["09:30", "16:00"],
    ["20:30", "23:30"]
  ], // Viernes
  6: [
    ["13:30", "16:00"],
    ["20:30", "23:30"]
  ], // Sábado
  0: [
    ["13:30", "16:00"],
    ["20:30", "23:00"]
  ] // Domingo
};
export const NOTA_HORARIO = "Lunes y martes cerramos por la noche, excepto festivos y vísperas de festivo.";

/* ---------- 4. CARTA ----------
   tags posibles: "vegano", "vegetariano", "singluten", "picante", "novedad"
   price puede ser un número (12.9), un texto ("13 / 7,50") o null. */
export const AVISOS_CARTA = [
  "Todas nuestras hamburguesas pueden ser sin gluten por 1 € más. Consulta a nuestros camareros/as.",
  "Todas nuestras ensaladas pueden ser sin gluten.",
  "De lunes a viernes (no festivos) no servimos pizzas en horario de comidas.",
  "Nuestra tarta cremosa de queso es apta para celíacos.",
  "Disponemos de carta e información sobre alérgenos: pregunta a nuestro personal. A pesar de los cuidados, no se puede excluir totalmente la presencia accidental de trazas."
];

export const CARTA = [
  {
    id: "hamburguesas",
    nombre: "Hamburguesas",
    icono: "hamburgieza",
    foto: "assets/img/platos/hamburguesas.jpg",
    intro: "Hamburguesas naturales (170 g) preparadas y especiadas en nuestra cocina.",
    nota: "Guarnición a elegir: patatas fritas o asadas al horno · ensalada mediterránea (lechuga, cherry y cebolla crujiente) · ensalada americana (la tradicional de col). Ingredientes extra: huevo, bacon, cebolla caramelizada o queso manchego/cabra (+1 € cada uno).",
    platos: [
      {
        nombre: "El Bocata",
        desc: "180 g de carrillera de cerdo, alioli de menta, crujiente de jamón, lima, aguacate y chips de yuca.",
        price: 12.9,
        tags: ["novedad"]
      },
      {
        nombre: "La Ibérica",
        desc: "200 g de cerdo ibérico 100% en pan brioche, doble de queso, mermelada de bacon, salsa Jack Daniel's y crujiente de jamón serrano.",
        price: 13.4,
        tags: [],
        foto: "assets/img/platos/hambu-iberica.jpg"
      },
      {
        nombre: "El Gran Lebowski",
        desc: "Contramuslo de pollo marinado estilo Kentucky con empanado crujiente, queso crema con kimchi, lechuga y tomate.",
        price: 12.9,
        tags: []
      },
      {
        nombre: "Django Burger",
        desc: "Ternera, doble de queso ahumado, bacon, salsa chipotle, pepinillo y tomate semiseco en aceite.",
        price: 12.9,
        tags: ["picante"]
      },
      {
        nombre: "AC/DC Burger",
        desc: "Carne de 1ª calidad de angus negro americano y queso emmental (tomate y pepinillo agridulce aparte).",
        price: 14.5,
        tags: []
      },
      {
        nombre: "La Iguana",
        desc: "Ternera de primera calidad, cebolla a la plancha, lechuga, queso cheddar y tomate.",
        price: 10.9,
        tags: [],
        foto: "assets/img/platos/hambu-iguana.jpg"
      },
      {
        nombre: "Mister Chicken",
        desc: "Suave hamburguesa de pechuga de pollo, lechuga, tomate y guacamole.",
        price: 10.9,
        tags: [],
        foto: "assets/img/platos/hambu-chicken.jpg"
      },
      {
        nombre: "Vegana",
        desc: "Beyond Burger, lechuga y tomate (emmental opcional).",
        price: 12.9,
        tags: ["vegano"],
        foto: "assets/img/platos/hambu-vege.jpg"
      }
    ]
  },
  {
    id: "pizzas",
    nombre: "Pizzas",
    icono: "pizzare",
    foto: "assets/img/platos/pizzas.jpg",
    intro: "Artesanas, finas y crujientes, con harina italiana.",
    nota: "Ingrediente extra: 1 €. De lunes a viernes (no festivos) no servimos pizzas en horario de comidas.",
    platos: [
      {
        nombre: "Carnívora",
        desc: "Salsa de tomate, mozzarella, carne picada, pollo, bacon y salsa barbacoa.",
        price: 13.4,
        tags: ["novedad"]
      },
      {
        nombre: "Vegetariana",
        desc: "Salsa de tomate, mozzarella, tomate natural, aceituna negra, pimiento verde, cebolla y champiñón.",
        price: 12.9,
        tags: ["vegetariano"]
      },
      { nombre: "Juanito", desc: "Salsa de tomate, mozzarella, pollo, champiñón y cebolla.", price: 12.9, tags: [] },
      {
        nombre: "4 Quesos",
        desc: "Salsa de tomate, mozzarella, roquefort, parmesano y queso manchego.",
        price: 12.9,
        tags: ["vegetariano"]
      },
      {
        nombre: "Carbonara",
        desc: "Nata, bacon, huevo, parmesano y pimienta (sin salsa de tomate).",
        price: 12.9,
        tags: []
      },
      {
        nombre: "Julia",
        desc: "Salsa de tomate, mozzarella, bacon, cebolla caramelizada y queso de cabra.",
        price: 13.4,
        tags: []
      },
      { nombre: "Deliziosa", desc: "Salsa de tomate, mozzarella y jamón cocido.", price: 12.4, tags: [] },
      { nombre: "Luca", desc: "Salsa de tomate, mozzarella, bacon, jamón y huevo.", price: 13.4, tags: [] },
      { nombre: "Diego", desc: "Salsa de tomate, atún, queso gorgonzola y mozzarella.", price: 13.4, tags: [] }
    ]
  },
  {
    id: "pasta",
    nombre: "Pasta fresca",
    icono: "makaroniare",
    foto: "assets/img/platos/pasta.jpg",
    intro:
      "Pasta fresca artesana al huevo, elaborada a mano y con cariño en La Iguana. ¡Ningún otro sitio de Toledo hace la pasta en el propio restaurante!",
    nota: "Elige tu pasta y combínala con la salsa que más te guste.",
    platos: [
      {
        nombre: "Lasaña Melanzane",
        desc: "Deliciosa lasaña vegetal de berenjena, tomate, albahaca y parmesano.",
        price: 14,
        tags: ["vegetariano"]
      },
      {
        nombre: "Lasaña Boloñesa",
        desc: "Clásica lasaña de carne de cerdo y ternera, cebolla, apio, tomate y zanahoria.",
        price: 14,
        tags: []
      },
      { nombre: "Spaghetti", desc: "Pasta fresca al huevo hecha en casa.", price: 7.5, tags: ["vegetariano"] },
      { nombre: "Tagliatelle", desc: "Pasta fresca al huevo hecha en casa.", price: 7.5, tags: ["vegetariano"] },
      {
        nombre: "Saquitos de queso y pera",
        desc: "Pasta fresca rellena de queso y pera.",
        price: 10.5,
        tags: ["vegetariano"]
      },
      {
        nombre: "Ravioli de boletus",
        desc: "Pasta fresca rellena de boletus.",
        price: 11.5,
        tags: ["novedad", "vegetariano"]
      },
      { nombre: "Salsa Tomate", desc: "Salsa de tomate natural frito.", price: 3.5, tags: ["vegano"], salsa: true },
      { nombre: "Salsa Boloñesa", desc: "Tomate, verduras y carne picada.", price: 5, tags: [], salsa: true },
      { nombre: "Salsa Carbonara", desc: "Nata, huevo, parmesano, bacon y pimienta.", price: 5, tags: [], salsa: true },
      {
        nombre: "Salsa 4 Quesos",
        desc: "Parmesano, manchego, azul y mozzarella.",
        price: 5,
        tags: ["vegetariano"],
        salsa: true
      },
      { nombre: "Salsa de Setas", desc: "Setas, trufa y mascarpone.", price: 5.5, tags: ["vegetariano"], salsa: true },
      {
        nombre: "Salsa Marinera",
        desc: "Almejas, gambas, chipirón, ajo, tomate y perejil.",
        price: 6,
        tags: [],
        salsa: true
      }
    ]
  },
  {
    id: "un-poco-de-todo",
    nombre: "Un poco de todo",
    icono: "steko",
    foto: "assets/img/platos/un-poco-de-todo.jpg",
    intro: "Para compartir (o no). Los marcados se sirven en ración entera o media.",
    nota: "",
    platos: [
      {
        nombre: "Fingers de queso",
        desc: "Riquísimas tiras de queso gouda empanado. Entera / media.",
        price: "13 / 7,50",
        tags: ["vegetariano"]
      },
      {
        nombre: "Costillas de cerdo asadas",
        desc: "Glaseadas con su jugo y especias. Con patatas fritas.",
        price: 14,
        tags: []
      },
      {
        nombre: "Fajitas",
        desc: "De pollo, queso cheddar, verduras frescas y almendra, con un toque picante si quieres.",
        price: 12.5,
        tags: ["picante"]
      },
      {
        nombre: "Nachos",
        desc: "Con guacamole, gratinados con cheddar y mozzarella, y pico de gallo. Entera / media.",
        price: "8,90 / 5,90",
        tags: ["vegetariano"]
      },
      {
        nombre: "Fingers de pollo",
        desc: "Sabrosas tiras de pollo empanado con alioli de miel. Entera / media.",
        price: "11,50 / 6,50",
        tags: []
      },
      { nombre: "Entrecot", desc: "Ternera de primera calidad, servida a tu gusto.", price: 18, tags: ["singluten"] },
      {
        nombre: "Verduras asadas al horno",
        desc: "Salteadas con ajoblanco de coco: calabacín, trigueros, puerro, cherry, brócoli, zanahoria y champiñón.",
        price: 13.4,
        tags: ["vegano"]
      },
      { nombre: "Ración de patatas fritas", desc: "Con queso gratinado, bacon y dos salsas.", price: 8.9, tags: [] },
      {
        nombre: "Combo Iguana",
        desc: "Fingers de queso, fingers de pollo, aros de cebolla y nachos.",
        price: 19,
        tags: []
      },
      {
        nombre: "Tacos mexicanos",
        desc: "De pollo especiado y deshilachado, pico de gallo y guacamole.",
        price: 14.9,
        tags: ["novedad"]
      }
    ]
  },
  {
    id: "ensaladas",
    nombre: "Ensaladas",
    icono: "lasarniare",
    foto: "assets/img/platos/ensaladas.jpg",
    intro: "Ligeras y sabrosas, como acompañamiento o como plato principal.",
    nota: "Todas nuestras ensaladas pueden ser sin gluten.",
    platos: [
      {
        nombre: "Poke Bowl de pollo",
        desc: "Arroz, pollo marinado, edamame, mango, guacamole, rabanitos, maíz, salsa agridulce y sésamo.",
        price: 12.4,
        tags: ["novedad"]
      },
      {
        nombre: "Poke Bowl de salmón",
        desc: "Quinoa, guacamole, maíz, cebolla encurtida, wakame, salmón, salsa oriental y sésamo.",
        price: 12.4,
        tags: []
      },
      {
        nombre: "Adriática",
        desc: "Burrata, canónigos, jamón crujiente, tomate, almendra picada, vinagreta de tomate y berenjena asada.",
        price: 11.9,
        tags: []
      },
      {
        nombre: "César",
        desc: "Mezclum de lechuga, pollo, picatostes, parmesano, tomate cherry y salsa César.",
        price: 11.9,
        tags: []
      },
      {
        nombre: "Kiss",
        desc: "Burrata, pesto rojo, aceite de albahaca, tomate, rúcula y aceituna negra.",
        price: 11.9,
        tags: ["novedad", "vegetariano"]
      }
    ]
  },
  {
    id: "postres",
    nombre: "Postres caseros",
    icono: "ciastolino",
    foto: "assets/img/platos/postres.jpg",
    intro: "Hechos en casa, como deben ser.",
    nota: "",
    platos: [
      {
        nombre: "Brownie",
        desc: "De chocolate y nueces con helado de vainilla. Pregunta por la opción sin gluten.",
        price: 5.9,
        tags: [],
        foto: "assets/img/platos/postre-brownie.jpg"
      },
      {
        nombre: "Tarta cremosa de queso",
        desc: "Nuestra tarta de queso cremosa. Apta para celíacos.",
        price: 5.9,
        tags: ["singluten"],
        foto: "assets/img/platos/postre-queso.jpg"
      },
      {
        nombre: "Tarta Iguana",
        desc: "Incomparable tarta de zanahoria.",
        price: 5.9,
        tags: [],
        foto: "assets/img/platos/postre-zanah.jpg"
      },
      {
        nombre: "Helado / Batido de vainilla y cookies",
        desc: "Helado o batido, tú eliges.",
        price: "4 / 4,50",
        tags: [],
        foto: "assets/img/platos/postre-helado.jpg"
      },
      {
        nombre: "Helado / Batido de yogur y frutas del bosque",
        desc: "Helado o batido, tú eliges.",
        price: "4 / 4,50",
        tags: [],
        foto: "assets/img/platos/postre-bati.jpg"
      },
      { nombre: "Helado / Batido de chocolate", desc: "Helado o batido, tú eliges.", price: "4 / 4,50", tags: [] },
      {
        nombre: "Tortitas",
        desc: "De fresa, chocolate o caramelo, y nata si quieres.",
        price: 3.9,
        tags: [],
        foto: "assets/img/platos/postre-tortitas.jpg"
      },
      { nombre: "Torrija casera", desc: "Caramelizada, con helado de leche merengada.", price: 6.4, tags: [] }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas y cócteles",
    icono: "kieliszkis",
    foto: "",
    intro: "Y sobre todo… ¡nuestros deliciosos cócteles!",
    nota: "",
    platos: [
      { nombre: "Refrescos", desc: "Coca-Cola, Fanta, Nestea…", price: null, tags: [] },
      { nombre: "Cervezas", desc: "Bien fría, como en cualquier diner que se precie.", price: null, tags: [] },
      { nombre: "Vino blanco y tinto", desc: "Pregunta por nuestras referencias.", price: null, tags: [] },
      { nombre: "Sangría", desc: "Fresquita, ideal para compartir.", price: null, tags: [] },
      { nombre: "Mojito", desc: "Ron, hierbabuena, lima y azúcar.", price: null, tags: [] },
      { nombre: "Caipirinha", desc: "Cachaça, lima y azúcar.", price: null, tags: [] },
      { nombre: "Pisco Sour", desc: "El clásico peruano.", price: null, tags: [] },
      { nombre: "Gin Tonic", desc: "Con la ginebra que prefieras.", price: null, tags: [] },
      { nombre: "Copas y copas especiales", desc: "Pregunta a nuestro equipo.", price: null, tags: [] }
    ]
  }
];

/* ---------- 5. DESAYUNOS (lunes a viernes desde las 9:30) ---------- */
export const DESAYUNOS = [
  { nombre: "Desayuno Tostada", desc: "Café o infusión + tostada (tomate o aceite).", price: 3.0, emoji: "🍞" },
  {
    nombre: "Desayuno Dulce",
    desc: "Café o infusión + tortita casera con sirope o nata, croissant o napolitana de chocolate.",
    price: 3.6,
    emoji: "🥞"
  },
  {
    nombre: "Desayuno Mixto",
    desc: "Café + sándwich, pulga, pincho de tortilla o tostada (lomo, bacon, jamón, tortilla, pollo, vegetal, salmón o atún).",
    price: 4.5,
    emoji: "🥪"
  },
  {
    nombre: "Desayuno Salado",
    desc: "Refresco o caña + sándwich, pulga, pincho o tostada de lomo, bacon, jamón, tortilla, pollo, vegetal, salmón o atún.",
    price: 5.5,
    emoji: "🍺"
  },
  {
    nombre: "Desayuno Iguana",
    desc: "Huevos revueltos + bacon + zumo natural + café. ¡El desayuno americano de verdad!",
    price: 7.5,
    emoji: "🍳",
    destacado: true
  }
];
export const DESAYUNOS_SUELTOS = [
  { nombre: "Café", price: 1.6 },
  { nombre: "ColaCao", price: 1.9 },
  { nombre: "Refresco", price: 2.8 },
  { nombre: "Zumo natural", price: 3.0 }
];
export const NOTA_PULGAS =
  "Incluye gratis uno de estos ingredientes en cualquiera de nuestras pulgas: queso, tomate o cebolla caramelizada. Segundo ingrediente: +0,50 €.";

/* ---------- 6. MENÚ DIARIO (laborables de 13:30 a 16:00) ----------
   👉 CADA SEMANA solo hay que cambiar este bloque. */
export const MENU_DIARIO = {
  semana: "Del 28 de septiembre al 2 de octubre de 2026",
  precio: 17, // € · según la pizarra actual. Confirmar con el dueño.
  incluye: "Pan, bebida y postre o café",
  instrucciones: "Escoge 1 principal y 2 acompañamientos",
  principales: [
    "Spaghetti boloñesa",
    "Taco de merluza mexicano",
    "Salteado de alubias, setas y ajo-perejil",
    "Pollo asado con cacahuetes, bacon y pasas",
    "Carcamusas"
  ],
  acompanamientos: [
    "Ensalada caprichosa",
    "Ensalada de lentejas y arroz",
    "Croquetas de gambas al ajillo",
    "Patatas fritas",
    "Ajoblanco de melón",
    "Aros de cebolla",
    "Gratén de brócoli y bacon"
  ]
};

/* ---------- 7. MENÚ INFANTIL ---------- */
export const MENU_INFANTIL = {
  precio: 7.4,
  opciones: [
    { nombre: "Hamburguesa Baby Iguana", extra: "+ patatas + bebida", emoji: "🍔" },
    { nombre: "Hamburguesa de pollo", extra: "+ patatas + bebida", emoji: "🐔" },
    { nombre: "Fingers de pollo", extra: "+ patatas + bebida", emoji: "🍗" },
    { nombre: "Spaghetti con tomate", extra: "+ bebida", emoji: "🍝" }
  ]
};

/* ---------- 8. OPINIONES (de ejemplo) ----------
   ⚠️ EJEMPLO: sustituir por reseñas reales de Google con permiso. */
export const OPINIONES = [
  {
    texto: "La pasta fresca está buenísima y el ambiente diner es una pasada. Los peques lo flipan.",
    autor: "Cliente de ejemplo",
    estrellas: 5
  },
  {
    texto: "Hamburguesas de verdad, con carne de calidad. La Ibérica es un vicio.",
    autor: "Cliente de ejemplo",
    estrellas: 5
  },
  {
    texto: "Menú del día muy completo al lado del hospital. Rápidos y muy amables.",
    autor: "Cliente de ejemplo",
    estrellas: 5
  }
];
