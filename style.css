/* ===== RESET & BASE ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green: #1D9E75;
  --green-dark: #0F6E56;
  --green-light: #E1F5EE;
  --amber: #854F0B;
  --amber-light: #FAEEDA;
  --red: #A32D2D;
  --red-light: #FCEBEB;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-400: #9ca3af;
  --gray-600: #4b5563;
  --gray-800: #1f2937;
  --radius: 8px;
  --radius-lg: 12px;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--gray-800);
  background: var(--gray-50);
  line-height: 1.6;
  font-size: 15px;
}

/* ===== LOGIN PAGE ===== */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0a1628 0%, #0F6E56 100%);
  padding: 20px;
}

.login-wrap { width: 100%; max-width: 400px; }

.login-card {
  background: #fff;
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25);
}

.brand { text-align: center; margin-bottom: 28px; }
.brand-icon { font-size: 40px; margin-bottom: 10px; }
.brand h1 { font-size: 22px; font-weight: 700; color: var(--gray-800); }
.brand p { font-size: 13px; color: var(--gray-400); margin-top: 4px; }

/* ===== FORMS ===== */
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; font-weight: 500; color: var(--gray-600); margin-bottom: 5px; }
.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  font-size: 14px;
  color: var(--gray-800);
  background: #fff;
  transition: border-color 0.15s;
}
.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: var(--green);
  box-shadow: 0 0 0 3px rgba(29,158,117,0.1);
}
.hint { font-size: 12px; color: var(--gray-400); margin-top: 4px; display: block; }
.checkbox-group label { display: flex; align-items: center; gap: 8px; font-weight: 400; cursor: pointer; }
.checkbox-group input[type=checkbox] { width: auto; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }

/* ===== BUTTONS ===== */
.btn-primary {
  width: 100%;
  padding: 11px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: var(--green-dark); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-primary-sm {
  padding: 7px 14px;
  background: var(--green);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary-sm:hover { background: var(--green-dark); }

.btn-outline-sm {
  padding: 6px 12px;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: var(--radius);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-outline-sm:hover { background: rgba(255,255,255,0.1); }

.btn-success-sm {
  padding: 5px 10px; background: var(--green-light); color: var(--green-dark);
  border: 1px solid #9FE1CB; border-radius: 6px; font-size: 12px; cursor: pointer; margin-right: 4px;
}
.btn-danger-sm {
  padding: 5px 10px; background: var(--red-light); color: var(--red);
  border: 1px solid #F7C1C1; border-radius: 6px; font-size: 12px; cursor: pointer; margin-right: 4px;
}
.btn-ghost-sm {
  padding: 5px 10px; background: var(--gray-100); color: var(--gray-600);
  border: 1px solid var(--gray-200); border-radius: 6px; font-size: 12px; cursor: pointer; margin-right: 4px;
}

/* ===== MESSAGES ===== */
.msg-error { background: var(--red-light); color: var(--red); padding: 10px 12px; border-radius: var(--radius); font-size: 13px; margin-bottom: 12px; }
.msg-success { background: var(--green-light); color: var(--green-dark); padding: 10px 12px; border-radius: var(--radius); font-size: 13px; margin-bottom: 12px; }

.switch-link { text-align: center; font-size: 13px; color: var(--gray-400); margin-top: 14px; }
.switch-link a { color: var(--green); text-decoration: none; font-weight: 500; }

.access-note {
  margin-top: 20px;
  padding: 12px;
  background: var(--gray-50);
  border-radius: var(--radius);
  font-size: 12px;
  color: var(--gray-400);
  text-align: center;
  border: 1px solid var(--gray-200);
}

/* ===== NAV ===== */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: #0a1628;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-logo { font-weight: 600; font-size: 16px; }
.nav-right { display: flex; align-items: center; gap: 12px; }
.nav-user { font-size: 13px; color: rgba(255,255,255,0.6); }
.admin-badge {
  background: rgba(29,158,117,0.2);
  color: #5DCAA5;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 20px;
  margin-left: 10px;
  border: 1px solid rgba(29,158,117,0.3);
}

/* ===== LAYOUT ===== */
.container { max-width: 960px; margin: 0 auto; padding: 28px 20px; }

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.section-header h2 { font-size: 17px; font-weight: 600; }

/* ===== STATS ===== */
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
@media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr; } }

.stat-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 16px 18px;
}
.stat-label { font-size: 12px; color: var(--gray-400); margin-bottom: 4px; }
.stat-value { font-size: 28px; font-weight: 700; }
.stat-value.green { color: var(--green); }
.stat-value.amber { color: var(--amber); }

/* ===== TABLES ===== */
.table-wrap {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  overflow-x: auto;
}
table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 500px; }
th {
  background: var(--gray-50);
  padding: 10px 14px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: var(--gray-400);
  border-bottom: 1px solid var(--gray-200);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
td { padding: 10px 14px; border-bottom: 1px solid var(--gray-100); }
tr:last-child td { border-bottom: none; }
tr:hover td { background: var(--gray-50); }

/* ===== BADGES ===== */
.badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 11px; font-weight: 500; }
.badge-success { background: var(--green-light); color: var(--green-dark); }
.badge-blocked { background: var(--gray-100); color: var(--gray-400); }
.badge-live { background: var(--red-light); color: var(--red); }
.badge-vod { background: #E6F1FB; color: #185FA5; }

/* ===== LIVE CARD ===== */
.live-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.live-header { padding: 16px 20px; border-bottom: 1px solid var(--gray-100); }
.live-pill {
  display: inline-block;
  background: var(--red-light);
  color: var(--red);
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite;
}
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
.live-header h3 { font-size: 18px; font-weight: 600; }
.match-meta { font-size: 13px; color: var(--gray-400); margin-top: 4px; }
.player-wrap { background: #000; }
.player-placeholder { height: 200px; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.3); }

/* ===== VOD GRID ===== */
.vod-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 14px; }
.vod-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.15s, transform 0.15s;
}
.vod-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }
.vod-thumb {
  background: #0a1628;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.play-icon { font-size: 28px; color: rgba(255,255,255,0.4); transition: color 0.15s; }
.vod-card:hover .play-icon { color: var(--green); }
.vod-info { padding: 12px 14px; }
.vod-title { font-size: 13px; font-weight: 500; margin-bottom: 4px; }
.vod-meta { font-size: 12px; color: var(--gray-400); }

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
  padding: 20px;
}
.modal-box {
  background: #fff;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 800px;
  padding: 20px;
}
.modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.modal-header h3 { font-size: 16px; font-weight: 600; }
.modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: var(--gray-400); padding: 4px; }

/* ===== ADMIN FORM PANEL ===== */
.form-panel {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  margin-bottom: 16px;
}
.form-panel h3 { font-size: 15px; font-weight: 600; margin-bottom: 16px; }
.form-actions { display: flex; gap: 8px; margin-top: 8px; }

/* ===== MISC ===== */
.empty { padding: 20px; color: var(--gray-400); font-size: 14px; text-align: center; }
.loading { padding: 20px; color: var(--gray-400); font-size: 13px; text-align: center; }
