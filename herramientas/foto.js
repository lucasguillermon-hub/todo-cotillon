// Carga la foto de un producto: la recorta cuadrada a 800×800, la pasa a .webp en img/
// y la asigna al producto en productos.js.
// Uso, desde la carpeta del sitio:  node herramientas/foto.js <imagen> <CÓDIGO> <nombre-corto>
// Ejemplo:  node herramientas/foto.js ~/Descargas/grajeas.jpg REP-002 grajeas   → img/rep-002-grajeas.webp
// Necesita sharp (npm i sharp) en algún node_modules alcanzable o en NODE_PATH.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const [origen, codigo, slug] = process.argv.slice(2);
if (!origen || !/^[A-Z]{3}-\d{3}$/.test(codigo || "") || !slug) {
  console.error("Uso: node herramientas/foto.js <imagen> <CÓDIGO tipo REP-002> <nombre-corto>");
  process.exit(1);
}
const raiz = path.join(__dirname, "..");
const rel = `img/${codigo.toLowerCase()}-${slug}.webp`;

(async () => {
  await sharp(origen).resize(800, 800, { fit: "cover" }).webp({ quality: 82 }).toFile(path.join(raiz, rel));
  const archivo = path.join(raiz, "productos.js");
  let h = fs.readFileSync(archivo, "utf8");
  // La foto va justo después del nombre (sirve aunque el producto tenga colores u otros campos)
  const re = new RegExp(`(\\{ codigo: "${codigo}", nombre: (?:"(?:[^"\\\\]|\\\\.)*"))(, foto: "[^"]*")?`);
  const m = h.match(re);
  if (!m) { console.error(`No encontré el producto ${codigo} en productos.js`); process.exit(1); }
  const vieja = m[2] ? m[2].slice(9, -1) : null; // ', foto: "img/..."' → 'img/...'
  h = h.replace(re, `$1, foto: "${rel}"`);
  fs.writeFileSync(archivo, h);
  const kb = Math.round(fs.statSync(path.join(raiz, rel)).size / 1024);
  console.log(`✓ ${codigo} → ${rel} (${kb} KB)`);
  // Si se reemplazó una foto con otro nombre y ningún otro producto la usa, se borra
  if (vieja && vieja !== rel && !h.includes(`"${vieja}"`) && fs.existsSync(path.join(raiz, vieja))) {
    fs.unlinkSync(path.join(raiz, vieja));
    console.log(`  borrada la foto anterior ${vieja}`);
  }
})().catch(e => { console.error(e.message); process.exit(1); });
