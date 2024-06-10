// service-worker.js

const CACHE_NAME = 'devjournal-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pages/home.html',
  '/assets/icons/journal.png' // Add more URLs to cache as needed
];

// Install the service worker and cache all necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch the assets from the cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return the cached asset
        }
        return fetch(event.request); // Fetch from the network if not in cache
      })
  );
});

// Update the service worker and remove old caches
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
