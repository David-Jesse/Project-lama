"use client";

import {useState} from 'react'
import styles from './links.module.css'
import NavLink from '../navLink/NavLink'
import { handleLogout } from '@/lib/action';
import { SessionType } from '@/lib/auth';

const links = [
    {
        title: "Home",
        path: '/'
    },
    {
        title: "About",
        path: '/about'
    },
    {
        title: "Contact",
        path: '/contact'
    },
    {
        title: "Blog",
        path: '/blog'
    }
]

export interface LinksProps {
    session: SessionType
}

const Links = ({session}: LinksProps) => {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    }

  return (
    <div className={styles.container}>

        <div className={styles.links}>
            {links.map((link => (
                <NavLink item={link} key={link.title}/>
                )))} {
                session?.user ? (
                    <>
                        {session.user?.isAdmin && (
                        <NavLink item={{title: "Admin", path: "/admin"}}/>)}
                        <form action={handleLogout}>
                            <button className={styles.logout}>Logout</button>  
                        </form>
                    </>
                
                ) : (
                    <NavLink item={{title: "login", path: "/login"}}/>
                )
            }
        </div>
        <>
            <button
                className={`${styles.hamburger} ${open ? styles.active : ""}`}
                onClick={() => setOpen(prev => !prev)}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
            </button>

            {open && (
                <div className={styles.mobileLinks}>
                    {links.map((link) => (
                        <div onClick={handleLinkClick} key={link.title}>
                            <NavLink item={link} />
                        </div>
                    ))}
                </div>
            )}
        </>
    </div>
  )
}

export default Links;