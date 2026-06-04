// Proteger la página — solo abonados activos
(async () => {
  const { data: { session } } = await sbCliente.auth.getSession();
  if (!session) { window.location.href = 'index.html'; return; }

  const { data: abonado } = await sbCliente
    .from('abonados')
    .select('nombre, estado')
    .eq('id', session.user.id)
    .single();

  if (!abonado || abonado.estado !== 'activo') {
    await sbCliente.auth.signOut();
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('nav-user').textContent = abonado.nombre;
  cargarPartidos();
})();

async function cargarPartidos() {
  const { data: partidos, error } = await sbCliente
    .from('partidos')
    .select('*')
    .eq('publicado', true)
    .order('fecha', { ascending: false });

  if (error || !partidos) {
    document.getElementById('vod-grid').innerHTML = '<p class="empty">No se pudieron cargar los partidos.</p>';
    return;
  }

  const lives = partidos.filter(p => p.tipo === 'live');
  const vods = partidos.filter(p => p.tipo === 'vod');

  if (lives.length > 0) {
    const live = lives[0];
    document.getElementById('section-live').style.display = 'block';
    document.getElementById('live-card').innerHTML = `
      <div class="live-header">
        <span class="live-pill">🔴 EN DIRECTO</span>
        <h3>${live.titulo}</h3>
        <p class="match-meta">${formatFecha(live.fecha)}${live.competicion ? ' · ' + live.competicion : ''}</p>
      </div>
      <div class="player-wrap">
        ${buildPlayer(live.veo_url)}
      </div>
    `;
  }

  const vodEl = document.getElementById('vod-grid');
  if (vods.length === 0) {
    vodEl.innerHTML = '<p class="empty">Aún no hay partidos grabados disponibles.</p>';
    return;
  }

  vodEl.innerHTML = vods.map(p => `
    <div class="vod-card">
      <div class="vod-thumb" onclick="abrirPartido('${p.id}')">
        <div class="play-icon">▶</div>
      </div>
      <div class="vod-info">
        <p class="vod-title">${p.titulo}</p>
        <span class="vod-meta">${formatFecha(p.fecha)}${p.competicion ? ' · ' + p.competicion : ''}</span>
      </div>
    </div>
  `).join('');
}

function buildPlayer(url) {
  if (!url) return '<div class="player-placeholder">Sin enlace de vídeo</div>';

  if (url.includes('veo.co')) {
    return `<iframe src="${url}" frameborder="0" allowfullscreen allow="autoplay; fullscreen" style="width:100%; aspect-ratio:16/9; border-radius:8px;"></iframe>`;
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const vid = url.includes('youtu.be') 
      ? url.split('/').pop() 
      : new URL(url).searchParams.get('v');
    return `<iframe src="https://www.youtube.com/embed/${vid}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay; fullscreen" style="width:100%; aspect-ratio:16/9; border-radius:8px;"></iframe>`;
  }

  return `<a href="${url}" target="_blank" class="btn-primary-sm">Ver en VEO →</a>`;
}

let partidoAbierto = null;
async function abrirPartido(id) {
  const { data: p } = await sbCliente.from('partidos').select('*').eq('id', id).single();
  if (!p) return;

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <h3>${p.titulo}</h3>
        <button class="modal-close" onclick="cerrarModal()">✕</button>
      </div>
      <div>${buildPlayer(p.veo_url)}</div>
      <p class="vod-meta" style="margin-top:10px">${formatFecha(p.fecha)}${p.competicion ? ' · ' + p.competicion : ''}</p>
    </div>
  `;
  document.body.appendChild(modal);
  partidoAbierto = modal;
}

function cerrarModal() {
  if (partidoAbierto) { partidoAbierto.remove(); partidoAbierto = null; }
}

function formatFecha(fechaStr) {
  if (!fechaStr) return '';
  return new Date(fechaStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

async function handleLogout() {
  await sbCliente.auth.signOut();
  window.location.href = 'index.html';
}
