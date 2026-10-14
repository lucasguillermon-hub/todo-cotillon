// CATÁLOGO DE LA TIENDA (tienda.html)
//
// Códigos:
//   Categoría     3 letras             GLO   (icono: emoji que se muestra cuando un producto no tiene foto)
//   Producto      categoría + número   GLO-001
//   Presentación  producto + número    GLO-001-01   ← este es el código que va al carrito y al pedido
//
// Reglas para mantenerlo prolijo:
// - Un código nunca se reutiliza ni se cambia: si un producto se deja de vender, se marca `oculto: true`
//   (o se borra) pero su número no se vuelve a usar para otra cosa.
// - Productos nuevos: siguiente número libre de su categoría. Presentaciones nuevas: siguiente número
//   libre dentro del producto.
// - precio: en pesos, sin puntos ni signo (ej: 6500).
// - foto: archivo dentro de img/ (opcional: sin foto se muestra un recuadro con el ícono de la categoría).
// - Antes de publicar: `node herramientas/catalogo.js` revisa que no haya errores y arma catalogo.csv.
//
// Los productos y precios de abajo son DE EJEMPLO: se van reemplazando por los reales.

const CATEGORIAS = [
  { codigo: "GLO", nombre: "Globos", icono: "🎈" },
  { codigo: "COT", nombre: "Cotillón", icono: "🎉" },
  { codigo: "DES", nombre: "Descartables", icono: "🥤" },
  { codigo: "REP", nombre: "Repostería", icono: "🧁" },
  { codigo: "GOL", nombre: "Golosinas y snacks", icono: "🍬" },
  { codigo: "BEB", nombre: "Bebidas", icono: "🥤" },
  { codigo: "PAP", nombre: "Papelería", icono: "🎁" },
  { codigo: "TEM", nombre: "Temporada y disfraces", icono: "🎃" },
];

