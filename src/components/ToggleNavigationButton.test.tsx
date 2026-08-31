import { describe, expect, it } from "vitest";

import ToggleNavigationButton from "./ToggleNavigationButton";
import { attribute, hasAttribute, renderHtml } from "../test/renderHtml";

describe("ToggleNavigationButton", () => {
    it("shows the show text while closed and the hide text while open", () => {
        const closed = renderHtml(<ToggleNavigationButton showText="Vis meny" hideText="Skjul meny" />);
        const open = renderHtml(<ToggleNavigationButton showText="Vis meny" hideText="Skjul meny" isOpen />);

        expect(closed.html).toContain("Vis meny");
        expect(open.html).toContain("Skjul meny");
    });

    // Regression: the button rendered with no type, which HTML treats as
    // type="submit", so toggling the navigation inside a form submitted it.
    it("defaults to type=button", () => {
        const { html } = renderHtml(<ToggleNavigationButton showText="Vis" hideText="Skjul" />);

        expect(attribute(html, "button", "type")).toBe("button");
    });

    it("lets buttonProps override the type", () => {
        const { html } = renderHtml(
            <ToggleNavigationButton showText="Vis" hideText="Skjul" buttonProps={{ type: "submit" } as React.HTMLAttributes<HTMLElement>} />
        );

        expect(attribute(html, "button", "type")).toBe("submit");
    });

    // `type` is only valid on a button, so a non-button tag must not get one.
    it("does not put a type on a non-button tag", () => {
        const { html, warnings } = renderHtml(<ToggleNavigationButton htmlTag="div" showText="Vis" hideText="Skjul" />);

        expect(hasAttribute(html, "div", "type")).toBe(false);
        expect(warnings).toEqual([]);
    });
});
