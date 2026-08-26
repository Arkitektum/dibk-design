import { describe, expect, it } from "vitest";

import Textarea from "./Textarea";
import { renderHtml } from "../test/renderHtml";

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
