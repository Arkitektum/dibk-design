import { describe, expect, it } from "vitest";

import Step from "./Step";
import style from "./Step.module.scss";
import { attribute, renderHtml } from "../test/renderHtml";

const step = { id: "SignIn", name: "Start", finished: true };

describe("Step", () => {
    // Regression: the checkmark is drawn with fill="currentColor" but was
    // rendered as <img src>, which resolves it against its own document, so the
    // mark painted black whatever colour the step was given.
    it("inlines the finished checkmark rather than loading it as an image", () => {
        const { html, warnings } = renderHtml(<Step step={step} index={0} activeStepId="Import" />);

        expect(html).toContain("<svg");
        expect(html).not.toContain("<img");
        expect(warnings).toEqual([]);
    });

    // Regression: the class was on the element but no rule defined it, so the
    // icon was sized by its own attributes and could not be restyled.
    it("gives the checkmark a class that the stylesheet defines", () => {
        const { html } = renderHtml(<Step step={step} index={0} activeStepId="Import" />);

        expect(style.checkmarkSymbol).toBeTruthy();
        expect(html).toContain(style.checkmarkSymbol);
    });

    it("marks the active step and leaves the checkmark off it", () => {
        const { html } = renderHtml(<Step step={step} index={0} activeStepId="SignIn" />);

        expect(attribute(html, "span", "aria-current")).toBe("step");
        expect(html).not.toContain("<svg");
    });

    it("leaves the checkmark off an unfinished step", () => {
        const { html } = renderHtml(<Step step={{ id: "Import", name: "Importer" }} index={1} activeStepId="SignIn" />);

        expect(html).not.toContain("<svg");
    });

    // The mark is vertical-only: laid out horizontally there is no room beside
    // the step name for it.
    it("leaves the checkmark off a horizontal step", () => {
        const { html } = renderHtml(<Step step={step} index={0} activeStepId="Import" direction="horizontal" />);

        expect(html).not.toContain("<svg");
    });
});
