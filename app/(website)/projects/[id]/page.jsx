import Link from 'next/link';
import {notFound} from 'next/navigation';
import {readStore} from '../../../../lib/server/store';
import Media from '../../../../components/Media';
export const dynamic='force-dynamic';
export default async function Project({params}){const {id}=await params;const story=(await readStore()).stories.find(s=>s.id===id&&s.published);if(!story)notFound();return <main id="main" className="inner-page"><section className="section page-intro"><Link className="underlined" href="/projects">← All projects</Link><p className="eyebrow">{story.category} {story.location&&' / '+story.location}</p><h1>{story.title}</h1><p className="body-copy story-description">{story.description}</p></section><section className="section story-gallery">{story.media.map(m=><Media key={m.name} item={m}/>)}</section></main>}
