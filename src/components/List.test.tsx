import { describe, expect, it } from "vitest";

import List from "./List";
import ListItem from "./ListItem";
import { openingTags, renderHtml } from "../test/renderHtml";

import itemStyle from "./ListItem.module.scss";
import listStyle from "./List.module.scss";

// Regression: List handed `compact` down by cloning its children, which only
// ever reached direct children — an item wrapped in a component was skipped —
// and which copied `compact` onto *every* element child, including plain DOM
// nodes that React then warned about.

const itemTags = (html: string) => openingTags(html, "li");

const isCompact = (tag: string) => tag.includes(itemStyle.compact);

describe("List compact propagation", () => {
    it("applies compact to a direct child item", () => {
        const { html, warnings } = renderHtml(
            <List compact>
                <ListItem>A</ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true]);
        expect(warnings).toEqual([]);
    });

    it("leaves items non-compact when the list is not compact", () => {
        const { html } = renderHtml(
            <List>
                <ListItem>A</ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([false]);
    });

    it("applies compact to items nested inside a fragment", () => {
        const { html } = renderHtml(
            <List compact>
                {/* biome-ignore lint/complexity/noUselessFragments: the fragment is what this test exercises */}
                <>
                    <ListItem>A</ListItem>
                    <ListItem>B</ListItem>
                </>
                <ListItem>C</ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
    });

    it("applies compact to items nested inside a component", () => {
        const Items = () => (
            <>
                <ListItem>A</ListItem>
                <ListItem>B</ListItem>
            </>
        );

        const { html } = renderHtml(
            <List compact>
                <Items />
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true]);
    });

    it("applies compact to items produced by map", () => {
        const { html, warnings } = renderHtml(
            <List compact>
                {["a", "b", "c"].map((id) => (
                    <ListItem key={id}>{id}</ListItem>
                ))}
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
        expect(warnings).toEqual([]);
    });

    it("lets an item opt out with compact={false}", () => {
        const { html } = renderHtml(
            <List compact>
                <ListItem>A</ListItem>
                <ListItem compact={false}>B</ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, false]);
    });

    it("applies compact from an item inside a list that is not compact", () => {
        const { html } = renderHtml(
            <List>
                <ListItem compact>A</ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true]);
    });

    it("inherits compact into a nested list and its items", () => {
        const { html } = renderHtml(
            <List compact>
                <ListItem>
                    A
                    <List>
                        <ListItem>A1</ListItem>
                    </List>
                </ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true]);
        expect(openingTags(html, "ul").every((tag) => tag.includes(listStyle.compact))).toBe(true);
    });

    it("lets a nested list opt out with compact={false}", () => {
        const { html } = renderHtml(
            <List compact>
                <ListItem>
                    A
                    <List compact={false}>
                        <ListItem>A1</ListItem>
                    </List>
                </ListItem>
            </List>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, false]);
        expect(openingTags(html, "ul").map((tag) => tag.includes(listStyle.compact))).toEqual([true, false]);
    });

    // The clone copied `compact` onto every element child, so a plain DOM child
    // got a `compact` attribute it has no business carrying, and React warned
    // "Received `true` for a non-boolean attribute `compact`".
    it("does not leak compact onto a plain DOM child", () => {
        const { html, warnings } = renderHtml(
            <List compact>
                <div className="plain">not an item</div>
                <ListItem>A</ListItem>
            </List>
        );

        expect(openingTags(html, "div")).toEqual(['<div class="plain">']);
        expect(warnings).toEqual([]);
    });
});
