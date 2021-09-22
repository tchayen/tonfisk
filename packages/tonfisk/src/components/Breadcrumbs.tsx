import { useBreadcrumbItem, useBreadcrumbs } from "@react-aria/breadcrumbs";
import React, { Children, cloneElement, ReactNode, useRef } from "react";

export function BreadcrumbItem(props: {
  onPress?: () => void;
  children: ReactNode;
  isCurrent?: boolean;
}): JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const { itemProps } = useBreadcrumbItem(
    { ...props, elementType: "span" },
    ref
  );
  return (
    <li>
      <span
        {...itemProps}
        ref={ref}
        style={{
          color: "var(--blue)",
          textDecoration: props.isCurrent ? null : "underline",
          fontWeight: props.isCurrent ? "bold" : null,
          cursor: props.isCurrent ? "default" : "pointer",
        }}
      >
        {props.children}
      </span>
      {!props.isCurrent && (
        <span aria-hidden="true" style={{ padding: "0 5px" }}>
          {"›"}
        </span>
      )}
    </li>
  );
}

type Props = {
  /**
   * Items in the breadcrumbs.
   */
  children: ReactNode;
};

/**
 * Breadrcumbs component.
 *
 * ## Usage
 *
 * ```jsx
 * import { Breadcrumbs, BreadcrumbItem } from "tonfisk";
 *
 * function BreadcrumbsExample() {
 *   return (
 *     <Breadcrumbs>
 *       <BreadcrumbItem onPress={() => alert("Pressed Folder 1")}>
 *         Folder 1
 *       </BreadcrumbItem>
 *       <BreadcrumbItem onPress={() => alert("Pressed Folder 2")}>
 *         Folder 2
 *       </BreadcrumbItem>
 *       <BreadcrumbItem>Folder 3</BreadcrumbItem>
 *     </Breadcrumbs>
 *   );
 * }
 * ```
 *
 * ## Example
 *
 * <BreadcrumbsExample />
 */
export function Breadcrumbs(props: Props): JSX.Element {
  const { navProps } = useBreadcrumbs(props);
  const children = Children.toArray(props.children);

  return (
    <nav {...navProps}>
      <ol style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
        {children.map((child, i) =>
          cloneElement(child, { isCurrent: i === children.length - 1 })
        )}
      </ol>
    </nav>
  );
}
