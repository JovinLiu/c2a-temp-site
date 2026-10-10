'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
export default function AdminNav(){const path=usePathname();const [error,setError]=useState('');return <header className="admin-nav no-print"><Link className="wordmark" href="/admin">C2A<span>WORKSPACE</span></Link><nav aria-label="Workspace navigation">{[['/admin','Overview'],['/admin/board','Project Board'],['/admin/agreements','Agreements'],['/admin/publishing','Publishing']].map(([url,label])=><Link className={path===url?'active':''} href={url} key={url}>{label}</Link>)}</nav><Link href="/">View website ↗</Link><button onClick={async()=>{try{const r=await fetch('/api/auth',{method:'DELETE'});if(!r.ok)throw Error();window.location.href='/login'}catch{setError('Could not sign out. Please retry.')}}}>Sign out</button>{error&&<span role="alert">{error}</span>}</header>}
