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
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2,otf}', '*.png'],
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
            // Supabase auth/data — always network, never cache user-specific responses.
            urlPattern: /^https:\/\/.*\.supabase\.co\//,
            handler: 'NetworkOnly',
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
          // Exam question data — split into cacheable secondary chunks.
          'data-exam-diagrams': [
            './src/data/examDiagramQs.js',
            './src/data/examDiagrams.jsx',
          ],
          'data-exam-calculations': [
            './src/data/examCalculations.js',
            './src/data/examEquations.js',
          ],
          'data-exam-extended': [
            './src/data/examExtended.js',
            './src/data/examNovelContext.js',
            './src/data/examChained.js',
          ],
          'data-exam-practicals': [
            './src/data/examPracticals.js',
            './src/data/examRPAErrors.js',
            './src/data/examGraphs.js',
          ],
          'data-exam-topics': [
            './src/data/examParticleModel.js',
            './src/data/examSpace.js',
          ],
          'data-exam-core': [
            './src/data/examIndex.js',
          ],
          // Topic lesson data is shared by exam filtering and route screens.
          'data-topics-waves': [
            './src/data/topics-waves.jsx',
          ],
          'data-topics-forces': [
            './src/data/topics-forces.jsx',
          ],
          'data-topics-matter': [
            './src/data/topics-matter.jsx',
          ],
          'data-topics-energy-electricity': [
            './src/data/topics-energy.jsx',
            './src/data/topics-electricity.jsx',
          ],
          'data-topics-extra': [
            './src/data/topics-practicals.jsx',
            './src/data/topics-keyconcepts.jsx',
            './src/data/topics-globalchallenges.jsx',
            './src/data/topics-universe.jsx',
            './src/data/topics.jsx',
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
