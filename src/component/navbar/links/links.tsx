"use client";

import {useState} from 'react'
import styles from './links.module.css'
import NavLink from '../navLink/NavLink'
import Image from 'next/image';
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
        <Image src='/menu.png' alt='mobile menu icon' width={30} height={30} onClick={() => setOpen((prev) => !prev)} className={styles.menuButton}/>
        {
            open && <div className={styles.mobileLinks}>
               { links.map((link) => (
                <NavLink item={link} key={link.title}/>
               ))}

            </div>
        }
    </div>
  )
}

export default Links;