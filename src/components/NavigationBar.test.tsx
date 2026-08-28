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

// Regression: mainContentId was dropped in 10.3.2 with no replacement, silently
// removing a WCAG 2.4.1 bypass affordance from every consuming app. Nothing
// failed, and the id it pointed at kept sitting in consumers' markup looking
// correct with nothing linking to it.
describe("NavigationBar skip link", () => {
    it("renders a skip link pointing at the given id", () => {
        const { html, warnings } = renderHtml(<NavigationBar mainContentId="main-content" />);

        expect(html).toContain('href="#main-content"');
        expect(html).toContain('id="main-content-link"');
        expect(html).toContain("Hopp til hovedinnhold");
        expect(warnings).toEqual([]);
    });

    // It is the bypass mechanism, so it has to come before the thing it bypasses.
    // Compared against the logo rather than the nav element: "navigationBar" is a
    // substring of the outer "navigationBarContainer", so it matches the wrapper
    // that legitimately precedes the link.
    it("renders the skip link before the navigation itself", () => {
        const { html } = renderHtml(<NavigationBar mainContentId="main-content" links={[{ name: "One", href: "/one" }]} />);

        expect(html.indexOf("main-content-link")).toBeLessThan(html.indexOf("logoContainer"));
        expect(html.indexOf("main-content-link")).toBeLessThan(html.indexOf("linksContainer"));
    });

    it("renders nothing when no mainContentId is given", () => {
        const { html } = renderHtml(<NavigationBar links={[{ name: "One", href: "/one" }]} />);

        expect(html).not.toContain("main-content-link");
    });

    it("renders no skip link for an empty mainContentId", () => {
        const { html } = renderHtml(<NavigationBar mainContentId="" />);

        expect(html).not.toContain("main-content-link");
    });

    it("allows the link text to be overridden", () => {
        const { html } = renderHtml(<NavigationBar mainContentId="main-content" mainContentLinkText="Skip to main content" />);

        expect(html).toContain("Skip to main content");
        expect(html).not.toContain("Hopp til hovedinnhold");
    });
});
