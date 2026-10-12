// BANNER DE TEMPORADA (portada, debajo de los combos).
// Se elige solo según la fecha de hoy y se repite todos los años.
// - desde / hasta: "MM-DD" (mes-día), ambas incluidas. Si "desde" es mayor que "hasta"
//   (ej. "12-16" a "01-06") la temporada cruza el año nuevo.
// - Si hoy no cae en ninguna, se muestra la temporada "general" (la que no tiene fechas).
// - wsp: mensaje que se escribe solo cuando el cliente toca el botón.
// - tarjeta: cómo se ve esa temporada en la grilla de categorías ("Temporada y disfraces").
// Fechas que se mueven cada año (Carnaval, Día del Niño): revisarlas a principio de año.

const TEMPORADAS = [
  {
    nombre: "Carnaval", desde: "02-01", hasta: "03-05",
    foto: "img/carnaval.webp", alt: "Decoración de carnaval: máscaras venecianas, plumas, serpentinas y papel picado",
    titulo: "Llegó el Carnaval",
    texto: "Espuma, antifaces, plumas, serpentinas y papel picado para los festejos de Carnaval. Armamos tu kit para la murga, el club o el cumple.",
    boton: "Quiero mi cotillón de Carnaval",
    wsp: "¡Hola Todo Cotillón! 👋 Quiero cotillón para Carnaval. ¿Qué tienen?\n👥 Para cuántas personas: ",
    tarjeta: { titulo: "Carnaval", texto: "Espuma, antifaces y serpentinas" },
  },
  {
    nombre: "Día del Niño", desde: "07-20", hasta: "08-21",
    foto: "img/combo-infantil.webp", alt: "Kit de cumpleaños infantil con bolsitas de sorpresitas, piñata estrella, platos, vasos y globos",
    titulo: "Se viene el Día del Niño",
    texto: "Piñatas, sorpresitas, golosinas y globos para festejar a los más chicos. Ideal para colegios, clubes y festejos del barrio.",
    boton: "Armá tu pedido",
    wsp: "¡Hola Todo Cotillón! 👋 Quiero armar un pedido para el Día del Niño.\n👧 Cantidad de chicos: \n🎁 Qué necesito: ",
    tarjeta: { titulo: "Día del Niño", texto: "Sorpresitas, piñatas y golosinas" },
  },
  {
    nombre: "Primavera y Día del Estudiante", desde: "09-10", hasta: "09-21",
    foto: "img/cotillon-carioca.webp", alt: "Cotillón carioca: collar hawaiano, vinchas con plumas, anteojos divertidos y antifaces",
    titulo: "Primavera y Día del Estudiante",
    texto: "Collares, vinchas, antifaces, globos y todo el cotillón para el picnic y la fiesta del 21 de septiembre.",
    boton: "Quiero mi cotillón",
    wsp: "¡Hola Todo Cotillón! 👋 Quiero cotillón para el Día de la Primavera.\n👥 Para cuántos: ",
    tarjeta: { titulo: "Día de la Primavera", texto: "Collares, vinchas y antifaces" },
  },
  {
    nombre: "Halloween", desde: "10-01", hasta: "10-31",
    foto: "img/halloween-banner.webp", alt: "Kit de Halloween con calabazas iluminadas, sombrero de bruja, murciélagos de papel, maquillaje y caramelos",
    titulo: "Llegó Halloween",
    texto: "Ya llegaron los kits de Halloween: disfraces, maquillaje, calabazas y deco para la noche del 31. Reservá el tuyo antes de que se agote.",
    boton: "Quiero mi kit",
    wsp: "¡Hola Todo Cotillón! 🎃 Quiero reservar un kit de Halloween. ¿Qué opciones tienen?",
    tarjeta: { titulo: "Kits de Halloween", texto: "Todo para la noche del 31", foto: "img/kit-halloween.webp" },
  },
  {
    nombre: "Egresados y fin de curso", desde: "11-01", hasta: "12-15",
    foto: "img/combo-egresados.webp", alt: "Cotillón para egresados con gorros, banderines, espuma, papel picado y globos",
    titulo: "Temporada de egresados",
    texto: "Gorros, banderines, espuma, papel picado y globos con los colores del curso. Para la fiesta de egresados y los actos de fin de año.",
    boton: "Pedí presupuesto para tu curso",
    wsp: "¡Hola Todo Cotillón! 🎓 Quiero presupuesto de cotillón para egresados.\n🏫 Curso / colegio: \n👥 Cantidad de chicos: \n🎨 Colores: ",
    tarjeta: { titulo: "Egresados", texto: "Gorros, banderines y espuma" },
  },
  {
    nombre: "Fiestas de fin de año", desde: "12-16", hasta: "01-06",
    foto: "img/combo-15.webp", alt: "Cotillón luminoso: vinchas con luces, pulseras flúor, antifaces y pistolas de burbujas",
    titulo: "Fiestas de fin de año",
    texto: "Cotillón luminoso, vinchas, antifaces, pulseras flúor y pistolas de burbujas para recibir el Año Nuevo. Encargalo con tiempo.",
    boton: "Quiero mi cotillón de Año Nuevo",
    wsp: "¡Hola Todo Cotillón! 🥂 Quiero cotillón para las fiestas de fin de año.\n👥 Para cuántas personas: ",
    tarjeta: { titulo: "Año Nuevo", texto: "Cotillón luminoso y para brindar" },
  },
  {
    nombre: "general",
    foto: "img/globos-decoracion.webp", alt: "Arco de globos rosa, lila y blanco decorando una mesa dulce",
    titulo: "Armamos tu cumple completo",
    texto: "Contanos la temática y la cantidad de invitados y te preparamos todo: globos, piñata, descartables, sorpresitas y la torta.",
    boton: "Contanos qué festejás",
    wsp: "¡Hola Todo Cotillón! 👋 Quiero armar un cumple.\n🎉 Temática: \n📅 Fecha: \n👥 Invitados: ",
    tarjeta: { titulo: "Fechas especiales", texto: "Carnaval, Halloween, egresados y más", foto: "img/carnaval.webp" },
  },
];

// Devuelve la temporada de hoy (o la general)
function temporadaDeHoy(hoy = new Date()) {
  const md = String(hoy.getMonth() + 1).padStart(2, "0") + "-" + String(hoy.getDate()).padStart(2, "0");
  const dentro = t => t.desde <= t.hasta ? (t.desde <= md && md <= t.hasta) : (md >= t.desde || md <= t.hasta);
  return TEMPORADAS.find(t => t.desde && t.hasta && dentro(t)) || TEMPORADAS.find(t => !t.desde);
}
