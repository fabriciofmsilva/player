self.addEventListener('install', (event) => {
  const CACHE_NAME = 'xyz-cache';
  const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/bundle.js'
  ];

  event.waitUntil(
    /* open method available on caches, takes in the name of cache as the first parameter. It returns a promise that resolves to the instance of cache
    All the URLS above can be added to cache using the addAll method. */
    caches
      .open(CACHE_NAME)
      .then (cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  self.skipWaiting();
  // products-v2 is the name of the new cache
  const cacheWhitelist = ['products-v2'];

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            /* Deleting all the caches except the ones that are in cacheWhitelist array */
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        );
      })
  );
});

/* Fetch event handler for responding to GET requests with the cached assets */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .open('products-v2')
      .then(cache => {
        /* Checking if the request is already present in the cache. If it is present, sending it directly to the client */
        return cache
          .match(event.request)
          .then(response => {
            if (response) {
              console.log('Cache hit! Fetching response from cache', event.request.url);
              return response;
            }
            /* If the request is not present in the cache, we fetch it from the server and then put it in cache for subsequent requests. */
            fetch(event.request).then (response => {
              cache.put(event.request, response.clone());
              return response;
            })
          });
      })
  );
});

self.addEventListener('push', (event) => {
  let options = {
    body: event.data.body,
    icon: 'images/example.png',
  };
  event.waitUntil(
    /* The showNotification method is available on the registration object of the service worker.
    The first parameter to showNotification method is the title of notification, and the second parameter is an object */
    self.registration.showNotification(event.data.title, options)
  );
});
