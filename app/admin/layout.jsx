import {authenticated} from '../../lib/server/auth';
import {redirect} from 'next/navigation';
import AdminNav from '../../components/AdminNav';
export const metadata={title:'Workspace',robots:{index:false,follow:false}};
export default async function AdminLayout({children}){if(!await authenticated())redirect('/login');return <div className="admin-shell"><AdminNav/>{children}</div>}
