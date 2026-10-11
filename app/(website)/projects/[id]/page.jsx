import {cache} from 'react';
import {pageMetadata, SITE_URL} from '../../../../lib/seo';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {readStore} from '../../../../lib/server/store';
import Media from '../../../../components/Media';
export const dynamic='force-dynamic';
const getStory = cache(async id => (await readStore()).stories.find(s => s.id === id && s.published));
export async function generateMetadata({params}) {
  const {id} = await params;
  const story = await getStory(id);
  if (!story) notFound();
  const description = story.description.replace(/\s+/g, ' ').trim().slice(0, 160);
  const metadata = pageMetadata(story.title, description, '/projects/' + encodeURIComponent(id));
  const cover = story.media.find(item => item.type.startsWith('image/'));
  if (cover) metadata.openGraph.images = [{url: `${SITE_URL}/media/${encodeURIComponent(cover.name)}`, alt: cover.alt || story.title}];
  return metadata;
}
export default async function Project({params}){const {id}=await params;const story=await getStory(id);if(!story)notFound();return <main id="main" className="inner-page"><section className="section page-intro"><Link className="underlined" href="/projects">← All projects</Link><p className="eyebrow">{story.category} {story.location&&' / '+story.location}</p><h1>{story.title}</h1><p className="body-copy story-description">{story.description}</p></section><section className="section story-gallery">{story.media.map(m=><Media key={m.name} item={m}/>)}</section></main>}
