// Validación del inicio de sesión de Lumy
const form = document.getElementById('form-login');
const error = document.getElementById('error-login');

function mostrarError(mensaje, campo) {
  error.textContent = mensaje;
  error.hidden = false;
  campo.focus();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const correo = form.correo.value.trim();
  const clave = form.clave.value.trim();

  if (!correo) {
    mostrarError('Escribe tu correo electrónico.', form.correo);
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    mostrarError('Escribe un correo válido, por ejemplo tucorreo@ejemplo.com.', form.correo);
    return;
  }

  if (!clave) {
    mostrarError('Escribe tu contraseña.', form.clave);
    return;
  }

  error.hidden = true;
  window.location.href = 'inicio.html';
});

// Quita el mensaje apenas la persona vuelve a escribir
form.addEventListener('input', () => { error.hidden = true; });