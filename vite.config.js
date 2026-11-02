import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: [
            {
                find: /^@\/components\//,
                replacement: `${path.resolve(__dirname, 'resources/js/Components')}/`,
            },
            {
                find: 'next/image',
                replacement: path.resolve(__dirname, 'resources/js/shims/next-image.tsx'),
            },
            {
                find: 'next/link',
                replacement: path.resolve(__dirname, 'resources/js/shims/next-link.tsx'),
            },
            {
                find: 'next/navigation',
                replacement: path.resolve(__dirname, 'resources/js/shims/next-navigation.ts'),
            },
            { find: '@', replacement: path.resolve(__dirname, 'resources/js') },
        ],
    },
    plugins: [
        laravel({
            input: 'resources/js/app.tsx',
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            publicDirectory: 'public_html',
        }),
        VitePWA({
            registerType: 'autoUpdate',
            minify: false,
            workbox: {
                mode: 'development',
            },
            manifest: {
                name: 'AMP CMS',
                short_name: 'AMP CMS',
                theme_color: '#000000',
                icons: [
                    {
                        src: '/icons/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        }),
        react(),
        // Normalizes asset metadata so Vite's manifest plugin
        // does not crash when reading chunk.names/originalFileNames.
        {
            name: 'fix-vite-manifest-asset-meta',
            apply: 'build',
            enforce: 'post',
            generateBundle(_outputOptions, bundle) {
                const assets = Object.values(bundle ?? {}).filter(
                    (o) => o?.type === 'asset',
                );

                for (const asset of assets) {
                    if (!Array.isArray(asset.names)) {
                        asset.names = [];
                    }

                    if (!Array.isArray(asset.originalFileNames)) {
                        asset.originalFileNames = [];
                    }
                }
            },
        },
    ],
});
