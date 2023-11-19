export const swSupported = navigator.serviceWorker !== undefined;

if (swSupported) {
  navigator.serviceWorker.register(window.location.origin + "/sw.js");
  
  navigator.serviceWorker.register(new URL("/sw.js", window.location.toString()), {
    // @ts-expect-error
    scope: __uv$config.prefix,
  });
}