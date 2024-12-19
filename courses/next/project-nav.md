---
title: Navigation
description: Create a navigation menu
weight: 10
vimeo: 902736844
video_length: 01:16
free: false
date: "2023-01-08"
---

```ts title="App.tsx"
import Link from 'next/link';
import styles from './NavMenu.module.css';
import Image from 'next/image';

export default function NavMenu() {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>
        <Image
          src="/logo.svg" // Route of the image file
          width={216}
          height={30}
          alt="NextSpace Logo"
        />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/blog'}>Blog</Link>
        </li>
        <li>
          <Link href={'/users'}>Users</Link>
        </li>
      </ul>
    </nav>
  );
}
```