(() => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js'));
  }

  let installPrompt;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });

  const installButton = document.createElement('button');
  installButton.type = 'button';
  installButton.textContent = '⌄ Pasang aplikasi';
  installButton.hidden = true;
  installButton.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:20;border:0;border-radius:10px;padding:12px 15px;background:#102a43;color:#fff;font:600 14px system-ui;box-shadow:0 5px 18px #102a4355;cursor:pointer';
  installButton.addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = true;
  });
  if (!window.matchMedia('(display-mode: standalone)').matches) document.body.appendChild(installButton);
})();
