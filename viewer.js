// Proteger panel admin
(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || session.user.email !== ADMIN_EMAIL) {
    window.location.href = 'index.html';
    return;
  }
  cargarTodo();
})();

async function cargarTodo() {
  cargarStats();
  cargarPendientes();
  cargarPartidos();
  cargarAbonados();
}

async function cargarStats() {
  const [{ count: activos }, { count: pendientes }, { count: partidos }] = await Promise.all([
    supabase.from('abonados').select('*', { count: 'exact', head: true }).eq('estado', 'activo'),
    supabase.from('abonados').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente'),
    supabase.from('partidos').select('*', { count: 'exact', head: true }).eq('publicado', true),
  ]);
  document.getElementById('stat-activos').textContent = activos ?? 0;
  document.getElementById('stat-pendientes').textContent = pendientes ?? 0;
  document.getElementById('stat-partidos').textContent = partidos ?? 0;
}

async function cargarPendientes() {
  const { data } = await supabase
    .from('abonados').select('*').eq('estado', 'pendiente').order('created_at', { ascending: false });

  const el = document.getElementById('tabla-pendientes');
  if (!data || data.length === 0) {
    el.innerHTML = '<p class="empty">No hay solicitudes pendientes. 🎉</p>';
    return;
  }

  el.innerHTML = `
    <table>
      <thead><tr><th>Nombre</th><th>Email</th><th>Fecha solicitud</th><th>Acción</th></tr></thead>
      <tbody>
        ${data.map(a => `
          <tr>
            <td>${a.nombre}</td>
            <td>${a.email}</td>
            <td>${formatFecha(a.created_at)}</td>
            <td>
              <button class="btn-success-sm" onclick="aprobar('${a.id}')">✓ Aprobar</button>
              <button class="btn-danger-sm" onclick="denegar('${a.id}')">✕ Denegar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

async function cargarAbonados() {
  const { data } = await supabase
    .from('abonados').select('*')
    .in('estado', ['activo', 'bloqueado'])
    .order('nombre');

  const el = document.getElementById('tabla-abonados');
  if (!data || data.length === 0) {
    el.innerHTML = '<p class="empty">No hay abonados activos aún.</p>';
    return;
  }

  el.innerHTML = `
    <table>
      <thead><tr><th>Nombre</th><th>Email</th><th>Estado</th><th>Acción</th></tr></thead>
      <tbody>
        ${data.map(a => `
          <tr>
            <td>${a.nombre}</td>
            <td>${a.email}</td>
            <td><span class="badge badge-${a.estado === 'activo' ? 'success' : 'blocked'}">${a.estado}</span></td>
            <td>
              ${a.estado === 'activo' 
                ? `<button class="btn-danger-sm" onclick="bloquear('${a.id}')">Bloquear</button>` 
                : `<button class="btn-success-sm" onclick="aprobar('${a.id}')">Reactivar</button>`}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

async function cargarPartidos() {
  const { data } = await supabase
    .from('partidos').select('*').order('fecha', { ascending: false });

  const el = document.getElementById('tabla-partidos');
  if (!data || data.length === 0) {
    el.innerHTML = '<p class="empty">No hay partidos publicados aún.</p>';
    return;
  }

  el.innerHTML = `
    <table>
      <thead><tr><th>Título</th><th>Fecha</th><th>Tipo</th><th>Estado</th><th>Acción</th></tr></thead>
      <tbody>
        ${data.map(p => `
          <tr>
            <td>${p.titulo}</td>
            <td>${formatFecha(p.fecha)}</td>
            <td><span class="badge badge-${p.tipo === 'live' ? 'live' : 'vod'}">${p.tipo === 'live' ? '🔴 Directo' : '📹 VOD'}</span></td>
            <td><span class="badge badge-${p.publicado ? 'success' : 'blocked'}">${p.publicado ? 'Publicado' : 'Oculto'}</span></td>
            <td>
              <button class="btn-ghost-sm" onclick="togglePublicado('${p.id}', ${p.publicado})">${p.publicado ? 'Ocultar' : 'Publicar'}</button>
              <button class="btn-danger-sm" onclick="eliminarPartido('${p.id}')">Eliminar</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

async function aprobar(id) {
  await supabase.from('abonados').update({ estado: 'activo' }).eq('id', id);
  cargarTodo();
}

async function denegar(id) {
  if (!confirm('¿Seguro que quieres rechazar esta solicitud?')) return;
  await supabase.from('abonados').update({ estado: 'bloqueado' }).eq('id', id);
  cargarTodo();
}

async function bloquear(id) {
  if (!confirm('¿Seguro que quieres bloquear a este abonado?')) return;
  await supabase.from('abonados').update({ estado: 'bloqueado' }).eq('id', id);
  cargarTodo();
}

async function togglePublicado(id, actual) {
  await supabase.from('partidos').update({ publicado: !actual }).eq('id', id);
  cargarPartidos();
}

async function eliminarPartido(id) {
  if (!confirm('¿Eliminar este partido? Esta acción no se puede deshacer.')) return;
  await supabase.from('partidos').delete().eq('id', id);
  cargarTodo();
}

function toggleFormPartido() {
  const f = document.getElementById('form-partido');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function guardarPartido() {
  const titulo = document.getElementById('p-titulo').value.trim();
  const fecha = document.getElementById('p-fecha').value;
  const tipo = document.getElementById('p-tipo').value;
  const competicion = document.getElementById('p-competicion').value.trim();
  const url = document.getElementById('p-url').value.trim();
  const publicado = document.getElementById('p-publicado').checked;

  const errEl = document.getElementById('partido-error');
  const sucEl = document.getElementById('partido-success');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';

  if (!titulo || !url) {
    errEl.textContent = 'El título y la URL de VEO son obligatorios.';
    errEl.style.display = 'block';
    return;
  }

  const { error } = await supabase.from('partidos').insert({
    titulo, fecha: fecha || null, tipo, competicion: competicion || null, veo_url: url, publicado
  });

  if (error) {
    errEl.textContent = 'Error al guardar. Inténtalo de nuevo.';
    errEl.style.display = 'block';
    return;
  }

  sucEl.textContent = '✅ Partido publicado correctamente.';
  sucEl.style.display = 'block';

  // Limpiar form
  ['p-titulo','p-fecha','p-competicion','p-url'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('p-tipo').value = 'live';

  setTimeout(() => {
    toggleFormPartido();
    cargarTodo();
    sucEl.style.display = 'none';
  }, 1500);
}

function formatFecha(fechaStr) {
  if (!fechaStr) return '—';
  return new Date(fechaStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}
