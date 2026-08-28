// Dependencies
import { useEffect, useId, useMemo, useState } from "react";
import type React from "react";

// Components
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";
import Button from "./Button";
import CheckBoxInput from "./CheckBoxInput";
import LoadingAnimation from "./LoadingAnimation";
import RadioButtonInput from "./RadioButtonInput";

// Helpers
import { classNameArrayToClassNameString } from "../functions/helpers";

// Stylesheets
import style from "./Table.module.scss";

export type SortState = {
    headerKey: string;
    direction: "asc" | "desc";
};

// The side an ellipsis sits on is what distinguishes the two a middle page renders,
// so it doubles as a stable React key and the list never has to be keyed by index.
type PageItem = { type: "page"; page: number } | { type: "ellipsis"; side: "start" | "end" };

const pageItem = (page: number): PageItem => ({ type: "page", page });
const ellipsisItem = (side: "start" | "end"): PageItem => ({ type: "ellipsis", side });

const buildPageItems = (current: number, total: number): PageItem[] => {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => pageItem(i + 1));
    }

    if (current <= 4) {
        return [pageItem(1), pageItem(2), pageItem(3), pageItem(4), pageItem(5), ellipsisItem("end"), pageItem(total)];
    }

    if (current >= total - 3) {
        return [
            pageItem(1),
            ellipsisItem("start"),
            pageItem(total - 4),
            pageItem(total - 3),
            pageItem(total - 2),
            pageItem(total - 1),
            pageItem(total)
        ];
    }

    return [
        pageItem(1),
        ellipsisItem("start"),
        pageItem(current - 1),
        pageItem(current),
        pageItem(current + 1),
        ellipsisItem("end"),
        pageItem(total)
    ];
};

export type TableColumn<T> = {
    key: string;
    label: string;
    srOnlyLabel?: boolean;
    sortable?: boolean;
    accessor?: (item: T) => string | number | null | undefined;
    render?: (item: T) => React.ReactNode;
    sortAccessor?: (item: T) => string | number | Date | null | undefined;
    // Optional column-level aria-label override for the sort button
    ariaLabel?: string;
};

const resolveSortState = <T,>(columns: TableColumn<T>[], headerKey?: string, direction?: SortState["direction"]): SortState | null => {
    if (headerKey != null && columns.some((column) => column.sortable && column.key === headerKey)) {
        return { headerKey, direction: direction ?? "asc" };
    }

    const firstSortable = columns.find((column) => column.sortable);
    return firstSortable ? { headerKey: firstSortable.key, direction: "asc" } : null;
};

export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];

    loading?: boolean;
    loadingAriaLabel?: string;
    getRowId?: (row: T, index: number) => React.Key;
    selectionType?: "single" | "multiple";
    selectionLabel?: string;
    /** Accessible name of the "select every row on this page" checkbox. */
    selectAllLabel?: string;
    /** Visible heading of the selection column. */
    selectionHeaderLabel?: string;
    /** Visible text of the previous-page button. */
    previousPageLabel?: string;
    /** Accessible name of the previous-page button. */
    previousPageAriaLabel?: string;
    /** Visible text of the next-page button. */
    nextPageLabel?: string;
    /** Accessible name of the next-page button. */
    nextPageAriaLabel?: string;
    /** Appended to a sortable column's accessible name when clicking sorts ascending. */
    sortAscendingLabel?: string;
    /** Appended to a sortable column's accessible name when clicking sorts descending. */
    sortDescendingLabel?: string;
    getSelectionLabel?: (row: T) => string;
    selectedRowId?: React.Key;
    onSelect?: (row: T) => void;
    selectedRowIds?: React.Key[];
    onSelectMany?: (rows: T[]) => void;
    onRowClick?: (row: T) => void;
    getRowClassName?: (row: T, index: number) => string | undefined;
    pageSize?: number;
    page?: number;
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    totalCount?: number;
    totalPages?: number;
    defaultSort?: SortState;
    sort?: SortState | null;
    onSortChange?: (sort: SortState) => void;
}

