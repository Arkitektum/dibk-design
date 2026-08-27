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

// Regression: contentOnly was dropped in 10.3.2, leaving read-only views with
// `disabled` as the only option.
describe("InputField contentOnly", () => {
    it("renders no form control and no interactive element", () => {
        const { html, warnings } = renderHtml(<InputField id="f" label="Name" contentOnly value="abc" onChange={() => {}} />);

        expect(openingTags(html, "input")).toHaveLength(0);
        expect(openingTags(html, "button")).toHaveLength(0);
        expect(html).not.toMatch(/tabindex/i);
        expect(warnings).toEqual([]);
    });

    it("renders the label and the value as static text", () => {
        const { html } = renderHtml(<InputField id="f" label="Name" contentOnly value="abc" onChange={() => {}} />);

        expect(attribute(html, "label", "for")).toBe("f");
        expect(html).toContain("Name");
        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>abc</);
    });

    it("falls back to defaultContent when there is no value", () => {
        const { html } = renderHtml(<InputField id="f" label="Name" contentOnly defaultContent="Ikke angitt" onChange={() => {}} />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>Ikke angitt</);
    });

    it("formats a date value for display", () => {
        const { html } = renderHtml(
            <InputField id="f" label="Date" type="date" contentOnly value={new Date("2024-03-07T12:00:00Z")} onChange={() => {}} />
        );

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>07\.03\.2024</);
    });

    it("shows the selected file name for a file input, without the trigger", () => {
        const { html } = renderHtml(<InputField id="f" label="File" type="file" contentOnly selectedFileName="file.txt" />);

        expect(html).toMatch(/<span[^>]*contentOnly[^>]*>file\.txt</);
        expect(openingTags(html, "button")).toHaveLength(0);
        expect(html).not.toContain("fileInputContainer");
    });

    it("keeps the caption and the error message", () => {
        const { html } = renderHtml(
            <InputField id="f" label="Name" contentOnly value="abc" caption="Helper" hasErrors errorMessage="Required" onChange={() => {}} />
        );

        expect(html).toContain("Helper");
        expect(html).toContain("Required");
        expect(html).toContain('id="f-errorMessage"');
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
