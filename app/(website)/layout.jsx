import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
export default function Layout({children}){return <div className="website"><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></div>}
