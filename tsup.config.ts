import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/websocket/WebSocketServer.ts','src/websocket/WebSocketClient.ts'],
    splitting: false,
    sourcemap: true,
    clean: true,
    format: ['esm', 'cjs']
})