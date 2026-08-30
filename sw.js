const CACHE = 'kachef-ihtizaz-v1';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache =>
      cache.match(e.request).then(resp => {
        const fetchPromise = fetch(e.request).then(networkResp => {
          cache.put(e.request, networkResp.clone());
          return networkResp;
        }).catch(() => resp);
        return resp || fetchPromise;
      })
    )
  );
});
