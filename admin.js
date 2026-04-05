// ── ADMIN MODE ──
// CTRL+M pour activer/désactiver le mode admin
// État stocké en sessionStorage (persiste tant que l'onglet est ouvert)

const ADMIN_CODE = '0550';
const ADMIN_KEY  = 'fminito_admin';

function isAdmin() {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}

function checkAdmin() {
  if (isAdmin()) return true;
  const pwd = prompt('Mot de passe admin :');
  if (pwd === ADMIN_CODE) {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    showAdminBadge();
    return true;
  }
  alert('Mot de passe incorrect.');
  return false;
}

function showAdminBadge() {
  let badge = document.getElementById('admin-badge');
  if (badge) return;
  badge = document.createElement('div');
  badge.id = 'admin-badge';
  badge.textContent = '⚙ Mode Admin';
  badge.style.cssText = [
    'position:fixed', 'bottom:16px', 'right:16px', 'z-index:9999',
    'background:#a8c000', 'color:#0a0c06',
    'font-family:"Barlow Condensed",sans-serif',
    'font-weight:700', 'font-size:.85rem', 'letter-spacing:.1em',
    'text-transform:uppercase', 'padding:8px 16px', 'border-radius:20px',
    'box-shadow:0 4px 16px rgba(168,192,0,.4)', 'cursor:pointer',
    'transition:opacity .2s'
  ].join(';');
  badge.title = 'CTRL+M pour désactiver';
  badge.onclick = deactivateAdmin;
  document.body.appendChild(badge);
}

function deactivateAdmin() {
  sessionStorage.removeItem(ADMIN_KEY);
  const badge = document.getElementById('admin-badge');
  if (badge) badge.remove();
}

// Affiche le badge si déjà admin au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
  if (isAdmin()) showAdminBadge();
});

// CTRL+M pour toggler
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'm') {
    e.preventDefault();
    if (isAdmin()) {
      deactivateAdmin();
    } else {
      const pwd = prompt('Mot de passe admin :');
      if (pwd === ADMIN_CODE) {
        sessionStorage.setItem(ADMIN_KEY, 'true');
        showAdminBadge();
      } else {
        alert('Mot de passe incorrect.');
      }
    }
  }
});
