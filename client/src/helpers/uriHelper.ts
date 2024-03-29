const address =
  import.meta.env.VITE_ANALYTICS_SERVER_HOST || window.location.hostname
const isSecure =
  import.meta.env.VITE_ANALYTICS_SERVER_HTTPS ||
  window.location.protocol === "https:"
const { http, ws } = isSecure
  ? { http: "https", ws: "wss" }
  : { http: "http", ws: "ws" }

export function getUri(path: string) {
  return `${http}://${address}${path}`
}

export function getWebsocketUri(path: string) {
  return `${ws}://${address}${path}`
}
