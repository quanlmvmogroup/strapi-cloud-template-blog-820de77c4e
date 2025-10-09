/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd().replace('/next', ''),
  },
  images: {
    remotePatterns: [
      { hostname: process.env.IMAGE_HOSTNAME, protocol: 'https' },
      {
        hostname: 'localhost',
        protocol: 'http',
      },
    ],
  },
  pageExtensions: ['ts', 'tsx'],
  async rewrites() {
    return [
      {
        source: '/:locale/flags/:path*',
        destination: '/flags/:path*',
      },
    ];
  },
  async redirects() {
    let redirections = [];
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirections`
      );
      const result = await res.json();
      const redirectItems = result.data.map(({ source, destination }) => {
        return {
          source: `/:locale${source}`,
          destination: `/:locale${destination}`,
          permanent: false,
        };
      });

      redirections = redirections.concat(redirectItems);

      return redirections;
    } catch (error) {
      return [];
    }
  },
};

export default nextConfig;
