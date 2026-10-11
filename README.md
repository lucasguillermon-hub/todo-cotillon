# Todo Cotillón — sitio web

Página web de **Todo Cotillón**, cotillón en Villa Domínico, Avellaneda
(Centenario Uruguayo 1543 · WhatsApp 11 3452-2787 · Instagram [@todocotillon2020](https://www.instagram.com/todocotillon2020)).

Es un sitio estático: un solo `index.html` y las fotos en `img/` (formato `.webp`).
No necesita instalar nada ni compilar.

Publicado en Cloudflare Pages: https://todo-cotillon.pages.dev
Cada cambio que se sube a la rama `main` de este repo se publica solo en 1–2 minutos.

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
| Bebidas / mayorista | `id="bebidas"` / `id="mayorista"` |
| Dirección, horarios, contacto | `id="ubicacion"` y `<footer` |
| Número de WhatsApp | `wa.me/5491134522787` (reemplazar en todos lados con Ctrl+H) |
| Título y descripción para Google | `<title>` y `meta name="description"` al principio |

## Fotos

- Van en `img/`, en formato `.webp` (más livianas). Se pueden convertir gratis en https://squoosh.app
- Para cambiar una foto, subí una nueva con **el mismo nombre** y se reemplaza sola,
  o subí una con otro nombre y cambiá el `src="img/..."` correspondiente.
- Nombres en minúscula, sin espacios ni tildes (ej: `combo-navidad.webp`).

## Dominio propio

Para usar, por ejemplo, `todocotillon.com.ar`: en Cloudflare → Workers & Pages →
`todo-cotillon` → **Custom domains** → *Set up a custom domain* y seguir los pasos
(el dominio `.com.ar` se registra en NIC Argentina y ahí se apuntan los DNS a Cloudflare).