const PRODUCTOS = [
  // ── GLO · Globos ──────────────────────────────────────────────
  { codigo: "GLO-001", nombre: "Globos perlados 12\"", foto: "img/globos-decoracion.webp", presentaciones: [
    { codigo: "GLO-001-01", detalle: "Bolsa x 25 u. · colores surtidos", precio: 3600 },
    { codigo: "GLO-001-02", detalle: "Bolsa x 50 u. · colores surtidos", precio: 6500 },
    { codigo: "GLO-001-03", detalle: "Bolsa x 100 u. · colores surtidos", precio: 11900 },
  ]},
  { codigo: "GLO-002", nombre: "Globo número metalizado", foto: "img/sets-globos.webp", presentaciones: [
    { codigo: "GLO-002-01", detalle: "16\" (40 cm) · unidad", precio: 1800 },
    { codigo: "GLO-002-02", detalle: "40\" (1 m) · unidad", precio: 4200 },
  ]},
  { codigo: "GLO-003", nombre: "Set globos letras \"Feliz Cumple\"", foto: "img/sets-globos.webp", presentaciones: [
    { codigo: "GLO-003-01", detalle: "Set x 13 letras metalizadas 16\"", precio: 9800 },
  ]},
  { codigo: "GLO-004", nombre: "Kit arco de globos", foto: "img/globos-decoracion.webp", presentaciones: [
    { codigo: "GLO-004-01", detalle: "100 globos + cinta + inflador manual", precio: 18500 },
  ]},

  // ── COT · Cotillón ────────────────────────────────────────────
  { codigo: "COT-001", nombre: "Collares hawaianos", foto: "img/cotillon-carioca.webp", presentaciones: [
    { codigo: "COT-001-01", detalle: "Pack x 12 u. · colores surtidos", precio: 3900 },
  ]},
  { codigo: "COT-002", nombre: "Vinchas luminosas LED", foto: "img/cotillon-carioca.webp", presentaciones: [
    { codigo: "COT-002-01", detalle: "Pack x 10 u.", precio: 12500 },
  ]},
  { codigo: "COT-003", nombre: "Antifaces de carnaval", foto: "img/carnaval.webp", presentaciones: [
    { codigo: "COT-003-01", detalle: "Pack x 12 u. · con plumas", precio: 8900 },
  ]},
  { codigo: "COT-004", nombre: "Piñata estrella", foto: "img/pinatas.webp", presentaciones: [
    { codigo: "COT-004-01", detalle: "Mediana · 45 cm", precio: 14000 },
    { codigo: "COT-004-02", detalle: "Grande · 60 cm", precio: 19500 },
  ]},

  // ── DES · Descartables ────────────────────────────────────────
  { codigo: "DES-001", nombre: "Platos de cartón 18 cm", foto: "img/descartables.webp", presentaciones: [
    { codigo: "DES-001-01", detalle: "Pack x 10 u. · fucsia o lila", precio: 2600 },
    { codigo: "DES-001-02", detalle: "Pack x 25 u. · fucsia o lila", precio: 5900 },
  ]},
  { codigo: "DES-002", nombre: "Vasos plásticos 220 ml", foto: "img/descartables.webp", presentaciones: [
    { codigo: "DES-002-01", detalle: "Pack x 10 u. · colores", precio: 1300 },
    { codigo: "DES-002-02", detalle: "Pack x 25 u. · colores", precio: 2900 },
  ]},
  { codigo: "DES-003", nombre: "Servilletas estampadas", foto: "img/descartables.webp", presentaciones: [
    { codigo: "DES-003-01", detalle: "Pack x 20 u.", precio: 1900 },
  ]},
  { codigo: "DES-004", nombre: "Mantel plástico", foto: "img/descartables.webp", presentaciones: [
    { codigo: "DES-004-01", detalle: "Unidad · 1,20 x 1,80 m", precio: 2400 },
  ]},

  // ── REP · Repostería (lista real, 14/10/2026) ──────────────────
  // Sin foto todavía: la tienda muestra un recuadro con el ícono de la categoría.
  { codigo: "REP-001", nombre: "Granas de colores", foto: "img/rep-001-granas.webp", presentaciones: [
    { codigo: "REP-001-01", detalle: "Bolsa 100 g", precio: 900 },
  ]},
  { codigo: "REP-002", nombre: "Grajeas multicolores", foto: "img/rep-002-grajeas.webp", presentaciones: [
    { codigo: "REP-002-01", detalle: "Bolsa 100 g", precio: 1200 },
  ]},
  { codigo: "REP-003", nombre: "Municiones plateadas", foto: "img/rep-003-municiones.webp", presentaciones: [
    { codigo: "REP-003-01", detalle: "Bolsa 100 g", precio: 1200 },
  ]},
  { codigo: "REP-004", nombre: "Chips de chocolate", foto: "img/rep-004-chips.webp", presentaciones: [
    { codigo: "REP-004-01", detalle: "Blanco · 100 g", precio: 1900 },
    { codigo: "REP-004-02", detalle: "Negro · 100 g", precio: 1900 },
  ]},
  { codigo: "REP-005", nombre: "Chips de chocolate semiamargo Mapsa", foto: "img/rep-005-chips-semiamargo.webp", presentaciones: [
    { codigo: "REP-005-01", detalle: "Bolsa 500 g · marca Mapsa", precio: 7500 },
  ]},
  { codigo: "REP-006", nombre: "Rocklet", foto: "img/rep-006-rocklet.webp", presentaciones: [
    { codigo: "REP-006-01", detalle: "Bolsa 100 g", precio: 2200 },
  ]},
  { codigo: "REP-007", nombre: "Mini Rocklet", foto: "img/rep-007-mini-rocklet.webp", presentaciones: [
    { codigo: "REP-007-01", detalle: "Bolsa 100 g", precio: 2200 },
  ]},
  { codigo: "REP-008", nombre: "Micro galletitas bañadas en chocolate", foto: "img/rep-008-micro-galletitas.webp", presentaciones: [
    { codigo: "REP-008-01", detalle: "Chocolate negro · 100 g", precio: 3500 },
    { codigo: "REP-008-02", detalle: "Chocolate blanco · 100 g", precio: 3500 },
  ]},
  { codigo: "REP-009", nombre: "Marroc con relleno de pasta de maní", foto: "img/rep-009-marroc.webp", presentaciones: [
    { codigo: "REP-009-01", detalle: "Bolsa 100 g", precio: 3000 },
  ]},
  { codigo: "REP-010", nombre: "Crocante de maní", foto: "img/rep-010-crocante-mani.webp", presentaciones: [
    { codigo: "REP-010-01", detalle: "Bolsa 100 g", precio: 1200 },
  ]},
  { codigo: "REP-011", nombre: "Merenguitos", presentaciones: [
    { codigo: "REP-011-01", detalle: "Bolsa 100 g", precio: 1700 },
  ]},
  { codigo: "REP-012", nombre: "Colorantes en gel", presentaciones: [
    { codigo: "REP-012-01", detalle: "Unidad · colores varios (indicá el color en comentarios)", precio: 2800 },
  ]},
  { codigo: "REP-013", nombre: "Lápices de glacé", presentaciones: [
    { codigo: "REP-013-01", detalle: "Unidad · colores varios (indicá el color en comentarios)", precio: 3000 },
  ]},
  { codigo: "REP-014", nombre: "Pasta para cubrir torta Ballina", presentaciones: [
    { codigo: "REP-014-01", detalle: "½ kg", precio: 4500 },
  ]},
  { codigo: "REP-015", nombre: "Pasta de goma", presentaciones: [
    { codigo: "REP-015-01", detalle: "½ kg", precio: 4800 },
  ]},
  { codigo: "REP-016", nombre: "Pastillaje", presentaciones: [
    { codigo: "REP-016-01", detalle: "½ kg", precio: 5500 },
  ]},
  { codigo: "REP-017", nombre: "Pasta relleno de maní Mapsa", presentaciones: [
    { codigo: "REP-017-01", detalle: "Envase 450 g", precio: 6800 },
  ]},
  { codigo: "REP-018", nombre: "Chocolate Alpino en tableta", presentaciones: [
    { codigo: "REP-018-01", detalle: "½ kg · leche", precio: 7000 },
    { codigo: "REP-018-02", detalle: "½ kg · blanco", precio: 7000 },
    { codigo: "REP-018-03", detalle: "½ kg · semiamargo", precio: 7000 },
  ]},
  { codigo: "REP-019", nombre: "Chocolate Mapsa en sobre", presentaciones: [
    { codigo: "REP-019-01", detalle: "150 g · blanco", precio: 3200 },
    { codigo: "REP-019-02", detalle: "150 g · semiamargo", precio: 3200 },
  ]},
  { codigo: "REP-020", nombre: "Mousse de chocolate", presentaciones: [
    { codigo: "REP-020-01", detalle: "Bolsa 100 g", precio: 2800 },
  ]},
  { codigo: "REP-021", nombre: "Cacao amargo", presentaciones: [
    { codigo: "REP-021-01", detalle: "Bolsa 100 g", precio: 2300 },
  ]},
  { codigo: "REP-022", nombre: "Dulce de leche", presentaciones: [
    { codigo: "REP-022-01", detalle: "½ kg", precio: 2800 },
    { codigo: "REP-022-02", detalle: "1 kg", precio: 4900 },
  ]},
  { codigo: "REP-023", nombre: "Crema Ledevit", presentaciones: [
    { codigo: "REP-023-01", detalle: "½ litro", precio: 5200 },
    { codigo: "REP-023-02", detalle: "1 litro", precio: 9200 },
    { codigo: "REP-023-03", detalle: "Bidón 4,7 litros", precio: 39000 },
  ]},
  { codigo: "REP-024", nombre: "Coco rallado", presentaciones: [
    { codigo: "REP-024-01", detalle: "Bolsa 100 g", precio: 1700 },
    { codigo: "REP-024-02", detalle: "½ kg", precio: 8000 },
  ]},
  { codigo: "REP-025", nombre: "Azúcar impalpable Dewey", presentaciones: [
    { codigo: "REP-025-01", detalle: "1 kg", precio: 3000 },
  ]},
  { codigo: "REP-026", nombre: "Vainillín Fleibor", presentaciones: [
    { codigo: "REP-026-01", detalle: "110 cc", precio: 2300 },
    { codigo: "REP-026-02", detalle: "1 litro", precio: 5500 },
  ]},
  { codigo: "REP-027", nombre: "Polvo de hornear", presentaciones: [
    { codigo: "REP-027-01", detalle: "Bolsa 100 g", precio: 1300 },
  ]},
  { codigo: "REP-028", nombre: "Bicarbonato de sodio", presentaciones: [
    { codigo: "REP-028-01", detalle: "Bolsa 100 g", precio: 1000 },
  ]},

  // ── GOL · Golosinas y snacks ──────────────────────────────────
  { codigo: "GOL-001", nombre: "Chupetines frutales", foto: "img/golosinas.webp", presentaciones: [
    { codigo: "GOL-001-01", detalle: "Bolsa x 25 u.", precio: 4200 },
    { codigo: "GOL-001-02", detalle: "Bolsa x 50 u.", precio: 7800 },
  ]},
  { codigo: "GOL-002", nombre: "Gomitas surtidas", foto: "img/golosinas.webp", presentaciones: [
    { codigo: "GOL-002-01", detalle: "Bolsa 500 g", precio: 5100 },
    { codigo: "GOL-002-02", detalle: "Bolsa 1 kg", precio: 9500 },
  ]},
  { codigo: "GOL-003", nombre: "Papas fritas clásicas", foto: "img/snacks.webp", presentaciones: [
    { codigo: "GOL-003-01", detalle: "Bolsa 150 g", precio: 2400 },
    { codigo: "GOL-003-02", detalle: "Bolsa 300 g", precio: 4300 },
  ]},
  { codigo: "GOL-004", nombre: "Palitos salados", foto: "img/snacks.webp", presentaciones: [
    { codigo: "GOL-004-01", detalle: "Bolsa 500 g", precio: 3700 },
  ]},

  // ── BEB · Bebidas ─────────────────────────────────────────────
  { codigo: "BEB-001", nombre: "Gaseosa cola", foto: "img/bebidas.webp", presentaciones: [
    { codigo: "BEB-001-01", detalle: "Botella 1,5 L", precio: 2800 },
    { codigo: "BEB-001-02", detalle: "Botella 2,25 L", precio: 3800 },
  ]},
  { codigo: "BEB-002", nombre: "Agua mineral sin gas", foto: "img/bebidas.webp", presentaciones: [
    { codigo: "BEB-002-01", detalle: "Botella 2 L", precio: 1700 },
  ]},
  { codigo: "BEB-003", nombre: "Jugo de naranja", foto: "img/bebidas.webp", presentaciones: [
    { codigo: "BEB-003-01", detalle: "Botella 1,5 L", precio: 2900 },
  ]},

  // ── PAP · Papelería ───────────────────────────────────────────
  { codigo: "PAP-001", nombre: "Papel de regalo", foto: "img/papeleria.webp", presentaciones: [
    { codigo: "PAP-001-01", detalle: "Pack x 10 pliegos · infantil", precio: 3500 },
  ]},
  { codigo: "PAP-002", nombre: "Bolsitas para sorpresitas", foto: "img/papeleria.webp", presentaciones: [
    { codigo: "PAP-002-01", detalle: "Pack x 10 u. · con moño", precio: 2800 },
  ]},

  // ── TEM · Temporada y disfraces ───────────────────────────────
  { codigo: "TEM-001", nombre: "Kit deco Halloween", foto: "img/kit-halloween.webp", presentaciones: [
    { codigo: "TEM-001-01", detalle: "Calabazas, telarañas y guirnalda", precio: 15900 },
  ]},
  { codigo: "TEM-002", nombre: "Disfraz infantil de bruja", foto: "img/disfraces.webp", presentaciones: [
    { codigo: "TEM-002-01", detalle: "Talles 4 a 10 · vestido + sombrero", precio: 21000 },
  ]},
];

