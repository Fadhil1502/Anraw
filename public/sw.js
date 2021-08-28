self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./stylesheet/main.css", "./stylesheet/shared/button.css", "./stylesheet/shared/footer.css", "./stylesheet/shared/header.css", "./stylesheet/shared/palette.css", "./stylesheet/shared/variable.css", "./script.js", "./images/logo_192.png", "./images/anraw_code.png", "./images/gallery.png", "./images/generate_1.png", "./images/generate_2.png", "./images/generate_3.png"]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})