import { describe, expect, it } from "vitest";

import Tabs from "./Tabs";
import { renderHtml } from "../test/renderHtml";

const tabAttributes = (html: string) =>
    [...html.matchAll(/<button[^>]*role="tab"[^>]*>/g)].map((match) => ({
        tabIndex: match[0].match(/tabindex="(-?\d+)"/)?.[1] ?? null,
        selected: match[0].match(/aria-selected="(\w+)"/)?.[1] ?? null,
        controls: match[0].match(/aria-controls="([^"]*)"/)?.[1] ?? null,
        id: match[0].match(/\sid="([^"]*)"/)?.[1] ?? null
    }));

const tree = (props: { defaultIndex?: number } = {}, tabProps: { disabled?: boolean }[] = [{}, {}, {}]) => (
    <Tabs {...props}>
        <Tabs.List>
            {tabProps.map((tabProp, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length fixture
                <Tabs.Tab key={index} {...tabProp}>
                    Tab {index}
                </Tabs.Tab>
            ))}
        </Tabs.List>
        <Tabs.Panels>
            {tabProps.map((_, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length fixture
                <Tabs.Panel key={index}>Panel {index}</Tabs.Panel>
            ))}
        </Tabs.Panels>
    </Tabs>
);

describe("Tabs", () => {
    // Regression: no tabIndex was set, putting every tab in the document tab
    // order instead of one stop for the whole tablist.
    it("gives the selected tab the only tab stop", () => {
        const { html, warnings } = renderHtml(tree());

        expect(tabAttributes(html).map((tab) => tab.tabIndex)).toEqual(["0", "-1", "-1"]);
        expect(warnings).toEqual([]);
    });

    it("moves the tab stop with defaultIndex", () => {
        const { html } = renderHtml(tree({ defaultIndex: 1 }));

        const tabs = tabAttributes(html);
        expect(tabs.map((tab) => tab.tabIndex)).toEqual(["-1", "0", "-1"]);
        expect(tabs.map((tab) => tab.selected)).toEqual(["false", "true", "false"]);
    });

    it("keeps the tab stop on the selected tab when another is disabled", () => {
        const { html } = renderHtml(tree({}, [{}, { disabled: true }, {}]));

        expect(tabAttributes(html).map((tab) => tab.tabIndex)).toEqual(["0", "-1", "-1"]);
    });

    it("pairs each tab with its panel", () => {
        const { html } = renderHtml(tree());
        const tabs = tabAttributes(html);

        expect(tabs).toHaveLength(3);
        for (const tab of tabs) {
            expect(tab.controls).toBeTruthy();
            expect(html).toContain(`id="${tab.controls}"`);
            expect(html).toContain(`aria-labelledby="${tab.id}"`);
        }
    });

    it("hides every panel except the active one", () => {
        const { html } = renderHtml(tree({ defaultIndex: 1 }));
        const panels = [...html.matchAll(/<div[^>]*role="tabpanel"[^>]*>/g)].map((match) => /\shidden/.test(match[0]));

        expect(panels).toEqual([true, false, true]);
    });
});
