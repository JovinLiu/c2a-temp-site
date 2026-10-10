import LoginForm from '../../../components/LoginForm';
import {authenticated,configured} from '../../../lib/server/auth';
import {redirect} from 'next/navigation';
export const metadata={title:'Login'};
export default async function Login(){if(await authenticated())redirect('/admin');return <main id="main" className="login-page"><div className="login-story"><p className="eyebrow light">C2A WORKSPACE</p><h1>Great projects.<br/><em>Start here.</em></h1><p>A little organisation.<br/>A world of possibilities.</p></div><LoginForm configured={configured()}/></main>}
