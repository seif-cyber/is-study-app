import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// GitHub Pages serves the app from /is-study-app/; Firebase Hosting serves it from / (VITE_BASE=/ in .env.firebase).
export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '').VITE_BASE || '/is-study-app/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'IS Study App — مذاكرة IS',
        short_name: 'IS Study',
        description: 'شرح محاضرات وسكاشن قسم IS + اختبارات MCQ ومراجعات',
        lang: 'ar',
        dir: 'rtl',
        theme_color: '#1d4ed8',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,jpg,woff2,woff}'],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
}));
