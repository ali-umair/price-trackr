import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true,     // Expose to LAN (or ngrok)
        port: 5000,     // Must match ngrok port
        allowedHosts: [
            'all' // Add the ngrok host here
        ]
    }
});