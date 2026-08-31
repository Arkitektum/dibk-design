import { describe, expect, it } from "vitest";

import Accordion from "./Accordion";
import style from "./Accordion.module.scss";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

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

describe("Accordion className handling", () => {
    // Regression: className stayed in `rest`, and the spread came after
    // className={...}, so a consumer class replaced every variant class.
    it("merges a consumer className with the variant classes", () => {
        const { html } = renderHtml(
            <Accordion title="Title" color="success" className="my-class">
                Body
            </Accordion>
        );
        const classes = attribute(html, "div", "class") ?? "";

        expect(classes).toContain("my-class");
        expect(classes).toContain(style.accordion);
        expect(classes).toContain(style.success);
    });

    it("keeps the variant classes when no className is given", () => {
        const { html } = renderHtml(
            <Accordion title="Title" color="success">
                Body
            </Accordion>
        );
        const classes = attribute(html, "div", "class") ?? "";

        expect(classes).toContain(style.accordion);
        expect(classes).toContain(style.success);
    });

    it("passes other div attributes through to the outer element", () => {
        const { html } = renderHtml(
            <Accordion title="Title" id="my-accordion" data-testid="probe">
                Body
            </Accordion>
        );

        expect(attribute(html, "div", "id")).toBe("my-accordion");
        expect(attribute(html, "div", "data-testid")).toBe("probe");
    });

    // Regression: the panel rendered <button> with no type, which HTML treats
    // as type="submit", so toggling an accordion inside a form submitted it.
    it("gives the panel button type=button", () => {
        const { html } = renderHtml(<Accordion title="Title">Body</Accordion>);

        expect(attribute(html, "button", "type")).toBe("button");
    });

    // The button said aria-expanded but never said what it expanded, so
    // assistive tech could not report or jump to the panel it controls.
    it("points the panel button at the content it expands", () => {
        const { html } = renderHtml(<Accordion title="Title">Body</Accordion>);
        const contentId = openingTags(html, "div")[1]?.match(/\sid="([^"]*)"/)?.[1];

        expect(contentId).toBeTruthy();
        expect(attribute(html, "button", "aria-controls")).toBe(contentId);
    });

    it("gives each accordion its own content id", () => {
        const { html } = renderHtml(
            <>
                <Accordion title="First">Body</Accordion>
                <Accordion title="Second">Body</Accordion>
            </>
        );
        const ids = openingTags(html, "div")
            .map((tag) => tag.match(/\sid="([^"]*)"/)?.[1])
            .filter(Boolean);

        expect(ids).toHaveLength(2);
        expect(new Set(ids).size).toBe(2);
    });

    it("lets buttonProps override the button type", () => {
        const { html } = renderHtml(
            <Accordion title="Title" buttonProps={{ type: "submit" }}>
                Body
            </Accordion>
        );

        expect(attribute(html, "button", "type")).toBe("submit");
    });
});
