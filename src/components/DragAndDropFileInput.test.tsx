import { describe, expect, it } from "vitest";

import DragAndDropFileInput from "./DragAndDropFileInput";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

const baseProps = {
    id: "dnd",
    label: "Vedlegg",
    onSelectChange: () => {},
    onDragAndDropChange: () => {}
};

describe("DragAndDropFileInput", () => {
    it("renders the drop zone and the file input", () => {
        const { html, warnings } = renderHtml(<DragAndDropFileInput {...baseProps} />);

        expect(attribute(html, "input", "type")).toBe("file");
        expect(html).toContain("dragAndDropContainer");
        expect(warnings).toEqual([]);
    });

    it("shows the selected file name over the drop zone prompt", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...baseProps} selectedFileName="file.xml" />);

        expect(html).toContain("file.xml");
        expect(html).not.toContain("Slipp fil her");
    });
});

// Regression: contentOnly was dropped in 10.3.2, leaving read-only views with
// `disabled` as the only option.
describe("DragAndDropFileInput contentOnly", () => {
    it("renders no drop zone, no file input and no button", () => {
        const { html, warnings } = renderHtml(
            <DragAndDropFileInput {...baseProps} contentOnly buttonContent="Velg fil" selectedFileName="file.xml" />
        );

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(openingTags(html, "button")).toHaveLength(0);
        expect(html).not.toContain("dragAndDropContainer");
        expect(html).not.toMatch(/tabindex/i);
        expect(warnings).toEqual([]);
    });

    it("renders the label and the file name as static text", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...baseProps} contentOnly selectedFileName="file.xml" />);

        expect(attribute(html, "label", "for")).toBe("dnd");
        expect(html).toContain("Vedlegg");
        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>file\.xml</);
    });

    it("falls back to defaultContent when no file is chosen", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...baseProps} contentOnly defaultContent="Ingen fil valgt" />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ingen fil valgt</);
    });

    it("keeps the error message", () => {
        const { html } = renderHtml(
            <DragAndDropFileInput {...baseProps} contentOnly selectedFileName="file.xml" hasErrors errorMessage="For stor fil" />
        );

        expect(html).toContain("For stor fil");
        expect(html).toContain('id="dnd-errorMessage"');
    });
});
