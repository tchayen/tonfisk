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
import { Fragment } from "react";
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

// TODO: TS
export function TableRowGroup({ type: Element, children }): JSX.Element {
  const { rowGroupProps } = useTableRowGroup();
  return <Element {...rowGroupProps}>{children}</Element>;
}

// TODO: TS
export function TableHeaderRow({ item, state, children }): JSX.Element {
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className={styles.tableHeaderRow}>
      {children}
    </tr>
  );
}

// TODO: TS
export function TableColumnHeader({ column, state }): JSX.Element {
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
      className={styles.tableColumnHeader({
        textAlign: column.colspan > 1 ? "wideColumn" : "default",
        outline: isFocusVisible ? "focusVisible" : "default",
      })}
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

// TODO: TS
export function TableRow({ item, children, state, index, rows }): JSX.Element {
  const ref = useRef<HTMLTableRowElement>(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow({ node: item }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  const className = styles.tableRow({
    background: isSelected ? "selected" : "default",
    color: isSelected ? "selected" : "default",
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

// TODO: TS
export function TableCell({ cell, state }): JSX.Element {
  const ref = useRef<HTMLTableCellElement>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={styles.tableCell({
        outline: isFocusVisible ? "focusVisible" : "default",
      })}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

// TODO: TS
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
          {isChecked === "mixed" ? <div className={styles.mixed} /> : <Tick />}
        </div>
      ) : null}
    </Fragment>
  );
}

// TODO: TS
export function TableSelectAllCell({ column, state }): JSX.Element {
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
  cell: any;
  state: TableState<any>;
}): JSX.Element {
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
 * } from "TODO_LIB_NAME";
 *
 * const [selectedKeys, setSelectedKeys] = useState([]);
 *
 * function TableExample() {
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
  const { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} className={styles.table}>
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
