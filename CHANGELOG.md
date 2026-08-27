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

## Unreleased

To be released as **11.5.0** — every prop added here is optional, and the defaults reproduce
current behaviour.

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

### Still missing

`contentOnly` was removed from eight components in 10.3.2. Only `Select` and `InputField` are
restored here. Still gone from `Textarea`, `CheckBoxInput`, `CheckBoxListItem`,
`RadioButtonInput`, `RadioButtonListItem` and `DragAndDropFileInput`.

## 11.4.1 and earlier in the 11.x line

Not documented here. See the commit history.

## 10.3.5

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
