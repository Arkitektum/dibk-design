import { describe, expect, it } from "vitest";

import InputField from "./InputField";
import { attribute, openingTags, renderHtml } from "../test/renderHtml";

describe("InputField", () => {
    it("renders a labelled text input", () => {
        const { html, warnings } = renderHtml(<InputField id="f" label="Name" value="abc" onChange={() => {}} />);

        expect(attribute(html, "label", "for")).toBe("f");
        expect(attribute(html, "input", "id")).toBe("f");
        expect(html).toContain("Name");
        expect(warnings).toEqual([]);
    });

    it("normalises a Date value for a date input", () => {
        const { html } = renderHtml(<InputField id="f" type="date" value={new Date("2024-03-07T12:00:00Z")} onChange={() => {}} />);

        expect(attribute(html, "input", "value")).toBe("2024-03-07");
    });

    it("links caption and error message through aria-describedby", () => {
        const { html } = renderHtml(
            <InputField id="f" label="Name" caption="Helper" hasErrors errorMessage="Required" onChange={() => {}} />
        );

        expect(attribute(html, "input", "aria-describedby")).toBe("f-errorMessage f-caption");
        expect(html).toContain("Helper");
        expect(html).toContain("Required");
    });
});

describe("InputField file variant", () => {
    // Regression: a role="button" div wrapping a <Button>, both inside the
    // <label>, gave one action three overlapping click targets.
    it("renders exactly one interactive element", () => {
        const { html } = renderHtml(<InputField id="f" type="file" label="File" actionButtonContent="Choose" />);

        expect(openingTags(html, "button")).toHaveLength(1);
        expect(html).not.toContain('role="button"');
        expect(html).not.toMatch(/<div[^>]*tabindex/);
    });

    it("keeps the file control outside the label", () => {
        const { html } = renderHtml(<InputField id="f" type="file" label="File" actionButtonContent="Choose" />);

        expect(html).not.toMatch(/<label[^>]*>[\s\S]*fileInputContainer[\s\S]*<\/label>/);
        expect(html).toMatch(/<\/label>[\s\S]*fileInputContainer/);
    });

    it("renders the selected file name and the trigger", () => {
        const { html } = renderHtml(
            <InputField id="f" type="file" label="File" selectedFileName="file.txt" actionButtonContent="Choose" />
        );

        expect(html).toContain("file.txt");
        expect(html).toContain("Choose");
        expect(attribute(html, "input", "type")).toBe("file");
    });

    it("emits no empty label when no label is given", () => {
        const { html } = renderHtml(<InputField id="f" type="file" actionButtonContent="Choose" />);

        expect(html).not.toContain("<label");
        expect(html).toContain("Choose");
    });

    it("defaults the trigger label when no button content is given", () => {
        const { html } = renderHtml(<InputField id="f" type="file" label="File" />);

        expect(html).toContain("Velg fil");
    });

    it("renders no file container for a non-file input", () => {
        const { html } = renderHtml(<InputField id="f" label="Name" onChange={() => {}} />);

        expect(html).not.toContain("fileInputContainer");
    });
});
