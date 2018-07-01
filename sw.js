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

self.addEventListener('waiting', function() {
  console.log('SW is in waiting state')
});

self.addEventListener('fetch', function(event) {

  const url = new URL(event.request.url);

  // cache material icons
  if (url.hostname === 'fonts.gstatic.com') {
    caches.match(url.href).then(function(response) {
      return response || fetch(event.request);
    })
  }

  // cache data
  

  else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
