/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
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
import { CollectionChildren, Node } from "@react-types/shared/src/collections";
import { Selection } from "@react-types/shared/src/selection";
export type { Selection } from "@react-types/shared/src/selection";
import { Fragment, ReactNode } from "react";
import React, { useRef } from "react";

import { Tick } from "../icons/Tick";
import { atoms } from "../theme.css";
import * as styles from "./Table.css";
export {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";

export function TableRowGroup({
  type: Element,
  children,
}: {
  type: "thead" | "tbody";
  children: ReactNode;
}): JSX.Element {
  const { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
}

export function TableHeaderRow({
  item,
  state,
  children,
}: {
  item: Node<object>;
  state: TableState<object>;
  children: ReactNode;
}): JSX.Element {
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className={styles.tableHeaderRow}>
      {children}
    </tr>
  );
}

export function TableColumnHeader({
  column,
  state,
}: {
  column: Node<object>;
  state: TableState<object>;
}): JSX.Element {
  const ref = useRef<HTMLTableCellElement>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  // const arrowIcon = state.sortDescriptor.direction === "ascending" ? "▲" : "▼";

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      // For some reason colspan is not present in the Node<object> type and
      // needed here.
      // @ts-ignore
      colSpan={column.colspan}
      className={styles.tableColumnHeader({
        // @ts-ignore
        textAlign: column.colspan > 1 ? "wideColumn" : "default",
        outline: isFocusVisible ? "focusVisible" : "default",
      })}
      ref={ref}
    >
      {column.rendered}
      {/* {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          className={atoms({
            visibility:
              state.sortDescriptor.column === column.key ? "visible" : "hidden",
          })}
        >
          {arrowIcon}
        </span>
      )} */}
    </th>
  );
}

export function TableRow({
  item,
  children,
  state,
  index,
  rows,
}: {
  item: Node<object>;
  children: ReactNode;
  state: TableState<object>;
  index: number;
  rows: number;
}): JSX.Element {
  const ref = useRef<HTMLTableRowElement>(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow({ node: item }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const className = styles.tableRow({
    background: isSelected ? "selected" : "default",
    boxShadow: isSelected ? "selected" : "default",
    outline: isFocusVisible ? "focusVisible" : "default",
  });

  return (
    <tr
      className={`${index === rows - 1 ? styles.lastRow : ""} ${className}`}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

export function TableCell({
  cell,
  state,
  isSelected,
}: {
  cell: Node<object>;
  state: TableState<object>;
  isSelected?: boolean;
}): JSX.Element {
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={styles.tableCell({
        outline: isFocusVisible ? "focusVisible" : "default",
        color: isSelected ? "selected" : "default",
      })}
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
}: {
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  focusProps: React.HTMLAttributes<HTMLElement>;
  isFocusVisible?: boolean;
  backgroundConflict?: boolean;
}) {
  const isChecked = inputProps["aria-checked"];

  return (
    <Fragment>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
        className={styles.checkboxInput({
          background: isChecked ? "checked" : "default",
          border: isChecked || isFocusVisible ? "checkedOrFocused" : "default",
          boxShadow: isFocusVisible
            ? backgroundConflict && isChecked
              ? "focusedChecked"
              : "focused"
            : "default",
        })}
      />
      {isChecked ? (
        <div className={styles.tick}>
          {isChecked === "mixed" ? (
            <div className={styles.mixed} />
          ) : (
            <Tick className={atoms({ stroke: "white" })} />
          )}
        </div>
      ) : null}
    </Fragment>
  );
}

export function TableSelectAllCell({
  column,
  state,
}: {
  column: Node<object>;
  state: TableState<object>;
}): JSX.Element | null {
  const ref = useRef<HTMLTableCellElement>(null);
  const isSingleSelectionMode =
    state.selectionManager.selectionMode === "single";
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );

  const { checkboxProps } = useTableSelectAllCheckbox(state);
  const inputRef = useRef<HTMLInputElement>(null);
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
    <th {...columnHeaderProps} ref={ref} className={styles.tableCheckboxCell}>
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
  cell: Node<object>;
  state: TableState<object>;
}): JSX.Element {
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { checkboxProps } = useTableSelectionCheckbox(
    { key: cell.parentKey! },
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
    <td {...gridCellProps} ref={ref} className={styles.tableCheckboxCell}>
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
  defaultSelectedKeys?: Array<number>;
  /**
   * Some row must be selected at all times.
   */
  disallowEmptySelection?: boolean;
  /**
   * Callback called when selected keys change. Selection type is: `"all" | Set<string | number>`.
   */
  onSelectionChange?: (selectedKeys: Selection) => void;
  /**
   * Table is defined by composing children.
   */
  children: CollectionChildren<object>;
  /**
   * Value used to describe the table to screen readers. Required if `label` is missing.
   */
  "aria-label": string;
};

/**
 * Table component. Supports single and multiple row selection. Pairs well with
 * [Pagination](/docs/components/pagination) component.
 *
 * ## Usage
 *
 * ```jsx
 * import {
 *   Table,
 *   TableHeader,
 *   TableBody,
 *   Row,
 *   Column,
 *   Cell,
 * } from "tonfisk";
 *
 *
 * function TableExample() {
 *   const [selectedKeys, setSelectedKeys] = useState([]);
 *
 *   const columns = [
 *     { name: "Name", key: "name" },
 *     { name: "Type", key: "type" },
 *     { name: "Date Modified", key: "date" },
 *   ];
 *
 *   const rows = [
 *     { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
 *     { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
 *     { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
 *     { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
 *   ];
 *
 *   return (
 *     <Table
 *       aria-label="Example static collection table"
 *       selectionMode="multiple"
 *       onSelectionChange={(keys) => {
 *         setSelectedKeys(keys);
 *       }}
 *     >
 *       <TableHeader columns={columns}>
 *         {(column) => <Column>{column.name}</Column>}
 *       </TableHeader>
 *       <TableBody items={rows}>
 *         {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
 *       </TableBody>
 *     </Table>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <TableExample />
 */
export function Table(props: Props): JSX.Element {
  const state = useTableState({
    ...props,
    showSelectionCheckboxes: props.selectionMode === "multiple",
  });
  const ref = useRef<HTMLTableElement>(null);
  const { collection } = state;
  const { gridProps } = useTable(
    { "aria-label": props["aria-label"] },
    state,
    ref
  );

  return (
    <table {...gridProps} ref={ref} className={styles.table}>
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {Array.from(headerRow.childNodes).map((column) =>
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
        {Array.from(collection.body.childNodes).map((row, index, array) => (
          <TableRow
            key={row.key}
            item={row}
            index={index}
            rows={array.length}
            state={state}
          >
            {Array.from(row.childNodes).map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell
                  key={cell.key}
                  cell={cell}
                  state={state}
                  isSelected={state.selectionManager.selectedKeys.has(row.key)}
                />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}
