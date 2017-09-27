var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/css/materialize.min.css',
  '/css/style.css',
  '/js/init.js',
  '/js/materialize.min.js',
  '/js/lazyload.min.js',
  '/img/background1.jpg',
  '/img/breakfast.png',
  '/img/code.png',
  '/img/coding.png',
  '/img/coffee.png',
  '/img/coke.png',
  '/img/crown.png',
  '/img/cutting.png',
  '/img/fries.png',
  '/img/joao.jpg',
  '/img/leo.jpg',
  '/img/orange-juice.png',
  '/img/pencil.png',
  '/img/pizza.png',
  '/img/sketching.png'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_NAME){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});