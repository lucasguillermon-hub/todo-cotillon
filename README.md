# Todo Cotillón — sitio web

Página web de **Todo Cotillón**, cotillón en Villa Domínico, Avellaneda
(Centenario Uruguayo 1543 · WhatsApp 11 3452-2786 · Instagram [@todocotillon2020](https://www.instagram.com/todocotillon2020)).

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
| Banner de temporada | se cambia en **`temporadas.js`** (ver abajo) |
| Categorías de productos | `id="categorias"` |
| Bebidas | `id="bebidas"` |
| Dirección, horarios, contacto | `id="ubicacion"` y `<footer` |
| Mensaje que abre cada botón de WhatsApp | atributo `data-wsp="..."` del botón |
| Número de WhatsApp | `5491134522786` (reemplazar en todos lados con Ctrl+H, también en `tienda.html`) |
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
código, subtotal, total, nombre, fecha y comentarios) dirigido al 11 3452-2786. El número está al
principio del `<script>` de `tienda.html` (`WHATSAPP`).

**Entrega y pago:** en el carrito el cliente elige retiro en el local, envío a domicilio (Avellaneda y alrededores; pide dirección;
el envío se cobra aparte) o envío por mensajería (pide localidad y CP), y el medio de pago (efectivo,
transferencia, tarjeta de crédito, débito o QR; sin recargo con tarjetas). Las opciones están en `ENTREGAS` y `PAGOS` al principio
del `<script>` de `tienda.html`. En la portada se muestran en "Comprar es fácil" (`id="envios-pagos"`).

## Ofertas (carrusel)

Las ofertas se cargan al final de **`productos.js`**, en la lista `OFERTAS`:

```js
{ codigo: "GLO-001-02", precio: 5200, hasta: "2026-10-31", texto: "Ideal para arcos" },
```

- `codigo`: la presentación en oferta. `precio`: el precio de oferta (menor al normal).
- `desde` / `hasta` (opcionales, AAAA-MM-DD): la oferta aparece y desaparece sola en esas fechas.
- Se muestran en un carrusel que se mueve solo en la portada y en la tienda, con el % de descuento y
  cuánto falta para que termine. El precio de oferta se aplica solo en el carrito y en el pedido.
- Si no hay ninguna oferta vigente, la sección se oculta sola.

## Banner de temporada (`temporadas.js`)

El banner oscuro de la portada (y la tarjeta de temporada en "¿Qué estás buscando?") cambia solo
según la fecha, todos los años:

| Temporada | Fechas |
|---|---|
| Fiestas de fin de año | 16/12 al 6/1 |
| Carnaval | 1/2 al 5/3 |
| Día del Niño | 20/7 al 21/8 |
| Primavera y Día del Estudiante | 10/9 al 21/9 |
| Halloween | 1/10 al 31/10 |
| Egresados y fin de curso | 1/11 al 15/12 |
| General ("Armamos tu cumple completo") | el resto del año |

Cada temporada tiene foto, título, texto, botón y el mensaje de WhatsApp que abre ese botón.
Carnaval y el Día del Niño cambian de fecha cada año: conviene revisarlas en enero.

## Mensajes de WhatsApp ya escritos

Cada botón de WhatsApp de la portada abre el chat con un mensaje ya escrito según dónde se tocó
(combo, categoría, bebidas, etc.). El texto está en el atributo `data-wsp` de cada botón; para
cambiarlo se edita ese texto (`&#10;` es un salto de línea).

## Fotos

- Van en `img/`, en formato `.webp` (más livianas). Se pueden convertir gratis en https://squoosh.app
- Para cambiar una foto, subí una nueva con **el mismo nombre** y se reemplaza sola,
  o subí una con otro nombre y cambiá el `src="img/..."` correspondiente.
- Nombres en minúscula, sin espacios ni tildes (ej: `combo-navidad.webp`).

## Dominio propio

Para usar, por ejemplo, `todocotillon.com.ar`: en Cloudflare → Workers & Pages →
`todo-cotillon` → **Custom domains** → *Set up a custom domain* y seguir los pasos
(el dominio `.com.ar` se registra en NIC Argentina y ahí se apuntan los DNS a Cloudflare).
