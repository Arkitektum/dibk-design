# DIBK design

Shared components for DIBK applications

## How To Run Locally

```bash
$ pnpm install
$ pnpm run build
$ pnpm run build-storybook
$ pnpm run storybook
```

## Use with Next.js and Tailwind

1. Import `dibk-design.css` file in your `globals.css`

```css
@import 'tailwindcss';
@import './node_modules/dibk-design/dist/dibk-design.css';
```

2. Import component from the library

```jsx
"use client"
import React from 'react'
import { Button } from 'dibk-design'

const Home = () => {
  return (
    <main>
      <Button onClick={()=>{void}} size="small" color="primary" content="Button">
          I'm a button
      </Button>
    </div>
  )
}

export default Home
```
