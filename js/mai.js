/* ==========================================================
   Lumy · Calendario con cambio de mes
   Genera los días del mes como radios + etiquetas, para que
   sigan funcionando con los estilos de fecha.css
   ========================================================== */
(() => {
  'use strict';

  const MESES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Fecha de referencia: hoy. Los días anteriores no se pueden elegir.
  // Para probar con otra fecha usa, por ejemplo: new Date(2025, 3, 16)
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  let anio = hoy.getFullYear();
  let mes = hoy.getMonth();      // 0 = enero ... 11 = diciembre
  let seleccionado = null;       // día elegido, formato "AAAA-MM-DD"

  // Elementos del HTML
  const titulo = document.getElementById('cal-titulo');
  const contenedor = document.getElementById('cal-dias');
  const btnAnterior = document.querySelector('[data-cal="prev"]');
  const btnSiguiente = document.querySelector('[data-cal="next"]');

  const dos = (n) => String(n).padStart(2, '0');
  const clave = (a, m, d) => `${a}-${dos(m + 1)}-${dos(d)}`;

  /* Dibuja el mes actual en pantalla */
  function dibujar() {
    titulo.textContent = `${MESES[mes]} ${anio}`;

    // Lunes = 0 ... Domingo = 6
    const huecos = (new Date(anio, mes, 1).getDay() + 6) % 7;
    const diasDelMes = new Date(anio, mes + 1, 0).getDate();
    const diasMesPrevio = new Date(anio, mes, 0).getDate();

    let html = '';

    // Días grises del mes anterior (solo rellenan la primera fila)
    for (let i = huecos; i > 0; i--) {
      html += `<span class="day day--out" aria-hidden="true">${diasMesPrevio - i + 1}</span>`;
    }

    // Días del mes
    for (let d = 1; d <= diasDelMes; d++) {
      const k = clave(anio, mes, d);
      const pasado = new Date(anio, mes, d) < hoy;
      html +=
        `<input class="pick" type="radio" name="dia" id="dia-${k}" value="${k}"` +
        `${pasado ? ' disabled' : ''}${k === seleccionado ? ' checked' : ''}>` +
        `<label class="day" for="dia-${k}">${d}</label>`;
    }

    contenedor.innerHTML = html;

    // No se puede retroceder antes del mes actual
    btnAnterior.disabled = anio * 12 + mes <= hoy.getFullYear() * 12 + hoy.getMonth();
  }

  /* Avanza (+1) o retrocede (-1) un mes */
  function cambiarMes(delta) {
    const fecha = new Date(anio, mes + delta, 1);
    anio = fecha.getFullYear();
    mes = fecha.getMonth();
    dibujar();
  }

  btnAnterior.addEventListener('click', () => cambiarMes(-1));
  btnSiguiente.addEventListener('click', () => cambiarMes(1));

  // Recuerda el día elegido aunque cambies de mes y vuelvas
  contenedor.addEventListener('change', (e) => {
    if (e.target.name === 'dia') seleccionado = e.target.value;
  });

  dibujar();
})();