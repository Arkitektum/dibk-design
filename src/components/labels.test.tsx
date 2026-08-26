import { describe, expect, it } from "vitest";

import DragAndDropFileInput from "./DragAndDropFileInput";
import Table, { type TableColumn } from "./Table";
import { attribute, renderHtml } from "../test/renderHtml";

// Every user-facing string is overridable, and every default is unchanged, so a
// consumer that passes nothing sees exactly what it saw before.

type Row = { name: string };
const columns: TableColumn<Row>[] = [{ key: "name", label: "Name", sortable: true, accessor: (row) => row.name }];
const rows: Row[] = Array.from({ length: 12 }, (_, i) => ({ name: `row ${i}` }));

describe("Table labels", () => {
    it("uses Norwegian defaults", () => {
        const { html } = renderHtml(
            <Table columns={columns} data={rows} pageSize={5} selectionType="multiple" onSelectMany={() => {}} />
        );

        expect(html).toContain("Velg alle rader");
        expect(html).toContain("Forrige");
        expect(html).toContain("Neste");
        expect(html).toContain('aria-label="Forrige side"');
        expect(html).toContain('aria-label="Neste side"');
        expect(html).toContain("Name: sorter synkende");
    });

    it("uses the single-selection column heading default", () => {
        const { html } = renderHtml(<Table columns={columns} data={rows} selectionType="single" onSelect={() => {}} />);

        expect(html).toContain("Velg");
    });

    it("accepts overrides for every label", () => {
        const { html } = renderHtml(
            <Table
                columns={columns}
                data={rows}
                pageSize={5}
                selectionType="multiple"
                onSelectMany={() => {}}
                selectAllLabel="Select all rows"
                previousPageLabel="Previous"
                previousPageAriaLabel="Previous page"
                nextPageLabel="Next"
                nextPageAriaLabel="Next page"
                sortAscendingLabel="sort ascending"
                sortDescendingLabel="sort descending"
            />
        );

        expect(html).toContain("Select all rows");
        expect(html).toContain("Previous");
        expect(html).toContain('aria-label="Previous page"');
        expect(html).toContain('aria-label="Next page"');
        expect(html).toContain("Name: sort descending");
        expect(html).not.toContain("Velg alle rader");
        expect(html).not.toContain("Forrige");
        expect(html).not.toContain("sorter");
    });

    it("switches the sort hint with the current direction", () => {
        const ascending = renderHtml(
            <Table columns={columns} data={rows} defaultSort={{ headerKey: "name", direction: "desc" }} sortAscendingLabel="asc" />
        );

        expect(ascending.html).toContain("Name: asc");
    });
});

describe("DragAndDropFileInput labels", () => {
    const required = { id: "d", onSelectChange: () => {}, onDragAndDropChange: () => {} };

    it("uses Norwegian defaults", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...required} buttonContent="Velg" />);

        expect(html).toContain("Slipp fil her");
        expect(html).toContain("eller klikk på knappen for å velge fil");
    });

    it("uses the selected-file default", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...required} selectedFileName="file.txt" />);

        expect(html).toContain("Valgt fil:");
        expect(html).toContain("file.txt");
    });

    it("accepts overrides", () => {
        const { html } = renderHtml(
            <DragAndDropFileInput
                {...required}
                buttonContent="Choose"
                dropZoneLabel="Drop a file here"
                buttonHelpText="or click the button"
            />
        );

        expect(html).toContain("Drop a file here");
        expect(html).toContain("or click the button");
        expect(html).not.toContain("Slipp fil her");
    });

    it("accepts a selected-file override", () => {
        const { html } = renderHtml(<DragAndDropFileInput {...required} selectedFileName="file.txt" selectedFileLabel="Chosen file:" />);

        expect(html).toContain("Chosen file:");
        expect(html).not.toContain("Valgt fil:");
    });
});

describe("Dialog labels", () => {
    // Dialog renders through a portal created in an effect, so its markup is not
    // reachable from renderToStaticMarkup; the close button's label is asserted
    // in the browser suite instead. This pins the prop's presence in the type.
    it("declares a closeButtonAriaLabel prop", async () => {
        const { default: Dialog } = await import("./Dialog");
        const { html } = renderHtml(
            <Dialog onClickOutside={() => {}} closeButtonAriaLabel="Close dialog">
                Body
            </Dialog>
        );

        expect(html).toBe("");
        expect(attribute(html, "div", "class")).toBeNull();
    });
});
