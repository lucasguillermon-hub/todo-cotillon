# Todo Cotillón — sitio web

Página web de **Todo Cotillón**, cotillón en Villa Domínico, Avellaneda
(Centenario Uruguayo 1543 · WhatsApp 11 3452-2787 · Instagram [@todocotillon2020](https://www.instagram.com/todocotillon2020)).

Es un sitio estático: `index.html` (página principal), `tienda.html` + `productos.js` (tienda con carrito)
y las fotos en `img/` (formato `.webp`).
No necesita instalar nada ni compilar.

Publicado en Cloudflare Workers: https://todo-cotillon.lucasguillermon.workers.dev
(configuración en `wrangler.jsonc`; para publicar a mano: `npx wrangler deploy`).
También en Cloudflare Pages: https://todo-cotillon.pages.dev — se actualiza solo con cada cambio en `main`.

## Cómo editar

**Desde la web de GitHub (lo más fácil):**
abrí `index.html` → ícono del lápiz (Edit) → hacé el cambio → **Commit changes**.

**Desde la compu:** editá los archivos y después:

```bash
git add .
git commit -m "Describe el cambio"
git push
```

Para verlo antes de subirlo, abrí `index.html` con doble clic en el navegador.

## Dónde está cada cosa en `index.html`

Buscá (Ctrl+F) estos textos:

| Qué querés cambiar | Buscá |
|---|---|
| Combos y sus precios | `id="combos"` — cada combo es un `<article>`; el precio es la línea `Consultá precio` |
| Banner de temporada (Halloween) | `Llegó Halloween` |
| Categorías de productos | `id="categorias"` |
| Bebidas | `id="bebidas"` |
| Dirección, horarios, contacto | `id="ubicacion"` y `<footer` |
| Número de WhatsApp | `wa.me/5491134522787` (reemplazar en todos lados con Ctrl+H) |
| Título y descripción para Google | `<title>` y `meta name="description"` al principio |

## Tienda y carrito (`tienda.html` + `productos.js`)

El catálogo está en **`productos.js`** y es lo único que hay que tocar para cargar o cambiar productos.
Los productos que hay ahora son **de ejemplo**. No se maneja stock.

**Códigos:**

| Nivel | Formato | Ejemplo |
|---|---|---|
| Categoría | 3 letras | `GLO` (Globos) |
| Producto | categoría + número de 3 cifras | `GLO-001` Globos perlados 12" |
| Presentación | producto + número de 2 cifras | `GLO-001-02` Bolsa x 50 u. — $6.500 |

Cada presentación tiene su propio código y precio; es lo que el cliente agrega al carrito y lo que
aparece en el pedido. Un código **no se reutiliza nunca**: si algo se deja de vender, se marca
`oculto: true` en el producto (deja de mostrarse pero conserva su código).

Categorías actuales: GLO Globos · COT Cotillón · DES Descartables · REP Repostería ·
GOL Golosinas y snacks · BEB Bebidas · PAP Papelería · TEM Temporada y disfraces.

**Revisar y ver el listado completo:** `node herramientas/catalogo.js` controla que no haya códigos
repetidos, precios mal cargados o fotos que falten, y genera **`catalogo.csv`** (se abre con Excel o
Google Sheets, y GitHub lo muestra como tabla).

**Pedido por WhatsApp:** el carrito no cobra ni guarda nada en un servidor. Cuando el cliente toca
"Enviar pedido por WhatsApp" se abre WhatsApp con el pedido armado (cantidad, producto, presentación,
código, subtotal, total, nombre, fecha y comentarios) dirigido al 11 3452-2787. El número está al
principio del `<script>` de `tienda.html` (`WHATSAPP`).

## Fotos

- Van en `img/`, en formato `.webp` (más livianas). Se pueden convertir gratis en https://squoosh.app
- Para cambiar una foto, subí una nueva con **el mismo nombre** y se reemplaza sola,
  o subí una con otro nombre y cambiá el `src="img/..."` correspondiente.
- Nombres en minúscula, sin espacios ni tildes (ej: `combo-navidad.webp`).

## Dominio propio

Para usar, por ejemplo, `todocotillon.com.ar`: en Cloudflare → Workers & Pages →
`todo-cotillon` → **Custom domains** → *Set up a custom domain* y seguir los pasos
(el dominio `.com.ar` se registra en NIC Argentina y ahí se apuntan los DNS a Cloudflare).
