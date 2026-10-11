import {SITE_URL, DEFAULT_DESCRIPTION} from '../lib/seo';
import '../src/styles/global.css';
import '../src/styles/editor.css';
import '../src/styles/print.css';
import './site.css';
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Custom Cabinetry from China to Australia | C2A Cabinetry', template: '%s | C2A Cabinetry' },
  description: DEFAULT_DESCRIPTION,
  ...(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production' ? {robots: {index: false, follow: false}} : {}),
};
export default function RootLayout({children}) { return <html lang="en-AU" data-scroll-behavior="smooth"><body>{children}</body></html>; }
