import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg', 'apple-touch-icon.svg'],
      manifest: {
        name: 'NeuroPhysics',
        short_name: 'NeuroPhysics',
        description: 'GCSE Physics revision built for neurodivergent learners',
        theme_color: '#0a0a0f',
        background_color: '#0a0a0f',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
          { src: 'maskable-icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
        ],
        screenshots: [
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', form_factor: 'wide', label: 'NeuroPhysics home screen' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', form_factor: 'narrow', label: 'NeuroPhysics home screen' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/(api|_)/, /\.\w+$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'gstatic-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
        ],
      },
    }),
  ],
});
