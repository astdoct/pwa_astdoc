// Handle the beforeinstallprompt event for showing the install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the default browser prompt
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;

  // Create the install prompt container
  const installContainer = document.createElement('div');
  installContainer.id = 'install-prompt';
  installContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
    font-family: 'Cairo', sans-serif;
  `;

  // Create the site icon
  const icon = document.createElement('img');
  icon.src = 'https://raw.githubusercontent.com/اسم_المستودع/main/android-icon-512x512.png';
  icon.style.cssText = 'width: 40px; height: 40px; margin-left: 10px;';

  // Create the prompt text
  const promptText = document.createElement('span');
  promptText.textContent = 'قم بتثبيت تطبيق دليل أطباء أسيوط';
  promptText.style.cssText = 'font-size: 16px; color: #333;';

  // Create the install button
  const installButton = document.createElement('button');
  installButton.textContent = 'تثبيت';
  installButton.style.cssText = `
    padding: 8px 16px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: 'Cairo', sans-serif;
  `;

  // Handle button click to show the install prompt
  installButton.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        // Remove the prompt after user interaction
        installContainer.remove();
      });
    }
  });

  // Append elements to the container
  installContainer.appendChild(icon);
  installContainer.appendChild(promptText);
  installContainer.appendChild(installButton);

  // Append the container to the body
  document.body.appendChild(installContainer);
});

// Hide the prompt when the app is installed
window.addEventListener('appinstalled', () => {
  const installContainer = document.getElementById('install-prompt');
  if (installContainer) {
    installContainer.remove();
  }
});
