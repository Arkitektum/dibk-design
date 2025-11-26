# DIBK design

Shared components for DIBK applications

## Getting Started

1.  **Install Dependencies**

    This project uses [pnpm](https://pnpm.io/) as the package manager.
    ```bash
    pnpm install
    ```

2.  **Run Storybook for Development**

    To view and work on components in isolation, run the Storybook development server:
    ```bash
    pnpm run storybook
    ```
    This will open Storybook in your browser, usually at `http://localhost:6006`.

## Building for Production

When you need to create a distributable version of the library or the Storybook site, use the following commands.

### Build Library
Bundles the library for production and generates TypeScript types. The output is saved to the `/dist` folder.
```bash
pnpm run build
```

### Build TypeScript Types
Only generates the TypeScript declaration files (`.d.ts`).
```bash
pnpm run build:types
```

### Build Storybook
Builds the Storybook as a static web application. The output is saved to the `/storybook-static` folder.
```bash
pnpm run build-storybook
```

## Use with Next.js

1. Import `dibk-design.css` file in your `globals.css`

```css
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
      <Button onClick={() => {}} size="small" color="primary" content="Button">
          I'm a button
      </Button>
    </main>
  )
}

export default Home
```
