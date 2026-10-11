import {SITE_URL} from '../lib/seo';
export default function robots() {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return {rules: {userAgent: '*', disallow: '/'}};
  }
  return {
    rules: {userAgent: '*', allow: '/', disallow: ['/admin', '/api/']},
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
