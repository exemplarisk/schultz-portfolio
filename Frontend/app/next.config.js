/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config, { dev }) => {
    if (dev) {
      const ignored = config.watchOptions?.ignored ?? [];
      const ignoredEntries = Array.isArray(ignored) ? ignored : [ignored];

      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          ...ignoredEntries,
          "**/node_modules/**",
          "**/.git/**",
          "C:\\DumpStack.log.tmp",
          "C:\\hiberfil.sys",
          "C:\\pagefile.sys",
          "C:\\swapfile.sys",
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig
