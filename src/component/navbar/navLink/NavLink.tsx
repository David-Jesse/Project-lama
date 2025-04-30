"use client";

import { usePathname } from 'next/navigation';
import styles from './navlink.module.css'
import Link from 'next/link'

interface NavLinkProps {
  item: {
    path: string;
    title: string;
  };
}

const NavLink = ({ item }: NavLinkProps) => {

    const pathName = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
        {item.title}
    </Link>
  )
}

export default NavLink;

