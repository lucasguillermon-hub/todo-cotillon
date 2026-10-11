// CATÁLOGO DE LA TIENDA (tienda.html)
//
// Códigos:
//   Categoría     3 letras             GLO
//   Producto      categoría + número   GLO-001
//   Presentación  producto + número    GLO-001-01   ← este es el código que va al carrito y al pedido
//
// Reglas para mantenerlo prolijo:
// - Un código nunca se reutiliza ni se cambia: si un producto se deja de vender, se marca `oculto: true`
//   (o se borra) pero su número no se vuelve a usar para otra cosa.
// - Productos nuevos: siguiente número libre de su categoría. Presentaciones nuevas: siguiente número
//   libre dentro del producto.
// - precio: en pesos, sin puntos ni signo (ej: 6500).
// - foto: archivo dentro de img/.
// - Antes de publicar: `node herramientas/catalogo.js` revisa que no haya errores y arma catalogo.csv.
//
// Los productos y precios de abajo son DE EJEMPLO: se van reemplazando por los reales.

const CATEGORIAS = [
  { codigo: "GLO", nombre: "Globos" },
  { codigo: "COT", nombre: "Cotillón" },
  { codigo: "DES", nombre: "Descartables" },
  { codigo: "REP", nombre: "Repostería" },
  { codigo: "GOL", nombre: "Golosinas y snacks" },
  { codigo: "BEB", nombre: "Bebidas" },
  { codigo: "PAP", nombre: "Papelería" },
  { codigo: "TEM", nombre: "Temporada y disfraces" },
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

  // ── REP · Repostería ──────────────────────────────────────────
  { codigo: "REP-001", nombre: "Caja para torta con visor", foto: "img/cajas-torta.webp", presentaciones: [
    { codigo: "REP-001-01", detalle: "25 x 25 x 12 cm · unidad", precio: 1700 },
    { codigo: "REP-001-02", detalle: "30 x 30 x 15 cm · unidad", precio: 2100 },
  ]},
  { codigo: "REP-002", nombre: "Crema vegetal para batir", foto: "img/crema.webp", presentaciones: [
    { codigo: "REP-002-01", detalle: "Envase 1 L", precio: 5600 },
  ]},
  { codigo: "REP-003", nombre: "Premezcla bizcochuelo vainilla", foto: "img/bizcochuelos.webp", presentaciones: [
    { codigo: "REP-003-01", detalle: "Caja 540 g", precio: 3200 },
  ]},
  { codigo: "REP-004", nombre: "Vela número", foto: "img/velas.webp", presentaciones: [
    { codigo: "REP-004-01", detalle: "Unidad · 0 al 9 · varios colores", precio: 1500 },
  ]},
  { codigo: "REP-005", nombre: "Velitas de colores", foto: "img/velas.webp", presentaciones: [
    { codigo: "REP-005-01", detalle: "Caja x 24 u.", precio: 1300 },
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
