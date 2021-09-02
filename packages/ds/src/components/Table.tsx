/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
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
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useTableState } from "@react-stately/table";
import { useToggleState } from "@react-stately/toggle";
import { ReactElement, ReactNode } from "react";
import { useRef } from "react";
export {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";

export function TableRowGroup({
  type: Element,
  style,
  children,
}): ReactElement {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element {...rowGroupProps} style={style}>
      {children}
    </Element>
  );
}

export function TableHeaderRow({ item, state, children }): ReactElement {
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
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
      css={{
        textAlign: column.colspan > 1 ? "center" : "left",
        padding: "5px 10px",
        outline: isFocusVisible ? "2px solid orange" : "none",
        cursor: "default",
      }}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          css={{
            padding: "0 2px",
            visibility:
              state.sortDescriptor?.column === column.key
                ? "visible"
                : "hidden",
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

export function TableRow({ item, children, state }): ReactElement {
  const ref = useRef<HTMLTableRowElement>(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow({ node: item }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <tr
      css={{
        background: isSelected
          ? "blueviolet"
          : item.index % 2
          ? "var(--spectrum-alias-highlight-hover)"
          : "none",
        color: isSelected ? "white" : null,
        outline: isFocusVisible ? "2px solid orange" : "none",
      }}
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
      css={{
        padding: "5px 10px",
        outline: isFocusVisible ? "2px solid orange" : "none",
        cursor: "default",
      }}
      ref={ref}
    >
      {cell.rendered}
    </td>
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

  return (
    <th {...columnHeaderProps} ref={ref}>
      {
        /*
          In single selection mode, the checkbox will be hidden.
          So to avoid leaving a column header with no accessible content,
          use a VisuallyHidden component to include the aria-label from the checkbox,
          which for single selection will be "Select."
        */
        isSingleSelectionMode && (
          <VisuallyHidden>{inputProps["aria-label"]}</VisuallyHidden>
        )
      }
      <input
        {...inputProps}
        ref={inputRef}
        style={isSingleSelectionMode ? { visibility: "hidden" } : undefined}
      />
    </th>
  );
}

export function TableCheckboxCell({ cell, state }): ReactElement {
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

  return (
    <td {...gridCellProps} ref={ref}>
      <input {...inputProps} />
    </td>
  );
}

type Props = {
  /**
   * Children.
   */
  children: ReactNode;
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
    <table {...gridProps} ref={ref} style={{ borderCollapse: "collapse" }}>
      <TableRowGroup
        type="thead"
        style={{
          borderBottom: "2px solid var(--spectrum-global-color-gray-800)",
        }}
      >
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
        {[...collection.body.childNodes].map((row) => (
          <TableRow key={row.key} item={row} state={state}>
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
