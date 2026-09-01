import { describe, expect, it } from "vitest";

import ProgressBar from "./ProgressBar";
import { attribute, renderHtml } from "../test/renderHtml";

describe("ProgressBar", () => {
    // Regression: the progressbar role carried its value but no name, so a
    // screen reader announced a bare percentage with nothing to say what was
    // progressing (axe: aria-progressbar-name).
    it("has an accessible name by default", () => {
        const { html, warnings } = renderHtml(<ProgressBar progress={25} />);

        expect(attribute(html, "div", "role")).toBe("progressbar");
        expect(attribute(html, "div", "aria-label")).toBe("Fremdrift");
        expect(warnings).toEqual([]);
    });

    it("lets the name say what is progressing", () => {
        const { html } = renderHtml(<ProgressBar progress={25} ariaLabel="Opplasting av vedlegg" />);

        expect(attribute(html, "div", "aria-label")).toBe("Opplasting av vedlegg");
    });

    it("reports the value against a 0 to 100 range", () => {
        const { html } = renderHtml(<ProgressBar progress={60} />);

        expect(attribute(html, "div", "aria-valuenow")).toBe("60");
        expect(attribute(html, "div", "aria-valuemin")).toBe("0");
        expect(attribute(html, "div", "aria-valuemax")).toBe("100");
    });

    it("defaults to no progress", () => {
        const { html } = renderHtml(<ProgressBar />);

        expect(attribute(html, "div", "aria-valuenow")).toBe("0");
    });
});
