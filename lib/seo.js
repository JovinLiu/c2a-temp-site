import { SITE_URL, SITE_NAME, CONTACT } from './config/site.js';
export { SITE_URL, SITE_NAME } from './config/site.js';
export const DEFAULT_DESCRIPTION =
  'Custom cabinetry, joinery and made-to-measure furniture from China to Australia. Explore options for homeowners, builders, developers and interior designers.';

export function pageMetadata(title, description, path) {
  const url = new URL(path, SITE_URL).href;
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: { card: 'summary', title: fullTitle, description },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    areaServed: { '@type': 'Country', name: 'Australia' },
  };
}
