const CACHE_NAME = 'doctors-assiut-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtZRfFY_20R-9ZgYYndpbFypCVJB2ipJn67YiOhT5itRX4xALa-juo-AsrFW0uqnFBO3yB-O7DwAPWxkXBpIml4cRzUmu9dKlCg6QNLVYEEZyJBKaY_9zke-Rn71VkRUV-h6c31OHGFWL_c5ULpgcbDxxNWd_a7iL5RwwdtOmp9pFMCBDLFBtGU1GcQTw/s320/android-icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
