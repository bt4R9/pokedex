// version 1

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static').then(cache => {
            return cache.addAll(
                [
                    '/build/vendor.js',
                    '/build/data.js',
                    '/build/index.js',
                    '/build/bundle.css'
                ]
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open('static').then((cache) => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request).then(response => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});
