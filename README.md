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

## Migrating

Two releases changed `Select` in ways that break working consumer code, and both shipped as
minor releases without a release note. If you are upgrading across either of them, the greps
below are the fastest way to find what needs changing. Full details in
[CHANGELOG.md](CHANGELOG.md).

### 1. `Select` `onChange` receives a value, not an event (9.1.0)

Before 9.1.0 the handler got the raw DOM event. It now gets the selected value.

```jsx
// Before (≤ 9.0.2)
<Select onChange={(event) => setValue(event.target.value)} />

// After (≥ 9.1.0)
<Select onChange={(value) => setValue(value)} />
```

Symptom: `TypeError: Cannot read properties of undefined (reading 'value')` as soon as a
selection is made.

```bash
# Every Select usage, to review its onChange
grep -rn "<Select" src

# Handlers still reading the event off a change callback
grep -rn "target\.value" src
```

### 2. `Select multiple` `onChange` receives the whole selection (9.1.0)

**This is the one to check most carefully — nothing crashes.** Before 9.1.0, each click fired
`onChange(option.value)` with the *single value that had just been toggled*, and the consumer
merged it into their own state. It now computes the next selection itself and fires
`onChange(nextValues)` with the *full array*.

Consumer toggle logic therefore runs a second time on top of an already-correct array, and
quietly corrupts state — a re-selected value gets removed, a deselected one gets added back.

```jsx
// Before (≤ 9.0.2) — the consumer did the toggling
<Select
  multiple
  value={selected}
  onChange={(toggled) =>
    setSelected(
      selected.includes(toggled)
        ? selected.filter((v) => v !== toggled)
        : [...selected, toggled]
    )
  }
/>

// After (≥ 9.1.0) — just store what you are given
<Select multiple value={selected} onChange={setSelected} />
```

```bash
# Every multiple Select, then read each onChange: if it inspects the argument
# with includes/filter/spread, it is still doing the toggling and is now wrong
grep -rn -A 8 "<Select" src | grep -B 8 "multiple"
```

### 3. `contentOnly` was removed, and is partly back (10.3.2, 11.5.0)

10.3.2 rewrote `Select` on top of `react-select` and deleted `contentOnly` from eight
components, so read-only views silently started rendering as editable controls.

`Select` and `InputField` have it back in 11.5.0, with the same behaviour as 10.1.1: the label,
then a plain `<span>` holding the content, with no form control in the DOM. Prefer it over
`disabled` for view modes — `disabled` greys the text out, implies "temporarily unavailable",
and still renders a focusable widget.

Still missing from `Textarea`, `CheckBoxInput`, `CheckBoxListItem`, `RadioButtonInput`,
`RadioButtonListItem` and `DragAndDropFileInput`.

```bash
grep -rn "contentOnly" src
```

### 4. `keyAsContent` and `placeholderValue` were silent no-ops (10.3.2–11.3.x)

Both stayed in `SelectProps` after the rewrite stopped reading them, so they type-checked and
did nothing. Both work again as of 11.5.0:

- `keyAsContent` — `contentOnly` only. Shows the matching option's `key` instead of the raw
  `value`. It has no meaning outside `contentOnly`.
- `placeholderValue` — the sentinel meaning "nothing selected". A `value` equal to it shows the
  `placeholder`, and clearing the selection reports it through `onChange`. Clearing a single
  select requires the new `isClearable`.

If you were relying on either between 10.3.2 and 11.3.x, your read-only views were rendering
as editable controls and your sentinel was rendering as visible option text.

### 5. `Select` value types no longer have to match exactly (11.5.0)

Matching was `options.find(o => o.value === value)`, so a string `"5"` against a numeric option
value `5` matched nothing and rendered the raw id as the visible option label. Matching now
falls back to comparing string forms, and warns in development when a non-empty `value` matches
no option at all. If you see that warning, the value and the option values have different
types.

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
