const CACHE_NAME = 'devjournal-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/home.html',
  '/assets/icons/journal.png'
];

// install service worker and cache the urls needed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch from the cache and network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; 
        }
        return fetch(event.request); 
      })
  );
});

// update the service workers and remove the old cache elements
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
