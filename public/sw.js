// Bump to drop every cache from earlier versions on the next activation
const CACHE_VERSION = "v1";
const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const ASSETS_CACHE = `assets-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline/"; // routes.offline

// Private pages and live data must always come from the server
const BYPASS_PREFIXES = ["/admin/", "/api/"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES_CACHE)
      .then((cache) => cache.add(OFFLINE_URL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const currentCaches = [PAGES_CACHE, ASSETS_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !currentCaches.includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    BYPASS_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(event));
  } else if (url.pathname.startsWith("/_next/static/")) {
    // Build output is content-hashed, so a cached copy never goes stale
    event.respondWith(cacheFirst(event));
  } else if (
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(staleWhileRevalidate(event));
  }
  // Anything else (e.g. RSC payloads for client-side navigation) goes
  // straight to the network; when that fails, Next.js falls back to a full
  // page load, which networkFirst then serves from the cache
});

/** Saves a successful response, keeping the worker alive until it's written */
function saveResponse(event, cacheName, response) {
  if (!response.ok) return;
  const copy = response.clone();
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.put(event.request, copy)),
  );
}

/** Fresh page when online (so new articles show up), saved copy when not */
async function networkFirst(event) {
  try {
    const response = await fetch(event.request);
    saveResponse(event, PAGES_CACHE, response);
    return response;
  } catch {
    const cache = await caches.open(PAGES_CACHE);
    return (
      (await cache.match(event.request)) ??
      (await cache.match(OFFLINE_URL)) ??
      Response.error()
    );
  }
}

async function cacheFirst(event) {
  const cache = await caches.open(ASSETS_CACHE);
  const cached = await cache.match(event.request);
  if (cached) return cached;
  const response = await fetch(event.request);
  saveResponse(event, ASSETS_CACHE, response);
  return response;
}

async function staleWhileRevalidate(event) {
  const cache = await caches.open(ASSETS_CACHE);
  const cached = await cache.match(event.request);
  const refresh = fetch(event.request).then((response) => {
    saveResponse(event, ASSETS_CACHE, response);
    return response;
  });
  if (!cached) return refresh;
  // The cached copy is already served, so a failed refresh (e.g. offline)
  // only means it stays as is; waitUntil keeps the worker alive meanwhile
  event.waitUntil(refresh);
  return cached;
}
