import React from 'react'
import Links from './links/links'
import styles from './navbar.module.css';
import Link from 'next/link';
import { auth, SessionType } from '@/lib/auth';

const Navbar = async () => {

  const session = await auth() as SessionType // Get the session data

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>Logo</Link>
      <div>
       <Links session={session}/>
      </div>
    </div>
  )
}

export default Navbar;