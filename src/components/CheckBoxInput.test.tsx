import { describe, expect, it } from "vitest";

import CheckBoxInput from "./CheckBoxInput";
import CheckBoxListItem from "./CheckBoxListItem";
import RadioButtonInput from "./RadioButtonInput";
import RadioButtonListItem from "./RadioButtonListItem";
import { hasAttribute, renderHtml } from "../test/renderHtml";

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
            <Component id="x" checked inputValue="v">
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "readonly")).toBe(true);
        expect(warnings).toEqual([]);
    });

    it("does not mark the input read-only when onChange is given", () => {
        const { html, warnings } = renderHtml(
            <Component id="x" checked inputValue="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "readonly")).toBe(false);
        expect(warnings).toEqual([]);
    });

    it("reflects the checked prop", () => {
        const { html } = renderHtml(
            <Component id="x" checked inputValue="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "checked")).toBe(true);
    });

    it("reflects an unchecked state", () => {
        const { html } = renderHtml(
            <Component id="x" inputValue="v" onChange={() => {}}>
                Label
            </Component>
        );

        expect(hasAttribute(html, "input", "checked")).toBe(false);
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
