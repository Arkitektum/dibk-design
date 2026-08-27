import { describe, expect, it } from "vitest";

import Select from "./Select";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

const selectedText = (html: string) => html.match(/reactSelect__single-value[^>]*>([^<]*)</)?.[1] ?? null;
const placeholderText = (html: string) => html.match(/reactSelect__placeholder[^>]*>([^<]*)</)?.[1] ?? null;

describe("Select", () => {
    it("renders the selected option", () => {
        const { html, warnings } = renderHtml(<Select id="s" label="Pick" options={["Alpha", "Beta"]} value="Alpha" onChange={() => {}} />);

        expect(selectedText(html)).toBe("Alpha");
        expect(warnings).toEqual([]);
    });

    it("shows the placeholder when nothing is selected", () => {
        const { html } = renderHtml(<Select id="s" label="Pick" placeholder="Choose one" options={["Alpha"]} onChange={() => {}} />);

        expect(placeholderText(html)).toBe("Choose one");
    });

    // Regression: placeholderValue was declared but never read, so a value equal
    // to the sentinel was resolved into a fabricated option and rendered raw.
    it("shows the placeholder when the value equals placeholderValue", () => {
        const { html } = renderHtml(
            <Select
                id="s"
                label="Pick"
                placeholder="Choose one"
                placeholderValue="notSelected"
                value="notSelected"
                options={["Alpha", "Beta"]}
                onChange={() => {}}
            />
        );

        expect(selectedText(html)).toBeNull();
        expect(placeholderText(html)).toBe("Choose one");
    });

    it("filters the sentinel out of a multiple selection", () => {
        const { html } = renderHtml(
            <Select
                id="s"
                label="Pick"
                multiple
                placeholder="Choose one"
                placeholderValue="notSelected"
                value={["notSelected", "Alpha"]}
                options={["Alpha", "Beta"]}
                onChange={() => {}}
            />
        );

        expect(html).toContain("Alpha");
        expect(html).not.toContain("notSelected");
    });

    it("uses the key of an object option as its label", () => {
        const { html } = renderHtml(<Select id="s" label="Pick" options={[{ key: "Alpha", value: 1 }]} value={1} onChange={() => {}} />);

        expect(selectedText(html)).toBe("Alpha");
    });

    it("renders the label and links the error message", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" options={["Alpha"]} hasErrors errorMessage="Required" onChange={() => {}} />
        );

        expect(html).toContain("Pick");
        expect(html).toContain("Required");
        expect(html).toContain('id="s-errorMessage"');
    });

    // react-select shows a clear button on a multi select by default, but its
    // keyboard handler reads the raw isClearable prop, so leaving it unset made
    // Backspace a no-op on a select that visibly offered clearing.
    it("renders a clear button for a multiple select by default", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" multiple options={["Alpha"]} value={["Alpha"]} onChange={() => {}} />
        );

        expect(html).toContain("reactSelect__clear-indicator");
    });

    it("renders no clear button for a single select by default", () => {
        const { html } = renderHtml(<Select id="s" label="Pick" options={["Alpha"]} value="Alpha" onChange={() => {}} />);

        expect(html).not.toContain("reactSelect__clear-indicator");
    });

    it("renders a clear button for a single select when isClearable is set", () => {
        const { html } = renderHtml(<Select id="s" label="Pick" isClearable options={["Alpha"]} value="Alpha" onChange={() => {}} />);

        expect(html).toContain("reactSelect__clear-indicator");
    });

    it("renders the action button when given content and a handler", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" options={["Alpha"]} actionButtonContent="Add" actionButtonOnClick={() => {}} onChange={() => {}} />
        );

        expect(html).toContain("Add");
    });
});

// Regression: contentOnly was dropped in 10.3.2 along with the native <select>,
// leaving read-only views with `disabled` as the only option.
describe("Select contentOnly", () => {
    it("renders no form control and no interactive element", () => {
        const { html, warnings } = renderHtml(
            <Select id="s" label="Pick" contentOnly options={[{ key: "Alpha", value: 1 }]} value={1} onChange={() => {}} />
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(openingTags(html, "select")).toHaveLength(0);
        expect(openingTags(html, "button")).toHaveLength(0);
        expect(html).not.toMatch(/tabindex/i);
        expect(html).not.toContain("selectListArrow");
        expect(warnings).toEqual([]);
    });

    it("renders the label and the raw value as static text", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" contentOnly options={[{ key: "Alpha", value: 1 }]} value={1} onChange={() => {}} />
        );

        expect(attribute(html, "label", "for")).toBe("s");
        expect(html).toContain("Pick");
        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>1</);
    });

    it("renders the option key instead of the value with keyAsContent", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" contentOnly keyAsContent options={[{ key: "Alpha", value: 1 }]} value={1} onChange={() => {}} />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Alpha</);
    });

    it("falls back to defaultContent when nothing is selected", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" contentOnly defaultContent="Ikke angitt" options={["Alpha"]} onChange={() => {}} />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ikke angitt</);
    });

    it("treats the placeholderValue sentinel as nothing selected", () => {
        const { html } = renderHtml(
            <Select
                id="s"
                label="Pick"
                contentOnly
                placeholderValue="notSelected"
                defaultContent="Ikke angitt"
                value="notSelected"
                options={["Alpha"]}
                onChange={() => {}}
            />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ikke angitt</);
        expect(html).not.toContain("notSelected");
    });

    it("joins a multiple selection", () => {
        const { html } = renderHtml(
            <Select
                id="s"
                label="Pick"
                contentOnly
                keyAsContent
                multiple
                options={[
                    { key: "Alpha", value: 1 },
                    { key: "Beta", value: 2 }
                ]}
                value={[1, 2]}
                onChange={() => {}}
            />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Alpha, Beta</);
    });

    it("reads defaultValue when no value is given", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" contentOnly keyAsContent options={[{ key: "Alpha", value: 1 }]} defaultValue={1} onChange={() => {}} />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Alpha</);
    });
});
