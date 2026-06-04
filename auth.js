// Redirigir si ya está logueado
(async () => {
  const { data: { session } } = await sbCliente.auth.getSession();
  if (session) redirectAfterLogin(session.user.email);
})();

function redirectAfterLogin(email) {
  if (email === ADMIN_EMAIL) {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'partidos.html';
  }
}

function showRegister() {
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-register').style.display = 'block';
}

function showLogin() {
  document.getElementById('form-register').style.display = 'none';
  document.getElementById('form-login').style.display = 'block';
}

async function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const errEl = document.getElementById('login-error');
  errEl.style.display = 'none';

  if (!email || !password) {
    errEl.textContent = 'Por favor rellena todos los campos.';
    errEl.style.display = 'block';
    return;
  }

  const btn = document.querySelector('#form-login .btn-primary');
  btn.textContent = 'Entrando...';
  btn.disabled = true;

  const { data, error } = await sbCliente.auth.signInWithPassword({ email, password });

  if (error) {
    errEl.textContent = 'Email o contraseña incorrectos.';
    errEl.style.display = 'block';
    btn.textContent = 'Entrar →';
    btn.disabled = false;
    return;
  }

  if (email !== ADMIN_EMAIL) {
    const { data: abonado } = await sbCliente
      .from('abonados')
      .select('estado')
      .eq('id', data.user.id)
      .single();

    if (!abonado || abonado.estado === 'pendiente') {
      await sbCliente.auth.signOut();
      errEl.textContent = 'Tu solicitud está pendiente de aprobación por el club.';
      errEl.style.display = 'block';
      btn.textContent = 'Entrar →';
      btn.disabled = false;
      return;
    }

    if (abonado.estado === 'bloqueado') {
      await sbCliente.auth.signOut();
      errEl.textContent = 'Tu acceso ha sido desactivado. Contacta con el club.';
      errEl.style.display = 'block';
      btn.textContent = 'Entrar →';
      btn.disabled = false;
      return;
    }
  }

  redirectAfterLogin(email);
}

async function handleRegister() {
  const nombre = document.getElementById('reg-nombre').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const errEl = document.getElementById('reg-error');
  const sucEl = document.getElementById('reg-success');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!nombre || !email || !password) {
    errEl.textContent = 'Por favor rellena todos los campos.';
    errEl.style.display = 'block';
    return;
  }

  if (password.length < 8) {
    errEl.textContent = 'La contraseña debe tener al menos 8 caracteres.';
    errEl.style.display = 'block';
    return;
  }

  const btn = document.querySelector('#form-register .btn-primary');
  btn.textContent = 'Enviando solicitud...';
  btn.disabled = true;

  const { data, error } = await sbCliente.auth.signUp({ email, password });

  if (error) {
    errEl.textContent = error.message.includes('already') 
      ? 'Este email ya tiene una cuenta registrada.' 
      : 'Error al registrarse. Inténtalo de nuevo.';
    errEl.style.display = 'block';
    btn.textContent = 'Solicitar acceso →';
    btn.disabled = false;
    return;
  }

  await sbCliente.from('abonados').insert({
    id: data.user.id,
    nombre,
    email,
    estado: 'pendiente'
  });

  sucEl.textContent = '✅ Solicitud enviada. El club revisará tu acceso y te notificará.';
  sucEl.style.display = 'block';
  btn.textContent = 'Solicitar acceso →';
  btn.disabled = false;
}

async function handleLogout() {
  await sbCliente.auth.signOut();
  window.location.href = 'index.html';
}
