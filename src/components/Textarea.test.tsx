import { describe, expect, it } from "vitest";

import Textarea from "./Textarea";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

const textareaContent = (html: string) => html.match(/<textarea[^>]*>([\s\S]*?)<\/textarea>/)?.[1] ?? null;

describe("Textarea", () => {
    it("renders a controlled value", () => {
        const { html, warnings } = renderHtml(<Textarea id="t" value="abc" onChange={() => {}} />);

        expect(textareaContent(html)).toBe("abc");
        expect(warnings).toEqual([]);
    });

    it("renders a defaultValue when uncontrolled", () => {
        const { html } = renderHtml(<Textarea id="t" defaultValue="def" onChange={() => {}} />);

        expect(textareaContent(html)).toBe("def");
    });

    // Regression: an empty controlled value was treated as absent, so the field
    // silently became uncontrolled and repopulated itself from defaultValue.
    it("keeps an empty controlled value empty even when defaultValue is set", () => {
        const { html } = renderHtml(<Textarea id="t" value="" defaultValue="def" onChange={() => {}} />);

        expect(textareaContent(html)).toBe("");
    });

    it("prefers value over defaultValue when both are set", () => {
        const { html } = renderHtml(<Textarea id="t" value="abc" defaultValue="def" onChange={() => {}} />);

        expect(textareaContent(html)).toBe("abc");
    });

    it("renders empty when neither value nor defaultValue is given", () => {
        const { html } = renderHtml(<Textarea id="t" onChange={() => {}} />);

        expect(textareaContent(html)).toBe("");
    });
});

// Regression: contentOnly was dropped in 10.3.2, leaving read-only views with
// `disabled` as the only option.
describe("Textarea contentOnly", () => {
    it("renders no form control and nothing focusable", () => {
        const { html, warnings } = renderHtml(<Textarea id="t" label="Notes" contentOnly value="abc" onChange={() => {}} />);

        expect(openingTags(html, "textarea")).toHaveLength(0);
        expect(html).not.toMatch(/tabindex/i);
        expect(warnings).toEqual([]);
    });

    it("renders the label and the value as static text", () => {
        const { html } = renderHtml(<Textarea id="t" label="Notes" contentOnly value="abc" onChange={() => {}} />);

        expect(attribute(html, "label", "for")).toBe("t");
        expect(html).toContain("Notes");
        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>abc</);
    });

    it("falls back to defaultContent when there is no value", () => {
        const { html } = renderHtml(<Textarea id="t" contentOnly defaultContent="Ikke angitt" onChange={() => {}} />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ikke angitt</);
    });

    it("falls back to defaultContent for an empty controlled value", () => {
        const { html } = renderHtml(<Textarea id="t" contentOnly value="" defaultContent="Ikke angitt" onChange={() => {}} />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ikke angitt</);
    });

    it("reads defaultValue when no value is given", () => {
        const { html } = renderHtml(<Textarea id="t" contentOnly defaultValue="def" onChange={() => {}} />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>def</);
    });

    // A textarea's value carries the line breaks the user typed, so rendering it
    // as text has to keep them rather than collapsing them into spaces.
    it("keeps the line breaks in a multi-line value", () => {
        const { html } = renderHtml(<Textarea id="t" contentOnly value={"first\nsecond"} onChange={() => {}} />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>first\nsecond</);
    });

    it("keeps the error message", () => {
        const { html } = renderHtml(<Textarea id="t" contentOnly value="abc" hasErrors errorMessage="Required" onChange={() => {}} />);

        expect(html).toContain("Required");
        expect(html).toContain('id="t-errorMessage"');
    });
});
