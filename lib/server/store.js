import {readFile,writeFile,mkdir,rename} from 'node:fs/promises';
import path from 'node:path';
export const dataDir=path.resolve(/* turbopackIgnore: true */ process.env.DATA_DIR||'.data');
const dbPath=path.join(dataDir,'workspace.json');
const initial=()=>({board:[],stories:[]});
export async function readStore(){try{return JSON.parse(await readFile(dbPath,'utf8'))}catch(error){if(error.code==='ENOENT')return initial();throw error}}
let queue=Promise.resolve();
export function mutateStore(fn){const job=queue.then(async()=>{await mkdir(dataDir,{recursive:true});const db=await readStore();const result=await fn(db);const temp=dbPath+'.tmp';await writeFile(temp,JSON.stringify(db,null,2));await rename(temp,dbPath);return result});queue=job.catch(()=>{});return job}
