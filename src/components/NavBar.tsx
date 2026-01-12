import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return(
        <>
        <nav className={styles.navBar}>
            <div className={styles.navBarContent}>
                {/* Chess Sweeper */}
                <div className={styles.navBarTitle}>
                    Chess Sweeper
                </div>

                {/* Page table */}
                <div className={styles.navBarPageIndex}>
                    <CustomLink href="/daily"> Daily </CustomLink>
                    <CustomLink href="/random"> Random </CustomLink>
                    <CustomLink href="/leaderboard"> Leaderboard </CustomLink>
                    <CustomLink href="/rule"> Rule </CustomLink>
                </div>
            </div>
        </nav>
        <div className={styles.navBarPadding}></div>
        </>
    );
}

type navBarPageCustomLinkProps = {
    href: string;
    children?: string;
}

function CustomLink({ href, children } : navBarPageCustomLinkProps) {
    const path = window.location.pathname;
    return (
        <>
        {/* give class of navBarPage and (if current page:) active */}
        <Link to={href} className={`${styles.navBarPage} ${path === href ? styles.active : ""}`}>
            {children}
        </Link>
        </>
    );
}