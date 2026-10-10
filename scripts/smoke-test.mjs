import assert from 'node:assert/strict';
import {randomUUID} from 'node:crypto';
import {readFile,unlink} from 'node:fs/promises';
import path from 'node:path';
process.loadEnvFile('.env.local');
const base='http://127.0.0.1:3000';
let cookie='';
const req=(url,opts={})=>fetch(base+url,{redirect:'manual',...opts,headers:{Origin:base,...(cookie?{Cookie:cookie}:{}),...opts.headers}});
const json=(url,data)=>req(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
assert.equal((await req('/admin')).status,307);
assert.equal((await req('/api/workspace')).status,401);
assert.equal((await json('/api/auth',{username:'admin',password:'incorrect'})).status,401);
const login=await json('/api/auth',{username:process.env.ADMIN_USERNAME,password:process.env.ADMIN_PASSWORD});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
for(const url of ['/','/about','/why-made-in-china','/projects','/admin','/admin/board','/admin/agreements','/admin/publishing'])assert.equal((await req(url)).status,200,url);
assert.equal((await req('/api/workspace',{method:'POST',headers:{Origin:'https://example.invalid','Content-Type':'application/json'},body:'{}'})).status,403);
const id=randomUUID(),storyId=randomUUID();let mediaName;
try{
 let r=await json('/api/workspace',{action:'save',item:{id,name:'QA temporary project',client:'Test client',owner:'QA',status:'Design',priority:'High',due:'2026-11-01'}});assert.equal(r.status,200);
 r=await json('/api/workspace',{action:'save',item:{id,name:'QA temporary project',status:'Production',priority:'Normal'}});assert.equal((await r.json()).board.find(p=>p.id===id).status,'Production');
 const form=new FormData();for(const [k,v] of Object.entries({action:'save',id:storyId,title:'QA temporary story',description:'Test upload and publication.',published:'false',keep:'[]'}))form.set(k,v);
 form.set('media',new Blob([await readFile('src/assets/c2a-cabinetry-logo.png')],{type:'image/png'}),'qa.png');
 r=await req('/api/stories',{method:'POST',body:form});assert.equal(r.status,200);let s=(await r.json()).find(s=>s.id===storyId);mediaName=s.media[0].name;
 assert.equal((await fetch(base+'/media/'+mediaName)).status,404,'Draft media stays private');
 assert.equal((await req('/media/'+mediaName)).status,200);
 const publish=new FormData();for(const [k,v] of Object.entries({action:'save',id:storyId,title:s.title,description:s.description,published:'true',keep:JSON.stringify([mediaName])}))publish.set(k,v);
 assert.equal((await req('/api/stories',{method:'POST',body:publish})).status,200);
 assert.equal((await fetch(base+'/media/'+mediaName)).status,200);
 assert.equal((await fetch(base+'/projects/'+storyId)).status,200);
 assert.equal((await fetch(base+'/media/'+mediaName,{headers:{Range:'bytes=0-9'}})).status,206);
 assert.equal((await fetch(base+'/media/'+mediaName,{headers:{Range:'bytes=999999999-'}})).status,416);
 publish.set('published','false');await req('/api/stories',{method:'POST',body:publish});
 assert.equal((await fetch(base+'/projects/'+storyId)).status,404,'Unpublished story hidden');
 console.log('PASS: routes, login, access control, origin checks, board persistence, media upload, draft privacy, publishing, unpublishing and range requests.');
}finally{
 await json('/api/workspace',{action:'delete',item:{id}});
 const cleanup=new FormData();cleanup.set('action','delete');cleanup.set('id',storyId);await req('/api/stories',{method:'POST',body:cleanup});
 if(mediaName)await unlink(path.join(process.env.DATA_DIR||'.data','media',mediaName));
}
assert.equal((await req('/api/auth',{method:'DELETE'})).status,200);console.log('PASS: logout. Test records removed.');
