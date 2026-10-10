import '../src/styles/global.css';
import '../src/styles/editor.css';
import '../src/styles/print.css';
import './site.css';
export const metadata = { title: { default: 'C2A Cabinetry — Made for your everyday', template: '%s | C2A Cabinetry' }, description: 'Thoughtfully designed custom cabinetry. From China to Australia, from your first idea to the final installation.' };
export default function RootLayout({children}) { return <html lang="en" data-scroll-behavior="smooth"><body>{children}</body></html>; }
