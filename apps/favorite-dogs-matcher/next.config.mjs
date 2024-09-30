// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'frontend-take-home.fetch.com' },
    ],
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      // if fetch-access-token cookie is not present, redirect to /
      {
        source: '/dashboard',
        missing: [
          { type: 'cookie', key: 'fetch-access-token' },
          { type: 'header', key: 'next-action' }, // Exclude Server Actions
        ],
        destination: '/',
        permanent: false,
      },
      {
        source: '/match/:id',
        missing: [
          { type: 'cookie', key: 'fetch-access-token' },
          { type: 'header', key: 'next-action' }, // Exclude Server Actions
        ],
        destination: '/',
        permanent: false,
      },

      // if fetch-access-token cookie is present, redirect to /dashboard
      {
        source: '/',
        has: [{ type: 'cookie', key: 'fetch-access-token' }],
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
