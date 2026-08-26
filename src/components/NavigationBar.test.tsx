import { describe, expect, it } from "vitest";

import NavigationBar from "./NavigationBar";
import { attribute, renderHtml } from "../test/renderHtml";

describe("NavigationBar", () => {
    // Regression: getThemeLogo returns "" with no theme, and <img src=""> makes
    // the browser re-request the current page.
    it("renders no logo image without a theme", () => {
        const { html, warnings } = renderHtml(<NavigationBar />);

        expect(html).not.toContain("<img");
        expect(warnings).toEqual([]);
    });

    it("renders no empty logo link without a theme", () => {
        const { html } = renderHtml(<NavigationBar />);

        expect(html).not.toContain("<a ");
    });

    it("still renders the bar itself without a theme", () => {
        const { html } = renderHtml(<NavigationBar />);

        expect(html).toContain("navigationBar");
    });

    it("renders no logo image without a theme even when the link is cleared", () => {
        const { html, warnings } = renderHtml(<NavigationBar logoLink="" />);

        expect(html).not.toContain("<img");
        expect(warnings).toEqual([]);
    });

    // The src is a data URL in the library build and a served path under Vite,
    // so assert only that a real source is present.
    it.each(["dibk", "arbeidstilsynet"] as const)("renders the %s logo", (themeId) => {
        const { html, warnings } = renderHtml(<NavigationBar themeId={themeId} />);
        const src = attribute(html, "img", "src");

        expect(src).toBeTruthy();
        expect(src).toMatch(/logo/);
        expect(warnings).toEqual([]);
    });

    it("wraps the logo in the logo link", () => {
        const { html } = renderHtml(<NavigationBar themeId="dibk" />);

        expect(attribute(html, "a", "href")).toBe("https://www.dibk.no/");
    });

    it("renders navigation links with a theme", () => {
        const { html } = renderHtml(<NavigationBar themeId="dibk" links={[{ name: "One", href: "/one" }]} />);

        expect(html).toContain('href="/one"');
        expect(html).toContain("One");
    });

    it("renders navigation links without a theme", () => {
        const { html } = renderHtml(<NavigationBar links={[{ name: "One", href: "/one" }]} />);

        expect(html).toContain('href="/one"');
    });
});
