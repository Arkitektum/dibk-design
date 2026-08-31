import { describe, expect, it } from "vitest";

import ErrorMessage from "./ErrorMessage";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

describe("ErrorMessage", () => {
    // Regression: the component returned null with no content, so the live
    // region was inserted at the same moment as its own text. Screen readers
    // announce changes inside a region they are already watching, so an error
    // appearing while focus was elsewhere went unannounced.
    it("keeps the live region mounted when there is nothing to say", () => {
        const { html } = renderHtml(<ErrorMessage id="field-errorMessage" content="" />);

        expect(attribute(html, "span", "aria-live")).toBe("polite");
        expect(html).not.toContain("<svg");
    });

    it("treats whitespace-only content as empty", () => {
        const { html } = renderHtml(<ErrorMessage content="   " />);

        expect(attribute(html, "span", "aria-live")).toBe("polite");
        expect(html).not.toContain("<svg");
    });

    it("renders the message and the icon inside the region", () => {
        const { html, warnings } = renderHtml(<ErrorMessage id="field-errorMessage" content="Feltet må fylles ut" />);

        expect(html).toContain("Feltet må fylles ut");
        expect(html).toContain("<svg");
        expect(warnings).toEqual([]);
    });

    // The id belongs on the element holding the text, because that is what
    // aria-describedby on the input points at.
    it("puts the id on the message rather than the region", () => {
        const { html } = renderHtml(<ErrorMessage id="field-errorMessage" content="Feltet må fylles ut" />);
        const [region, message] = openingTags(html, "span");

        expect(region).toContain('aria-live="polite"');
        expect(region).not.toContain("field-errorMessage");
        expect(message).toContain('id="field-errorMessage"');
    });
});
