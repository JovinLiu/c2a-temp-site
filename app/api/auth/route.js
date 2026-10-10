import {NextResponse} from 'next/server';
import {COOKIE,configured,credentialsMatch,createToken,cookieOptions,sameOrigin} from '../../../lib/server/auth';
const attempts=new Map();
export async function POST(request){if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});if(!configured())return NextResponse.json({error:'Admin access is not configured. Add the credentials to .env.local.'},{status:503});
// Single-admin local preview: one shared throttle also avoids trusting forwarded IP headers.
const now=Date.now();let entry=attempts.get('admin');if(!entry||entry.until<now){entry={count:0,until:now+60000};attempts.set('admin',entry)}if(entry.count>=8)return NextResponse.json({error:'Too many attempts. Please try again in a minute.'},{status:429});entry.count++;
let data;try{data=await request.json()}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}if(typeof data.username!=='string'||typeof data.password!=='string'||!credentialsMatch(data.username,data.password))return NextResponse.json({error:'Incorrect username or password.'},{status:401});attempts.delete('admin');const response=NextResponse.json({ok:true});response.cookies.set(COOKIE,createToken(),cookieOptions);return response}
export async function DELETE(request){if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});const response=NextResponse.json({ok:true});response.cookies.set(COOKIE,'',{...cookieOptions,maxAge:0});return response}
