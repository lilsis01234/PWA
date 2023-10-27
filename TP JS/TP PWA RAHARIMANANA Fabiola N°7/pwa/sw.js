const CACHE_NAME = 'CT-v1';
self.addEventListener('install',event=>{
    event.waitUntil((async()=>{
        const cache = await caches.open(CACHE_NAME);
        cache.addAll([
            '/',
            '/convertir.js',
            '/convert.css'
        ]);
    })());
})
self.addEventListener('fetch',event=>{
    event.respondWith((async()=>{
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);
        if(cachedResponse){
            return cachedResponse;
        }
        else{
            try{
                const fetchResponse = await fetch(event.request);

                cache.put(event.request,fetchResponse.clone());
                return fetchResponse;
            }catch(e){
                //probleme de reseau
            }
        }
    })());
});