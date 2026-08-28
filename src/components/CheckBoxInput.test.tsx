import { describe, expect, it } from "vitest";

import CheckBoxInput from "./CheckBoxInput";
import CheckBoxListItem from "./CheckBoxListItem";
import RadioButtonInput from "./RadioButtonInput";
import RadioButtonListItem from "./RadioButtonListItem";
import { attribute, hasAttribute, openingTags, renderHtml } from "../test/renderHtml";

// All four render a controlled `checked` with an optional onChange, so all four
// have to declare themselves read-only when no handler is supplied — otherwise
// React warns about a controlled field with no way to change it.
const controlledInputs = [
    ["CheckBoxInput", CheckBoxInput],
    ["RadioButtonInput", RadioButtonInput],
    ["CheckBoxListItem", CheckBoxListItem],
    ["RadioButtonListItem", RadioButtonListItem]
] as const;

describe.each(controlledInputs)("%s", (_name, Component) => {
    it("marks the input read-only when no onChange is given", () => {
        const { html, warnings } = renderHtml(
            <Component id="x" checked value="v">
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "readonly")).toBe(true);
        expect(warnings).toEqual([]);
    });

    it("does not mark the input read-only when onChange is given", () => {
        const { html, warnings } = renderHtml(
            <Component id="x" checked value="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "readonly")).toBe(false);
        expect(warnings).toEqual([]);
    });

    it("reflects the checked prop", () => {
        const { html } = renderHtml(
            <Component id="x" checked value="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "checked")).toBe(true);
    });

    it("reflects an unchecked state", () => {
        const { html } = renderHtml(
            <Component id="x" value="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "checked")).toBe(false);
    });

    // The gap that hid the value/inputValue split: this block passed `inputValue`
    // to all four, which the two checkbox components silently discarded, and
    // nothing asserted the attribute was written. `value` now works for all four.
    it("writes the value onto the input", () => {
        const { html } = renderHtml(
            <Component id="x" value="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(attribute(html, "input", "value")).toBe("v");
    });
});

// Kept working for one major so existing call sites compile untouched.
describe("inputValue as a deprecated alias for value", () => {
    const radioComponents = [
        ["RadioButtonInput", RadioButtonInput],
        ["RadioButtonListItem", RadioButtonListItem]
    ] as const;

    it.each(radioComponents)("%s still honours inputValue", (_name, Component) => {
        const { html, warnings } = renderHtml(
            <Component id="x" inputValue="legacy" onChange={() => {}}>
                Label
            </Component>
        );

        expect(attribute(html, "input", "value")).toBe("legacy");
        expect(warnings).toEqual([]);
    });

    it.each(radioComponents)("%s prefers value when both are given", (_name, Component) => {
        const { html } = renderHtml(
            <Component id="x" value="new" inputValue="legacy" onChange={() => {}}>
                Label
            </Component>
        );

        expect(attribute(html, "input", "value")).toBe("new");
    });
});

describe("CheckBoxInput", () => {
    it("associates its label with the input", () => {
        const { html } = renderHtml(
            <CheckBoxInput id="cb" onChange={() => {}}>
                Accept
            </CheckBoxInput>
        );

        expect(html).toContain('for="cb"');
        expect(html).toContain('id="cb"');
        expect(html).toContain("Accept");
    });

    it("flags invalid state for assistive tech", () => {
        const { html } = renderHtml(
            <CheckBoxInput id="cb" hasErrors onChange={() => {}}>
                Accept
            </CheckBoxInput>
        );

        expect(html).toContain('aria-invalid="true"');
    });
});

// Regression: contentOnly was dropped from all four of these in 10.3.2, so
// read-only views silently started rendering as editable controls.
describe("CheckBoxInput contentOnly", () => {
    it("renders no form control and nothing focusable", () => {
        const { html, warnings } = renderHtml(
            <CheckBoxInput id="cb" contentOnly checked>
                Accept
            </CheckBoxInput>
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(html).not.toMatch(/tabindex/i);
        expect(warnings).toEqual([]);
    });

    // The box reads as something you can click, so it goes. The checkmark stays,
    // because a read-only checkbox list renders every option and has to show
    // which ones are ticked.
    it("drops the box but keeps the checkmark", () => {
        const { html } = renderHtml(
            <CheckBoxInput id="cb" contentOnly checked>
                Accept
            </CheckBoxInput>
        );

        expect(html).not.toContain("showBox");
        expect(html).toContain("checkmarkIcon");
    });

    it("shows no checkmark when unchecked", () => {
        const { html } = renderHtml(
            <CheckBoxInput id="cb" contentOnly>
                Accept
            </CheckBoxInput>
        );

        expect(html).not.toContain("checkmarkIcon");
    });

    it("keeps the label", () => {
        const { html } = renderHtml(
            <CheckBoxInput id="cb" contentOnly checked>
                Accept
            </CheckBoxInput>
        );

        expect(html).toContain("Accept");
    });
});

describe("RadioButtonInput contentOnly", () => {
    // Deliberately unlike CheckBoxInput: a radio group has one answer, so a
    // read-only view renders only the selected option and an indicator beside
    // the single visible label would be noise.
    it("renders no form control and no indicator, only the label", () => {
        const { html, warnings } = renderHtml(
            <RadioButtonInput id="rb" value="a" contentOnly checked>
                Option A
            </RadioButtonInput>
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(html).not.toContain("radioButtonIcon");
        expect(html).not.toMatch(/tabindex/i);
        expect(html).toContain("Option A");
        expect(warnings).toEqual([]);
    });

    it("still renders the indicator when not contentOnly", () => {
        const { html } = renderHtml(
            <RadioButtonInput id="rb" value="a" checked onChange={() => {}}>
                Option A
            </RadioButtonInput>
        );

        expect(html).toContain("radioButtonIcon");
        expect(openingTags(html, "input")).toHaveLength(1);
    });
});

describe("list item contentOnly", () => {
    it("CheckBoxListItem passes contentOnly down and marks the wrapper", () => {
        const { html } = renderHtml(
            <CheckBoxListItem id="cb" contentOnly checked>
                Accept
            </CheckBoxListItem>
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(html).toContain("contentOnly");
        expect(html).toContain("Accept");
    });

    it("RadioButtonListItem passes contentOnly down and marks the wrapper", () => {
        const { html } = renderHtml(
            <RadioButtonListItem id="rb" value="a" contentOnly checked>
                Option A
            </RadioButtonListItem>
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(html).toContain("contentOnly");
        expect(html).toContain("Option A");
    });
});
