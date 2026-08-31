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

// Regression: ListItemObject.listItems survived the 10.3.0 rewrite in the type
// while the recursive renderer that drew it did not, so nested items were
// accepted and silently dropped for every release since.
describe("NavigationBar submenus", () => {
    const links = [
        { name: "Oversikt", href: "/oversikt" },
        {
            name: "Administrasjon",
            href: "/administrasjon",
            listItems: [
                { name: "Brukere", href: "/administrasjon/brukere" },
                { name: "Roller", href: "/administrasjon/roller" }
            ]
        }
    ];

    it("renders the nested items", () => {
        const { html, warnings } = renderHtml(<NavigationBar links={links} />);

        expect(html).toContain('href="/administrasjon/brukere"');
        expect(html).toContain('href="/administrasjon/roller"');
        expect(warnings).toEqual([]);
    });

    it("keeps the parent's own link alongside the toggle", () => {
        const { html } = renderHtml(<NavigationBar links={links} />);

        expect(html).toContain('href="/administrasjon"');
        expect(html).toContain("<button");
    });

    it("starts collapsed and points the toggle at the submenu", () => {
        const { html } = renderHtml(<NavigationBar links={links} />);
        const submenuId = attribute(html, "button", "aria-controls");

        expect(attribute(html, "button", "aria-expanded")).toBe("false");
        expect(submenuId).toBeTruthy();
        expect(html).toContain(`id="${submenuId}"`);
    });

    // The link beside it already says the name, so the button needs a name of
    // its own that does not read the item twice.
    it("labels the toggle when the item has its own link", () => {
        const { html } = renderHtml(<NavigationBar links={links} />);

        expect(attribute(html, "button", "aria-label")).toBe("Vis undermeny for Administrasjon");
    });

    it("allows the toggle label to be overridden", () => {
        const { html } = renderHtml(<NavigationBar links={links} getSubmenuToggleLabel={(name) => `Show ${name} submenu`} />);

        expect(attribute(html, "button", "aria-label")).toBe("Show Administrasjon submenu");
    });

    // With no href of its own the button is the item, and its text is the name.
    it("makes the toggle the item itself when it has no href", () => {
        const { html } = renderHtml(<NavigationBar links={[{ name: "Administrasjon", href: "", listItems: [{ name: "Brukere", href: "/brukere" }] }]} />);

        expect(attribute(html, "button", "aria-label")).toBeNull();
        expect(html).toContain("Administrasjon");
    });

    it("renders a grouping item inside the panel as a heading rather than a link", () => {
        const { html } = renderHtml(
            <NavigationBar
                links={[
                    {
                        name: "Administrasjon",
                        href: "/administrasjon",
                        listItems: [{ name: "Tilganger", href: "", listItems: [{ name: "Roller", href: "/roller" }] }]
                    }
                ]}
            />
        );

        expect(html).toContain("Tilganger");
        expect(html).not.toContain('href=""');
        expect(html).toContain('href="/roller"');
    });

    it("leaves items without children as plain links", () => {
        const { html } = renderHtml(<NavigationBar links={[{ name: "Oversikt", href: "/oversikt" }]} />);

        expect(html).not.toContain("<button");
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
