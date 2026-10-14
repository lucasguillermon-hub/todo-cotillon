// Carrusel de ofertas: se usa en index.html y en tienda.html.
// Los datos salen de productos.js (OFERTAS). Este archivo no hace falta tocarlo para cargar ofertas.
(function () {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const plata = n => "$" + n.toLocaleString("es-AR");
  const fecha = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

  const presentaciones = {};
  for (const p of PRODUCTOS) if (!p.oculto) for (const pr of p.presentaciones) presentaciones[pr.codigo] = { producto: p, pres: pr };

  // Ofertas vigentes hoy (según la fecha del celular/compu del cliente)
  function activas() {
    const hoy = fecha(new Date());
    const lista = typeof OFERTAS === "undefined" ? [] : OFERTAS;
    return lista.filter(o => presentaciones[o.codigo] && o.precio < presentaciones[o.codigo].pres.precio &&
      (!o.desde || o.desde <= hoy) && (!o.hasta || hoy <= o.hasta));
  }
  const porCodigo = () => Object.fromEntries(activas().map(o => [o.codigo, o]));

  function plazo(hasta) {
    if (!hasta) return "";
    const dias = Math.round((new Date(hasta + "T12:00:00") - new Date(fecha(new Date()) + "T12:00:00")) / 864e5);
    if (dias <= 0) return "¡Último día!";
    if (dias === 1) return "Termina mañana";
    if (dias <= 7) return `Quedan ${dias} días`;
    const d = new Date(hasta + "T12:00:00");
    return `Hasta el ${d.getDate()}/${d.getMonth() + 1}`;
  }

  // modo "portada": el botón lleva a la tienda y agrega el producto. modo "tienda": agrega directo.
  function render(cont, modo) {
    const lista = activas();
    if (!cont) return;
    if (!lista.length) { cont.hidden = true; return; }
    cont.hidden = false;
    const tarjetas = lista.map(o => {
      const { producto: p, pres } = presentaciones[o.codigo];
      const pct = Math.round((1 - o.precio / pres.precio) * 100);
      const boton = modo === "tienda"
        ? `<button type="button" class="of-btn" data-mas="${o.codigo}">Agregar al carrito</button>`
        : `<a class="of-btn" href="tienda.html?agregar=${o.codigo}">Lo quiero</a>`;
      return `<article class="of-card">
        <span class="of-pct">-${pct}%</span>
        ${p.foto ? `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">` : `<div class="of-sin-foto" role="img" aria-label="${esc(p.nombre)}">${esc((CATEGORIAS.find(c => c.codigo === p.codigo.slice(0, 3)) || {}).icono || "🎉")}</div>`}
        <div class="of-cuerpo">
          <span class="of-nombre">${esc(p.nombre)}</span>
          <span class="of-det">${esc(pres.detalle)}</span>
          ${o.texto ? `<span class="of-texto">${esc(o.texto)}</span>` : ""}
          <span class="of-precios"><span class="of-antes">${plata(pres.precio)}</span><span class="of-ahora">${plata(o.precio)}</span></span>
          <span class="of-plazo">${plazo(o.hasta)}</span>
          ${boton}
        </div>
      </article>`;
    }).join("");
    cont.innerHTML = `<div class="of-in">
      <div class="of-cab">
        <div><span class="of-sub">SOLO POR TIEMPO LIMITADO</span><h2><span class="of-fuego" aria-hidden="true">🔥</span> Ofertas de la semana</h2></div>
        <div class="of-flechas"><button type="button" class="of-flecha" data-dir="-1" aria-label="Ofertas anteriores">‹</button><button type="button" class="of-flecha" data-dir="1" aria-label="Más ofertas">›</button></div>
      </div>
      <div class="of-pista" tabindex="0" aria-label="Ofertas">${tarjetas}</div>
    </div>`;
    mover(cont.querySelector(".of-pista"), cont);
  }

  // Avanza solo cada 3,5 s; se frena cuando el cliente toca, pasa el mouse o mira otra cosa.
  function mover(pista, cont) {
    const paso = () => {
      const c = pista.firstElementChild;
      return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(pista).columnGap || 16) : 300;
    };
    const ir = dir => {
      const fin = pista.scrollLeft + pista.clientWidth >= pista.scrollWidth - 8;
      if (dir > 0 && fin) pista.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir < 0 && pista.scrollLeft <= 8) pista.scrollTo({ left: pista.scrollWidth, behavior: "smooth" });
      else pista.scrollBy({ left: dir * paso(), behavior: "smooth" });
    };
    let quieto = false, hasta = 0, visible = true;
    const pausar = ms => { hasta = Date.now() + ms; };
    cont.querySelectorAll(".of-flecha").forEach(b => b.addEventListener("click", () => { ir(+b.dataset.dir); pausar(8000); }));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pista.addEventListener("pointerenter", () => { quieto = true; });
    pista.addEventListener("pointerleave", () => { quieto = false; });
    pista.addEventListener("focusin", () => { quieto = true; });
    pista.addEventListener("focusout", () => { quieto = false; });
    pista.addEventListener("touchstart", () => pausar(7000), { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(e => { visible = e[0].isIntersecting; }).observe(pista);
    setInterval(() => { if (!quieto && visible && !document.hidden && Date.now() > hasta) ir(1); }, 3500);
  }

  window.Ofertas = { activas, porCodigo, render };
})();
