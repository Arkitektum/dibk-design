import { describe, expect, it } from "vitest";

import Select from "./Select";
import { renderHtml } from "../test/renderHtml";

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

    it("renders the action button when given content and a handler", () => {
        const { html } = renderHtml(
            <Select id="s" label="Pick" options={["Alpha"]} actionButtonContent="Add" actionButtonOnClick={() => {}} onChange={() => {}} />
        );

        expect(html).toContain("Add");
    });
});
