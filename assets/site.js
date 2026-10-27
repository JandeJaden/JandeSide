'use strict';
const filters = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('[data-category]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
  let count = 0;
  projects.forEach(project => { const visible = button.dataset.filter === 'all' || project.dataset.category === button.dataset.filter; project.hidden = !visible; if (visible) count++; });
  const result = document.getElementById('result-count');
  if (result) result.textContent = `${count} 个角落，等你探索`;
}));
const artDialog = document.getElementById('art-dialog');
if (artDialog) {
  const openArt = () => { if (typeof artDialog.showModal === 'function') artDialog.showModal(); else window.location.href = 'assets/images/nailong.webp'; };
  document.getElementById('open-art')?.addEventListener('click', openArt);
  document.getElementById('art-preview')?.addEventListener('click', openArt);
  document.getElementById('close-art')?.addEventListener('click', () => artDialog.close());
  artDialog.addEventListener('click', event => { if (event.target === artDialog) { const box = artDialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) artDialog.close(); } });
}
const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
const localTime = document.getElementById('local-time');
if (localTime) { const updateTime = () => { localTime.textContent = `你的此刻 / ${new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())}`; }; updateTime(); window.setInterval(updateTime, 60000); }
