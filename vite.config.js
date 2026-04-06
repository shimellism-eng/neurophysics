import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
          // Exam question data — only loaded when ExamPractice is first visited
          'data-exam': [
            './src/data/examCalculations.js',
            './src/data/examEquations.js',
            './src/data/examGraphs.js',
            './src/data/examPracticals.js',
            './src/data/examParticleModel.js',
            './src/data/examSpace.js',
            './src/data/examIndex.js',
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
