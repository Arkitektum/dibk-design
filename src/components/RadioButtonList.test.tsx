import { describe, expect, it } from "vitest";

import RadioButtonList from "./RadioButtonList";
import RadioButtonListItem from "./RadioButtonListItem";
import { openingTags, renderHtml } from "../test/renderHtml";

import itemStyle from "./RadioButtonListItem.module.scss";

// Regression: `compact` and `requiredGroup` on the list never reached the items.
// The list cloned its children looking for
// `child.type.displayName === "RadioButtonListItem"`, but nothing in the package
// assigns displayName, so the branch was dead. It also only ever looked at
// direct children.

/** Opening tags of the item wrappers, in document order. */
const itemTags = (html: string) => openingTags(html, "div").filter((tag) => tag.includes(itemStyle.radioButtonListItem));

const isCompact = (tag: string) => tag.includes(itemStyle.compact);

const isRequired = (tag: string) => /\srequired(=|\s|>|\/)/i.test(tag);

describe("RadioButtonList compact propagation", () => {
    it("applies compact to a direct child item", () => {
        const { html, warnings } = renderHtml(
            <RadioButtonList legend="Group" compact>
                <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                    A
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true]);
        expect(warnings).toEqual([]);
    });

    it("leaves items non-compact when the list is not compact", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group">
                <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                    A
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([false]);
    });

    it("applies compact to items nested inside a fragment", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group" compact>
                {/* biome-ignore lint/complexity/noUselessFragments: the fragment is what this test exercises */}
                <>
                    <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                        A
                    </RadioButtonListItem>
                    <RadioButtonListItem id="b" inputValue="b" name="group" onChange={() => {}}>
                        B
                    </RadioButtonListItem>
                </>
                <RadioButtonListItem id="c" inputValue="c" name="group" onChange={() => {}}>
                    C
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
    });

    it("applies compact to items nested inside a component", () => {
        const Items = () => (
            <>
                <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                    A
                </RadioButtonListItem>
                <RadioButtonListItem id="b" inputValue="b" name="group" onChange={() => {}}>
                    B
                </RadioButtonListItem>
            </>
        );

        const { html } = renderHtml(
            <RadioButtonList legend="Group" compact>
                <Items />
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true]);
    });

    it("applies compact to items produced by map", () => {
        const { html, warnings } = renderHtml(
            <RadioButtonList legend="Group" compact>
                {["a", "b", "c"].map((id) => (
                    <RadioButtonListItem key={id} id={id} inputValue={id} name="group" onChange={() => {}}>
                        {id}
                    </RadioButtonListItem>
                ))}
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, true, true]);
        expect(warnings).toEqual([]);
    });

    it("lets an item opt out with compact={false}", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group" compact>
                <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                    A
                </RadioButtonListItem>
                <RadioButtonListItem id="b" inputValue="b" name="group" compact={false} onChange={() => {}}>
                    B
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(itemTags(html).map(isCompact)).toEqual([true, false]);
    });
});

describe("RadioButtonList required propagation", () => {
    // Safe here, unlike for checkboxes: required on every input of a same-named
    // radio group is satisfied by checking any one of them.
    it("marks every radio button in a required list required", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group" required>
                {/* biome-ignore lint/complexity/noUselessFragments: nesting is what this test exercises */}
                <>
                    <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                        A
                    </RadioButtonListItem>
                </>
                <RadioButtonListItem id="b" inputValue="b" name="group" onChange={() => {}}>
                    B
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(openingTags(html, "input").map(isRequired)).toEqual([true, true]);
    });

    it("leaves radio buttons not required when the list is not required", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group">
                <RadioButtonListItem id="a" inputValue="a" name="group" onChange={() => {}}>
                    A
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(openingTags(html, "input").map(isRequired)).toEqual([false]);
    });

    it("lets an item opt out with requiredGroup={false}", () => {
        const { html } = renderHtml(
            <RadioButtonList legend="Group" required>
                <RadioButtonListItem id="a" inputValue="a" name="group" requiredGroup={false} onChange={() => {}}>
                    A
                </RadioButtonListItem>
            </RadioButtonList>
        );

        expect(openingTags(html, "input").map(isRequired)).toEqual([false]);
    });
});
