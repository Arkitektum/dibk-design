# Changelog

All notable changes to `dibk-design` are documented here.

Kept from 11.5.0 onwards. The 9.1.0, 10.3.2 and 10.3.5 entries are recorded retroactively:
each removed or reshaped part of the public API, none was signalled by its version number, and
none had a release note. Everything else predating 11.5.0 is in the commit history only. See
[Migrating](README.md#migrating) for what to grep for in a consuming app.

## Versioning policy

`dibk-design` follows [semantic versioning](https://semver.org/), judged from the
**consumer's** point of view:

- **Major** — any change that can break a working consumer without them touching their code.
  That includes changes to the arguments a callback receives, the shape of a value passed to
  `onChange`, the removal of a prop, and the removal or renaming of a DOM element or class
  name that consumers style. A change is major even if it is a bug fix, and even if the old
  behaviour was clearly wrong.
- **Minor** — new components, new optional props, new opt-in behaviour.
- **Patch** — fixes that leave the public surface and the emitted markup intact.

Two rules learned the hard way:

1. **Deleting a prop must not be silent.** If a prop is going away, remove it from the
   TypeScript types in the same release, so consumers get a compile error instead of a prop
   that is accepted and ignored. `keyAsContent` and `placeholderValue` stayed in `SelectProps`
   for seven months and 21 releases after they stopped being read.
2. **A rewrite is a major release.** Replacing a component's implementation changes its DOM,
   its keyboard behaviour and its callback shapes, whether or not the prop names still match.

## 14.0.0 — 2026-08-31

Mostly accessibility fixes. The major bump is for two things: `NavigationBar` loses its `color`
prop, and `ErrorMessage` changes the markup it emits. Both are under
[Breaking](#breaking-changes) below. Everything else is additive or invisible to a consumer who
is not styling this library's internals.

### Breaking changes

- **`NavigationBar`: the `color` prop is gone.** It took `"secondary"` or `"neutral"`, and
  neither was worth keeping. `secondary` set `--navigation-text` to the same token as
  `--navigation-overlay`, so the bar painted its links in its own background colour and the
  navigation was unreadable. `neutral` — the default — only restated the values already declared
  on the container, so removing it changes nothing on screen.

  **Delete the prop; there is no replacement and nothing to put in its place.** The default
  appearance is what `neutral` already produced. The `--navigation-*` custom properties are
  still there for anyone who needs to recolour the bar from their own stylesheet.

  Removed from `NavigationBarProps` in the same release as the implementation, so a consumer
  still passing it gets a compile error rather than a prop that is quietly ignored.

- **`ErrorMessage`: the icon is an inline `<svg>`, and the message is wrapped in a live
  region.** Two markup changes in one component, both explained under [Fixed](#fixed) below.
  The rendered structure goes from

  ```html
  <span aria-live="polite" class="…errorMessage"><img class="…errorSign" …>Message</span>
  ```

  to

  ```html
  <span class="…errorMessageRegion" aria-live="polite">
    <span class="…errorMessage"><svg class="…errorSign" …></svg>Message</span>
  </span>
  ```

  The `errorMessage` and `errorSign` class names are unchanged and still sit on the same
  conceptual elements, so most consumer CSS keeps matching. **Two selector shapes break:** one
  that assumes the icon is an image (`img.errorSign`, or anything setting `object-fit`), and one
  that assumes `.errorMessage` is a direct or last child of the field wrapper (`> .errorMessage`,
  `.inputField > *:last-child`). The region is always present now, including when there is no
  error, so `:last-child` on a field's children lands on it rather than on the input.

  ```bash
  # Selectors that assume the icon is an <img>
  grep -rn "errorSign" src

  # Selectors that assume .errorMessage is a direct or last child
  grep -rn "errorMessage" src
  ```

- **`InfoBox` and `Step`: their icons are inline `<svg>` too.** Same fix as `ErrorMessage`, same
  shape of breakage: `InfoBox`'s variant icon (`.iconImage`) and the finished-step checkmark in
  `Step` (`.checkmarkSymbol`) were `<img>` elements and are now inline SVG. The class names are
  unchanged and sizing rules still apply. A selector written as `img.iconImage`, or one setting
  `object-fit`, stops matching.

  The `error` variant's icon changes shape slightly: its artwork is 24×28 in a 24×24 box, so as
  an image it was squashed and now keeps its proportions.

  ```bash
  grep -rn "iconImage\|checkmarkSymbol" src
  ```

### Added

- **`NavigationBar`: nested `listItems` finally render.** `ListItemObject.listItems` survived
  the 10.3.0 rewrite in the type while the recursive renderer that drew it did not, so nested
  items were accepted and silently discarded in every release since — the same shape of failure
  as `keyAsContent` and `placeholderValue`, and the reason this file has a rule about it.

  Implemented as an [APG disclosure navigation][apg-disclosure]: these are links, not menu
  commands, so an item with children gets a toggle button next to a plain nested `<ul>`, rather
  than the roving-focus `menubar` semantics that would misdescribe them. A parent keeps its own
  link and puts the toggle beside it, so a supplied `href` is honoured; an item with an empty
  `href` is a pure group and the toggle becomes the item itself. `Escape` closes and returns
  focus to the trigger, tabbing past the last link closes, a click outside closes, and only one
  panel is open at a time. Levels below the first are listed inside the open panel rather than
  flying out sideways.

  Nothing changes for a consumer who passes no `listItems`. A consumer who has been passing them
  all along — with no effect — will see submenus appear.

- **`NavigationBar`: `getSubmenuToggleLabel`.** Optional. Names the submenu toggle for items
  that also have a link of their own, where the button cannot take the item's name without
  reading it twice. Defaults to `` (name) => `Vis undermeny for ${name}` ``, matching the
  Norwegian default of `mainContentLinkText`.

### Fixed

- **`ErrorMessage`'s icon ignored the colour it was given.** The icon is drawn with
  `fill="currentColor"`, but it was rendered as `<img src>`, which loads the SVG as its own
  document — `currentColor` resolved to black there and never saw `--color-error`. No consumer
  CSS could have reached it. It is inlined now, so it follows the message's colour, including a
  themed override. It is also 20px and sized by height, so the glyph keeps the 24×28 proportions
  of its viewBox instead of being squashed into a square.

- **`ErrorMessage`'s live region announced nothing.** It returned `null` with no content, so the
  `aria-live` region entered the DOM at the same moment as its own text. Screen readers announce
  *changes inside* a region they are already watching; one inserted together with its content is
  usually missed. An error appearing after a failed submit, with focus elsewhere, was silent —
  `aria-describedby` covered it up whenever the user later focused the field. The region is now
  always mounted, and `display: block` so that when empty it is a zero-height box that shifts
  nothing.

- **`InfoBox`'s variant icons and `Step`'s checkmark ignored their colour**, for the same reason
  `ErrorMessage`'s did: every one of these icons is drawn with `fill="currentColor"`, and an
  `<img>` resolves that against its own document. All six `InfoBox` variants therefore drew a
  black icon, and no stylesheet could change it. Inlined, they take the colour of the box or the
  step around them — which is the current text colour in both, so nothing looks different today,
  but tinting an icon per variant is now a matter of one CSS rule.

- **`Step`'s checkmark had a class the stylesheet never defined.** `Step.tsx` has always set
  `className={style.checkmarkSymbol}`, but no rule declared it, so the class resolved to
  `undefined`, React dropped the attribute, and the icon was sized only by its own `width` and
  `height` attributes. The rule now exists, stating that same 14×11 size where it can be changed.

- **`Accordion` and `ToggleNavigationButton` submitted the form around them.** Both rendered a
  `<button>` with no `type`, which HTML treats as `type="submit"`, so opening an accordion or
  toggling the navigation inside a `<form>` submitted it. Both now default to `type="button"`,
  set before their prop spread so `buttonProps` can still opt into submit.

- **`Accordion`'s collapsed content stayed readable and focusable.** Collapsing only clipped the
  panel — `max-height: 0` with `overflow: hidden` — so screen readers still read the body of a
  panel whose button said `aria-expanded="false"`, and Tab still landed on links and inputs
  inside it that nobody could see (WCAG 2.4.3 and 2.4.7). Collapsed content is `visibility:
  hidden` now, delayed by the collapse duration so the animation still plays on the way out and
  immediate on the way in.

- **`Accordion`'s toggle never said what it controlled.** The button reported `aria-expanded`
  with no `aria-controls`, so assistive tech could not tie the state to a region or offer a jump
  to it. The panel now carries a generated id and the button points at it.

### Development

- **Storybook had a dead `theme` control on every component.** A project-level `theme` argType
  in `.storybook/preview.tsx` put a select in the Controls tab of every story, but the decorator
  reads the theme from `context.globals`, so changing it did nothing. On `ThemeProvider` it was
  worse than dead: it shadowed the real `theme` prop, offering a string where the component
  takes a `ThemeProps` object. The toolbar switcher is unaffected and remains the way to change
  theme.

- **Stories for the seven components that had none** — `ErrorMessage`, `ErrorBox`,
  `FieldRequirementIndicator`, `WizardNavigationStep`, `ListItem`, `DescriptionTerm` and
  `DescriptionDetails` — and coverage for previously undemonstrated props across the existing
  ones. Two story helpers gave both items in a list the same `useId` value, so the second
  label pointed at the first control; `Theme` had the same bug in its own markup.

[apg-disclosure]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/

## 13.1.0 — 2026-08-28

Additive: the props below were dropped in earlier releases and come back optional, so nothing
changes for a consumer who does not use them.

### Added

- **`NavigationBar`: `mainContentId` is back**, along with the skip link it renders. It was
  removed in 10.3.2 with no replacement, silently taking a WCAG 2.4.1 bypass affordance out of
  every consuming app. The markup and its ids are as they were before 10.3.2, so consumer CSS
  targeting `#main-content-link` matches again. The link text is now overridable through
  `mainContentLinkText` rather than hardcoded to `"Hopp til hovedinnhold"`.
- **`DragAndDropFileInput`: `actionButtonColor`.** The component lost `buttonColor` somewhere
  between 6.5.3 and 11.2.1 while `buttonContent` survived, so a consumer passing both kept a
  working button whose colour they could not control — the file-picker button was hardcoded to
  `primary`. Named to match `InputField` and `Select`, which both already expose
  `actionButtonColor`.

  It defaults to `primary` rather than to the `secondary` those two default to, so the button
  renders exactly as it did before the prop existed. That is a deliberate inconsistency: the
  alternative was restoring a prop and changing the appearance of every existing file input in
  the same release.
- **`RadioButtonInput` and `RadioButtonListItem`: `value`.** All four checkbox and radio
  components now take the same prop name. `CheckBoxInput` and `CheckBoxListItem` already took
  `value`; the two radio components took `inputValue`, so the pair could not be swapped in a
  map over the same options — a common shape when a `maxCount` flag decides which to render —
  and passing the wrong one produced an input with no `value` attribute and no error.

  One of the two is still required, enforced through the type, so neither name can be omitted.

### Deprecated

- **`inputValue` on `RadioButtonInput` and `RadioButtonListItem`**, renamed to `value`. It still
  works and is marked `@deprecated`, so editors strike it through and nothing breaks today.
  **It will be removed in the next major**, so a find and replace to `value` is worth doing
  before then. Nothing else is deprecated in this release.

### Fixed

- **The checkbox and radio components' own test suite was passing `inputValue` to all four**,
  which the two checkbox components silently discarded, and nothing asserted the `value`
  attribute was written. Both are fixed, so the suite would now catch this.

### Documented

- **`NavigationBar`: `preventChildElementStacking` has no replacement, and why.** See the
  [10.3.2](#1032--2026-01-13) entry: the behaviour it selected is now unconditional, so the
  prop could only ever have been a no-op. Consumers who relied on the default stacking need
  their own media query.

## 13.0.0 — 2026-08-27

One breaking change, and it is the whole release.

### Breaking — react-router replaces react-router-dom

`Link` is now imported from `react-router` rather than `react-router-dom`, and the peer is
`"react-router": "^7.0.0 || ^8.0.0"`. The `react-router-dom` peer is gone.

**If you are on react-router 7, add `react-router` to your dependencies if it is not already
there, and you are done.** It is what `react-router-dom` depends on, so it is almost certainly
installed already.

**If you are on react-router 6, this release is not for you yet.** `Link` lives in
`react-router-dom` on 6, so the import will not resolve. Stay on 12.x until you can move to 7.

Why it had to change: react-router 8 removed the `react-router-dom` package outright, and 7.18.2
is its final version. Importing from it pinned every consumer to react-router 7 or older. Worse,
an app that added react-router 8 while keeping `react-router-dom` installed for this library's
sake ended up with two react-router instances. Router context is per instance, so this library's
`Link` resolved through `react-router-dom` to react-router 7 while the app's router was 8, and
the link threw `useHref() may be used only in the context of a <Router> component` at runtime.

react-router 7 collapsed the DOM exports into its main entry and kept `react-router-dom` only as
a v6 compatibility shim, so importing from `react-router` covers both 7 and 8 with one specifier.

Affects `Button`, `Step` and `DropdownButton`, the three components that render a router link.

## 12.0.0 — 2026-08-27

Almost everything here is additive: every prop added is optional and defaults to the current
behaviour. The major bump is for one change, `DropdownButton`'s menu markup, under
[Changed markup](#changed-markup) below. Removing DOM elements a consumer could be styling is
a major change under this project's [versioning policy](#versioning-policy), whether or not any
consumer turns out to be affected. Given 9.1.0 and 10.3.2, the bump is the cheap side to err on.

### Added

- **`contentOnly` is back on the remaining six components**, finishing what 11.5.0 started.
  10.3.2 deleted it from eight; all eight have it again. Newly restored on `Textarea`,
  `CheckBoxInput`, `CheckBoxListItem`, `RadioButtonInput`, `RadioButtonListItem` and
  `DragAndDropFileInput`.
- **`defaultContent` on `Textarea` and `DragAndDropFileInput`**, the text shown in
  `contentOnly` mode when there is no value. It was removed alongside `contentOnly` and is not
  much use without it.

### Notes on the restored behaviour

- **`Textarea`** keeps the line breaks in the value. It renders with `white-space: pre-wrap`,
  where the pre-10.3.2 markup collapsed a multi-line value into a single run of text.
- **`CheckBoxInput` and `RadioButtonInput` deliberately differ.** A read-only checkbox list
  renders every option and has to show which are ticked, so the checkmark stays and only the
  box goes. A radio group has one answer, so a read-only view renders just the selected option
  and no indicator is drawn beside it. This matches the pre-10.3.2 behaviour, which looked
  inconsistent but was not.
- **The list items drop their card chrome.** In `contentOnly` the border, background, hover and
  focus states and the selected-row highlight are all left off, because they read as
  "this is clickable".
- **`DragAndDropFileInput`** renders the chosen file name only, with no drop zone, no file
  input and no button.

### Changed

- **`Select`: the dropdown arrow flips when the menu opens.** It rotates to point up while the
  menu is open and back when it closes. The chevron already carried a `transition` for this,
  but nothing had ever changed its transform.

### Fixed

- **A theme's `sizes` now reach the stylesheets.** `ThemeProvider` emitted them as `--size-*`
  custom properties and no stylesheet read any of them, so setting `sizes` on a theme changed
  nothing. `Container` now honours `--size-content-width`. Any key is still accepted, but only
  keys a stylesheet reads have an effect, which is now stated on the prop.

### Changed markup

Not opt-in, so worth checking against a consuming app.

- **`DropdownButton`: the menu is a `<div role="menu">`, not a `<ul>` with `<li role="none">`
  items.** The menu items are now direct children. `role="menu"` replaces a list's semantics
  outright, which is why each item needed `role="none"` to suppress them again. Consumer CSS
  or queries reaching for the `<ul>` or the `<li>` elements will no longer match. The
  `role="menu"` and `role="menuitem"` roles are unchanged, so anything selecting by role is
  unaffected.

## 11.5.0 — 2026-08-27

Every prop added here is optional, and the defaults reproduce current behaviour.

### Added

- **`Select`: `contentOnly` is back**, along with `keyAsContent`. Renders the current
  selection as static text — the label, then a plain `<span>` — with no input, no dropdown
  arrow, no action button, nothing focusable, and no form control in the DOM. For read-only
  and view modes, where `disabled` is the wrong affordance: it greys the text out, implies
  "temporarily unavailable", and still renders a focusable widget. Works for `multiple` too,
  joining the selection with `", "`.
- **`InputField`: `contentOnly` is back**, along with `defaultContent`. `type="date"` renders
  as `DD.MM.YYYY`, and `type="file"` shows `selectedFileName` without the trigger button.
- **`Select`: `isClearable`**, defaulting to react-select's own behaviour — off for a single
  select, on for `multiple`.

### Changed

- **`Select`: `placeholderValue` now works in both directions.** It was already honoured
  inbound (a `value` equal to the sentinel shows the `placeholder`); clearing the selection
  now reports the sentinel through `onChange` instead of emitting nothing. Clearing a single
  select requires `isClearable`. With no sentinel configured, a cleared single select still
  emits nothing and the controlled value stays put, as before.
- **`Select`: value matching is no longer strict.** `options.find(o => o.value === value)`
  meant a value that had been through a query string or a JSON round trip — a string `"5"`
  against a numeric option value `5` — matched nothing and fell back to rendering the raw id
  as the visible option text. Matching now runs an exact pass over all options first, then a
  string-form pass, so options that differ only in type are still distinguishable. In
  development, a non-empty `value` that matches no option now logs a warning instead of
  silently rendering as its own label; the warning is suppressed while `options` is empty,
  which is the normal state for asynchronously loaded options.

### Fixed

- **`Select`: Backspace now clears a `multiple` selection.** react-select's keyboard handler
  reads the raw `isClearable` prop, while only its clear-button rendering falls back to
  `isMulti`. Passing neither meant a multi select showed a clear button whose keyboard
  equivalent did nothing, and a single select could not be cleared at all.
- **`Select`: the clear button no longer renders underneath the dropdown arrow.** The arrow is
  positioned absolutely over the right edge, so the button is now pulled clear of it. Affected
  every `multiple` select.
- **`Button`, `InputField` and `Select` are all 54px tall again.** They had drifted to 55px,
  48px and 50px respectively, with `Button`'s `neutral` variant at 49px, so a row of them never
  lined up. 54px is the original value — `InputField` was `height: 54px` and a regular `Button`
  computed to 54px before both were changed. The height now comes from a single
  `sizes.$control-height`, with the vertical padding derived from it rather than hardcoded, so
  the three cannot drift apart again. `Select` uses `min-height`, so a `multiple` select with
  enough chips to wrap can still grow. The `small` button size is unchanged.

  This is the one change here that consumers will see without opting in. `InputField` grows by
  6px and `Select` by 4px, which can shift a tightly packed layout.
- **`Select`: clicking the dropdown arrow now opens the menu.** The arrow is a `<span>` layered
  over react-select's control and was swallowing clicks that landed on it. It is now
  `pointer-events: none`, which also matters because it is stretched to the full height of the
  control — otherwise it would have created a dead 12px column down the right-hand side.
- **`Select`: the dropdown arrow stays vertically centred.** It was positioned with a fixed
  `top` tuned to one specific control height (and a different one per breakpoint), so it drifted
  off centre whenever the height changed. It now centres itself at any height.

### Still missing at the time of this release

`contentOnly` was removed from eight components in 10.3.2. Only `Select` and `InputField` are
restored here. Still gone from `Textarea`, `CheckBoxInput`, `CheckBoxListItem`,
`RadioButtonInput`, `RadioButtonListItem` and `DragAndDropFileInput`.

Since addressed: the remaining six are restored in the release above.

## 11.4.1 and earlier in the 11.x line

Not documented here. See the commit history.

## 10.3.5 — 2026-01-20

### Breaking — shipped as a patch release, should have been 11.0.0

These surface as TypeScript compile errors rather than runtime failures, which is the only
reason they were less damaging than the releases below.

- **`Select`: `size?: "small" | "medium"` was removed.**
- **`InputField`: `buttonColor` and `buttonContent` were removed** in favour of
  `actionButtonColor` and `actionButtonContent`, and `actionButtonContent` narrowed from
  `React.ReactNode` to `string`.

## 10.3.2 — 2026-01-13

Published directly after 10.1.1; 10.2.0, which carried the rewrite, was never published.

### Breaking — shipped as a minor release, should have been 11.0.0

- **`Select` was rewritten on top of `react-select`.** The native `<select>` is gone. The DOM
  is now react-select's, so any consumer CSS targeting `select`, `option`, or the old
  multiple-select dropdown markup stops applying. Keyboard behaviour changed with it.
- **`contentOnly` was deleted** from `Select`, `InputField`, `Textarea`, `CheckBoxInput`,
  `CheckBoxListItem`, `RadioButtonInput`, `RadioButtonListItem` and `DragAndDropFileInput`.
  Read-only views rendered as editable controls.
- **`keyAsContent` and `placeholderValue` were left in `SelectProps` but stopped being read**,
  so they became silent no-ops rather than compile errors. `placeholderValue` regained its
  inbound half in 11.4.0; both are fully restored in 11.5.0.
- **`NavigationBar`: `mainContentId` was removed**, taking the skip link with it. Restored in
  13.1.0.
- **`NavigationBar`: `preventChildElementStacking` was removed, and the behaviour it controlled
  became unconditional in the direction the prop selected.** Before, the nav stacked its child
  elements into a column below the `sm` breakpoint unless you passed the prop, and always laid
  them out in a row above it. Now the row direction applies at every width, and the bar has a
  fixed `height: 62px`.

  So if you passed `preventChildElementStacking`, you already have what it did and can drop the
  prop. If you did not, your nav children no longer stack on narrow viewports and may overflow
  the bar. There is no replacement prop, because reinstating one would only be able to select
  the behaviour that is now permanent. Restoring the stacked layout means your own media query
  on the children.

## 9.1.0 — 2025-07-09

Published directly after 9.0.2. Both changes below are in commit `e2f6e2c2`.

### Breaking — shipped as a minor release, should have been 10.0.0

- **`Select`: `onChange` for a single select receives the selected value, not the event.**
  It went from `onChange={onChange}` on the native `<select>` to
  `onChange={event => onChange(event.target.value)}`. Every consumer reading
  `event.target.value` fails at runtime with
  `TypeError: Cannot read properties of undefined (reading 'value')`.
- **`Select`: `onChange` for `multiple` receives the full selection array, not the toggled
  value.** It previously fired `onChange(option.value)` with the single value that had just
  been toggled, leaving the consumer to merge it into their state. It now computes the next
  selection itself and fires `onChange(nextValues)`. Consumers that implemented toggle logic
  do not crash — they corrupt their own state, which is why this one went unnoticed longest.

## 9.0.2 and earlier

Not documented here. See the commit history.
