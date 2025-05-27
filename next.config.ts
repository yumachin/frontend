import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

declare module 'next-pwa' {
  interface PWAConfig {
    workboxOptions?: {
      navigateFallbackDenylist?: RegExp[];
      runtimeCaching?: Array<{
        urlPattern: RegExp;
        handler: string;
        options?: {
          cacheName: string;
          expiration?: {
            maxEntries: number;
            maxAgeSeconds: number;
          };
        };
      }>;
    };
  }
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

// PWA設定
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  workboxOptions: {
    navigateFallbackDenylist: [/\/__\/auth\//, /\/api\//],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1年
          },
        },
      },
    ],
  },
});

export default {
  ...nextConfig,
  ...pwaConfig,
};