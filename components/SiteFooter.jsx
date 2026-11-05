import { CONTACT } from '../lib/config/site.js';
import Link from 'next/link';
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="wordmark">
          C2A<span>CABINETRY</span>
        </Link>
        <p>
          From China to Australia.
          <br />
          Made for the way you live.
        </p>
      </div>
      <div>
        <small>LET’S MAKE IT YOURS</small>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email} ↗</a>
        <a href={`tel:${CONTACT.localPhone}`}>{CONTACT.phoneLabel}</a>
      </div>
      <nav className="footer-services" aria-label="Services">
        <Link href="/custom-cabinetry">Custom cabinetry, joinery &amp; furniture</Link>
        <Link href="/why-made-in-china">Why choose C2A</Link>
        <Link href="/projects">Our projects</Link>
        <Link href="/about">About C2A</Link>
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} C2A Cabinetry</span>
        <span>Thoughtful design. Beautiful everyday living.</span>
      </div>
    </footer>
  );
}
