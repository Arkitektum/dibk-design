import { describe, expect, it } from "vitest";

import Accordion from "./Accordion";
import style from "./Accordion.module.scss";
import { attribute, renderHtml } from "../test/renderHtml";

describe("Accordion", () => {
    it("applies the primary colour by default", () => {
        const { html, warnings } = renderHtml(<Accordion title="Title">Body</Accordion>);

        expect(attribute(html, "div", "class")).toContain(style.primary);
        expect(warnings).toEqual([]);
    });

    it.each(["primary", "neutral", "secondary", "info", "success"] as const)("applies the %s colour variant", (color) => {
        const { html } = renderHtml(
            <Accordion title="Title" color={color}>
                Body
            </Accordion>
        );

        expect(attribute(html, "div", "class")).toContain(style[color]);
    });

    it("treats a non-named colour as a background colour instead of a class", () => {
        const { html } = renderHtml(
            <Accordion title="Title" color="#e8f4f8">
                Body
            </Accordion>
        );

        expect(attribute(html, "div", "style")).toBe("background-color:#e8f4f8");
    });

    it("applies a separate body colour class when bodyColor differs", () => {
        const { html } = renderHtml(
            <Accordion title="Title" color="primary" bodyColor="success">
                Body
            </Accordion>
        );

        expect(html).toContain(style.bodySuccess);
    });

    it("does not apply a body colour class when bodyColor matches the title colour", () => {
        const { html } = renderHtml(
            <Accordion title="Title" color="success" bodyColor="success">
                Body
            </Accordion>
        );

        expect(html).not.toContain(style.bodySuccess);
    });

    it("reports collapsed state on the toggle button", () => {
        const { html } = renderHtml(<Accordion title="Title">Body</Accordion>);

        expect(attribute(html, "button", "aria-expanded")).toBe("false");
    });

    it("reports expanded state on the toggle button", () => {
        const { html } = renderHtml(
            <Accordion title="Title" expanded>
                Body
            </Accordion>
        );

        expect(attribute(html, "button", "aria-expanded")).toBe("true");
    });
});
