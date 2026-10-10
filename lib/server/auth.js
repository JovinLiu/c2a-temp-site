import {cookies} from 'next/headers';
import {createHmac, timingSafeEqual} from 'node:crypto';
export const COOKIE='c2a_admin_session';
function equal(a,b){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y)}
export function configured(){return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET?.length>=32)}
function sign(s){return createHmac('sha256',process.env.SESSION_SECRET).update(s).digest('base64url')}
export function credentialsMatch(u,p){return configured()&&equal(u,process.env.ADMIN_USERNAME)&&equal(p,process.env.ADMIN_PASSWORD)}
export function createToken(){const p=Buffer.from(JSON.stringify({exp:Date.now()+86400000,user:process.env.ADMIN_USERNAME})).toString('base64url');return `${p}.${sign(p)}`}
export async function authenticated(){if(!configured())return false;try{const token=(await cookies()).get(COOKIE)?.value||'';const parts=token.split('.');if(parts.length!==2||!equal(sign(parts[0]),parts[1]))return false;const p=JSON.parse(Buffer.from(parts[0],'base64url').toString());return p.exp>Date.now()&&p.user===process.env.ADMIN_USERNAME}catch{return false}}
export function sameOrigin(request){try{const origin=new URL(request.headers.get('origin'));return ['http:','https:'].includes(origin.protocol)&&origin.host===request.headers.get('host')}catch{return false}}
export const cookieOptions={httpOnly:true,sameSite:'strict',secure:process.env.NODE_ENV==='production',path:'/',maxAge:86400};
