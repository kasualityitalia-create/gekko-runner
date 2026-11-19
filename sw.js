/**
 * Gekko Runner - Service Worker Offline Cache Engine v3 (PWA)
 * Kasuality Arcade - 100% Offline, Zero Dipendenze
 * Conforme alle specifiche W3C Service Worker & CacheStorage
 */

const CACHE_NAME = 'kasuality-gekko-v4';

const ASSETS_TO_CACHE = [
    '/gekko/',
    '/gekko/index.html',
    '/gekko/style.css',
    '/gekko/game.js',
    '/gekko/audio.js',
    '/gekko/manifest.json',
    '/gekko/img/gekko.png',
    '/gekko/img/gekko.svg',
    '/gekko/img/gekko_duck.png',
    '/gekko/img/gekko_duck.svg',
    '/img/favicon.ico'
];

// Install: pre-memorizza tutti gli asset locali con Promise.allSettled per massima robustezza
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                ASSETS_TO_CACHE.map((url) => cache.add(url))
            );
        }).then(() => self.skipWaiting())
    );
});

// Activate: pulizia immediata vecchie cache e controllo immediato di tutti i client
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

// Fetch: strategia Cache-First con ignoreSearch, silenziamento analytics e fallback offline
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // Silenzia script di tracciamento o chiamate terze offline: 204 No Content invece di errore di rete
    if (url.pathname.includes('kasuality-analytics.js') || url.origin !== self.location.origin) {
        event.respondWith(
            fetch(event.request).catch(() => new Response('', { status: 204, statusText: 'No Content' }))
        );
        return;
    }

    event.respondWith(
        // ignoreSearch: true garantisce hit in cache anche se l'URL include parametri (?ref=, ?utm=...)
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
                // Fallback offline sia per la directory /gekko/ sia per index.html
                if (event.request.mode === 'navigate' || event.request.destination === 'document') {
                    return caches.match('/gekko/index.html', { ignoreSearch: true }) ||
                           caches.match('/gekko/', { ignoreSearch: true });
                }
            });
        })
    );
});
