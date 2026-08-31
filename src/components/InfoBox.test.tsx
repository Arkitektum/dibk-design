import { describe, expect, it } from "vitest";

import InfoBox from "./InfoBox";
import style from "./InfoBox.module.scss";
import { renderHtml } from "../test/renderHtml";

describe("InfoBox", () => {
    // Regression: the variant icons are drawn with fill="currentColor", but were
    // rendered as <img src>, which loads the file as its own document — so they
    // painted black whatever the box, the variant or the theme said.
    it("inlines the variant icon rather than loading it as an image", () => {
        const { html, warnings } = renderHtml(<InfoBox title="Title">Body</InfoBox>);

        expect(html).toContain("<svg");
        expect(html).not.toContain("<img");
        expect(warnings).toEqual([]);
    });

    it.each(["default", "secondary", "warning", "error", "info", "success"] as const)("renders an icon for the %s variant", (variant) => {
        const { html } = renderHtml(
            <InfoBox title="Title" variant={variant}>
                Body
            </InfoBox>
        );

        expect(html).toContain("<svg");
        expect(html).toContain(style.iconImage);
    });

    it("renders no icon when it is hidden", () => {
        const { html } = renderHtml(
            <InfoBox title="Title" hideIcon>
                Body
            </InfoBox>
        );

        expect(html).not.toContain("<svg");
    });

    it("lets a custom icon replace the variant's own", () => {
        const { html } = renderHtml(
            <InfoBox title="Title" icon={<span className="custom-icon">!</span>}>
                Body
            </InfoBox>
        );

        expect(html).toContain("custom-icon");
        expect(html).not.toContain("<svg");
    });
});
