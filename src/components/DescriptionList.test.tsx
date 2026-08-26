import { describe, expect, it } from "vitest";

import DescriptionDetails from "./DescriptionDetails";
import DescriptionList from "./DescriptionList";
import DescriptionTerm from "./DescriptionTerm";
import { openingTags, renderHtml } from "../test/renderHtml";

import detailsStyle from "./DescriptionDetails.module.scss";
import termStyle from "./DescriptionTerm.module.scss";

// Regression: DescriptionList handed `compact` and `titleWidth` down by cloning
// its children, which only ever reached direct children — a term wrapped in a
// component was skipped — and which copied both props onto *every* element
// child, so a plain <div> came out with a stray titleWidth="..." attribute and
// React warned about it.

const isCompact = (tag: string) => tag.includes(termStyle.compact) || tag.includes(detailsStyle.compact);

/** Opening tags of the terms and details, in document order. */
const pairTags = (html: string) => [...html.matchAll(/<d[td][^>]*>/g)].map((match) => match[0]);

const Pair = () => (
    <>
        <DescriptionTerm>T</DescriptionTerm>
        <DescriptionDetails>D</DescriptionDetails>
    </>
);

describe("DescriptionList compact propagation", () => {
    it("applies compact to direct children", () => {
        const { html, warnings } = renderHtml(
            <DescriptionList compact>
                <DescriptionTerm>T</DescriptionTerm>
                <DescriptionDetails>D</DescriptionDetails>
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([true, true]);
        expect(warnings).toEqual([]);
    });

    it("leaves children non-compact when the list is not compact", () => {
        const { html } = renderHtml(
            <DescriptionList>
                <DescriptionTerm>T</DescriptionTerm>
                <DescriptionDetails>D</DescriptionDetails>
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([false, false]);
    });

    it("applies compact to children nested inside a fragment", () => {
        const { html } = renderHtml(
            <DescriptionList compact>
                {/* biome-ignore lint/complexity/noUselessFragments: the fragment is what this test exercises */}
                <>
                    <DescriptionTerm>T1</DescriptionTerm>
                    <DescriptionDetails>D1</DescriptionDetails>
                </>
                <DescriptionTerm>T2</DescriptionTerm>
                <DescriptionDetails>D2</DescriptionDetails>
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([true, true, true, true]);
    });

    it("applies compact to children nested inside a component", () => {
        const { html } = renderHtml(
            <DescriptionList compact>
                <Pair />
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([true, true]);
    });

    it("applies compact to children produced by map", () => {
        const { html, warnings } = renderHtml(
            <DescriptionList compact>
                {["a", "b"].map((key) => (
                    <Pair key={key} />
                ))}
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([true, true, true, true]);
        expect(warnings).toEqual([]);
    });

    it("lets a child opt out with compact={false}", () => {
        const { html } = renderHtml(
            <DescriptionList compact>
                <DescriptionTerm>T</DescriptionTerm>
                <DescriptionDetails compact={false}>D</DescriptionDetails>
            </DescriptionList>
        );

        expect(pairTags(html).map(isCompact)).toEqual([true, false]);
    });
});

describe("DescriptionList titleWidth propagation", () => {
    it("applies titleWidth to children nested inside a component", () => {
        const { html } = renderHtml(
            <DescriptionList titleWidth="10rem">
                <Pair />
            </DescriptionList>
        );

        expect(pairTags(html).every((tag) => tag.includes("--title-width:10rem"))).toBe(true);
    });

    it("lets a child override titleWidth", () => {
        const { html } = renderHtml(
            <DescriptionList titleWidth="10rem">
                <DescriptionTerm titleWidth="4rem">T</DescriptionTerm>
                <DescriptionDetails>D</DescriptionDetails>
            </DescriptionList>
        );

        expect(pairTags(html).map((tag) => tag.match(/--title-width:([^";]*)/)?.[1])).toEqual(["4rem", "10rem"]);
    });

    // The clone copied both props onto every element child, so a plain DOM child
    // came out as <div titleWidth="10rem"> and React warned that it does not
    // recognize the prop.
    it("does not leak compact or titleWidth onto a plain DOM child", () => {
        const { html, warnings } = renderHtml(
            <DescriptionList compact titleWidth="10rem">
                <div className="plain">not a term</div>
                <DescriptionTerm>T</DescriptionTerm>
                <DescriptionDetails>D</DescriptionDetails>
            </DescriptionList>
        );

        expect(openingTags(html, "div")).toEqual(['<div class="plain">']);
        expect(warnings).toEqual([]);
    });
});
