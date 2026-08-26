import { describe, expect, it } from "vitest";

import Table, { type TableColumn } from "./Table";
import { cellText, renderHtml } from "../test/renderHtml";

type Row = { id: string; name: string };

const columns: TableColumn<Row>[] = [{ key: "name", label: "Name", sortable: true, accessor: (row) => row.name }];
const unsortableColumns: TableColumn<Row>[] = [{ key: "name", label: "Name", accessor: (row) => row.name }];

const rows: Row[] = [
    { id: "r0", name: "Charlie" },
    { id: "r1", name: "alice" },
    { id: "r2", name: "Bob" }
];

const pageList = (html: string) => {
    const list = html.match(/<div class="[^"]*pageList[^"]*">([\s\S]*?)<\/div>/)?.[1] ?? "";
    return [...list.matchAll(/<(?:button|span)[^>]*>([^<]*)<\/(?:button|span)>/g)].map((match) => match[1].trim());
};

// Row controls only — the header "select all" checkbox carries no value.
const checkedRowValues = (html: string) => {
    const body = html.match(/<tbody>([\s\S]*)<\/tbody>/)?.[1] ?? "";
    return [...body.matchAll(/<input[^>]*\schecked[^>]*>/g)].map((match) => match[0].match(/value="([^"]*)"/)?.[1] ?? null);
};

describe("Table sorting", () => {
    // Regression: the default sort was applied in an effect, so the first render
    // painted unsorted data and corrected itself on a second pass.
    it("sorts by the first sortable column on the very first render", () => {
        const { html, warnings } = renderHtml(<Table columns={columns} data={rows} />);

        expect(cellText(html)).toEqual(["alice", "Bob", "Charlie"]);
        expect(warnings).toEqual([]);
    });

    it("honours defaultSort direction on the first render", () => {
        const { html } = renderHtml(<Table columns={columns} data={rows} defaultSort={{ headerKey: "name", direction: "desc" }} />);

        expect(cellText(html)).toEqual(["Charlie", "Bob", "alice"]);
    });

    it("falls back to the first sortable column when defaultSort names an unknown one", () => {
        const { html } = renderHtml(<Table columns={columns} data={rows} defaultSort={{ headerKey: "nope", direction: "desc" }} />);

        expect(cellText(html)).toEqual(["alice", "Bob", "Charlie"]);
    });

    it("leaves data untouched when no column is sortable", () => {
        const { html } = renderHtml(<Table columns={unsortableColumns} data={rows} />);

        expect(cellText(html)).toEqual(["Charlie", "alice", "Bob"]);
    });

    it("defers to a controlled sort prop", () => {
        const { html } = renderHtml(<Table columns={columns} data={rows} sort={null} />);

        expect(cellText(html)).toEqual(["Charlie", "alice", "Bob"]);
    });

    it("marks the sorted column with aria-sort", () => {
        const { html } = renderHtml(<Table columns={columns} data={rows} defaultSort={{ headerKey: "name", direction: "desc" }} />);

        expect(html).toContain('aria-sort="descending"');
    });
});

describe("Table pagination", () => {
    const manyRows: Row[] = Array.from({ length: 20 }, (_, i) => ({ id: `r${i}`, name: `row ${i}` }));

    it.each([
        [10, ["1", "...", "9", "10", "11", "...", "20"]],
        [2, ["1", "2", "3", "4", "5", "...", "20"]],
        [19, ["1", "...", "16", "17", "18", "19", "20"]]
    ])("renders the page window for page %i", (page, expected) => {
        const { html } = renderHtml(<Table columns={unsortableColumns} data={manyRows} pageSize={1} page={page} />);

        expect(pageList(html)).toEqual(expected);
    });

    it("renders no ellipsis when every page fits", () => {
        const { html } = renderHtml(<Table columns={unsortableColumns} data={manyRows.slice(0, 5)} pageSize={1} page={1} />);

        expect(pageList(html)).toEqual(["1", "2", "3", "4", "5"]);
    });

    it("marks the current page with aria-current", () => {
        const { html } = renderHtml(<Table columns={unsortableColumns} data={manyRows} pageSize={1} page={10} />);

        expect(html).toMatch(/aria-current="page"[^>]*>10</);
    });

    it("renders no pagination for a single page", () => {
        const { html } = renderHtml(<Table columns={unsortableColumns} data={rows} />);

        expect(pageList(html)).toEqual([]);
    });
});

describe("Table row ids", () => {
    it("uses getRowId for selection", () => {
        const { html } = renderHtml(
            <Table
                columns={unsortableColumns}
                data={rows}
                getRowId={(row) => row.id}
                selectionType="multiple"
                selectedRowIds={["r1"]}
                onSelectMany={() => {}}
            />
        );

        expect(checkedRowValues(html)).toEqual(["r1"]);
    });

    it("falls back to the index in data when getRowId is absent", () => {
        const { html } = renderHtml(
            <Table columns={unsortableColumns} data={rows} selectionType="multiple" selectedRowIds={[1]} onSelectMany={() => {}} />
        );

        expect(checkedRowValues(html)).toEqual(["1"]);
    });

    it("falls back to the index when getRowId returns an empty string", () => {
        const { html } = renderHtml(
            <Table
                columns={unsortableColumns}
                data={rows}
                getRowId={() => ""}
                selectionType="multiple"
                selectedRowIds={[1]}
                onSelectMany={() => {}}
            />
        );

        expect(checkedRowValues(html)).toEqual(["1"]);
    });

    // Fallback ids must be stable across pages: the row loop once passed the
    // page-local index while selection handlers passed the global one.
    it("keeps the global index as the fallback id on a later page", () => {
        const { html } = renderHtml(
            <Table
                columns={unsortableColumns}
                data={rows}
                pageSize={2}
                page={2}
                selectionType="multiple"
                selectedRowIds={[2]}
                onSelectMany={() => {}}
            />
        );

        expect(checkedRowValues(html)).toEqual(["2"]);
    });

    it("checks a single radio for single selection", () => {
        const { html } = renderHtml(
            <Table
                columns={unsortableColumns}
                data={rows}
                getRowId={(row) => row.id}
                selectionType="single"
                selectedRowId="r2"
                onSelect={() => {}}
            />
        );

        expect(checkedRowValues(html)).toEqual(["r2"]);
    });
});
