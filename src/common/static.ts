import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function getStaticLink(url) {
  if (!url) return null;
  if (!publicRuntimeConfig?.cdnUrl) return null;

  if (!url.startsWith('/static')) return url;

  return `${publicRuntimeConfig?.cdnUrl}${url}`;
}
