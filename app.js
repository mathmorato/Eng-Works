const $ = (selector) => document.querySelector(selector);
const modal = $('#auth-modal');
const loginForm = $('#login-form');
const registerForm = $('#register-form');
const message = $('#auth-message');

$('#year').textContent = new Date().getFullYear();

function openAuth(mode = 'login') { modal.classList.add('show'); modal.setAttribute('aria-hidden', 'false'); switchTab(mode); }
function closeAuth() { modal.classList.remove('show'); modal.setAttribute('aria-hidden', 'true'); message.textContent = ''; }
function switchTab(tab) {
  document.querySelectorAll('[data-auth-tab]').forEach(button => button.classList.toggle('active', button.dataset.authTab === tab));
  loginForm.hidden = tab !== 'login'; registerForm.hidden = tab !== 'register'; message.textContent = '';
}
document.querySelectorAll('[data-open-auth]').forEach(button => button.addEventListener('click', () => openAuth(button.dataset.openAuth)));
document.querySelectorAll('[data-auth-tab]').forEach(button => button.addEventListener('click', () => switchTab(button.dataset.authTab)));
$('.close').addEventListener('click', closeAuth);
modal.addEventListener('click', event => { if (event.target === modal) closeAuth(); });

function getUsers() { return JSON.parse(localStorage.getItem('pesquisa-users') || '[]'); }
function saveUsers(users) { localStorage.setItem('pesquisa-users', JSON.stringify(users)); }
function enterDashboard(user) {
  closeAuth();
  const dashboard = document.createElement('section');
  dashboard.className = `dashboard ${user.role === 'admin' ? 'is-admin' : ''}`;
  dashboard.innerHTML = `<header class="dash-head"><a class="brand" href="#inicio"><span class="brand-mark">C</span><span>Conexões<br><em>em Pesquisa</em></span></a><div><span class="role-pill">${user.role === 'admin' ? 'ADMINISTRAÇÃO' : 'PARTICIPANTE'}</span> <button class="text-button" id="logout">Sair</button></div></header><main class="dash-main"><div class="dash-title"><div><p class="eyebrow"><span></span> Área restrita</p><h1>Olá, ${user.name.split(' ')[0]}.</h1><p>Escolha um espaço para continuar sua jornada na plataforma.</p></div></div><div class="dash-grid"><article class="dash-card"><span>01 · EM BREVE</span><h3>Meu percurso</h3><p>Atividades, registros e contribuições vinculadas ao seu perfil.</p></article><article class="dash-card"><span>02 · EM BREVE</span><h3>Acervo da pesquisa</h3><p>Materiais, documentos e referências disponíveis à comunidade.</p></article><article class="dash-card"><span>03 · EM BREVE</span><h3>Participação</h3><p>Consultas, fóruns e oportunidades de colaboração.</p></article><article class="dash-card admin-only"><span>ADMIN · GESTÃO</span><h3>Usuários</h3><p>Convites, permissões e acompanhamento dos perfis cadastrados.</p></article><article class="dash-card admin-only"><span>ADMIN · GESTÃO</span><h3>Conteúdos</h3><p>Publique e organize os materiais de cada módulo.</p></article><article class="dash-card admin-only"><span>ADMIN · GESTÃO</span><h3>Indicadores</h3><p>Visualize o uso da plataforma e os resultados do projeto.</p></article></div></main></section>`;
  document.body.append(dashboard); $('#logout').addEventListener('click', () => dashboard.remove());
}
registerForm.addEventListener('submit', event => {
  event.preventDefault(); const data = Object.fromEntries(new FormData(registerForm)); const users = getUsers();
  if (users.some(user => user.email.toLowerCase() === data.email.toLowerCase())) { message.textContent = 'Este e-mail já possui uma conta.'; return; }
  const user = { name: data.name.trim(), email: data.email.toLowerCase(), password: data.password, role: 'user' };
  users.push(user); saveUsers(users); enterDashboard(user); registerForm.reset();
});
loginForm.addEventListener('submit', event => {
  event.preventDefault(); const data = Object.fromEntries(new FormData(loginForm));
  const admin = data.email.toLowerCase() === 'admin@pesquisa.org' && data.password === 'admin123' ? { name: 'Administração', role: 'admin' } : null;
  const user = admin || getUsers().find(item => item.email === data.email.toLowerCase() && item.password === data.password);
  if (!user) { message.textContent = 'E-mail ou senha não encontrados.'; return; } enterDashboard(user); loginForm.reset();
});
document.querySelectorAll('[data-module]').forEach(button => button.addEventListener('click', () => openAuth('login')));
