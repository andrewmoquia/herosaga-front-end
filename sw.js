import { clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'

//https://developers.google.com/web/tools/workbox/modules/workbox-precaching
//https://developers.google.com/web/tools/workbox/modules/workbox-routing
//https://developers.google.com/web/tools/workbox/modules/workbox-cacheable-response
//https://developers.google.com/web/tools/workbox/modules/workbox-expiration
//https://developers.google.com/web/tools/workbox/modules/workbox-strategies

clientsClaim()

//Skip the waiting part and reload the page without user action
self.skipWaiting()

//Run build and put all of the url with revision
precacheAndRoute(self.__WB_MANIFEST)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
   ({ url }) => url.origin === 'https://fonts.googleapis.com',
   new StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
   })
)

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
   ({ url }) => url.origin === 'https://fonts.gstatic.com',
   new CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
         //Doesn't cache that's failed
         new CacheableResponsePlugin({
            statuses: [0, 200],
         }),
         new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
         }),
      ],
   })
)

//Caching Images
//You might want to use a cache-first strategy for images, by matching against the intended destination of the request.
registerRoute(
   ({ request }) => request.destination === 'image',
   new CacheFirst({
      cacheName: 'images',
      plugins: [
         new CacheableResponsePlugin({
            statuses: [0, 200],
         }),
         new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
         }),
      ],
   })
)

//Cache CSS and JavaScript Files
//You might want to use a stale-while-revalidate strategy for CSS and
//JavaScript files that aren't precached, by matching against the destination of the incoming request.
registerRoute(
   ({ request }) => request.destination === 'script' || request.destination === 'style',
   new StaleWhileRevalidate({
      cacheName: 'static-resources',
   })
)

//Caching Content from Multiple Origins or Api
registerRoute(
   ({ url }) =>
      url.origin === 'https://incumons.netlify.app' || url.pathname === '/toute/query/params',
   new StaleWhileRevalidate({
      cacheName: 'api-response',
      plugins: [
         new CacheableResponsePlugin({
            statuses: [0, 200],
         }),
         new ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
         }),
      ],
   })
)

//Force a Timeout on Network Requests
//There may be network requests that would be beneficial if they were served from the network,
//but could benefit by being served by the cache if the network request is taking too long.
registerRoute(
   ({ url }) => url.origin === 'https://incumons.netlify.app',
   new NetworkFirst({
      networkTimeoutSeconds: 3,
      cacheName: 'stories',
      plugins: [
         new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 minutes
         }),
      ],
   })
)

//Cache Resources Based on Resource Type
//You can use the RequestDestination enumerate type of the destination of the
//request to determine a strategy. For example, when the target is <audio> data:
registerRoute(
   // Custom `matchCallback` function
   ({ request }) => request.destination === 'audio',
   new CacheFirst({
      cacheName: 'audio',
      plugins: [
         new ExpirationPlugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
         }),
      ],
   })
)
