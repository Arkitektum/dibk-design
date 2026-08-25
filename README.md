# DIBK design

Shared React component library for DIBK applications — 43 components, design tokens, and themes, published as the [`dibk-design`](https://www.npmjs.com/package/dibk-design) npm package.

Component documentation (Storybook): https://arkitektum.github.io/dibk-design/

## Using the package

1.  **Install**

    ```bash
    npm install dibk-design
    ```

    Peer dependencies (must be installed in your app): `react` (18 or 19), `react-dom`, `react-router-dom` (6.4+ or 7).

2.  **Import the component styles**

    All compiled component styles ship in a single CSS file that your app must import once (e.g. in your global CSS or app entry):

    ```css
    @import "dibk-design/dibk-design.css";
    ```

    This pulls in `dibk-design/fonts.css` (the PP Mori `@font-face` rules) for you. Import it directly only if you load the component styles some other way, or omit it if your app supplies its own copy of the font.

3.  **Use the components**

    ```jsx
    import { Button } from "dibk-design";

    const Example = () => (
      <Button onClick={() => {}} size="small" color="primary">
        I'm a button
      </Button>
    );
    ```

## Styles & tokens

In addition to `dibk-design/dibk-design.css` (component styles), the package ships:

- `dibk-design/theme.css` — Tailwind-friendly theme tokens (via `@theme`)
- `dibk-design/tokens.css` — plain CSS variables for non-Tailwind apps
- `dibk-design/fonts.css` — the PP Mori `@font-face` rules, referencing the font files in `dibk-design/dist/fonts/`. Already imported by `dibk-design.css`.

### Use with Tailwind (recommended)

Import the theme tokens in your global CSS:

```css
@import "tailwindcss";
@import "dibk-design/theme.css";
@import "dibk-design/dibk-design.css";
```

### Use without Tailwind

Import the plain tokens instead:

```css
@import "dibk-design/tokens.css";
@import "dibk-design/dibk-design.css";
```

## Use with Next.js

1. Import the CSS entrypoints in your `globals.css`

```css
@import "tailwindcss";
@import "dibk-design/theme.css";
@import "dibk-design/dibk-design.css";
```

2. Import components from the library

```jsx
"use client";
import React from "react";
import { Button } from "dibk-design";

const Home = () => {
  return (
    <main>
      <Button onClick={() => {}} size="small" color="primary">
        I'm a button
      </Button>
    </main>
  );
};

export default Home;
```

## Developing the library

This project uses [pnpm](https://pnpm.io/) as the package manager.

1.  **Install dependencies**

    ```bash
    pnpm install
    ```

2.  **Run Storybook for development**

    To view and work on components in isolation, run the Storybook development server:
    ```bash
    pnpm run storybook
    ```
    This will open Storybook in your browser, usually at `http://localhost:6006`.

## Building for production

### Build library

Type-checks, bundles the library (ES/CJS + a bundled `index.d.ts`), and copies the token files. The output is saved to the `/dist` folder.
```bash
pnpm run build:lib
```

### Build Storybook

Builds the Storybook as a static web application. The output is saved to the `/storybook-static` folder.
```bash
pnpm run build:storybook
```

### Build everything

Builds both the library and the Storybook site:
```bash
pnpm run build
```

## Testing local changes in a consuming app

Use [yalc](https://github.com/wclr/yalc) to test the built package in another app without publishing:

```bash
# In dibk-design — after making changes:
pnpm run build:lib && npx yalc push

# In the consuming app — first time only:
npx yalc add dibk-design
```
