import { MemoryRouter, Link as RouterLink } from "react-router-dom";
import { describe, expect, it } from "vitest";

import Button from "./Button";
// Imported rather than hard-coded so assertions hold under any CSS module
// naming strategy — the test resolves class names the same way the component does.
import style from "./Button.module.scss";
import { attribute, hasAttribute, renderHtml } from "../test/renderHtml";

describe("Button", () => {
    it("renders content in a button by default", () => {
        const { html, warnings } = renderHtml(<Button content="Go" />);

        expect(html).toMatch(/^<button/);
        expect(html).toContain("Go");
        expect(warnings).toEqual([]);
    });

    // Regression: two branches built a prop bag with href deleted, then spread
    // the uncorrected original, putting an invalid href on a <button>.
    it("does not put href on a button when inputType is button", () => {
        const { html } = renderHtml(<Button inputType="button" href="/somewhere" content="Go" />);

        expect(html).toMatch(/^<button/);
        expect(hasAttribute(html, "button", "href")).toBe(false);
    });

    // Regression: defaultChecked was consumed to pick the colour and never
    // forwarded, so the control rendered as selected but unchecked.
    it("forwards defaultChecked to the radio input", () => {
        const { html } = renderHtml(<Button inputType="radio" defaultChecked content="Pick" />);

        expect(hasAttribute(html, "input", "checked")).toBe(true);
    });

    it("leaves the radio unchecked without defaultChecked", () => {
        const { html } = renderHtml(<Button inputType="radio" content="Pick" />);

        expect(hasAttribute(html, "input", "checked")).toBe(false);
    });

    it("forwards name to the radio input", () => {
        const { html } = renderHtml(<Button inputType="radio" name="group" content="Pick" />);

        expect(attribute(html, "input", "name")).toBe("group");
    });

    it("renders an anchor when given an href", () => {
        const { html, warnings } = renderHtml(<Button href="/somewhere" content="Go" />);

        expect(html).toMatch(/^<a/);
        expect(attribute(html, "a", "href")).toBe("/somewhere");
        expect(warnings).toEqual([]);
    });

    it("falls back to a button with no href when disabled", () => {
        const { html } = renderHtml(<Button href="/somewhere" disabled content="Go" />);

        expect(html).toMatch(/^<button/);
        expect(hasAttribute(html, "button", "href")).toBe(false);
    });

    it("turns a RouterLink child into a styled anchor", () => {
        const { html, warnings } = renderHtml(
            <MemoryRouter>
                <Button>
                    <RouterLink to="/somewhere">Go</RouterLink>
                </Button>
            </MemoryRouter>
        );

        expect(html).toMatch(/^<a/);
        expect(attribute(html, "a", "href")).toBe("/somewhere");
        expect(attribute(html, "a", "class")).toContain(style.button);
        expect(warnings).toEqual([]);
    });

    it("renders a disabled RouterLink child as a button with no href", () => {
        const { html } = renderHtml(
            <MemoryRouter>
                <Button disabled>
                    <RouterLink to="/somewhere">Go</RouterLink>
                </Button>
            </MemoryRouter>
        );

        expect(html).toMatch(/^<button/);
        expect(hasAttribute(html, "button", "href")).toBe(false);
    });
});
