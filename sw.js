/* ===== SERVICE WORKER ===== */

const CACHE_NAME = 'briacerbe-dental-v1';

/* FILE STATICI DA METTERE IN CACHE */
const filesToCache = [
    /* ROOT */
    '/',
    '/index.html',

    /* HTML */
    'templates/appuntamento.html',
    'templates/components/bottom.html',
    'templates/dentist.html',
    'templates/hygienist.html',
    'templates/index.html',
    'templates/info.html',
    'templates/login.html',
    'templates/prenotazioni.html',
    'templates/register.html',
    'templates/surgeon.html',


    /* CSS */
    'static/appuntamento.css',
    'static/bottom.css',
    'static/index.css',
    'static/login.css',
    'static/piece.css',
    'static/register.css',



    /* JAVASCRIPT */
    'main.js',

    /* IMMAGINI */
    'static/icone_tab_bar/home_no_bg.png',
    'static/icone_tab_bar/info_no_bg.png',
    'static/icone_tab_bar/prenotazioni_no_bg.png',
    'static/icone_tab_bar/servizi_no_bg.png',


    'static/icone/chirurgo.png',
    'static/icone/dentista.png',
    'static/icone/igienista.png',
    'static/icone/logo.png',
    'static/icone/servizi.png',
    'static/icone/sfondo-logo.png',
    'static/icone/sfondo_appuntamento.png',

    /* PWA */
    'manifest.json'
];

/* ===== INSTALL ===== */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Cache aperta');
                return cache.addAll(filesToCache);
            })
    );
});

/* ===== ACTIVATE (pulizia vecchie cache) ===== */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Cancello cache vecchia:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

/* ===== FETCH ===== */
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // se esiste in cache, usa quella
                if (response) {
                    return response;
                }
                // altrimenti vai in rete
                return fetch(event.request);
            })
    );
});
