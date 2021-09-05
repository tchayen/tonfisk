/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
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
import { useRef } from "react";

import { Tick } from "../icons/Tick";

export {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
} from "@react-stately/table";

// TODO:
// - Checkboxes should be styled like checkboxes from the design system.

export function TableRowGroup({ type: Element, css, children }): ReactElement {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element {...rowGroupProps} css={css}>
      {children}
    </Element>
  );
}

export function TableHeaderRow({ item, state, children }): ReactElement {
  const ref = useRef<HTMLTableRowElement>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr
      {...rowProps}
      ref={ref}
      css={{
        "& > th": {
          "&:first-child": {
            borderTopLeftRadius: 8, // TODO
          },
          "&:last-child": {
            borderTopRightRadius: 8, // TODO
          },
        },
      }}
    >
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

  const theme = useTheme();
  const { fontWeights, fontSizes, space } = theme;

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      css={{
        color: "var(--primary-text)",
        fontWeight: fontWeights.bold,
        fontSize: fontSizes[1],
        textAlign: column.colspan > 1 ? "center" : "left",
        height: 40, // TODO
        outline: isFocusVisible ? "2px solid var(--primary-text)" : "none",
        cursor: "default",
        paddingLeft: space[3],
        paddingRight: space[3],
      }}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          css={{
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
          ? "var(--primary)"
          : item.index % 2
          ? "none" // Background of every second row.
          : "none",
        color: isSelected ? "var(--background)" : undefined,
        boxShadow: isSelected ? "none" : "0 1px 0 inset var(--border)",
        outline: isFocusVisible ? "2px solid var(--primary-text)" : "none",
        "&:last-child > td": {
          "&:first-child": {
            borderBottomLeftRadius: 8, // TODO
          },
          "&:last-child": {
            borderBottomRightRadius: 8, // TODO
          },
        },
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

  const theme = useTheme();
  const { fontSizes, space } = theme;

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      css={{
        fontSize: fontSizes[1],
        height: 40, // TODO
        outline: isFocusVisible ? "2px solid var(--primary-text)" : "none",
        cursor: "default",
        paddingLeft: space[3],
        paddingRight: space[3],
      }}
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
  const theme = useTheme();
  const { space, sizes, radii } = theme;

  const isChecked = inputProps["aria-checked"];

  return (
    <Fragment>
      <input
        {...mergeProps(inputProps, focusProps)}
        ref={inputRef}
        css={{
          WebkitAppearance: "none",
          minWidth: space[3],
          height: sizes[3],
          borderRadius: radii[2],
          position: "absolute",
          top: 12,
          left: 16,
          border: `1px solid ${
            isChecked || isFocusVisible ? "var(--primary)" : "var(--border)"
          }`,
          margin: 0,
          background: isChecked ? "var(--primary)" : "var(--background)",
          boxShadow: `${
            isFocusVisible
              ? backgroundConflict && isChecked
                ? "0 0 0 2px var(--primary-text)"
                : "0 0 0 3px var(--outline)"
              : "none"
          }`,
          outline: "none",
        }}
      />
      {isChecked ? (
        <div
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 15,
            left: 18,
            pointerEvents: "none",
          }}
        >
          {isChecked === "mixed" ? (
            <div
              css={{
                height: 2,
                width: 10,
                position: "absolute",
                top: 4,
                left: 1,
                background: "var(--background)",
              }}
            />
          ) : (
            <Tick />
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

  const theme = useTheme();
  const { space } = theme;

  if (isSingleSelectionMode) {
    return null;
  }

  return (
    <th
      {...columnHeaderProps}
      ref={ref}
      css={{
        paddingLeft: space[3],
        paddingRight: space[3],
        position: "relative",
        width: 48,
      }}
    >
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

  const theme = useTheme();
  const { space } = theme;

  return (
    <td
      {...gridCellProps}
      ref={ref}
      css={{
        paddingLeft: space[3],
        paddingRight: space[3],
        position: "relative",
        width: 48,
      }}
    >
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
    <table
      {...gridProps}
      ref={ref}
      css={{
        borderCollapse: "separate",
        borderSpacing: 0,
        borderRadius: 8, // TODO
        boxShadow: "0 0 0 1px inset var(--border)",
      }}
    >
      <TableRowGroup
        type="thead"
        css={{
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
