import Link from 'next/link';
import {pageMetadata, SITE_URL} from '../../../lib/seo';
import StructuredData from '../../../components/StructuredData';

export const metadata = pageMetadata(
  'Custom Cabinetry, Joinery & Furniture from China',
  'Source custom kitchen cabinets, wardrobes, joinery and furniture from China for Australian homes and projects. For builders, developers, designers and homeowners.',
  '/custom-cabinetry',
);

const services = [
  ['Kitchen cabinetry', 'Plan made-to-measure kitchen cabinets around your room, appliances and storage needs. Share your floor plan, preferred layout and finishes so dimensions and material choices can be considered together.'],
  ['Wardrobes & built-in storage', 'Explore fitted wardrobes, walk-in robes and storage for bedrooms and living spaces. Think through hanging space, drawers, shelves and access before confirming the internal layout.'],
  ['Whole-home joinery', 'Coordinate kitchen, laundry, bathroom and living-room joinery as one project. A consistent schedule of finishes, hardware and dimensions helps connect the design across different rooms.'],
  ['Custom furniture', 'Discuss made-to-measure furniture alongside your cabinetry, including the intended use, dimensions and finishes. We can review the brief with you and confirm which pieces and manufacturing options fit the project.'],
];
const audiences = [
  ['Homeowners', 'For renovations and new homes, start with your room measurements, inspiration and priorities. We help you discuss layout, storage and finishes in the context of your budget and project scope.'],
  ['Builders', 'Bring architectural drawings, a joinery schedule and your construction programme. Use the enquiry to clarify site measurements, delivery access, installation responsibilities and the information needed before manufacture.'],
  ['Developers', 'For residential developments, share dwelling types, quantities and target timing. Discuss repeated layouts, material selections and staging so the cabinetry scope can be considered alongside the wider build.'],
  ['Interior designers', 'Share your design intent, elevations and material palette. Discuss how dimensions, finishes and hardware choices can translate into a manufacturing brief, with details to confirm before production.'],
];
const questions = [
  ['Can I enquire from anywhere in Australia?', 'Yes. C2A welcomes enquiries from across Australia. Include your suburb and postcode so delivery, site access and installation arrangements can be discussed for your location.'],
  ['What should I send for a cabinetry enquiry?', 'Send floor plans or measurements, room or furniture requirements, reference images, preferred finishes, project location and your target timeframe. Builders and designers can also include elevations and a joinery schedule.'],
  ['What affects the cost of cabinetry from China?', 'Dimensions, quantities, board and finish selections, hardware, custom details, freight and installation requirements all affect the scope. Ask for a project-specific quotation and confirm what is included before comparing options.'],
  ['How long does a custom cabinetry project take?', 'Timing depends on design approvals, material selections, manufacturing, shipping and site readiness. Share your programme at the start so milestones and dependencies can be discussed before you commit.'],
  ['How are delivery and installation handled?', 'Delivery and installation requirements are considered as part of your project discussion. Confirm the destination, access conditions, site readiness, responsible parties and included services in your quotation.'],
];

export default function CustomCabinetry() {
  return <main id="main" className="inner-page">
    <StructuredData data={{'@context':'https://schema.org','@type':'Service',name:'Custom cabinetry, joinery and furniture from China to Australia',serviceType:'Custom cabinetry, joinery and made-to-measure furniture sourcing',url:`${SITE_URL}/custom-cabinetry`,provider:{'@id':`${SITE_URL}/#organization`, '@type':'Organization',name:'C2A Cabinetry',url:SITE_URL},areaServed:{'@type':'Country',name:'Australia'}}}/>
    <section className="section page-intro">
      <p className="eyebrow">CHINA TO AUSTRALIA · MADE FOR YOUR PROJECT</p>
      <h1>Custom cabinetry.<br/><em>Joinery &amp; furniture.</em></h1>
      <p className="body-copy">Connect your Australian project with custom manufacturing in China. C2A brings cabinetry design, sourcing and project coordination into one conversation, from a single room to whole-home joinery.</p>
      <p className="body-copy">We welcome enquiries across Australia from homeowners, builders, residential developers and interior designers. Start with your plans; together we can clarify the scope, materials and next steps.</p>
      <a className="pill dark" href="mailto:liujovin@gmail.com?subject=Cabinetry%20project%20enquiry">Discuss your project ↗</a>
    </section>
    <section className="section seo-section" aria-labelledby="services-heading">
      <p className="eyebrow">WHAT WE CAN DISCUSS</p><h2 id="services-heading">From kitchen cabinets<br/>to considered custom pieces.</h2>
      <div className="seo-grid">{services.map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
      <Link className="underlined" href="/why-made-in-china">How our China-to-Australia process works ↗</Link>
    </section>
    <section className="section seo-section seo-tinted" aria-labelledby="audience-heading">
      <p className="eyebrow">A CLEAR START FOR EVERY PROJECT</p><h2 id="audience-heading">For your home.<br/>For your project team.</h2>
      <div className="seo-grid">{audiences.map(([title,description])=><article key={title}><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className="section seo-section" aria-labelledby="questions-heading">
      <p className="eyebrow">BEFORE YOU BEGIN</p><h2 id="questions-heading">Sourcing cabinetry from China.</h2>
      <div className="seo-questions">{questions.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      <p className="body-copy">Learn <Link className="underlined" href="/about">about C2A Cabinetry</Link> or visit <Link className="underlined" href="/projects">our project portfolio</Link>.</p>
    </section>
    <section className="section contact-cta"><h2>Bring your plans.<br/><em>Let’s talk through the details.</em></h2><a className="pill dark" href="mailto:liujovin@gmail.com">Enquire about your project ↗</a><a className="contact-phone" href="tel:+61413685018">0413 685 018</a></section>
  </main>;
}
