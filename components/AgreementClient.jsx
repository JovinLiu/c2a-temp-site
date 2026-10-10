'use client';
import dynamic from 'next/dynamic';
const Editor=dynamic(()=>import('../src/App'),{ssr:false,loading:()=> <p className="admin-main">Loading agreements…</p>});
export default function AgreementClient(){return <Editor/>}
