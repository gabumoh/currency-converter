let staticCacheName = 'cc-static-v1';
let dataCache = 'cc-data-v1';

let allCaches = [
  staticCacheName,
  dataCache
];

let urlsToCache = [
  '/',
  '/js/index.js',
  '/js/converter.js',
  '/js/idb.js',
  '/css/stylesheet.css',
  'https://code.jquery.com/jquery-3.3.1.min.js',
  'https://stackpath.bootstrapcdn.com/bootswatch/4.1.1/journal/bootstrap.min.css',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400'
];

self.addEventListener('install', function(event) {
  console.log('installed');
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      console.log('activating...');
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('cc-') &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
    let requestUrl = new URL(event.request.url);
    
    // loading the index page from cache when wizard at on the browser.
    if (requestUrl.origin === location.origin) {
      if (requestUrl.pathname === '/') {
        caches.match(event.request).then(response => {
          if (response) {
            // respond with the index page skeleton in cache
             event.respondWith(caches.match('/index.html'));
             return;
          }
        });
      }
    }
   
    // responding to any other request on the page.
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      }).catch(error => {
        return error;
      })
    );

});
