import { useCheckbox } from "@react-aria/checkbox";
import { useFocusRing } from "@react-aria/focus";
import {
  useTable,
  useTableCell,
  useTableColumnHeader,
  useTableHeaderRow,
  useTableRow,
  useTableRowGroup,
  useTableSelectAllCheckbox,
  useTableSelectionCheckbox,
} from "@react-aria/table";
import { mergeProps } from "@react-aria/utils";
import { TableState, useTableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import { Fragment, ReactElement } from "react";
import React, { useRef } from "react";

import { Tick } from "../icons/Tick";
import { atoms } from "../theme.css";
import {
  checkboxInput,
  lastRow,
  mixed,
  table,
  tableCell,
  tableCheckboxCell,
  tableColumnHeader,
  tableHeaderRow,
  tick,
} from "./Table.css";

export {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";

// TODO:
// - Reuse style for checkboxes from the overall DS.

export function TableRowGroup({ type: Element, children }): ReactElement {
  const { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
}

export function TableHeaderRow({ item, state, children }): ReactElement {
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className={tableHeaderRow}>
      {children}
    </tr>
  );
}

export function TableColumnHeader({ column, state }): ReactElement {
  const ref = useRef<HTMLTableHeaderCellElement>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      className={`
        ${tableColumnHeader} ${atoms({
        textAlign: column.colspan > 1 ? "center" : "left",
        outline: {
          lightMode: isFocusVisible ? "table" : "none",
          darkMode: isFocusVisible ? "tableDark" : "none",
        },
      })}
      `}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          className={atoms({
            visibility:
              state.sortDescriptor?.column === column.key
                ? "visible"
                : "hidden",
          })}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

export function TableRow({ item, children, state, index, rows }): ReactElement {
  const ref = useRef<HTMLTableRowElement>(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow({ node: item }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <tr
      className={`${index === rows - 1 ? lastRow : ""} ${atoms({
        background: isSelected
          ? "pink-500"
          : item.index % 2
          ? "none" // Background of every second row.
          : "none",
        color: {
          lightMode: isSelected ? "white" : undefined,
          darkMode: isSelected ? "gray-900" : undefined,
        },
        boxShadow: {
          lightMode: isSelected ? "none" : "tableTopBorder",
          darkMode: isSelected ? "none" : "tableTopBorderDark",
        },
        outline: {
          lightMode: isFocusVisible ? "table" : "none",
          darkMode: isFocusVisible ? "tableDark" : "none",
        },
      })}`}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

export function TableCell({ cell, state }): ReactElement {
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={`${tableCell} ${atoms({
        outline: {
          lightMode: isFocusVisible ? "table" : "none",
          darkMode: isFocusVisible ? "tableDark" : "none",
        },
      })}`}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

function Checkbox({
  inputProps,
  inputRef,
  focusProps,
  isFocusVisible,
  backgroundConflict,
}) {
  const isChecked = inputProps["aria-checked"];

  return (
    <Fragment>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
        className={`${checkboxInput} ${atoms({
          border: {
            lightMode: isChecked || isFocusVisible ? "primary" : "regular",
            darkMode: isChecked || isFocusVisible ? "primary" : "regularDark",
          },
          margin: "none",
          background: {
            lightMode: isChecked ? "pink-500" : "white",
            darkMode: isChecked ? "pink-500" : "gray-900",
          },
          boxShadow: {
            lightMode: isFocusVisible
              ? backgroundConflict && isChecked
                ? "tableOutline"
                : "outline"
              : "none",
            darkMode: isFocusVisible
              ? backgroundConflict && isChecked
                ? "tableOutlineDark"
                : "outline"
              : "none",
          },
          outline: "none",
        })}`}
      />
      {isChecked ? (
        <div className={tick}>
          {isChecked === "mixed" ? (
            <div className={mixed} />
          ) : (
            <Tick color="white" />
          )}
        </div>
      ) : null}
    </Fragment>
  );
}

export function TableSelectAllCell({ column, state }): ReactElement {
  const ref = useRef<HTMLTableHeaderCellElement>(null);
  const isSingleSelectionMode =
    state.selectionManager.selectionMode === "single";
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );

  const { checkboxProps } = useTableSelectAllCheckbox(state);
  const inputRef = useRef(null);
  const { inputProps } = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  if (isSingleSelectionMode) {
    return null;
  }

  return (
    <th {...columnHeaderProps} ref={ref} className={tableCheckboxCell}>
      <Checkbox
        focusProps={focusProps}
        inputProps={inputProps}
        inputRef={inputRef}
        isFocusVisible={isFocusVisible}
        backgroundConflict={false}
      />
    </th>
  );
}

export function TableCheckboxCell({
  cell,
  state,
}: {
  cell: any;
  state: TableState<any>;
}): ReactElement {
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey },
    state
  );

  const inputRef = useRef(null);
  const { inputProps } = useCheckbox(
    checkboxProps,
    useToggleState(checkboxProps),
    inputRef
  );
  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td {...gridCellProps} ref={ref} className={tableCheckboxCell}>
      <Checkbox
        focusProps={focusProps}
        inputProps={inputProps}
        inputRef={inputRef}
        isFocusVisible={isFocusVisible}
        backgroundConflict
      />
    </td>
  );
}

type Props = {
  /**
   * Whether table allows selection.
   */
  selectionMode: "none" | "single" | "multiple";
  /**
   * Rows that should be selected from the start.
   */
  defaultSelectedKeys?: number[];
  /**
   * Some row must be selected at all times.
   */
  disallowEmptySelection?: boolean;
  /**
   * Callback called when selected keys change.
   */
  onSelectionChange?: (selectedKeys: number[]) => void;
  /**
   * Children.
   */
  children: any;
};

/**
 * Table.
 *
 * <TableExample />
 */
export function Table(props: Props): ReactElement {
  const state = useTableState({
    ...props,
    showSelectionCheckboxes: props.selectionMode === "multiple",
  });
  const ref = useRef<HTMLTableElement>(null);
  const { collection } = state;
  const { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} className={table}>
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell
                  key={column.key}
                  column={column}
                  state={state}
                />
              ) : (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  state={state}
                />
              )
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row, index, array) => (
          <TableRow
            key={row.key}
            item={row}
            index={index}
            rows={array.length}
            state={state}
          >
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell key={cell.key} cell={cell} state={state} />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}
