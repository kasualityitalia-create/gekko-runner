/**
 * Gekko Runner - Service Worker Offline Cache Engine (PWA)
 * Kasuality Arcade - 100% Offline, Zero Dipendenze, Ultra-Portabile
 * Conforme alle specifiche W3C Service Worker & CacheStorage
 */

const CACHE_NAME = 'gekko-runner-v1';

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './game.js',
    './audio.js',
    './manifest.json',
    './favicon.ico',
    './img/gekko.png',
    './img/gekko.svg',
    './img/gekko_duck.png',
    './img/gekko_duck.svg'
];

// Install: memorizza tutti gli asset con Promise.allSettled per garantire l'installazione continua
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                ASSETS_TO_CACHE.map((url) => cache.add(url))
            );
        }).then(() => self.skipWaiting())
    );
});

// Activate: pulizia di vecchie versioni e acquisizione immediata del controllo
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch: strategia Cache-First con ignoreSearch e fallback di navigazione
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                if (event.request.mode === 'navigate' || event.request.destination === 'document') {
                    return caches.match('./index.html', { ignoreSearch: true }) ||
                           caches.match('./', { ignoreSearch: true });
                }
            });
        })
    );
});
