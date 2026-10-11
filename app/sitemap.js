import {SITE_URL} from '../lib/seo';
import {readStore} from '../lib/server/store';
export const dynamic = 'force-dynamic';
export default async function sitemap() {
  const pages = ['/', '/custom-cabinetry', '/why-made-in-china', '/about', '/projects'];
  const stories = (await readStore()).stories.filter(story => story.published);
  return [
    ...pages.map(path => ({url: new URL(path, SITE_URL).href})),
    ...stories.map(story => {
      const modified = new Date(story.updatedAt || story.createdAt);
      return {
        url: `${SITE_URL}/projects/${encodeURIComponent(story.id)}`,
        ...(Number.isNaN(modified.getTime()) ? {} : {lastModified: modified}),
        images: (story.media || []).filter(item => item.type.startsWith('image/')).map(item => `${SITE_URL}/media/${encodeURIComponent(item.name)}`),
      };
    }),
  ];
}
