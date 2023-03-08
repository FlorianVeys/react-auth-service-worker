let config;

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CONFIG') {
    config = event.data.payload
  }
});

self.addEventListener("fetch", (event) => {

  if (config) {
    const newRequest = new Request(event.request, {
      headers: {
        ...event.request.headers,
        ...config.headers,
      },
    });
    console.log(newRequest);
    event.waitUntil(event.respondWith(fetch(newRequest)));
    return;
  }
});
