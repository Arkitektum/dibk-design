import { describe, expect, it } from "vitest";

import CheckBoxList from "./CheckBoxList";
import CheckBoxListItem from "./CheckBoxListItem";
import { hasAttribute, openingTags, renderHtml } from "../test/renderHtml";

import itemStyle from "./CheckBoxListItem.module.scss";

// Regression: `compact` on the list never reached the items. The list cloned its
// children looking for `child.type.displayName === "RadioButtonListItem"` — the
// wrong name, and nothing in the package assigns displayName at all, so the
// branch was dead and `compact` was silently dropped. It also only ever looked
// at direct children.

/** Opening tags of the item wrappers, in document order. */
const itemTags = (html: string) => openingTags(html, "div").filter((tag) => tag.includes(itemStyle.checkBoxListItem));

const isCompact = (tag: string) => tag.includes(itemStyle.compact);

describe("CheckBoxList compact propagation", () => {
    it("applies compact to a direct child item", () => {
        const { html, warnings } = renderHtml(
            <CheckBoxList legend="Group" compact>
                <CheckBoxListItem id="a" onChange={() => {}}>
                    A
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true]);
        expect(warnings).toEqual([]);
    });

    it("leaves items non-compact when the list is not compact", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group">
                <CheckBoxListItem id="a" onChange={() => {}}>
                    A
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([false]);
    });

    it("applies compact to items nested inside a fragment", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group" compact>
                {/* biome-ignore lint/complexity/noUselessFragments: the fragment is what this test exercises */}
                <>
                    <CheckBoxListItem id="a" onChange={() => {}}>
                        A
                    </CheckBoxListItem>
                    <CheckBoxListItem id="b" onChange={() => {}}>
                        B
                    </CheckBoxListItem>
                </>
                <CheckBoxListItem id="c" onChange={() => {}}>
                    C
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
    });

    it("applies compact to items nested inside a component", () => {
        // The shape the Storybook stories use, and the one cloning could never
        // reach even with the right displayName.
        const Items = () => (
            <>
                <CheckBoxListItem id="a" onChange={() => {}}>
                    A
                </CheckBoxListItem>
                <CheckBoxListItem id="b" onChange={() => {}}>
                    B
                </CheckBoxListItem>
            </>
        );

        const { html } = renderHtml(
            <CheckBoxList legend="Group" compact>
                <Items />
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true]);
    });

    it("applies compact to items produced by map", () => {
        const { html, warnings } = renderHtml(
            <CheckBoxList legend="Group" compact>
                {["a", "b", "c"].map((id) => (
                    <CheckBoxListItem key={id} id={id} onChange={() => {}}>
                        {id}
                    </CheckBoxListItem>
                ))}
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
        expect(warnings).toEqual([]);
    });

    it("lets an item opt out with compact={false}", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group" compact>
                <CheckBoxListItem id="a" onChange={() => {}}>
                    A
                </CheckBoxListItem>
                <CheckBoxListItem id="b" compact={false} onChange={() => {}}>
                    B
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, false]);
    });

    it("applies compact from an item inside a list that is not compact", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group">
                <CheckBoxListItem id="a" compact onChange={() => {}}>
                    A
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true]);
    });
});

describe("CheckBoxList required handling", () => {
    // A checkbox group is "at least one checked", which the HTML required
    // attribute cannot express: required on every box demands that all of them
    // be checked, blocking submission of a legitimate multi-select group. So the
    // list's `required` marks the legend only and must not reach the inputs.
    it("does not mark individual checkboxes required when the list is required", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group" required>
                <CheckBoxListItem id="a" onChange={() => {}}>
                    A
                </CheckBoxListItem>
                <CheckBoxListItem id="b" onChange={() => {}}>
                    B
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(openingTags(html, "input").every((tag) => !/\srequired(=|\s|>|\/)/i.test(tag))).toBe(true);
    });

    it("still marks an individually required checkbox required", () => {
        const { html } = renderHtml(
            <CheckBoxList legend="Group">
                <CheckBoxListItem id="a" required onChange={() => {}}>
                    A
                </CheckBoxListItem>
            </CheckBoxList>
        );

        expect(hasAttribute(html, "input", "required")).toBe(true);
    });
});
