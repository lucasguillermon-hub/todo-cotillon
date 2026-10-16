// Revisa productos.js y genera catalogo.csv (para ver el listado completo en Excel, Google Sheets o GitHub).
// Uso, desde la carpeta del sitio:  node herramientas/catalogo.js
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const raiz = path.join(__dirname, "..");
const ctx = {};
vm.runInNewContext(fs.readFileSync(path.join(raiz, "productos.js"), "utf8") + "\n;this.C = CATEGORIAS; this.P = PRODUCTOS; this.O = typeof OFERTAS === 'undefined' ? [] : OFERTAS;", ctx);
const { C: CATEGORIAS, P: PRODUCTOS, O: OFERTAS } = ctx;

const errores = [];
const visto = new Set();
const unico = (codigo, donde) => { if (visto.has(codigo)) errores.push(`Código repetido: ${codigo} (${donde})`); visto.add(codigo); };

const preciosTodos = {};
for (const p of PRODUCTOS) for (const pr of p.presentaciones || []) preciosTodos[pr.codigo] = pr.precio;
const cats = {};
for (const c of CATEGORIAS) {
  if (!/^[A-Z]{3}$/.test(c.codigo)) errores.push(`Categoría "${c.nombre}": el código debe ser 3 letras mayúsculas (tiene "${c.codigo}")`);
  if (!c.nombre) errores.push(`Categoría ${c.codigo}: falta el nombre`);
  unico(c.codigo, "categoría");
  cats[c.codigo] = c.nombre;
}

const filas = [];
for (const p of PRODUCTOS) {
  const donde = `${p.codigo || "?"} ${p.nombre || ""}`.trim();
  if (!/^[A-Z]{3}-\d{3}$/.test(p.codigo || "")) errores.push(`${donde}: el código de producto debe ser tipo GLO-001`);
  else if (!cats[p.codigo.slice(0, 3)]) errores.push(`${donde}: no existe la categoría ${p.codigo.slice(0, 3)}`);
  unico(p.codigo, "producto");
  if (!p.nombre) errores.push(`${donde}: falta el nombre`);
  if (p.foto && !fs.existsSync(path.join(raiz, p.foto))) errores.push(`${donde}: no existe la foto ${p.foto}`);
  if (p.colores !== undefined && (!Array.isArray(p.colores) || !p.colores.length || p.colores.some(c => typeof c !== "string" || !c.trim() || c.includes("|")))) errores.push(`${donde}: colores debe ser una lista de nombres (sin el caracter |)`);
  if (!Array.isArray(p.presentaciones) || !p.presentaciones.length) { errores.push(`${donde}: no tiene presentaciones`); continue; }
  for (const pr of p.presentaciones) {
    const d = `${pr.codigo || "?"} (${p.nombre})`;
    if (!new RegExp(`^${p.codigo}-\\d{2}$`).test(pr.codigo || "")) errores.push(`${d}: el código de presentación debe ser ${p.codigo}-01, -02…`);
    unico(pr.codigo, "presentación");
    if (!pr.detalle) errores.push(`${d}: falta el detalle de la presentación`);
    if (pr.precio !== null && (!Number.isInteger(pr.precio) || pr.precio <= 0)) errores.push(`${d}: precio inválido (${pr.precio}); va en pesos, sin puntos, o null si está a confirmar`);
    if (pr.incluye) {
      const faltan = pr.incluye.filter(c => !(c in preciosTodos));
      if (faltan.length) errores.push(`${d}: incluye códigos que no existen (${faltan.join(", ")})`);
      else if (pr.incluye.every(c => preciosTodos[c] !== null) && !pr.incluye.some(c => c.startsWith("COM-"))) {
        const suma = pr.incluye.reduce((s, c) => s + preciosTodos[c], 0);
        if (pr.precio !== suma && pr.incluye.length >= 3) errores.push(`${d}: el precio por separado debería ser ${suma} (suma de lo que incluye), tiene ${pr.precio}`);
      }
    }
    filas.push([cats[p.codigo.slice(0, 3)] || "?", pr.codigo, p.nombre, pr.detalle, pr.precio === null ? "a confirmar" : pr.precio, p.foto, p.oculto ? "no" : "sí"]);
  }
}

// Ofertas
const precios = {};
for (const p of PRODUCTOS) for (const pr of p.presentaciones || []) precios[pr.codigo] = pr.precio;
const fechaOk = f => !f || (/^\d{4}-\d{2}-\d{2}$/.test(f) && !isNaN(new Date(f)));
const hoy = new Date().toISOString().slice(0, 10);
const vistas = new Set();
let vigentes = 0;
for (const o of OFERTAS) {
  const d = `Oferta ${o.codigo || "?"}`;
  if (!(o.codigo in precios)) { errores.push(`${d}: no existe esa presentación en el catálogo`); continue; }
  if (vistas.has(o.codigo)) errores.push(`${d}: está cargada dos veces`);
  vistas.add(o.codigo);
  if (!Number.isInteger(o.precio) || o.precio <= 0) errores.push(`${d}: precio inválido (${o.precio})`);
  else if (precios[o.codigo] === null || o.precio > precios[o.codigo]) errores.push(`${d}: el precio de oferta (${o.precio}) es mayor al normal (${precios[o.codigo]})`);
  if (!fechaOk(o.desde) || !fechaOk(o.hasta)) errores.push(`${d}: las fechas van como AAAA-MM-DD`);
  else if (o.desde && o.hasta && o.desde > o.hasta) errores.push(`${d}: "desde" es posterior a "hasta"`);
  if ((!o.desde || o.desde <= hoy) && (!o.hasta || hoy <= o.hasta)) vigentes++;
}

const csv = (v) => /[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
const salida = [["Categoría", "Código", "Producto", "Presentación", "Precio", "Foto", "Visible"], ...filas]
  .map(f => f.map(csv).join(",")).join("\n") + "\n";
fs.writeFileSync(path.join(raiz, "catalogo.csv"), "﻿" + salida);

const visibles = PRODUCTOS.filter(p => !p.oculto);
console.log(`${CATEGORIAS.length} categorías · ${PRODUCTOS.length} productos (${visibles.length} visibles) · ${filas.length} presentaciones`);
console.log(`${OFERTAS.length} ofertas cargadas (${vigentes} vigentes hoy)`);
console.log("catalogo.csv actualizado");
if (errores.length) {
  console.log(`\n${errores.length} error(es):\n- ` + errores.join("\n- "));
  process.exit(1);
}
console.log("Sin errores ✔");
