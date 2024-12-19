---
title: Static Pages
description: Statically generate a dynamic list of routes
weight: 11
vimeo: 902736844
video_length: 01:23
free: false
date: "2023-01-08"
---


```ts title="page.tsx"
import { Metadata } from 'next';

export const dynamic = 'force-static'; // no necessary, just for demonstration

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About NextSpace',
};

export default function Blog() {
  return (
    <div>
      <h1>About us</h1>
      <p>We are a social media company that wants to bring people together!</p>
    </div>
  );
}
```