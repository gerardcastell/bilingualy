import { registerRoute } from "workbox-routing";
import { precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { BackgroundSyncPlugin } from "workbox-background-sync";
import { Queue } from "workbox-background-sync";
import { skipWaiting, clientsClaim } from "workbox-core";

skipWaiting();
clientsClaim();

import {
  CacheFirst,
  StaleWhileRevalidate,
  NetworkOnly,
  NetworkFirst,
} from "workbox-strategies";
// manifest import will be autogenerated by webpack
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  /\.(?:js|css|scss)$/,
  new NetworkFirst({
    cacheName: "static-resources",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 20 * 24 * 60 * 60, // 20 Days
      }),
    ],
  })
);

registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: "image-cache",
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  /https:\/\/api\.arasaac\.org\/api\/pictograms\/\d+/,
  new CacheFirst({
    cacheName: "pictogram-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60, // 60 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  new RegExp("https://api\\.arasaac\\.org/api/pictograms/(es||en)/search/*"),
  new CacheFirst({
    cacheName: "search-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60, // 60 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

const bgSyncPlugin = new BackgroundSyncPlugin("postedStoriesQueue", {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});
registerRoute(
  /https:\/\firestore\.googleapis\.com\/google\.firestore\.v1\.Firestore\/Write\/*/,
  new NetworkOnly({
    plugins: [bgSyncPlugin],
  }),
  "POST"
);
//This code is used to make a queue with all the request
// const queue = new Queue("backgroundSyncQueue");

// self.addEventListener("fetch", (event) => {
//   // Clone the request to ensure it's safe to read when
//   // adding to the Queue.
//   const promiseChain = fetch(event.request.clone()).catch((err) => {
//     return queue.pushRequest({ request: event.request });
//   });

//   event.waitUntil(promiseChain);
// });
