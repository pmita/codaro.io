---
title: API Routes
description: Create a basic API endpoint
weight: 12
vimeo: 902736844
video_length: 01:16
free: false
date: "2023-01-08"
---


```ts title="route.ts"
import { NextResponse } from 'next/server';

// Dummy data
const posts = [
  {
    title: 'Lorem Ipsum',
    slug: 'lorem-ipsum',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  },
];

export async function GET() {
  return NextResponse.json(posts);
}
```