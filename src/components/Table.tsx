import type React from "react";
import { useEffect, useId, useMemo, useState } from "react";
import { classNameArrayToClassNameString } from "../functions/helpers";
import CheckBoxInput from "./CheckBoxInput";
import RadioButtonInput from "./RadioButtonInput";
import Select from "./Select";
import style from "./Table.module.scss";

export type SortState = {
  headerKey: string;
  direction: "asc" | "desc";
};

export type TableColumn<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  accessor?: (item: T) => string | number | null | undefined;
  render?: (item: T) => React.ReactNode;
  sortAccessor?: (item: T) => string | number | Date | null | undefined;
  // Optional column-level aria-label override for the sort button
  ariaLabel?: string;
};

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  caption?: string;
  getRowId?: (row: T, index: number) => React.Key;
  selectionType?: "single" | "multiple";
  selectionLabel?: string;
  selectedRowId?: React.Key;
  onSelect?: (row: T) => void;
  selectedRowIds?: React.Key[];
  onSelectMany?: (rows: T[]) => void;
  onRowClick?: (row: T) => void;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  onPageSizeChange?: (size: number) => void;
}

const Table = <T extends object>({
  columns,
  data,
  caption,
  getRowId,
  selectionType,
  selectionLabel = "Velg rad",
  selectedRowId,
  onSelect,
  selectedRowIds,
  onSelectMany,
  onRowClick,
  pageSize,
  page,
  defaultPage = 1,
  onPageChange,
  pageSizeOptions,
  defaultPageSize,
  onPageSizeChange,
}: TableProps<T>) => {
  const [sortState, setSortState] = useState<SortState | null>(null);
  const selectionGroupName = useId();
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState<number | undefined>(
    () => {
      if (pageSize !== undefined) return undefined;
      if (defaultPageSize && defaultPageSize > 0) return defaultPageSize;
      if (pageSizeOptions?.length) return pageSizeOptions[0];
      return undefined;
    },
  );

  // Pick first sortable column by default
  useEffect(() => {
    const firstSortable = columns.find((c) => c.sortable);
    if (firstSortable) {
      setSortState({ headerKey: firstSortable.key, direction: "asc" });
    } else {
      setSortState(null);
    }
  }, [columns]);

  const headerByKey = useMemo(() => {
    const map = new Map<string, TableColumn<T>>();
    for (const c of columns) map.set(c.key, c);
    return map;
  }, [columns]);

  const sortedData = useMemo(() => {
    if (!sortState) return data;
    const col = headerByKey.get(sortState.headerKey);
    if (!col) return data;

    const getVal = col.sortAccessor ?? col.accessor;
    if (!getVal) return data;

    const arr = [...data];
    arr.sort((a, b) => {
      const av = getVal(a);
      const bv = getVal(b);
      if (av == null || bv == null) return 0;

      // number
      if (typeof av === "number" && typeof bv === "number") {
        return sortState.direction === "asc" ? av - bv : bv - av;
      }

      // date
      if (av instanceof Date && bv instanceof Date) {
        return sortState.direction === "asc"
          ? av.getTime() - bv.getTime()
          : bv.getTime() - av.getTime();
      }

      // string-ish
      const aStr = String(av);
      const bStr = String(bv);
      return sortState.direction === "asc"
        ? aStr.localeCompare(bStr, undefined, { numeric: true })
        : bStr.localeCompare(aStr, undefined, { numeric: true });
    });
    return arr;
  }, [data, sortState, headerByKey]);

  const toggleSort = (headerKey: string) => {
    setSortState((prev) => {
      if (!prev || prev.headerKey !== headerKey) {
        return { headerKey, direction: "asc" };
      }
      return {
        headerKey,
        direction: prev.direction === "asc" ? "desc" : "asc",
      };
    });
  };

  const getAriaSort = (
    key: string,
    sortable?: boolean,
  ): React.AriaAttributes["aria-sort"] => {
    if (!sortable) return undefined;
    if (sortState?.headerKey !== key) return "none";
    return sortState.direction === "asc" ? "ascending" : "descending";
  };

  const resolveRowId = (row: T, index: number): React.Key => {
    const resolved = getRowId?.(row, index);
    if (resolved === undefined || resolved === null || resolved === "") {
      const baseIndex = data.indexOf(row);
      return baseIndex === -1 ? index : baseIndex;
    }
    return resolved;
  };

  const selectedRowIdSet = useMemo(() => {
    if (selectionType !== "multiple") return new Set<React.Key>();
    return new Set(selectedRowIds ?? []);
  }, [selectedRowIds, selectionType]);

  const pageSizeValue = useMemo(() => {
    const candidate = pageSize ?? internalPageSize;
    if (!candidate || candidate <= 0) {
      return sortedData.length || data.length || 1;
    }
    return candidate;
  }, [pageSize, internalPageSize, sortedData.length, data.length]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedData.length / pageSizeValue));
  }, [sortedData.length, pageSizeValue]);

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
    if (pageSizeValue >= sortedData.length) return sortedData;
    const start = (currentPage - 1) * pageSizeValue;
    return sortedData.slice(start, start + pageSizeValue);
  }, [sortedData, currentPage, pageSizeValue]);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    if (page !== undefined) {
      onPageChange?.(clamped);
    } else {
      setInternalPage(clamped);
    }
  };

  const handlePageSizeChange = (nextSize: number) => {
    const normalized = nextSize > 0 ? Math.floor(nextSize) : 1;
    if (pageSize !== undefined) {
      onPageSizeChange?.(normalized);
    } else {
      setInternalPageSize(normalized);
      setInternalPage(1);
    }
  };

  const showPagination = totalPages > 1;
  const showPageSizeSelector = Boolean(pageSizeOptions?.length);

  return (
    <>
      <table className={style.table}>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {selectionType && (
              <th className={style.selectionHeader} aria-label={selectionLabel}>
                <span className={style.srOnly}>{selectionLabel}</span>
              </th>
            )}
            {columns.map(({ key, label, sortable, ariaLabel }) => {
              const isActive = sortState?.headerKey === key;
              const isAsc = isActive && sortState.direction === "asc";
              const isDesc = isActive && sortState.direction === "desc";

              return (
                <th
                  key={key}
                  aria-sort={getAriaSort(key, sortable)}
                  scope="col"
                >
                  {sortable ? (
                    <button
                      type="button"
                      className={`${style.thButton} ${style.sortable}`}
                      onClick={() => toggleSort(key)}
                      aria-label={`${ariaLabel ?? label}: sort ${
                        isActive
                          ? isAsc
                            ? "descending"
                            : "ascending"
                          : "ascending"
                      }`}
                    >
                      <span className={style.label}>{label}</span>
                      <span className={style.sortIndicators} aria-hidden="true">
                        <span
                          className={`${style.sortArrow} ${
                            isAsc ? style.activeArrow : ""
                          }`}
                        >
                          <svg
                            viewBox="0 0 12 8"
                            xmlns="http://www.w3.org/2000/svg"
                            role="presentation"
                          >
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
                        <span
                          className={`${style.sortArrow} ${
                            isDesc ? style.activeArrow : ""
                          }`}
                        >
                          <svg
                            viewBox="0 0 12 8"
                            xmlns="http://www.w3.org/2000/svg"
                            role="presentation"
                          >
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
                      <span className={style.label}>{label}</span>
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((row, i) => {
            const rowId = resolveRowId(row, i);
            const selectionControlId = `${selectionGroupName}-${rowId}`;
            const isSelectedSingle =
              selectionType === "single" && selectedRowId === rowId;
            const isSelectedMulti =
              selectionType === "multiple" && selectedRowIdSet.has(rowId);

            const isSelectableSingle = selectionType === "single" && !!onSelect;
            const isSelectableMulti =
              selectionType === "multiple" && !!onSelectMany;
            const clickable =
              Boolean(onRowClick) || isSelectableSingle || isSelectableMulti;

            const handleRowClick = () => {
              if (selectionType === "single") {
                onSelect?.(row);
              } else if (selectionType === "multiple" && onSelectMany) {
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

            return (
              <tr
                key={rowId}
                className={classNameArrayToClassNameString([
                  i % 2 === 0 ? style.evenRow : style.oddRow,
                  clickable && style.rowClickable,
                ])}
                onClick={clickable ? handleRowClick : undefined}
              >
                {selectionType === "single" && (
                  <td className={style.selectionCell}>
                    <button
                      type="button"
                      className={style.selectionControl}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <RadioButtonInput
                        id={selectionControlId}
                        name={selectionGroupName}
                        inputValue={String(rowId)}
                        checked={isSelectedSingle}
                        onChange={(event) => {
                          event?.stopPropagation();
                          onSelect?.(row);
                        }}
                        aria-label={selectionLabel}
                      />
                    </button>
                  </td>
                )}
                {selectionType === "multiple" && (
                  <td className={style.selectionCell}>
                    <button
                      type="button"
                      className={style.selectionControl}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <CheckBoxInput
                        id={selectionControlId}
                        value={String(rowId)}
                        checked={isSelectedMulti}
                        onChange={(event) => {
                          event?.stopPropagation();
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
                        aria-label={selectionLabel}
                      />
                    </button>
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render
                      ? col.render(row)
                      : String(col.accessor?.(row) ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {(showPagination || showPageSizeSelector) && (
        <div className={style.paginationControls}>
          {showPageSizeSelector && (
            <div className={style.pageSizeSelector}>
              <Select
                id={`${selectionGroupName}-page-size`}
                label="Rader per side"
                options={pageSizeOptions}
                value={pageSizeValue}
                onChange={(val) => handlePageSizeChange(Number(val))}
                width="120px"
                size="small"
              />
            </div>
          )}
          {showPagination && (
            <div className={style.pagination}>
              <button
                type="button"
                className={style.pageButton}
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                aria-label="Forrige side"
              >
                Forrige
              </button>
              <span className={style.pageInfo}>
                Side {currentPage} av {totalPages}
              </span>
              <button
                type="button"
                className={style.pageButton}
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Neste side"
              >
                Neste
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Table;