const Table = <T extends object>({
    columns,
    data,

    loading = false,
    loadingAriaLabel,
    getRowId,
    selectionType,
    selectionLabel = "Velg rad",
    selectAllLabel = "Velg alle rader",
    selectionHeaderLabel = "Velg",
    previousPageLabel = "Forrige",
    previousPageAriaLabel = "Forrige side",
    nextPageLabel = "Neste",
    nextPageAriaLabel = "Neste side",
    sortAscendingLabel = "sorter stigende",
    sortDescendingLabel = "sorter synkende",
    getSelectionLabel,
    selectedRowId,
    onSelect,
    selectedRowIds,
    onSelectMany,
    onRowClick,
    getRowClassName,
    pageSize,
    page,
    defaultPage = 1,
    onPageChange,
    totalCount,
    totalPages: totalPagesProp,
    defaultSort,
    sort,
    onSortChange
}: TableProps<T>) => {
    const defaultSortKey = defaultSort?.headerKey;
    const defaultSortDirection = defaultSort?.direction;

    // Resolved during the first render so the initial paint is already sorted.
    const [internalSortState, setInternalSortState] = useState<SortState | null>(() =>
        resolveSortState(columns, defaultSortKey, defaultSortDirection)
    );
    const isSortControlled = sort !== undefined;
    const sortState = isSortControlled ? sort : internalSortState;
    const selectionGroupName = useId();
    const [internalPage, setInternalPage] = useState(defaultPage);

    useEffect(() => {
        if (isSortControlled) return;

        // Only re-resolve when the sorted column is gone. Re-resolving on every
        // `columns` identity change would throw away the sort the reader picked,
        // and one parent re-render with an inline columns array is enough to
        // change that identity. Returning `current` unchanged bails out of the
        // state update entirely.
        setInternalSortState((current) => {
            if (current && columns.some((column) => column.sortable && column.key === current.headerKey)) {
                return current;
            }
            return resolveSortState(columns, defaultSortKey, defaultSortDirection);
        });
    }, [columns, defaultSortKey, defaultSortDirection, isSortControlled]);

    const headerByKey = useMemo(() => {
        const map = new Map<string, TableColumn<T>>();
        for (const c of columns) map.set(c.key, c);
        return map;
    }, [columns]);

    const sortedData = useMemo(() => {
        if (isSortControlled) return data;
        if (!sortState) return data;
        const col = headerByKey.get(sortState.headerKey);
        if (!col) return data;

        const getVal = col.sortAccessor ?? col.accessor;
        if (!getVal) return data;

        const arr = [...data];
        arr.sort((a, b) => {
            const av = getVal(a);
            const bv = getVal(b);
            const aMissing = av == null || av === "";
            const bMissing = bv == null || bv === "";
            if (aMissing && bMissing) return 0;
            if (aMissing) return sortState.direction === "asc" ? -1 : 1;
            if (bMissing) return sortState.direction === "asc" ? 1 : -1;

            // number
            if (typeof av === "number" && typeof bv === "number") {
                return sortState.direction === "asc" ? av - bv : bv - av;
            }

            // date
            if (av instanceof Date && bv instanceof Date) {
                return sortState.direction === "asc" ? av.getTime() - bv.getTime() : bv.getTime() - av.getTime();
            }

            // string-ish
            const aStr = String(av);
            const bStr = String(bv);
            return sortState.direction === "asc"
                ? aStr.localeCompare(bStr, undefined, { numeric: true })
                : bStr.localeCompare(aStr, undefined, { numeric: true });
        });
        return arr;
    }, [data, sortState, headerByKey, isSortControlled]);

    const toggleSort = (headerKey: string) => {
        const next = (prev: SortState | null): SortState => {
            if (!prev || prev.headerKey !== headerKey) {
                return { headerKey, direction: "asc" };
            }
            return {
                headerKey,
                direction: prev.direction === "asc" ? "desc" : "asc"
            };
        };

        if (isSortControlled) {
            onSortChange?.(next(sortState));
        } else {
            setInternalSortState(next);
        }
    };

    const getAriaSort = (key: string, sortable?: boolean): React.AriaAttributes["aria-sort"] => {
        if (!sortable) return undefined;
        if (sortState?.headerKey !== key) return "none";
        return sortState.direction === "asc" ? "ascending" : "descending";
    };

    // Resolved once per row rather than per lookup: the previous fallback called
    // data.indexOf(row) for every row on every render, and again inside the
    // data.filter() in each selection handler, making selection O(n^2).
    const rowIdByRow = useMemo(() => {
        const map = new Map<T, React.Key>();
        data.forEach((row, index) => {
            const resolved = getRowId?.(row, index);
            map.set(row, resolved === undefined || resolved === null || resolved === "" ? index : resolved);
        });
        return map;
    }, [data, getRowId]);

    const resolveRowId = (row: T, fallbackIndex: number): React.Key => rowIdByRow.get(row) ?? fallbackIndex;

    const selectedRowIdSet = useMemo(() => {
        if (selectionType !== "multiple") return new Set<React.Key>();
        return new Set(selectedRowIds ?? []);
    }, [selectedRowIds, selectionType]);

    const pageSizeValue = useMemo(() => {
        if (!pageSize || pageSize <= 0) {
            return sortedData.length || data.length || 1;
        }
        return pageSize;
    }, [pageSize, sortedData.length, data.length]);

    const totalPages = useMemo(() => {
        if (totalPagesProp !== undefined) {
            return Math.max(1, Math.floor(totalPagesProp));
        }
        if (totalCount !== undefined) {
            return Math.max(1, Math.ceil(totalCount / pageSizeValue));
        }
        return Math.max(1, Math.ceil(sortedData.length / pageSizeValue));
    }, [sortedData.length, pageSizeValue, totalCount, totalPagesProp]);

    const currentPage = useMemo(() => {
        const candidate = page ?? internalPage;
        if (!Number.isFinite(candidate) || candidate < 1) return 1;
        if (candidate > totalPages) return totalPages;
        return candidate;
    }, [page, internalPage, totalPages]);

    useEffect(() => {
        if (page !== undefined) return;
        if (currentPage > totalPages) {
            setInternalPage(totalPages);
        }
    }, [currentPage, totalPages, page]);

    const paginatedData = useMemo(() => {
        if (totalPagesProp !== undefined || totalCount !== undefined) {
            return sortedData;
        }
        if (pageSizeValue >= sortedData.length) return sortedData;
        const start = (currentPage - 1) * pageSizeValue;
        return sortedData.slice(start, start + pageSizeValue);
    }, [sortedData, currentPage, pageSizeValue, totalCount, totalPagesProp]);

    const columnCount = columns.length + (selectionType ? 1 : 0);

    const allPageRowIds = paginatedData.map((row, i) => resolveRowId(row, i));
    const allSelected = selectionType === "multiple" && allPageRowIds.length > 0 && allPageRowIds.every((id) => selectedRowIdSet.has(id));
    const someSelected = selectionType === "multiple" && !allSelected && allPageRowIds.some((id) => selectedRowIdSet.has(id));

    const selectAllId = `${selectionGroupName}-select-all`;

    const handleSelectAll = () => {
        if (!onSelectMany) return;
        const pageIds = paginatedData.map((row, i) => resolveRowId(row, i));
        const isAllSelected = pageIds.length > 0 && pageIds.every((id) => selectedRowIdSet.has(id));
        const nextSelected = new Set(selectedRowIdSet);
        if (isAllSelected) {
            for (const id of pageIds) nextSelected.delete(id);
        } else {
            for (const id of pageIds) nextSelected.add(id);
        }
        const selectedRows = data.filter((item, idx) => nextSelected.has(resolveRowId(item, idx)));
        onSelectMany(selectedRows);
    };

    const goToPage = (nextPage: number) => {
        const clamped = Math.min(Math.max(nextPage, 1), totalPages);
        if (page !== undefined) {
            onPageChange?.(clamped);
        } else {
            setInternalPage(clamped);
        }
    };

    const showPagination = !loading && totalPages > 1;

    const pageItems = useMemo(() => buildPageItems(currentPage, totalPages), [currentPage, totalPages]);
    const paginationControlsClassName = classNameArrayToClassNameString([style.paginationControls]);

    return (
        <>
            <table className={style.table}>
                <thead>
                    <tr>
                        {selectionType && (
                            <th className={style.selectionHeader} aria-label={selectionLabel}>
                                {selectionType === "multiple" ? (
                                    <CheckBoxInput
                                        id={selectAllId}
                                        checked={allSelected}
                                        indeterminate={someSelected}
                                        hideLabel
                                        onChange={() => handleSelectAll()}
                                    >
                                        {selectAllLabel}
                                    </CheckBoxInput>
                                ) : (
                                    <>
                                        <span aria-hidden="true">{selectionHeaderLabel}</span>
                                        <span className={style.srOnly}>{selectionLabel}</span>
                                    </>
                                )}
                            </th>
                        )}
                        {columns.map(({ key, label, srOnlyLabel, sortable, ariaLabel }) => {
                            const isActive = sortState?.headerKey === key;
                            const isAsc = isActive && sortState.direction === "asc";
                            const isDesc = isActive && sortState.direction === "desc";
                            const labelClassName = classNameArrayToClassNameString([style.label, srOnlyLabel && style.srOnly]);

                            return (
                                <th key={key} aria-sort={getAriaSort(key, sortable)} scope="col">
                                    {sortable ? (
                                        <button
                                            type="button"
                                            className={`${style.thButton} ${style.sortable}`}
                                            onClick={() => toggleSort(key)}
                                            aria-label={`${ariaLabel ?? label}: ${isAsc ? sortDescendingLabel : sortAscendingLabel}`}
                                        >
                                            <span className={labelClassName}>{label}</span>
                                            <span className={style.sortIndicators} aria-hidden="true">
                                                <span className={`${style.sortArrow} ${isAsc ? style.activeArrow : ""}`}>
                                                    <svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg" role="presentation">
                                                        <path
                                                            d="M2 6 6 2 10 6"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className={`${style.sortArrow} ${isDesc ? style.activeArrow : ""}`}>
                                                    <svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg" role="presentation">
                                                        <path
                                                            d="M2 2 6 6 10 2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                            </span>
                                        </button>
                                    ) : (
                                        <span className={style.thButton}>
                                            <span className={labelClassName}>{label}</span>
                                        </span>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr className={style.loadingRow}>
                            <td className={style.loadingCell} colSpan={columnCount}>
                                <LoadingAnimation ariaLabel={loadingAriaLabel} />
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((row, i) => {
                            const rowId = resolveRowId(row, i);

                            const selectionControlId = `${selectionGroupName}-${rowId}`;

                            const selectionTypeIsSingle = selectionType === "single";
                            const selectionTypeIsMultiple = selectionType === "multiple";

                            const isSelectedSingle = selectionTypeIsSingle && selectedRowId === rowId;
                            const isSelectedMulti = selectionTypeIsMultiple && selectedRowIdSet.has(rowId);

                            const isSelectableSingle = selectionTypeIsSingle && !!onSelect;
                            const isSelectableMulti = selectionTypeIsMultiple && !!onSelectMany;
                            const clickable = Boolean(onRowClick) || isSelectableSingle || isSelectableMulti;

                            const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
                                // The selection control already reports its own change, and a
                                // click on it bubbles to the row as well. Letting that through
                                // would toggle a multiple selection twice, back to where it
                                // started. Both the bail-out and the stopPropagation used to
                                // live on a click handler hung off a presentational <span>;
                                // doing it here keeps the event from escaping the table just as
                                // that did, without making a <span> interactive.
                                if (event.target instanceof Element && event.target.closest("[data-selection-cell]")) {
                                    event.stopPropagation();
                                    return;
                                }

                                if (selectionTypeIsSingle) {
                                    onSelect?.(row);
                                } else if (selectionTypeIsMultiple && onSelectMany) {
                                    const nextSelected = new Set(selectedRowIdSet);
                                    if (nextSelected.has(rowId)) {
                                        nextSelected.delete(rowId);
                                    } else {
                                        nextSelected.add(rowId);
                                    }
                                    const selectedRows = data.filter((item, idx) => {
                                        const currentId = resolveRowId(item, idx);
                                        return nextSelected.has(currentId);
                                    });
                                    onSelectMany(selectedRows);
                                }
                                onRowClick?.(row);
                            };

                            const customRowClass = getRowClassName?.(row, i);
                            return (
                                <tr
                                    key={rowId}
                                    className={classNameArrayToClassNameString([
                                        customRowClass ?? (i % 2 === 0 ? style.evenRow : style.oddRow),
                                        clickable && style.rowClickable
                                    ])}
                                    onClick={clickable ? handleRowClick : undefined}
                                >
                                    {selectionTypeIsSingle && (
                                        <td className={style.selectionCell} data-selection-cell="">
                                            <span className={style.selectionControl}>
                                                <RadioButtonInput
                                                    id={selectionControlId}
                                                    name={selectionGroupName}
                                                    value={String(rowId)}
                                                    checked={isSelectedSingle}
                                                    hideLabel
                                                    onChange={() => {
                                                        onSelect?.(row);
                                                    }}
                                                >
                                                    {getSelectionLabel?.(row) ?? selectionLabel}
                                                </RadioButtonInput>
                                            </span>
                                        </td>
                                    )}
                                    {selectionTypeIsMultiple && (
                                        <td className={style.selectionCell} data-selection-cell="">
                                            <span className={style.selectionControl}>
                                                <CheckBoxInput
                                                    id={selectionControlId}
                                                    value={String(rowId)}
                                                    checked={isSelectedMulti}
                                                    hideLabel
                                                    onChange={() => {
                                                        if (!onSelectMany) return;
                                                        const nextSelected = new Set(selectedRowIdSet);
                                                        if (nextSelected.has(rowId)) {
                                                            nextSelected.delete(rowId);
                                                        } else {
                                                            nextSelected.add(rowId);
                                                        }
                                                        const selectedRows = data.filter((item, idx) => {
                                                            const currentId = resolveRowId(item, idx);
                                                            return nextSelected.has(currentId);
                                                        });
                                                        onSelectMany(selectedRows);
                                                    }}
                                                >
                                                    {getSelectionLabel?.(row) ?? selectionLabel}
                                                </CheckBoxInput>
                                            </span>
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key}>{col.render ? col.render(row) : String(col.accessor?.(row) ?? "")}</td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
            {showPagination && (
                <div className={paginationControlsClassName}>
                    <div className={style.pagination}>
                        <Button
                            type="button"
                            color="neutral"
                            noMargin
                            className={classNameArrayToClassNameString([style.pageNavButtonPrevious, currentPage <= 1 && style.pageNavButtonHidden])}
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            aria-label={previousPageAriaLabel}
                            content={previousPageLabel}
                            iconLeft={<ArrowLeftIcon />}
                        />
                        <div className={style.pageList}>
                            {pageItems.map((item) =>
                                item.type === "ellipsis" ? (
                                    <span key={`ellipsis-${item.side}`} className={style.pageEllipsis}>
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={item.page}
                                        type="button"
                                        className={classNameArrayToClassNameString([
                                            style.pageNumber,
                                            item.page === currentPage && style.pageNumberActive
                                        ])}
                                        onClick={() => goToPage(item.page)}
                                        aria-current={item.page === currentPage ? "page" : undefined}
                                    >
                                        {item.page}
                                    </button>
                                )
                            )}
                        </div>
                        <Button
                            type="button"
                            color="neutral"
                            noMargin
                            className={classNameArrayToClassNameString([
                                style.pageNavButtonNext,
                                currentPage >= totalPages && style.pageNavButtonHidden
                            ])}
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                            aria-label={nextPageAriaLabel}
                            content={nextPageLabel}
                            iconRight={<ArrowRightIcon />}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Table;
