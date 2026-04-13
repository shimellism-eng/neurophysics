import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png'],
      manifest: false, // already have public/manifest.json
      workbox: {
        // App shell — cache on install (exclude large practicals infographics)
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}', '*.png'],
        globIgnores: ['practicals/**'],
        // Runtime caching
        runtimeCaching: [
          {
            // Google Fonts CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-css',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // Google Fonts files
            urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            // CDN fonts (OpenDyslexic)
            urlPattern: /^https:\/\/fonts\.cdnfonts\.com\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdnfonts',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Supabase auth — network first, fall back to cache
            urlPattern: /^https:\/\/.*\.supabase\.co\/auth\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-auth',
              networkTimeoutSeconds: 10,
            },
          },
          {
            // All API endpoints — always network, never cache
            urlPattern: /\/api\//,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    target: 'es2020',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Stable vendor libs — cached independently
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['motion/react'],
          'vendor-ui': ['lucide-react'],
          'vendor-sentry': ['@sentry/react'],
          // Exam question data — only loaded when ExamPractice is first visited
          'data-exam': [
            './src/data/examCalculations.js',
            './src/data/examEquations.js',
            './src/data/examGraphs.js',
            './src/data/examPracticals.js',
            './src/data/examParticleModel.js',
            './src/data/examSpace.js',
            './src/data/examIndex.js',
            './src/data/examChained.js',
            './src/data/examDiagramQs.js',
            './src/data/examDiagrams.jsx',
            './src/data/examExtended.js',
            './src/data/examNovelContext.js',
            './src/data/examRPAErrors.js',
          ],
          // Diagnostic question data — only loaded when DiagnosticQuestion is first visited
          'data-questions': [
            './src/data/questionBank.js',
            './src/data/interactiveQuestions.js',
            './src/data/interactiveQuestions2.js',
            './src/data/interactiveIndex.js',
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api/anthropic': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
      },
    },
  },
})
