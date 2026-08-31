import { describe, expect, it } from "vitest";

import FieldRequirementIndicator, { FieldRequirementProvider } from "./FieldRequirementIndicator";
import style from "./FieldRequirementIndicator.module.scss";
import { attribute, hasAttribute, renderHtml } from "../test/renderHtml";

describe("FieldRequirementIndicator", () => {
    it("marks a required field with the asterisk in required mode", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required mode="required" />);

        expect(html).toContain("<svg");
    });

    it("marks nothing for an optional field in required mode", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required={false} mode="required" />);

        expect(html).toBe("");
    });

    it("labels an optional field in optional mode", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required={false} mode="optional" />);

        expect(html).toContain("Valgfritt");
    });

    it("renders nothing at all in none mode", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required mode="none" />);

        expect(html).toBe("");
    });

    it("takes the mode from the provider when given none of its own", () => {
        const { html } = renderHtml(
            <FieldRequirementProvider mode="optional" optionalLabel="kan stå tomt">
                <FieldRequirementIndicator required={false} />
            </FieldRequirementProvider>
        );

        expect(html).toContain("kan stå tomt");
    });

    // Regression: the optional label carried an inline style, which beats any
    // selector a consumer could write — including the optionalClassName this
    // component asks them for, so the escape hatch could never win.
    it("styles the optional label with a class rather than an inline style", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required={false} mode="optional" />);

        expect(hasAttribute(html, "span", "style")).toBe(false);
        expect(attribute(html, "span", "class")).toContain(style.optionalLabel);
    });

    it("keeps optionalClassName alongside its own class", () => {
        const { html } = renderHtml(<FieldRequirementIndicator required={false} mode="optional" optionalClassName="consumer-class" />);
        const className = attribute(html, "span", "class") ?? "";

        expect(className).toContain(style.optionalLabel);
        expect(className).toContain("consumer-class");
    });
});