// OFERTAS
// Aparecen en el carrusel de la portada y de la tienda, y el precio de oferta se aplica solo en el carrito.
// - codigo: código de la PRESENTACIÓN en oferta (ej: GLO-001-02).
// - precio: precio de oferta en pesos (tiene que ser menor al precio normal).
// - desde / hasta: fechas AAAA-MM-DD, ambas incluidas y opcionales. Fuera de esas fechas la oferta
//   desaparece sola; no hace falta borrarla enseguida.
// - texto: frase corta opcional que se muestra en la tarjeta.
// Las de abajo son DE EJEMPLO.

const OFERTAS = [
  { codigo: "TEM-001-01", precio: 12900, hasta: "2026-10-31", texto: "Especial Halloween" },
  { codigo: "GLO-001-02", precio: 5200, hasta: "2026-10-31", texto: "Ideal para arcos y guirnaldas" },
  { codigo: "COT-002-01", precio: 9900, hasta: "2026-11-15", texto: "Para fiestas de 15" },
  { codigo: "GOL-002-02", precio: 7900, hasta: "2026-10-25" },
  { codigo: "BEB-001-02", precio: 3300, hasta: "2026-10-31" },
  { codigo: "DES-002-02", precio: 2300, hasta: "2026-11-30", texto: "Llevá de colores combinados" },
];
