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
// - precio: en pesos, sin puntos ni signo (ej: 6500). null = "Precio a confirmar" (se puede pedir igual).
// - colores (opcional): lista de colores; el cliente elige uno en la tarjeta y va al pedido.
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
  { codigo: "PAP", nombre: "Papelería", icono: "🛍️" },
  { codigo: "TEM", nombre: "Temporada y disfraces", icono: "🎃" },
];

const PRODUCTOS = [
  // ── GLO · Globos (lista real, 15/10/2026) ─────────────────────
  // Los códigos siguen la numeración de la lista del local. Sin foto todavía.
  // Pendientes (falta el precio): GLO-007 Set de globos corazón 18" x 10 · GLO-008 Set de globos estrella 18" x 10.
  { codigo: "GLO-001", nombre: "Globos lisos 9\"", foto: "img/glo-001-globos-lisos.webp",
    colores: ["Blanco", "Verde manzana", "Celeste", "Verde oscuro", "Naranja", "Negro", "Rojo", "Rosa", "Amarillo", "Fucsia", "Lila", "Multicolor"], presentaciones: [
    { codigo: "GLO-001-01", detalle: "Bolsa x 10 u.", precio: 900 },
  ]},
  { codigo: "GLO-002", nombre: "Globos perlados 12\"", foto: "img/glo-002-globos-perlados.webp",
    colores: ["Oro", "Plata", "Verde manzana", "Salmón", "Celeste", "Blanco", "Negro", "Lila", "Rosa", "Rojo", "Azul Francia"], presentaciones: [
    { codigo: "GLO-002-01", detalle: "Bolsa x 10 u.", precio: 1900 },
  ]},
  { codigo: "GLO-003", nombre: "Piñata globo grande 36\"", foto: "img/glo-003-pinata-globo.webp", presentaciones: [
    { codigo: "GLO-003-01", detalle: "Unidad", precio: 3500 },
  ]},
  { codigo: "GLO-004", nombre: "Globos Party Time 9\"", foto: "img/glo-004-globos-party-time.webp", presentaciones: [
    { codigo: "GLO-004-01", detalle: "Bolsa x 50 u.", precio: 4200 },
  ]},
  { codigo: "GLO-005", nombre: "Globo número 14\" (36 cm)", foto: "img/glo-005-globo-numero.webp", presentaciones: [
    { codigo: "GLO-005-01", detalle: "N° 3", precio: 1600 },
    { codigo: "GLO-005-02", detalle: "N° 4", precio: 1600 },
    { codigo: "GLO-005-03", detalle: "N° 5", precio: 1600 },
    { codigo: "GLO-005-04", detalle: "N° 6", precio: 1600 },
    { codigo: "GLO-005-05", detalle: "N° 7", precio: 1600 },
    { codigo: "GLO-005-06", detalle: "N° 8", precio: 1600 },
    { codigo: "GLO-005-07", detalle: "N° 9", precio: 1600 },
  ]},
  { codigo: "GLO-006", nombre: "Frase \"Feliz Cumpleaños\" inflable", foto: "img/glo-006-feliz-cumpleanos.webp", presentaciones: [
    { codigo: "GLO-006-01", detalle: "Unidad · colores surtidos", precio: 2500 },
  ]},
  { codigo: "GLO-009", nombre: "Set de globos metalizados y transparentes con confeti", foto: "img/glo-009-set-metalizados-confeti.webp",
    colores: ["Negro", "Dorado", "Violeta", "Azul", "Rosa gold", "Rojo", "Plateado", "Fucsia", "Verde manzana"], presentaciones: [
    { codigo: "GLO-009-01", detalle: "14 u. · 12 estrellas + 2 corazones", precio: 4500 },
  ]},
  { codigo: "GLO-010", nombre: "Cortina / lluvia decorativa", foto: "img/glo-010-cortina-lluvia.webp",
    colores: ["Celeste", "Plata", "Rosa gold", "Oro", "Fucsia", "Negro", "Blanco", "Verde", "Rojo", "Azul Francia", "Lila o violeta"], presentaciones: [
    { codigo: "GLO-010-01", detalle: "2 m de largo × 1 m de ancho", precio: 2600 },
  ]},

  // ── COT · Cotillón (fotos del local, 15/10/2026) ───────────
  // null = "Precio a confirmar". Sin foto todavía los que no tienen "foto".
  { codigo: "COT-001", nombre: "Collar plástico", foto: "img/cot-001-collar-plastico.webp", presentaciones: [
    { codigo: "COT-001-01", detalle: "Unidad · colores surtidos", precio: 300 },
  ]},
  { codigo: "COT-002", nombre: "Porras flúor", foto: "img/cot-002-porras-fluor.webp", presentaciones: [
    { codigo: "COT-002-01", detalle: "Unidad", precio: 600 },
  ]},
  { codigo: "COT-003", nombre: "Goma eva picada", foto: "img/cot-003-goma-eva-picada.webp", presentaciones: [
    { codigo: "COT-003-01", detalle: "Bolsa", precio: 600 },
  ]},
  { codigo: "COT-004", nombre: "Bonetes metalizados", foto: "img/cot-004-bonetes.webp",
    colores: ["Plateado", "Rosa", "Celeste", "Dorado"], presentaciones: [
    { codigo: "COT-004-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-005", nombre: "Galeras y sombreros de cotillón", foto: "img/cot-005-galeras.webp", presentaciones: [
    { codigo: "COT-005-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "COT-006", nombre: "Cornetas flúor", foto: "img/cot-006-cornetas-fluor.webp", presentaciones: [
    { codigo: "COT-006-01", detalle: "Unidad · medida a confirmar", precio: null },
  ]},
  { codigo: "COT-007", nombre: "Vinchas flúor y luminosas", presentaciones: [
    { codigo: "COT-007-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "COT-008", nombre: "Antifaces (flúor y carnaval)", presentaciones: [
    { codigo: "COT-008-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "COT-009", nombre: "Pelucas de colores", presentaciones: [
    { codigo: "COT-009-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-010", nombre: "Anteojos flúor", presentaciones: [
    { codigo: "COT-010-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-011", nombre: "Guantes de red flúor", presentaciones: [
    { codigo: "COT-011-01", detalle: "Par", precio: null },
  ]},
  { codigo: "COT-012", nombre: "Collar hawaiano de flores", presentaciones: [
    { codigo: "COT-012-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-013", nombre: "Vasos flúor", presentaciones: [
    { codigo: "COT-013-01", detalle: "Pack · cantidad a confirmar", precio: null },
  ]},
  { codigo: "COT-014", nombre: "Banderines flúor", presentaciones: [
    { codigo: "COT-014-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-015", nombre: "Cornetitas y pitos", foto: "img/cot-015-cotillon-cornetitas.webp", presentaciones: [
    { codigo: "COT-015-01", detalle: "Bolsa · cantidad a confirmar", precio: null },
  ]},
  { codigo: "COT-016", nombre: "Pelotitas de colores", presentaciones: [
    { codigo: "COT-016-01", detalle: "Bolsa · cantidad a confirmar", precio: null },
  ]},
  { codigo: "COT-017", nombre: "Narices de payaso", presentaciones: [
    { codigo: "COT-017-01", detalle: "Bolsa · cantidad a confirmar", precio: null },
  ]},
  { codigo: "COT-018", nombre: "Cotillón de fútbol (metegol)", presentaciones: [
    { codigo: "COT-018-01", detalle: "Unidad · equipo a elegir", precio: null },
  ]},
  { codigo: "COT-019", nombre: "Banderín \"Feliz Cumpleaños\"", presentaciones: [
    { codigo: "COT-019-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "COT-020", nombre: "Vinchas con flores", presentaciones: [
    { codigo: "COT-020-01", detalle: "Unidad", precio: null },
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
  { codigo: "REP-011", nombre: "Merenguitos", foto: "img/rep-011-merenguitos.webp", presentaciones: [
    { codigo: "REP-011-01", detalle: "Bolsa 100 g", precio: 1700 },
  ]},
  { codigo: "REP-012", nombre: "Colorantes en gel", foto: "img/rep-012-colorantes-gel.webp", presentaciones: [
    { codigo: "REP-012-01", detalle: "Unidad · colores varios (indicá el color en comentarios)", precio: 2800 },
  ]},
  { codigo: "REP-013", nombre: "Lápices de glacé", foto: "img/rep-013-lapices-glace.webp", presentaciones: [
    { codigo: "REP-013-01", detalle: "Unidad · colores varios (indicá el color en comentarios)", precio: 3000 },
  ]},
  { codigo: "REP-014", nombre: "Pasta para cubrir torta Ballina", foto: "img/rep-014-pasta-cubrir.webp", presentaciones: [
    { codigo: "REP-014-01", detalle: "½ kg", precio: 4500 },
  ]},
  { codigo: "REP-015", nombre: "Pasta de goma", foto: "img/rep-015-pasta-goma.webp", presentaciones: [
    { codigo: "REP-015-01", detalle: "½ kg", precio: 4800 },
  ]},
  { codigo: "REP-016", nombre: "Pastillaje", foto: "img/rep-016-pastillaje.webp", presentaciones: [
    { codigo: "REP-016-01", detalle: "½ kg", precio: 5500 },
  ]},
  { codigo: "REP-017", nombre: "Pasta relleno de maní Mapsa", foto: "img/rep-017-pasta-mani.webp", presentaciones: [
    { codigo: "REP-017-01", detalle: "Envase 450 g", precio: 6800 },
  ]},
  { codigo: "REP-018", nombre: "Chocolate Alpino en tableta", foto: "img/rep-018-chocolate-tableta.webp", presentaciones: [
    { codigo: "REP-018-01", detalle: "½ kg · leche", precio: 7000 },
    { codigo: "REP-018-02", detalle: "½ kg · blanco", precio: 7000 },
    { codigo: "REP-018-03", detalle: "½ kg · semiamargo", precio: 7000 },
  ]},
  { codigo: "REP-019", nombre: "Chocolate Mapsa en sobre", foto: "img/rep-019-chocolate-sobre.webp", presentaciones: [
    { codigo: "REP-019-01", detalle: "150 g · blanco", precio: 3200 },
    { codigo: "REP-019-02", detalle: "150 g · semiamargo", precio: 3200 },
  ]},
  { codigo: "REP-020", nombre: "Mousse de chocolate", foto: "img/rep-020-mousse.webp", presentaciones: [
    { codigo: "REP-020-01", detalle: "Bolsa 100 g", precio: 2800 },
  ]},
  { codigo: "REP-021", nombre: "Cacao amargo", foto: "img/rep-021-cacao.webp", presentaciones: [
    { codigo: "REP-021-01", detalle: "Bolsa 100 g", precio: 2300 },
  ]},
  { codigo: "REP-022", nombre: "Dulce de leche", foto: "img/rep-022-dulce-de-leche.webp", presentaciones: [
    { codigo: "REP-022-01", detalle: "½ kg", precio: 2800 },
    { codigo: "REP-022-02", detalle: "1 kg", precio: 4900 },
  ]},
  { codigo: "REP-023", nombre: "Crema Ledevit", foto: "img/rep-023-crema-ledevit.webp", presentaciones: [
    { codigo: "REP-023-01", detalle: "½ litro", precio: 5200 },
    { codigo: "REP-023-02", detalle: "1 litro", precio: 9200 },
    { codigo: "REP-023-03", detalle: "Bidón 4,7 litros", precio: 39000 },
  ]},
  { codigo: "REP-024", nombre: "Coco rallado", foto: "img/rep-024-coco-rallado.webp", presentaciones: [
    { codigo: "REP-024-01", detalle: "Bolsa 100 g", precio: 1700 },
    { codigo: "REP-024-02", detalle: "½ kg", precio: 8000 },
  ]},
  { codigo: "REP-025", nombre: "Azúcar impalpable Dewey", foto: "img/rep-025-azucar-impalpable.webp", presentaciones: [
    { codigo: "REP-025-01", detalle: "1 kg", precio: 3000 },
  ]},
  { codigo: "REP-026", nombre: "Vainillín Fleibor", foto: "img/rep-026-vainillin-fleibor.webp", presentaciones: [
    { codigo: "REP-026-01", detalle: "110 cc", precio: 2300 },
    { codigo: "REP-026-02", detalle: "1 litro", precio: 5500 },
  ]},
  { codigo: "REP-027", nombre: "Polvo de hornear", foto: "img/rep-027-polvo-hornear.webp", presentaciones: [
    { codigo: "REP-027-01", detalle: "Bolsa 100 g", precio: 1300 },
  ]},
  { codigo: "REP-028", nombre: "Bicarbonato de sodio", foto: "img/rep-028-bicarbonato.webp", presentaciones: [
    { codigo: "REP-028-01", detalle: "Bolsa 100 g", precio: 1000 },
  ]},

  // ── REP · Repostería, más productos (fotos del local, 15/10/2026) ───────────
  // null = "Precio a confirmar". Sin foto todavía los que no tienen "foto".
  { codigo: "REP-029", nombre: "Vela número con glitter", foto: "img/rep-029-vela-numero-glitter-gemini.webp",
    colores: ["Rojo", "Rosa", "Azul", "Rosa con lunares", "Celeste con lunares"], presentaciones: [
    { codigo: "REP-029-01", detalle: "N° 0", precio: 1500 },
    { codigo: "REP-029-02", detalle: "N° 1", precio: 1500 },
    { codigo: "REP-029-03", detalle: "N° 2", precio: 1500 },
    { codigo: "REP-029-04", detalle: "N° 3", precio: 1500 },
    { codigo: "REP-029-05", detalle: "N° 4", precio: 1500 },
    { codigo: "REP-029-06", detalle: "N° 5", precio: 1500 },
    { codigo: "REP-029-07", detalle: "N° 6", precio: 1500 },
    { codigo: "REP-029-08", detalle: "N° 7", precio: 1500 },
    { codigo: "REP-029-09", detalle: "N° 8", precio: 1500 },
    { codigo: "REP-029-10", detalle: "N° 9", precio: 1500 },
  ]},
  { codigo: "REP-030", nombre: "Vela número (otros modelos)", foto: "img/rep-030-vela-numero-otros.webp",
    colores: ["Azul y dorado", "Rojo y blanco", "Rosa", "Celeste"], presentaciones: [
    { codigo: "REP-030-01", detalle: "Unidad · número del 0 al 9 (indicalo en comentarios)", precio: null },
  ]},
  { codigo: "REP-031", nombre: "Velas corazón metalizadas", foto: "img/rep-031-velas-corazon.webp",
    colores: ["Lila", "Dorado", "Plateado", "Rojo"], presentaciones: [
    { codigo: "REP-031-01", detalle: "Blíster · cantidad a confirmar", precio: null },
  ]},
  { codigo: "REP-032", nombre: "Bengalas para torta", foto: "img/rep-032-bengalas-gemini.webp", presentaciones: [
    { codigo: "REP-032-01", detalle: "Metalizadas · unidad", precio: 800 },
    { codigo: "REP-032-02", detalle: "Brillo · unidad", precio: 1000 },
  ]},
  { codigo: "REP-033", nombre: "Velas espiral metalizadas", foto: "img/rep-033-velas-espiral-gemini.webp",
    colores: ["Plateado", "Dorado"], presentaciones: [
    { codigo: "REP-033-01", detalle: "Blíster · cantidad a confirmar", precio: 2500 },
  ]},
  { codigo: "REP-034", nombre: "Velas largas con glitter", foto: "img/rep-034-velas-largas-glitter-gemini.webp",
    colores: ["Dorado", "Plateado", "Azul"], presentaciones: [
    { codigo: "REP-034-01", detalle: "Caja · cantidad a confirmar", precio: 4000 },
  ]},
  { codigo: "REP-035", nombre: "Velas con glitter", foto: "img/rep-035-velas-glitter.webp",
    colores: ["Verde", "Azul"], presentaciones: [
    { codigo: "REP-035-01", detalle: "Unidad · medida a confirmar", precio: null },
  ]},
  { codigo: "REP-036", nombre: "Flores de azúcar para tortas y cupcakes", foto: "img/rep-036-flores-azucar-gemini.webp", presentaciones: [
    { codigo: "REP-036-01", detalle: "Pote · peso a confirmar", precio: 3000 },
  ]},
  { codigo: "REP-037", nombre: "Lámina comestible temática", foto: "img/rep-037-lamina-comestible-gemini.webp", presentaciones: [
    { codigo: "REP-037-01", detalle: "Unidad · temática a elegir (indicala en comentarios)", precio: null },
  ]},
  { codigo: "REP-038", nombre: "Topper temático para torta", foto: "img/rep-038-topper-tematico-gemini.webp", presentaciones: [
    { codigo: "REP-038-01", detalle: "Set con palitos · temática a elegir (indicala en comentarios)", precio: null },
  ]},
  { codigo: "REP-039", nombre: "Cake topper \"Feliz Cumpleaños\"", foto: "img/rep-039-cake-topper-gemini.webp",
    colores: ["Dorado", "Plateado", "Celeste", "Fucsia", "Rosa gold"], presentaciones: [
    { codigo: "REP-039-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "REP-040", nombre: "Esferas decorativas para torta", foto: "img/rep-040-esferas-decorativas.webp",
    colores: ["Dorado", "Plateado", "Perladas", "Blancas"], presentaciones: [
    { codigo: "REP-040-01", detalle: "Bolsa · cantidad a confirmar", precio: null },
  ]},
  { codigo: "REP-041", nombre: "Escenario banderín \"Mi cumple\"", foto: "img/rep-041-escenario-banderin-gemini.webp", presentaciones: [
    { codigo: "REP-041-01", detalle: "Boca", precio: null },
    { codigo: "REP-041-02", detalle: "Independiente", precio: 4500 },
    { codigo: "REP-041-03", detalle: "River", precio: null },
  ]},
  { codigo: "REP-042", nombre: "Cajas para torta blancas", foto: "img/rep-042-cajas-torta-blancas-gemini.webp", presentaciones: [
    { codigo: "REP-042-01", detalle: "15 × 15 × 8 cm", precio: 1800 },
    { codigo: "REP-042-02", detalle: "20 × 20 × 10 cm", precio: 2000 },
    { codigo: "REP-042-03", detalle: "25 × 25 × 7 cm", precio: 2000 },
    { codigo: "REP-042-04", detalle: "30 × 30 × 12 cm", precio: 3000 },
    { codigo: "REP-042-05", detalle: "Otras medidas (consultá)", precio: null },
  ]},
  { codigo: "REP-043", nombre: "Cajas para torta decoradas", foto: "img/rep-043-cajas-torta-decoradas-gemini.webp", presentaciones: [
    { codigo: "REP-043-01", detalle: "Modelo y medida a confirmar", precio: null },
  ]},
  { codigo: "REP-044", nombre: "Cajas transparentes para torta con moño", foto: "img/rep-044-cajas-transparentes-mono.webp",
    colores: ["Dorado", "Rosa"], presentaciones: [
    { codigo: "REP-044-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-045", nombre: "Bolsas para freezer y horno", foto: "img/rep-045-bolsas-freezer-horno.webp", presentaciones: [
    { codigo: "REP-045-01", detalle: "Pack x 10", precio: 3300 },
    { codigo: "REP-045-02", detalle: "Bolsas para hornear Hornal · cantidad a confirmar", precio: null },
    { codigo: "REP-045-03", detalle: "Bolsas para freezer medianas · cantidad a confirmar", precio: null },
  ]},
  { codigo: "REP-046", nombre: "Picos y boquillas de repostería", foto: "img/rep-046-picos-reposteria-gemini.webp", presentaciones: [
    { codigo: "REP-046-01", detalle: "Set · modelo a elegir", precio: null },
  ]},
  { codigo: "REP-047", nombre: "Utensilios de silicona (espátulas, cucharas, pinceles)", foto: "img/rep-047-utensilios-silicona-gemini.webp", presentaciones: [
    { codigo: "REP-047-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "REP-048", nombre: "Moldes de silicona para bombones y chocolate", foto: "img/rep-048-moldes-silicona-gemini.webp", presentaciones: [
    { codigo: "REP-048-01", detalle: "Unidad · modelo a elegir", precio: null },
  ]},
  { codigo: "REP-049", nombre: "Cortantes y set para fondant", foto: "img/rep-049-cortantes-fondant.webp", presentaciones: [
    { codigo: "REP-049-01", detalle: "Set · modelo a elegir", precio: null },
  ]},
  { codigo: "REP-050", nombre: "Molde multiuso rectangular (asadera / bizcochuelo)", foto: "img/rep-050-molde-multiuso.webp", presentaciones: [
    { codigo: "REP-050-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-051", nombre: "Pizzera de aluminio", presentaciones: [
    { codigo: "REP-051-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-052", nombre: "Moldes redondos para torta de aluminio", presentaciones: [
    { codigo: "REP-052-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-053", nombre: "Molde rosca / savarín de aluminio", foto: "img/rep-053-molde-rosca.webp", presentaciones: [
    { codigo: "REP-053-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-054", nombre: "Tartera acanalada", foto: "img/rep-054-tartera.webp", presentaciones: [
    { codigo: "REP-054-01", detalle: "Medida a confirmar", precio: 7600 },
  ]},
  { codigo: "REP-055", nombre: "Molde para muffins x 12 (antiadherente)", foto: "img/rep-055-molde-muffins.webp", presentaciones: [
    { codigo: "REP-055-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "REP-056", nombre: "Budinera antiadherente", foto: "img/rep-056-budinera.webp", presentaciones: [
    { codigo: "REP-056-01", detalle: "Medida a confirmar", precio: null },
  ]},
  { codigo: "REP-057", nombre: "Molde desmontable antiadherente", foto: "img/rep-057-moldes-desmontables.webp", presentaciones: [
    { codigo: "REP-057-01", detalle: "Redondo · medida a confirmar", precio: null },
    { codigo: "REP-057-02", detalle: "Ovalado · medida a confirmar", precio: null },
  ]},

  // ── GOL · Golosinas y snacks (lista real, 14/10/2026) ──────────────────
  // Sin foto todavía. Primero golosinas (001–010), después snacks (011–014).
  { codigo: "GOL-001", nombre: "Alfajor Fulbito", foto: "img/gol-001-alfajor-fulbito.webp", presentaciones: [
    { codigo: "GOL-001-01", detalle: "Pack x 4 u.", precio: 1000 },
    { codigo: "GOL-001-02", detalle: "Caja x 44 u.", precio: 9000 },
  ]},
  { codigo: "GOL-002", nombre: "Turrón Fulbito", foto: "img/gol-002-turron-fulbito.webp", presentaciones: [
    { codigo: "GOL-002-01", detalle: "Pack x 5 u.", precio: 1000 },
    { codigo: "GOL-002-02", detalle: "Caja x 50 u.", precio: 8900 },
  ]},
  { codigo: "GOL-003", nombre: "Bon o Bon", foto: "img/gol-003-bon-o-bon.webp", presentaciones: [
    { codigo: "GOL-003-01", detalle: "Caja x 30 u.", precio: 10900 },
  ]},
  { codigo: "GOL-004", nombre: "Chupetines Lheritier pelotita", foto: "img/gol-004-chupetines-pelotita.webp", presentaciones: [
    { codigo: "GOL-004-01", detalle: "Bolsa x 50 u.", precio: 4200 },
  ]},
  { codigo: "GOL-005", nombre: "Chupetines Lheritier cebollita", foto: "img/gol-005-chupetines-cebollita.webp", presentaciones: [
    { codigo: "GOL-005-01", detalle: "Bolsa x 40 u.", precio: 2500 },
  ]},
  { codigo: "GOL-006", nombre: "Caramelos masticables Misky", foto: "img/gol-006-caramelos-misky.webp", presentaciones: [
    { codigo: "GOL-006-01", detalle: "Bolsa x 50 u. · surtidos", precio: 2500 },
    { codigo: "GOL-006-02", detalle: "Bolsa 800 g · surtidos", precio: 7900 },
  ]},
  { codigo: "GOL-007", nombre: "Caramelos masticables Flynn Paff", foto: "img/gol-007-caramelos-flimpaf.webp", presentaciones: [
    { codigo: "GOL-007-01", detalle: "Bolsa x 70 u.", precio: 9000 },
  ]},
  { codigo: "GOL-008", nombre: "Gomitas masticables", foto: "img/gol-008-gomitas.webp", presentaciones: [
    { codigo: "GOL-008-01", detalle: "½ kg", precio: 5700 },
  ]},
  { codigo: "GOL-009", nombre: "Malvaviscos", foto: "img/gol-009-malvaviscos.webp", presentaciones: [
    { codigo: "GOL-009-01", detalle: "Bolsa 200 g", precio: 3000 },
  ]},
  { codigo: "GOL-010", nombre: "Jugo Baggio manzana", foto: "img/gol-010-jugo-baggio.webp", presentaciones: [
    { codigo: "GOL-010-01", detalle: "Pack x 18 u. · 125 ml c/u", precio: 7000 },
  ]},
  { codigo: "GOL-011", nombre: "Bolitas dulces Le.q", foto: "img/gol-011-bolitas-leq.webp", presentaciones: [
    { codigo: "GOL-011-01", detalle: "Bolsa 383 g", precio: 4800 },
  ]},
  { codigo: "GOL-012", nombre: "Chizitos de maíz sabor queso Frit Bom", foto: "img/gol-012-chizitos.webp", presentaciones: [
    { codigo: "GOL-012-01", detalle: "Bolsa 400 g", precio: 2500 },
  ]},
  { codigo: "GOL-013", nombre: "Palitos salados Frit Bom", foto: "img/gol-013-palitos-salados.webp", presentaciones: [
    { codigo: "GOL-013-01", detalle: "Bolsa 800 g", precio: 4900 },
  ]},
  { codigo: "GOL-014", nombre: "Papas fritas Frit Bom", foto: "img/gol-014-papas-fritas.webp", presentaciones: [
    { codigo: "GOL-014-01", detalle: "Bolsa 500 g", precio: 4800 },
  ]},

  // ── BEB · Bebidas (lista real, 15/10/2026) ────────────────────
  // Sin foto todavía.
  { codigo: "BEB-001", nombre: "Coca-Cola", foto: "img/beb-001-coca-cola.webp", presentaciones: [
    { codigo: "BEB-001-01", detalle: "Pack 2,25 L x 6 u.", precio: 30000 },
    { codigo: "BEB-001-02", detalle: "Pack 1,5 L x 8 u.", precio: 30000 },
  ]},
  { codigo: "BEB-002", nombre: "Coca-Cola Zero", foto: "img/beb-002-coca-cola-zero.webp", presentaciones: [
    { codigo: "BEB-002-01", detalle: "Pack 2,25 L x 6 u.", precio: 30000 },
    { codigo: "BEB-002-02", detalle: "Pack 1,5 L x 8 u.", precio: 30000 },
  ]},
  { codigo: "BEB-003", nombre: "Sprite", foto: "img/beb-003-sprite.webp", presentaciones: [
    { codigo: "BEB-003-01", detalle: "Pack 2,25 L x 6 u.", precio: 30000 },
    { codigo: "BEB-003-02", detalle: "Pack 1,5 L x 8 u.", precio: 30000 },
  ]},
  { codigo: "BEB-004", nombre: "7Up", foto: "img/beb-004-7up-pack.webp", presentaciones: [
    { codigo: "BEB-004-01", detalle: "Pack 2 L x 8 u.", precio: 28000 },
  ]},
  { codigo: "BEB-005", nombre: "Jugo Baggio exprimido naranja", foto: "img/beb-005-jugo-baggio-naranja.webp", presentaciones: [
    { codigo: "BEB-005-01", detalle: "Pack 1 L x 12 u.", precio: 35000 },
  ]},
  { codigo: "BEB-006", nombre: "Agua Villavicencio", foto: "img/beb-006-agua-villavicencio.webp", presentaciones: [
    { codigo: "BEB-006-01", detalle: "Pack 2 L x 6 u.", precio: 13000 },
  ]},

  // ── PAP · Papelería (lista real, 14/10/2026) ──────────────────
  // Sin foto todavía. Pendiente: Vasos de postre x 10 (falta el precio) → será PAP-016.
  { codigo: "PAP-001", nombre: "Bandejas de cartón (precio por unidad)", foto: "img/pap-001-bandejas-carton.webp", presentaciones: [
    { codigo: "PAP-001-01", detalle: "N° 1", precio: 30 },
    { codigo: "PAP-001-02", detalle: "N° 2", precio: 40 },
    { codigo: "PAP-001-03", detalle: "N° 3", precio: 50 },
    { codigo: "PAP-001-04", detalle: "N° 4", precio: 60 },
    { codigo: "PAP-001-05", detalle: "N° 5", precio: 70 },
    { codigo: "PAP-001-06", detalle: "N° 6", precio: 80 },
    { codigo: "PAP-001-07", detalle: "N° 13", precio: 70 },
    { codigo: "PAP-001-08", detalle: "N° 13½", precio: 80 },
    { codigo: "PAP-001-09", detalle: "N° 14", precio: 100 },
  ]},
  { codigo: "PAP-002", nombre: "Bandeja de cartón para freidora", foto: "img/pap-002-bandeja-freidora.webp", presentaciones: [
    { codigo: "PAP-002-01", detalle: "Unidad", precio: 450 },
  ]},
  { codigo: "PAP-003", nombre: "Bandejas para microondas (precio por unidad)", foto: "img/pap-003-bandejas-microondas.webp", presentaciones: [
    { codigo: "PAP-003-01", detalle: "N° 102", precio: 100 },
    { codigo: "PAP-003-02", detalle: "N° 103", precio: 130 },
    { codigo: "PAP-003-03", detalle: "N° 105", precio: 180 },
  ]},
  { codigo: "PAP-004", nombre: "Bandejas de fibro fácil", foto: "img/pap-004-bandejas-fibro-facil.webp", presentaciones: [
    { codigo: "PAP-004-01", detalle: "Rectangular para 3 kg", precio: 1900 },
    { codigo: "PAP-004-02", detalle: "Redonda 25 cm", precio: 1600 },
    { codigo: "PAP-004-03", detalle: "Redonda 28 cm", precio: 1800 },
  ]},
  { codigo: "PAP-005", nombre: "Pirotines", foto: "img/pap-005-pirotines.webp", presentaciones: [
    { codigo: "PAP-005-01", detalle: "N° 6 · x 20 u.", precio: 500 },
    { codigo: "PAP-005-02", detalle: "N° 8 · x 20 u.", precio: 800 },
    { codigo: "PAP-005-03", detalle: "N° 10 · x 20 u.", precio: 1000 },
  ]},
  { codigo: "PAP-006", nombre: "Molde de pan dulce (por unidad)", foto: "img/pap-006-moldes-pan-dulce.webp", presentaciones: [
    { codigo: "PAP-006-01", detalle: "100 g", precio: 125 },
    { codigo: "PAP-006-02", detalle: "¼ kg", precio: 140 },
    { codigo: "PAP-006-03", detalle: "½ kg", precio: 165 },
    { codigo: "PAP-006-04", detalle: "¾ kg", precio: 190 },
    { codigo: "PAP-006-05", detalle: "1 kg", precio: 200 },
  ]},
  { codigo: "PAP-007", nombre: "Moldes de pan dulce x 10", foto: "img/pap-006-moldes-pan-dulce.webp", presentaciones: [
    { codigo: "PAP-007-01", detalle: "100 g · x 10 u.", precio: 1100 },
    { codigo: "PAP-007-02", detalle: "¼ kg · x 10 u.", precio: 1300 },
    { codigo: "PAP-007-03", detalle: "½ kg · x 10 u.", precio: 1500 },
    { codigo: "PAP-007-04", detalle: "¾ kg · x 10 u.", precio: 1800 },
    { codigo: "PAP-007-05", detalle: "1 kg · x 10 u.", precio: 1900 },
  ]},
  { codigo: "PAP-008", nombre: "Platos plásticos blancos", foto: "img/pap-008-platos-plasticos.webp", presentaciones: [
    { codigo: "PAP-008-01", detalle: "Pack x 50 u.", precio: 4800 },
  ]},
  { codigo: "PAP-009", nombre: "Servilletas 33 × 33 cm", foto: "img/pap-009-servilletas.webp", presentaciones: [
    { codigo: "PAP-009-01", detalle: "Pack x 80 u.", precio: 1800 },
  ]},
  { codigo: "PAP-010", nombre: "Manteles", foto: "img/pap-010-manteles.webp", presentaciones: [
    { codigo: "PAP-010-01", detalle: "Metalizado · 1,37 × 1,83 m", precio: 2500 },
    { codigo: "PAP-010-02", detalle: "Plástico · 1,20 × 1,80 m", precio: 2500 },
  ]},
  { codigo: "PAP-011", nombre: "Vasos shot", foto: "img/pap-011-vasos-shot.webp", presentaciones: [
    { codigo: "PAP-011-01", detalle: "Pack x 10 u.", precio: 1200 },
  ]},
  { codigo: "PAP-012", nombre: "Bolsas Kraft", foto: "img/pap-012-bolsas-kraft.webp", presentaciones: [
    { codigo: "PAP-012-01", detalle: "25 × 38 × 12 cm · x 50 u.", precio: 9900 },
    { codigo: "PAP-012-02", detalle: "20 × 30 × 9 cm · x 50 u.", precio: 6900 },
  ]},
  { codigo: "PAP-013", nombre: "Bolsas de cartón colores varios", foto: "img/pap-013-bolsas-carton-colores.webp", presentaciones: [
    { codigo: "PAP-013-01", detalle: "Pack x 10 u.", precio: 2500 },
  ]},
  { codigo: "PAP-014", nombre: "Bolsas de polietileno", foto: "img/pap-014-bolsas-polietileno.webp", presentaciones: [
    { codigo: "PAP-014-01", detalle: "10 × 15 cm · x 200 u.", precio: 2600 },
    { codigo: "PAP-014-02", detalle: "15 × 25 cm · x 100 u.", precio: 2900 },
    { codigo: "PAP-014-03", detalle: "20 × 30 cm · x 100 u.", precio: 3500 },
    { codigo: "PAP-014-04", detalle: "25 × 35 cm · x 100 u.", precio: 4700 },
  ]},
  { codigo: "PAP-015", nombre: "Bolsas camiseta económicas", foto: "img/pap-015-bolsas-camiseta.webp", presentaciones: [
    { codigo: "PAP-015-01", detalle: "30 × 40 cm · x 100 u.", precio: 1900 },
    { codigo: "PAP-015-02", detalle: "40 × 50 cm · x 100 u.", precio: 2300 },
    { codigo: "PAP-015-03", detalle: "50 × 60 cm · x 100 u.", precio: 7500 },
  ]},

  // ── TEM · Temporada y disfraces (fotos del local, 15/10/2026) ───────────
  // null = "Precio a confirmar". Sin foto todavía los que no tienen "foto".
  { codigo: "TEM-001", nombre: "Tutú con glitter", foto: "img/tem-001-tutus.webp",
    colores: ["Negro", "Blanco", "Rojo"], presentaciones: [
    { codigo: "TEM-001-01", detalle: "Unidad · talle a confirmar", precio: null },
  ]},
  { codigo: "TEM-002", nombre: "Alas de mariposa", foto: "img/tem-002-alas.webp",
    colores: ["Negra con luz LED", "Roja con luz LED", "Roja", "Rosa"], presentaciones: [
    { codigo: "TEM-002-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "TEM-003", nombre: "Alas de vaquita de San Antonio", presentaciones: [
    { codigo: "TEM-003-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "TEM-004", nombre: "Alas de abeja", presentaciones: [
    { codigo: "TEM-004-01", detalle: "Unidad", precio: null },
  ]},
  { codigo: "TEM-005", nombre: "Capa de Drácula infantil", presentaciones: [
    { codigo: "TEM-005-01", detalle: "Unidad", precio: null },
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
  { codigo: "DES-002-02", precio: 2300, hasta: "2026-11-30", texto: "Llevá de colores combinados" },
];
