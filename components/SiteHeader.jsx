'use client';
import Link from 'next/link';
import { MAIN_NAVIGATION } from '../lib/config/site.js';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header site-header-glass">
      <Link href="/" className="wordmark" onClick={() => setOpen(false)}>
        C2A Cabinetry
      </Link>
      <button
        className="menu-toggle"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? 'Close' : 'Menu'} ☰
      </button>
      <nav aria-label="Main navigation" className={open ? 'open' : ''}>
        {MAIN_NAVIGATION.map(([url, label]) => (
          <Link
            key={url}
            href={url}
            className={path === url ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link className="login-link" href="/login" onClick={() => setOpen(false)}>
          Login <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
