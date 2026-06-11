import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: "Une vie à construire — SMV La Rochelle",
        short_name: 'SMV',
        description:
          "Visual novel pixel art : vis une simulation du parcours au 3e Régiment du Service Militaire Volontaire de La Rochelle.",
        theme_color: '#1E2B4A',
        background_color: '#12192B',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'fr',
        icons: [
          { src: 'icon-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        // Les assets utilisateur (décors, sprites, audio) ne sont jamais précachés :
        // un fichier lourd déposé dans public/ ne doit pas casser le build.
        globIgnores: ['**/images/**', '**/audio/**'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          },
          {
            // Décors, sprites et audio fournis : cache au premier usage (offline ensuite)
            urlPattern: /\/(images|audio)\/.*\.(png|jpg|webp|mp3|ogg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'game-assets',
              expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 365 }
            }
          }
        ]
      }
    })
  ],
  build: { target: 'es2020' }
});
