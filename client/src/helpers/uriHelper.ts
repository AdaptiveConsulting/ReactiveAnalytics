
const address = process.env.REACT_APP_ANALYTICS_SERVER_HOST || window.location.hostname
const isSecure = process.env.REACT_APP_ANALYTICS_SERVER_HTTPS || window.location.protocol === 'https:'
const { http, ws } = isSecure ? { http: 'https', ws: 'wss' } : { http: 'http', ws: 'ws' }

export function getUri(path: string) {
    return `${http}://${address}${path}`
}

export function getWebsocketUri(path: string) {
    return `${ws}://${address}${path}`
}