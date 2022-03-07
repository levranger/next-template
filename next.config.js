/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

console.info('Starting with API_URL', process.env.API_URL);
console.info('CDN url is set to', process.env.STATIC_CDN_URL);

module.exports = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });
    return config;
  },
  webpackDevMiddleware: (config) => config,
  publicRuntimeConfig: {
    cdnUrl: process.env.STATIC_CDN_URL,
    apiUrl: process.env.API_URL,
    apiWsUrl: process.env.API_WS_URL,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
});
