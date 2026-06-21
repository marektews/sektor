import { ref, onBeforeUnmount } from 'vue'

/**
 * Połączenie WebSocket do powiadamiania o zmianach stanów odprawy autokarów.
 *
 * @param {string[]} topics  tematy do subskrypcji, np. ['sector:<sid>'] lub ['buffer:<name>']
 * @param {(state: {rja_id: string, status: string, ts: string}) => void} onState
 *        wołane dla każdej ramki type==='state'
 * @param {() => void} [onReconnect]
 *        wołane po (re)nawiązaniu połączenia — służy do rekoncyliacji (pełny fetch stanów)
 * @returns {{ isConnected: import('vue').Ref<boolean>, close: () => void }}
 */
export function useOdprawaSocket(topics, onState, onReconnect) {
    const isConnected = ref(false)

    let ws = null
    let closedByUser = false
    let reconnectTimer = null
    let pingTimer = null
    let attempt = 0

    const backoff = [1000, 2000, 5000, 10000] // ms

    function url() {
        const proto = location.protocol === 'https:' ? 'wss' : 'ws'
        return `${proto}://${location.host}/api/ws/odprawa`
    }

    function connect() {
        try {
            ws = new WebSocket(url())
        } catch (e) {
            console.error('WS construct error:', e)
            scheduleReconnect()
            return
        }

        ws.onopen = () => {
            isConnected.value = true
            attempt = 0
            send({ type: 'subscribe', topics })
            startPing()
            if (onReconnect) onReconnect()
        }

        ws.onmessage = (ev) => {
            let msg
            try {
                msg = JSON.parse(ev.data)
            } catch {
                return
            }
            if (msg.type === 'state' && onState) {
                onState({ rja_id: msg.rja_id, status: msg.status, ts: msg.ts })
            }
        }

        ws.onclose = () => {
            isConnected.value = false
            stopPing()
            if (!closedByUser) scheduleReconnect()
        }

        ws.onerror = () => {
            // onclose i tak nastąpi — tam jest reconnect
            if (ws) ws.close()
        }
    }

    function send(obj) {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(obj))
        }
    }

    function startPing() {
        stopPing()
        pingTimer = setInterval(() => send({ type: 'ping' }), 25000)
    }

    function stopPing() {
        if (pingTimer != null) {
            clearInterval(pingTimer)
            pingTimer = null
        }
    }

    function scheduleReconnect() {
        if (closedByUser || reconnectTimer != null) return
        const delay = backoff[Math.min(attempt, backoff.length - 1)]
        attempt++
        reconnectTimer = setTimeout(() => {
            reconnectTimer = null
            connect()
        }, delay)
    }

    function close() {
        closedByUser = true
        stopPing()
        if (reconnectTimer != null) {
            clearTimeout(reconnectTimer)
            reconnectTimer = null
        }
        if (ws) {
            ws.onclose = null
            ws.close()
            ws = null
        }
        isConnected.value = false
    }

    connect()
    onBeforeUnmount(close)

    return { isConnected, close }
}
